const cloud = require('wx-server-sdk');

cloud.init();

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();

  const {
    name,
    type,
    order,
    pageNo = 0,
    pageSize = 10,
  } = event;
  const db = cloud.collection('qrcodes');
  const pageInfo = await db.where({
    user: OPENID,
    type,
    name: db.RegExp({
      regexp: `^\\${name}`,
      options: 'i',
    }),
  }).orderBy(order, 'desc')
    .skip(pageNo * pageSize)
    .limit(pageSize)
    .get();
  const count = await db.count();
  for (let i = 0; i < pageInfo.length; i += 1) {
    pageInfo[i].imageUrl = await db.getTempFileURL([pageInfo[i].image]);
  }
  return {
    pageNo,
    pageSize,
    count,
    pageInfo,
  };
};

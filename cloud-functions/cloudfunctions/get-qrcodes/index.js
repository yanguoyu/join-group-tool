const cloud = require('wx-server-sdk');

cloud.init();

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  
  const {
    myself,
    name,
    type,
    order,
    pageNo = 0,
    pageSize = 10,
  } = event;
  const db = cloud.database();
  const collection = db.collection('qrcodes');
  const result = await collection.where({
    user: myself ? OPENID : undefined,
    type,
    name: db.RegExp({
      regexp: `^.*${name||''}.*$`,
      options: 'i',
    }),
  }).orderBy(order, 'desc')
    .skip(pageNo * pageSize)
    .limit(pageSize)
    .get()
  const count = await collection.count();
  const pageInfo = result.data;
  return {
    pageNo,
    pageSize,
    count: count.total,
    pageInfo: pageInfo,
  };
};

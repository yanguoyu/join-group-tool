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
    user,
  } = event;
  const db = cloud.database();
  const collection = db.collection('qrcodes');
  const result = await collection.where(
    {
      user: myself ? OPENID : user,
      type,
      name: db.RegExp({
        regexp: `^.*${name||''}.*$`,
        options: 'i',
      }),
      show: true,
    }).orderBy(order, 'desc')
    .orderBy('weight', 'desc')
    .skip(pageNo * pageSize)
    .limit(pageSize)
    .get()
  const count = await collection.where(
    {
      user: myself ? OPENID : user,
      type,
      name: db.RegExp({
        regexp: `^.*${name||''}.*$`,
        options: 'i',
      }),
      show: true,
    }).count();
  const pageInfo = result.data;
  return {
    pageNo,
    pageSize,
    count: count.total,
    pageInfo: pageInfo,
  };
};

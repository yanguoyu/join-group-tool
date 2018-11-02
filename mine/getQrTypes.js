const cloud = require('wx-server-sdk');

cloud.init();

exports.main = async () => {
  const db = cloud.collection('qrcodes');
  const count = await db.count();
  const res = [];
  const pageSize = 20;
  for (let i = 0; i < count / pageSize; i += 1) {
    res.push(await db.skip(i * pageSize).limit(pageSize).get());
  }
  return res;
};

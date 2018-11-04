// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async () => {
  const db = cloud.database();
  const collection = db.collection('help-info');
  const count = await collection.count();
  const res = [];
  const pageSize = 20;
  for (let i = 0; i < count.total / pageSize; i += 1) {
    const page = await collection.skip(i * pageSize).limit(pageSize).get();
    res.push(...(page.data || []));
  }
  return res;
}
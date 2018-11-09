const cloud = require('wx-server-sdk');

cloud.init({
  env: 'dev-66ff72'
});

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  
  const { _id } = event;
  const db = cloud.database();
  const collection = db.collection('qrcodes');
  const result = await collection.where({
    user: OPENID,
    _id
  }).get();
  return result.data[0];
};

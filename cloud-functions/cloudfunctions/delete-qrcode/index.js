const cloud = require('wx-server-sdk');

cloud.init({
  env: 'dev-66ff72'
});

exports.main = async (event) => {
  const db = cloud.database();
  const collection = db.collection('qrcodes');

  const {
    _id,
  } = event;
  if (!_id) {
    return {
      error: '',
    };
  }
  const qrcode = await collection.doc(_id).get();
  const res = await collection.doc(_id).remove();
  console.log(qrcode.data.image);
  await cloud.deleteFile({ fileList: [qrcode.data.image] });
  return res;
};

const cloud = require('wx-server-sdk');

cloud.init();

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const db = cloud.database().collection('qrcodes');

  const {
    user,
    _id,
  } = event;
  if (user !== OPENID || !_id) {
    return {
      error: '',
    };
  }
  const qrcode = db.doc(_id);
  const res = await db.doc(_id).remove();
  await db.deleteFile({ fileList: [qrcode.image] });
  return res;
};

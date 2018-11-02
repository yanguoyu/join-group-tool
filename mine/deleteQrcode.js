const cloud = require('wx-server-sdk');

cloud.init();

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const db = cloud.collection('qrcodes');

  const {
    user,
    id,
  } = event;
  if (user !== OPENID || !id) {
    return {
      error: '',
    };
  }
  const qrcode = db.doc(id);
  const res = await db.doc(id).remove();
  await db.deleteFile({ fileList: [qrcode.image] });
  return res;
};

const cloud = require('wx-server-sdk');

cloud.init();

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const db = cloud.collection('qrcodes');

  const {
    name,
    type,
    desc,
    owner,
    image,
    id,
  } = event;
  if (id) {
    return await db.doc(id).update({
      name,
      type,
      desc,
      owner,
      image,
      user: OPENID,
      updateAt: db.serverDate(),
    });
  }
  return await db.add({
    name,
    type,
    desc,
    owner,
    image,
    user: OPENID,
    createAt: db.serverDate(),
  });
};

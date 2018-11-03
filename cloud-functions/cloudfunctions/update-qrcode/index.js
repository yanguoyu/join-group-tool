const cloud = require('wx-server-sdk');

cloud.init();

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const db = cloud.database().collection('qrcodes');

  const {
    name,
    type,
    desc,
    owner,
    image,
    _id,
  } = event;
  if (_id) {
    return await db.doc(_id).update({
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
    user: openid,
    createAt: db.serverDate(),
  });
};

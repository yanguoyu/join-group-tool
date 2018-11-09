const cloud = require('wx-server-sdk');

cloud.init({
  env: 'dev-66ff72'
});

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const db = cloud.database();
  const collection = cloud.database().collection('qrcodes');

  const {
    name,
    type,
    desc,
    owner,
    image,
    _id,
  } = event;
  if (_id) {
    return await collection.doc(_id).update({
      data: {
        name,
        type,
        desc,
        owner,
        image,
        user: OPENID,
        updateAt: db.serverDate(),
      }
    });
  }
  return await collection.add({
    data: {
      name,
      type,
      desc,
      owner,
      image,
      user: OPENID,
      createAt: db.serverDate(),
      updateAt: db.serverDate(),
      show: true,
      weight: 0,
    }
  });
};

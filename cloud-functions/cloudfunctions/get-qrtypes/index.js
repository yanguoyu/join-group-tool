const cloud = require('wx-server-sdk');

cloud.init({
  env: 'dev-66ff72'
});

exports.main = async () => {
  const db = cloud.database().collection('qrcode-types');
  const count = await db.count();
  const res = [];
  const pageSize = 20;
  for (let i = 0; i < count.total / pageSize; i += 1) {
    const page = await db.skip(i * pageSize).limit(pageSize).get();
    res.push(...(page.data || []));
  }
  return res;
};

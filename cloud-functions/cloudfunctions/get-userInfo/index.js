// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'dev-66ff72'
});

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  console.log(OPENID);
  return OPENID;
}
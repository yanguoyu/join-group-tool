// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'dev-66ff72'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const collection = db.collection('mine-upload');
  const myUploadsCount = await collection.count();
  const myuploads = [];
  const pageSize = 20;
  for (let i = 0; i < myUploadsCount.total / pageSize; i += 1) {
    const page = await collection.skip(i * pageSize).limit(pageSize).get();
    myuploads.push(...(page.data || []));
  }
  console.log(myuploads);
  for(let i = 0; i < myuploads.length; ++i){
    await cloud.callFunction({
      name: 'delete-qrcode',
      data: {
        _id: myuploads[i].myUploadId
      }
    })
  }
  return true;
}
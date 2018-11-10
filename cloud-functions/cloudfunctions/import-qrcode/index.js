// 云函数入口文件
const cloud = require('wx-server-sdk')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path  = require('path');
const fs  = require('fs');

cloud.init({
  env: 'dev-66ff72'
})
const curPath = path.dirname(__filename);

async function uploadFile(src) {
  const filePath = path.resolve(curPath, `./db/image/${src}`);
  const fileStream = fs.createReadStream(filePath);
  console.log(filePath);
  return await cloud.uploadFile({
    cloudPath: `qrcodes-images/${src}`,
    fileContent: fileStream,
  })
}

// 云函数入口函数
exports.main = async () => {
  const dbPath = path.resolve(curPath, `./db/db.json`);
  if(!fs.existsSync(dbPath)) {
    throw new Error(`${dbPath} not find`);
  }
  const adapter = new FileSync(dbPath);
  const db = low(adapter);
  const qrcodeInfo = await db.read().value();

  const cloudDb = cloud.database();
  const collection = cloudDb.collection('qrcodes');
  const mineDb = cloudDb.collection('mine-upload');
  const { OPENID } = cloud.getWXContext();

  for(let i = 0; i < qrcodeInfo.length; ++i) {
    const item = qrcodeInfo[i];
    if(!item || !item.name || !item.type || !item.owner) {
      continue;
    }
    const uploadFileRes = await uploadFile(item.image);
    console.log(uploadFileRes);
    const data = {
      name: item.name,
      type: item.type,
      desc: item.desc,
      owner: item.owner,
      image: uploadFileRes.fileID,
      user: OPENID,
      createAt: cloudDb.serverDate(),
      updateAt: cloudDb.serverDate(),
      show: true,
      weight: 0,
    }
    const addRes = await collection.add({data});
    mineDb.add({data : {
      myUploadId: addRes._id
    }});
    console.log(addRes);
  }
  return true;
}
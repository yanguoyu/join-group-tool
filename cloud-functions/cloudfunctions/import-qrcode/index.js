// 云函数入口文件
const cloud = require('wx-server-sdk')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { id } = event;
  const adapter = new FileSync(`db/${id}.json`);
  const db = low(adapter);
  const qrcodeInfo = await db.read();
}
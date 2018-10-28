import Taro from '@tarojs/taro'
import {
  GET_USER_INFO,
  GET_QRCODE_TYPE,
  CHANGE_FORM_VALUE,
  UPLOAD_QRCODE,
  DELETE_QRCODE,
  GET_USE_QRCODES,
} from '../constants/personal-center'
import AV from '../shared/av-weapp-min'

export const getUserInfo = (userInfo) => {
  return {
    type: GET_USER_INFO,
    payload: userInfo,
  }
}

export const getQrcodeType = () => {
  const qrcodeQuery = new AV.Query('qrcode_type');
  return {
    type: GET_QRCODE_TYPE,
    payload: qrcodeQuery.find()
  }
}

export const changeFormValue = (values) => {
  return {
    type: CHANGE_FORM_VALUE,
    payload: values
  }
}

export const upLoadQrcode = ({id, name, desc, owner, image, typeId}) => {
  const GroupInfo = AV.Object.extend('qrcode_info');
  const groupType = AV.Object.createWithoutData('qrcode_type', typeId);
  let groundInfo = null;
  if(id) {
    groundInfo = AV.Object.createWithoutData('qrcode_info', id);
  } else {
    groundInfo = new GroupInfo();
  }
  groundInfo.set('name', name);
  groundInfo.set('desc', desc);
  groundInfo.set('owner', owner);
  groundInfo.set('image', image);
  groundInfo.set('type', groupType);
  const user = AV.User.current();
  if(user) {
    const userPointer = AV.Object.createWithoutData('_User', user.id);
    groundInfo.set('user', userPointer);
  }
  return {
    type: UPLOAD_QRCODE,
    payload: groundInfo.save(),
    meta: { id, name, desc, owner, image, typeId },
  }
}

export const deleteQrcode = (id) => {
  const deleteQrcodeIns = AV.Object.createWithoutData('qrcode_info', id);
  return {
    type: DELETE_QRCODE,
    payload: deleteQrcodeIns.destroy(),
    handlers: {
      failed: () => {
        Taro.showToast({
          title: '删除失败',
          image: '/assert/failed.png',
          duration: 1000
        })
      }
    },
    id,
  }
}

export const getUserQrcodes = () => {
  const user = AV.User.current();
  const curUser = AV.Object.createWithoutData('_User', user.id);
  const qrcodeQuery = new AV.Query('qrcode_info');
  qrcodeQuery.equalTo('user', curUser);
  return {
    type: GET_USE_QRCODES,
    payload: qrcodeQuery.find(),
  }
}
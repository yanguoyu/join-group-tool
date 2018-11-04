import Taro from '@tarojs/taro'
import {
  GET_USER_INFO,
  GET_QRCODE_TYPE,
  CHANGE_FORM_VALUE,
  UPLOAD_QRCODE,
  DELETE_QRCODE,
  GET_USE_QRCODES,
  RESET_CUR_QRCODE_INFO,
  GET_CUR_QRCODE_INFO,
  GET_USER_OPEN_ID,
} from '../constants/personal-center'

export const getUserInfo = (userInfo) => {
  return {
    type: GET_USER_INFO,
    payload: userInfo,
  }
}

export const getQrcodeType = () => {
  return {
    type: GET_QRCODE_TYPE,
    payload: wx.cloud.callFunction({
      name: 'get-qrtypes'
    })
  }
}

export const changeFormValue = (values) => {
  return {
    type: CHANGE_FORM_VALUE,
    payload: values
  }
}

export const upLoadQrcode = ({_id, name, desc, owner, image, typeId}) => {
  return {
    type: UPLOAD_QRCODE,
    payload: wx.cloud.callFunction({
      name: 'update-qrcode',
      data: {
        name,
        type: typeId,
        desc,
        owner,
        image,
        _id,
      }
    }),
    meta: { _id, name, desc, owner, image, typeId },
  }
}

export const deleteQrcode = (_id, success) => {
  return {
    type: DELETE_QRCODE,
    payload: wx.cloud.callFunction({
      name: 'delete-qrcode',
      data: {
        _id,
      }
    }),
    handlers: {
      success,
      failed: () => {
        Taro.showToast({
          title: '删除失败',
          image: '/assert/failed.png',
          duration: 1000
        })
      }
    },
    _id,
  }
}

export const getUserQrcodes = ({ pageNo, pageSize }) => {
  return {
    type: GET_USE_QRCODES,
    payload: wx.cloud.callFunction({
      name: 'get-qrcodes',
      data: {
        myself: true,
        pageNo,
        pageSize,
        order: 'updateAt'
      }
    }),
  }
}

export const resetCurCodeInfo = () => ({
  type: RESET_CUR_QRCODE_INFO,
})

export const getCurQrcodeInfo = (_id) => ({
  type: GET_CUR_QRCODE_INFO,
  payload: wx.cloud.callFunction({
    name: 'get-qrcode-byid',
    data: {
      _id,
    },
  })
})

export const getUserOpenId = () => ({
  type: GET_USER_OPEN_ID,
  payload: wx.cloud.callFunction({
    name: 'get-userInfo'
  })
})
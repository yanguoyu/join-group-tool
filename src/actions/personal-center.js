import {
  GET_USER_INFO,
  UPLOAD_QRCODE,
} from '../constants/personal-center'

export const getUserInfo = (userInfo) => {
  return {
    type: GET_USER_INFO,
    payload: userInfo,
  }
}

export const uploadQrcode = (url) => {
  return {
    type: UPLOAD_QRCODE,
    payload: url
  }
}

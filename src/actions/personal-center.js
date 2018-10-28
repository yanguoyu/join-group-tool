import {
  GET_USER_INFO,
  GET_QRCODE_TYPE,
  CHANGE_FORM_VALUE,
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
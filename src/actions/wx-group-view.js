import {
  GET_ALL_QRCODE,
} from '../constants/wx-group-view'
import AV from '../shared/av-weapp-min'

export const getAllQrcode = () => {
  const qrcodeQuery = new AV.Query('qrcode_info');
  return {
    type: GET_ALL_QRCODE,
    payload: qrcodeQuery.find()
  }
};

export const getQrcodeByCondition = ({ name }) => {
  const qrcodeQuery = new AV.Query('qrcode_info');
  qrcodeQuery.contains('name', name);
  return {
    type: GET_ALL_QRCODE,
    payload: qrcodeQuery.find()
  }
};

import {
  GET_ALL_QRCODE,
  GET_ALL_QRCODE_COUNT,
} from '../constants/wx-group-view'
import AV from '../shared/av-weapp-min'

export const getAllQrcode = (page=0) => {
  const qrcodeQuery = new AV.Query('qrcode_info');
  return {
    type: GET_ALL_QRCODE_COUNT,
    payload: qrcodeQuery.count(),
    handlers: {
      success: (res, dispatch) => {
        qrcodeQuery.limit(10);
        qrcodeQuery.skip(10 * page);
        dispatch({
          type: GET_ALL_QRCODE,
          payload: qrcodeQuery.find(),
          count: res
        })
      }
    }
  }
};

export const getQrcodeByCondition = ({ name, type, order, page=0 }) => {
  const qrcodeQuery = new AV.Query('qrcode_info');
  name && qrcodeQuery.contains('name', name);
  if(type && type !== 'ALL') {
    const groupType = AV.Object.createWithoutData('qrcode_type', type);
    qrcodeQuery.equalTo('type', groupType);
  }
  if(order && order !== 'ALL') {
    qrcodeQuery.descending('createdAt');
  }
  
  return {
    type: GET_ALL_QRCODE_COUNT,
    payload: qrcodeQuery.count(),
    handlers: {
      success: (res, dispatch) => {
        qrcodeQuery.limit(10);
        qrcodeQuery.skip(10 * page);
        dispatch({
          type: GET_ALL_QRCODE,
          payload: qrcodeQuery.find(),
          count: res
        })
      }
    }
  }
};

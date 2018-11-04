import {
  GET_ALL_QRCODE,
} from '../constants/wx-group-view';

export const getAllQrcode = ({ name, type, order, pageNo, pageSize, user } = {}) => {
  return {
    type: GET_ALL_QRCODE,
    payload: wx.cloud.callFunction({
      name: 'get-qrcodes',
      data: {
        name,
        type: type === 'ALL' ? undefined : type,
        order: order === 'ALL' ? undefined : order,
        pageNo,
        pageSize,
        user
      },
    })
  }
};

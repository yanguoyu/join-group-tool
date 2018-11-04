import {
  GET_ALL_QRCODE,
} from '../constants/wx-group-view';

export const getAllQrcode = ({ name, type = {}, order = {}, pageNo, pageSize, user } = {}) => {
  return {
    type: GET_ALL_QRCODE,
    payload: wx.cloud.callFunction({
      name: 'get-qrcodes',
      data: {
        name,
        type: type.value === 'ALL' ? undefined : type.value,
        order: order.value === 'ALL' ? undefined : order.value,
        pageNo,
        pageSize,
        user
      },
    })
  }
};

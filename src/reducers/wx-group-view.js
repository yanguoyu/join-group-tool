import { GET_ALL_QRCODE } from '../constants/wx-group-view'

export default {
  handlers: {
    [GET_ALL_QRCODE]: (state, { payload }) =>
      state.updateState('qrcodeInfo', payload),
  },
  initState: {
    qrcodeInfo: {}
  }
}
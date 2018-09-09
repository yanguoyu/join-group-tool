import { GET_USER_INFO, UPLOAD_QRCODE } from '../constants/personal-center'

export default {
  handlers: {
    [GET_USER_INFO]: (state, { payload }) => state.updateState('userInfo', payload),
    [UPLOAD_QRCODE]: (state, { payload }) => state.updateState('tempUrl', payload)
  }
}
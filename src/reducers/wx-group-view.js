import { GET_ALL_QRCODE } from '../constants/wx-group-view'

export default {
  handlers: {
    [GET_ALL_QRCODE]: (state, { payload }) =>
      state.updateState('qrcodeList', payload.map(res => ({
        name: res.get('name'),
        desc: res.get('desc'),
        image: res.get('image'),
        owner: res.get('owner')
      }))),
  }
}
import { 
  GET_USER_INFO,
  UPLOAD_QRCODE,
  GET_QRCODE_TYPE,
  CHANGE_FORM_VALUE,
 } from '../constants/personal-center'

export default {
  handlers: {
    [GET_USER_INFO]: (state, { payload }) => state.updateState('userInfo', payload),
    [UPLOAD_QRCODE]: (state, { payload }) => state.updateState('tempUrl', payload),
    [GET_QRCODE_TYPE]: (state, { payload }) => {
      const qrcodeTypes = payload.map(res => ({
        id: res.id,
        name: res.get('name'),
      }))
      return state
        .updateState('qrcodeTypes', qrcodeTypes)
        .updateInState(['formValues', 'qrcodeType'], qrcodeTypes[0]);
    },
    [CHANGE_FORM_VALUE]: (state, { payload }) =>
      state.updateState('formValues', (formValues) => ({...formValues, ...payload })),
  },
  initState: {
    qrcodeTypes: [],
    formValues: {}
  }
}
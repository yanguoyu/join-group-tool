import Taro from '@tarojs/taro'
import { 
  GET_USER_INFO,
  GET_QRCODE_TYPE,
  CHANGE_FORM_VALUE,
  UPLOAD_QRCODE,
  DELETE_QRCODE,
  GET_USE_QRCODES,
 } from '../constants/personal-center'

export default {
  handlers: {
    [GET_USER_INFO]: (state, { payload }) => state.updateState('userInfo', payload),
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
    [UPLOAD_QRCODE]: (state, { payload, meta }) => {
      Taro.showToast({
        title: '上传成功',
        icon: 'success',
        duration: 1000
      });
      setTimeout(() => Taro.navigateBack(), 1000);
      const index = state.userQrcodes.findIndex(item => item.id === payload.id);
      if(index === -1){
        return state.updateState('userQrcodes', userQrcodes => [...userQrcodes, {
          id: payload.id,
          ...meta,
        }]);
      }
      return state.updateInState(['userQrcodes',index], {
        id: payload.id,
        ...meta,
      });
    },
    [DELETE_QRCODE]: (state, { id }) => {
      Taro.showToast({
        title: '删除成功',
        image: '/assert/success.png',
        duration: 1000
      })
      const index = state.userQrcodes.findIndex(item => item.id === id);
      return state.updateState('userQrcodes', userQrcodes => {
        const res = [...userQrcodes];
        res.splice(index, 1);
        return res;
      });
    },
    [GET_USE_QRCODES]: (state, { payload }) =>
      state.updateState('userQrcodes', payload.map(value => ({
        name: value.get('name'),
        desc: value.get('desc'),
        image: value.get('image'),
        owner: value.get('owner'),
        id: value.id
    })))
  },
  initState: {
    qrcodeTypes: [],
    formValues: {},
    userQrcodes: []
  }
}
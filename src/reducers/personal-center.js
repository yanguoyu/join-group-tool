import Taro from '@tarojs/taro'
import { 
  GET_USER_INFO,
  GET_QRCODE_TYPE,
  CHANGE_FORM_VALUE,
  UPLOAD_QRCODE,
  DELETE_QRCODE,
  GET_USE_QRCODES,
  RESET_CUR_QRCODE_INFO,
  GET_CUR_QRCODE_INFO,
  GET_USER_OPEN_ID,
 } from '../constants/personal-center'

export default {
  handlers: {
    [GET_USER_INFO]: (state, { payload }) => state.updateState('userInfo', payload),
    [GET_QRCODE_TYPE]: (state, { payload }) =>
      state.updateState('qrcodeTypes', payload)
        .updateInState(['formValues', 'qrcodeType'], payload[0]),
    [CHANGE_FORM_VALUE]: (state, { payload }) =>
      state.updateState('formValues', (formValues) => ({...formValues, ...payload })),
    [UPLOAD_QRCODE]: (state, { payload, meta }) => {
      Taro.showToast({
        title: '上传成功',
        icon: 'success',
        duration: 1000
      });
      setTimeout(() => Taro.navigateBack(), 1000);
      if(payload._id){
        return state;
      }
      const index = state.userQrcodes.pageInfo.findIndex(item => item._id === meta._id);
      return state.updateInState(['userQrcodes','pageInfo', index], meta);
    },
    [DELETE_QRCODE]: (state) => {
      Taro.showToast({
        title: '删除成功',
        image: '/assert/success.png',
        duration: 1000
      })
      return state;
    },
    [GET_USE_QRCODES]: (state, { payload }) =>
      state.updateState('userQrcodes', payload),
    [RESET_CUR_QRCODE_INFO]: (state) =>
      state.updateState('curQrcodeInfo', {
        groupName: { value: '', error: false },
        groupDescribe: { value: '', error: false },
        groupOwner: { value: '', error: false },
        tempUrl: null,
        qrcodeTypeIndex: 0,
      }),
    [GET_CUR_QRCODE_INFO]: (state, { payload }) => {
      let typeInfo = payload.type;
      const qrcodeTypeIndex = state.qrcodeTypes.findIndex(item => item._id === typeInfo);
      return state.updateState('curQrcodeInfo', {
        groupName: { value: payload.name, error: false },
        groupDescribe: { value: payload.desc, error: false },
        groupOwner: { value: payload.owner, error: false },
        tempUrl: payload.image,
        qrcodeTypeIndex,
      })
    },
    [GET_USER_OPEN_ID]: (state, { payload }) =>
      state.updateState('userOpenId', payload)
  },
  initState: {
    qrcodeTypes: [],
    formValues: {},
    userQrcodes: {
      pageInfo: [],
    },
    curQrcodeInfo: {
      groupName: { error: false },
      groupDescribe: { error: false },
      groupOwner: { error: false },
      tempUrl: null,
      qrcodeTypeIndex: 0,
    }
  }
}
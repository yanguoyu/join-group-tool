import { GET_USER_INFO } from '../constants/personal-center'

export default {
  handlers: {
    [GET_USER_INFO]: (state, payload) => state.updateState('userInfo', payload)
  }
}
import { GET_HELP_INFO }  from '../constants/help';

export default {
  handlers: {
    [GET_HELP_INFO]: (state, { payload }) =>
      state.updateState('helpInfo', payload),
  },
  initState: {
    helpInfo: [],
  }
}
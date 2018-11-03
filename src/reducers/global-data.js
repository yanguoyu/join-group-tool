import { ADD_IN_PROMISE_COUNT, DEL_IN_PROMISE_COUNT, PROMISE_ERROR } from '../constants/global-data'

export default {
  handlers: {
    [ADD_IN_PROMISE_COUNT]: (state) =>
      state.updateState('inpromiseCount', count => count+1)
        .updateState('loading', true)
        .updateState('error', false),
    [DEL_IN_PROMISE_COUNT]: (state) =>
      state.updateState('inpromiseCount', count => count-1)
        .updateState('loading', state.inpromiseCount > 1),
    [PROMISE_ERROR]: (state) =>
      state.updateState('error', true)
  },
  initState: {
    inpromiseCount: 0,
    error: false,
    loading: false
  }
}
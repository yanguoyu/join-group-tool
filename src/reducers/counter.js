import { ADD, MINUS } from '../constants/counter' 

export default {
  handlers: {
    [ADD]: (state) => state.updateState('num', num => (num + 1)),
    [MINUS]: (state) => state.updateState('num', num => (num - 1)),
  },
  initState: {
    num: 0
  }
}

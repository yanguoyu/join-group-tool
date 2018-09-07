import { combineReducers } from 'redux'
import reducerHelp from './reducer-helper'
import counter from './counter'
import personalCenter from './personal-center';

export default combineReducers({
  counter: reducerHelp(counter),
  personalCenter: reducerHelp(personalCenter),
})

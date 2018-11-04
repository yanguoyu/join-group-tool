import { combineReducers } from 'redux'
import reducerHelp from './reducer-helper'
import personalCenter from './personal-center';
import wxGroupView from './wx-group-view';
import globalData from './global-data';
import help from './help';

export default combineReducers({
  personalCenter: reducerHelp(personalCenter),
  wxGroupView: reducerHelp(wxGroupView),
  globalData: reducerHelp(globalData),
  help: reducerHelp(help),
})

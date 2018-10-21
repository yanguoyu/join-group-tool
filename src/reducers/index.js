import { combineReducers } from 'redux'
import reducerHelp from './reducer-helper'
import personalCenter from './personal-center';
import wxGroupView from './wx-group-view';

export default combineReducers({
  personalCenter: reducerHelp(personalCenter),
  wxGroupView: reducerHelp(wxGroupView),
})

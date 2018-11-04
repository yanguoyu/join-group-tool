import { GET_HELP_INFO } from '../constants/help';

export const getHelpInfo = () => ({
  type: GET_HELP_INFO,
  payload: wx.cloud.callFunction({
    name: 'get-help-info',
  })
});

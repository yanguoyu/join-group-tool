import {
  GET_USER_INFO,
} from '../constants/personal-center'

export const getUserInfo = () => {
  return {
    type: GET_USER_INFO
  }
}

// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(getUserInfo())
    }, 2000)
  }
}

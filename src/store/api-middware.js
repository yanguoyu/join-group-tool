import isPromise from './is-promise';

export default () => next => action => {
  if(isPromise(action.payload)) {
    action.payload.then(res => {
      next({
        ...action,
        payload: res
      })
    }).catch(err=> {
      console.log(err);
    })
  } else {
    next(action);
  }
}
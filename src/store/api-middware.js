import isPromise from './is-promise';
import { addInPromiseCount, delInPromiseCount, promiseError }  from '../actions/global-data';

export default ({ dispatch, getState }) => next => action => {
  if(isPromise(action.payload)) {
    !action.ignoreLoading && dispatch(addInPromiseCount(action.type));
    action.payload.then(res => {
      next({
        ...action,
        payload: res.result
      })
      !action.ignoreLoading && dispatch(delInPromiseCount(action.type));
      if(action.handlers) {
        action.handlers.success && action.handlers.success(res.result, dispatch, getState());
        action.handlers.finish && action.handlers.finish(res.result, dispatch, getState());
      }
    }).catch(err=> {
      !action.ignoreLoading && dispatch(delInPromiseCount(action.type));
      !action.ignoreLoading && dispatch(promiseError(action.type));
      console.log(err);
      if(action.handlers) {
        action.handlers.failed && action.handlers.failed(err, dispatch, getState());
        action.handlers.finish && action.handlers.finish(err, dispatch, getState());
      }
    })
  } else {
    next(action);
  }
}
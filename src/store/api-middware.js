import isPromise from './is-promise';

export default store => next => action => {
  if(isPromise(action.payload)) {
    action.payload.then(res => {
      next({
        ...action,
        payload: res.result
      })
      if(action.handlers) {
        action.handlers.success && action.handlers.success(res.result, store.dispatch, store.getState());
        action.handlers.finish && action.handlers.finish(res.result, store.dispatch, store.getState());
      }
    }).catch(err=> {
      console.log(err);
      if(action.handlers) {
        action.handlers.failed && action.handlers.failed(err, store.dispatch, store.getState());
        action.handlers.finish && action.handlers.finish(err, store.dispatch, store.getState());
      }
    })
  } else {
    next(action);
  }
}
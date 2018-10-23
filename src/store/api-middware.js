import isPromise from './is-promise';

export default store => next => action => {
  if(isPromise(action.payload)) {
    action.payload.then(res => {
      next({
        ...action,
        payload: res
      })
      if(action.handlers) {
        action.handlers.success && action.handlers.success(res, store.dispatch, store.getState());
        action.handlers.finish && action.handlers.finish(res, store.dispatch, store.getState());
      }
    }).catch(err=> {
      console.log(err);
      action.handlers.failed && action.handlers.failed(err, store.dispatch, store.getState());
      action.handlers.finish && action.handlers.finish(err, store.dispatch, store.getState());
    })
  } else {
    next(action);
  }
}
import {
    ADD_IN_PROMISE_COUNT,
    DEL_IN_PROMISE_COUNT,
    PROMISE_ERROR
} from '../constants/global-data';
  
export const addInPromiseCount = (originActionType) => ({
    type: ADD_IN_PROMISE_COUNT,
    payload: originActionType
});

export const delInPromiseCount = (originActionType) => ({
    type: DEL_IN_PROMISE_COUNT,
    payload: originActionType
});

export const promiseError = (originActionType) => ({
    type: PROMISE_ERROR,
    payload: originActionType
});
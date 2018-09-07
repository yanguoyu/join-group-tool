export default ({ handlers = {}, initState = {} }) => {
  return (state = initState, action) => {
    if(!action || !action.type) {
      return state;
    }
    const { type, ...others } = action;
    const reducer = handlers[type];
    if(!reducer) {
      return state;
    }
    if(typeof reducer !== 'function') {
      throw new Error('reducer must be a function');
    }
    return reducer(state, others);
  }
}
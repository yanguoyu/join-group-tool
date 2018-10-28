function isFunction(value) {
  return typeof value === 'function';
}

export default function() {
  Object.defineProperty(Object.prototype, 'updateState', {
    value: function(key, value) {
      if (Array.isArray(this)) {
        const res = [...this];
        res[key] = isFunction(value) ? value(this[key]) : value;
        return res;
      }
      return {
        ...this,
        [key]: isFunction(value) ? value(this[key]) : value,
      };
    },
    enumerable: false,
  });
  
  Object.defineProperty(Object.prototype, 'updateInState', {
    value: function(keys, value) {
      if (!Array.isArray(keys)) {
        throw (new Error('Object updateInState first arguments should be array'));
      }
      const firkey = keys[0];
      if (keys.length === 1) {
        return this.updateState(firkey, value);
      }
      keys.shift();
      return this.updateState(firkey,
        function(curValue) {
          return (curValue || {}).updateInState(keys, value);
        });
    },
    enumerable: false,
  });  
}

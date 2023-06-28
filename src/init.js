let m = (function() {
  let fieldObj = {}

  function ensureFieldItem(key) {
    if (!fieldObj[key]) {
      fieldObj[key] = {
        rules: []
      }
    }
  }

  function getType(initValue) {
    if (initValue.constructor) {
      return initValue.name
    }

    let str = Object.prototype.toString.call(initValue);
    return str.replace('[','').replace(']', '').split(' ')[1]
  }

  function required(message = '') {
    return function(target, name,  ...args) {
      // console.log(target,  name);
      // console.log('required', name);

      ensureFieldItem(name)
      fieldObj[name].rules.push({
        required: true,
        errorMessage: message ?? `${name}不能为空`
      })
    }
  }

  function  field(initValue, { ins = '' } = {}) {
    // fieldObj[name] = {
    //   rules: []
    // }
    return function(target, name) {
      ensureFieldItem(name)
      console.log(name, initValue, getType(initValue), ins);
    }
  }


  function register() {
    console.log('@register');
  }

  return {
    required, field, fieldObj
  }
})();

function register(target) {
  target.__IS_GOOD__ = true
  console.log('register', target);
}





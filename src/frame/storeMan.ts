let storeMap = new Map();
function buildStore(name, cls) {
  let def = {
    state() {},
    getters: {},
    actions: {}
  }
  let stateKeys = Object.keys(cls.state ?? {})
  // console.log(cls.state);
  def.state = () => {
    return cls.state
  }
  def.getters = cls.getters ?? {}
  def.actions = cls.actions ?? {}
  let useStore = defineStore(name, def)
  let getterKeys = Object.keys(cls.getters ?? {})
  let actionKeys = Object.keys(cls.actions ?? {})
  return {
    useStore,
    stateKeys,
    getterKeys,
    actionKeys
  }
}

export function createStore(cls: Class) {
  let obj = new cls()
  let keys = Reflect.ownKeys(obj)
  let ret = {
    getters: {},
    actions: {},
    state: {}
  }

  keys.forEach(key => {
    ret.state[key] = obj[key]
  })

  // console.log(ret.state);

  let p = Object.getOwnPropertyDescriptors(cls.prototype);
  Object.entries(p).forEach(([key, item]) => {
    if (key !== 'constructor') {
      if (typeof item.set === 'undefined' && item.get) {
        ret.getters[key] = function (state) {
          return item.get.bind(state)()
        }
      }
      if (typeof item.value === 'function') {
        ret.actions[key] = item.value
      }
    }
  })

  return buildStore(cls.name, ret)
}

export function injectStore(name) {
  return function(target) {
    target.__IS_STORE__ = true
    storeMap.set(name, createStore(target))
    console.log(target, storeMap);
  }
  // target.annotated = true;
}

export function getStore(key) {
  let ins =  storeMap.get(key);
  if (ins) {
    return ins.useStore()
  }
}

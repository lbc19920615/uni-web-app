import { cloneClass } from "clone-class";

const storePrefix = "zy_";

let storeMap = new Map();


let partialMap = new Map();



export function getStoreMap() {
  return storeMap
}
function buildStore(name, cls) {
  let def:any = {
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

let currentNeedCacheKeys = []
export function useCache({} ={}) {
  // console.log('ffff');
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // console.log(target, propertyKey, descriptor);
    currentNeedCacheKeys.push(propertyKey)
  }
}

type RetObjType = {
  getters: {},
  actions: {},
  state: {}
}

declare type PartialDef = string | { cachedKeys: [string], handleKey: () => string  }

function scanCls(ret: RetObjType, cls: Class, cache = {}, {handleKey = null, needCacheKeys = [], isMainCls = false} ={}) {
  let obj = new cls()
  let keys = Reflect.ownKeys(obj)
  let parentKeys = []

  // if (Reflect.getPrototypeOf(cls)) {
  //   parentKeys = Reflect.ownKeys(Reflect.getPrototypeOf(cls))
  // }

  // if (isMainCls) {
  //   parentKeys = Object.keys(ret.state)
  // }

  // console.log('parentKeys', parentKeys);


  if (!handleKey) {
    handleKey = function(key) { return key }
  }
  // console.log('sssssssssssss', parentKeys);
  keys.forEach(key => {
    if (!parentKeys.includes(key)) {
      let parsedKey = handleKey(key)
      ret.state[parsedKey] = obj[key]
      if (needCacheKeys.includes(parsedKey) && typeof cache[parsedKey] !== 'undefined') {
        ret.state[parsedKey] = cache[parsedKey]
      }
    }
  })

  // console.log(ret.state);

  let p = Object.getOwnPropertyDescriptors(cls.prototype);
  Object.entries(p).forEach(([key, item]) => {
    if (key !== 'constructor') {
      let parsedKey = handleKey(key)
      if (typeof item.set === 'undefined' && item.get) {
        ret.getters[parsedKey] = function (state) {
          return item.get.bind(state)()
        }
      }
      if (typeof item.value === 'function') {
        ret.actions[parsedKey] = item.value
      }
    }
  })

  // if (cls.name === 'cart_default') {
  //   console.dir(obj);
  // }
}

export function createStore(cls: Class, name = '', currentNeedCacheKeys = [], {partials = []} = {}) {
  let cache = uni.getStorageSync(storePrefix + name) ?? {}
  let ret = {
    getters: {},
    actions: {},
    state: {}
  }

  if (Array.isArray(partials)) {
    partials.forEach((partial: PartialDef) => {
      let handleKey;
      let cachedCls;
      if (typeof partial === 'string') {
        cachedCls = partialMap.get(partial)
      }
      if (Array.isArray(partial)) {
        cachedCls = partialMap.get(partial[0])
        if (partial[1]) {
          if (partial[1].handleKey) {
            handleKey = partial[1].handleKey
          }
          if (partial[1].cachedKeys) {
            currentNeedCacheKeys = currentNeedCacheKeys.concat(partial[1].cachedKeys)
          }
        }
      }

      if (cachedCls) {
        scanCls(ret, cachedCls, cache, {handleKey: handleKey, needCacheKeys: currentNeedCacheKeys})
      }
    })
  }

  // console.log(currentNeedCacheKeys);
  scanCls(ret, cls, cache, {needCacheKeys: currentNeedCacheKeys, isMainCls: true})


  let res: any = buildStore(cls.name, ret)
  // @ts-ignore
  res.__STORE_NAME__ = name
  res.__NeedCacheKeys__= currentNeedCacheKeys
  return res;
}

export function injectStore(name, {partials = []} = {}) {
  // console.log('sssss', currentNeedCacheKeys);
  return function(target) {
    target.__IS_STORE__ = true
    target.__STORE_NAME__ = name
    target.__NeedCacheKeys__= currentNeedCacheKeys
    storeMap.set(name, createStore(target,  name, currentNeedCacheKeys,{partials}))

    currentNeedCacheKeys = []
    // console.log(target, storeMap);
  }
  // target.annotated = true;
}

export function getStore(key) {
  let ins =  storeMap.get(key);
  if (ins) {
    let ret = ins.useStore()
    ret.__STORE_NAME__ = ins.__STORE_NAME__
    return {
      STORE_NAME: ins.__STORE_NAME__,
      ins: ret,
      refs: storeToRefs(ret)
    };
  }
}


export function cacheStore(storeIns, { handleCache, key }: any ={}) {
  let ins =  storeMap.get(key ?? storeIns.__STORE_NAME__);
  let keyName = storePrefix + ins.__STORE_NAME__
  let val = uni.getStorageSync(keyName)
  let cache = typeof val != 'object' ? {} : val
  // console.log(cache);

  let cacheObj = {}
  let __NeedCacheKeys__ = ins.__NeedCacheKeys__

  __NeedCacheKeys__.forEach(key => {
    let value = unref(storeIns[key])
    if (typeof value !== 'undefined') {
      cacheObj[key] = unref(storeIns[key])
    }
  })

  let newCache = {...cache, ...cacheObj}
  if (handleCache) {
    handleCache(newCache)
  }

  uni.setStorageSync(keyName, newCache)

  // console.log(ins, cache, cacheObj);
}

export function clearStoreCache(storeIns,  { handleCache, key }: any ={}) {
  let ins =  storeMap.get(key ?? storeIns.__STORE_NAME__);
  let keyName = storePrefix + ins.__STORE_NAME__
  uni.removeStorageSync(keyName)
}

export function partialStore(name) {
  return function(target) {
    partialMap.set(name, target)
  }
}

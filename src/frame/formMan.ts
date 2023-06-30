import { deepClone } from "@/utils/clone";
import { UnwrapNestedRefs } from "@vue/reactivity";

let currentDef = {}
let cacheDefs = {}

// console.log(cacheDefs);

function commonFormat(formatType, value: any) {
  if (formatType === 'number') {
    return parseFloat(value)
  }
  else {
    return value
  }
}

export let Utils = {
  commonFormat
}

export function validateFunction(fun: Function, {} ={}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    currentDef[propertyKey].rules.push({
      validateFunction: fun
    })
  }
}


export function format(type = '', {} ={}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    currentDef[propertyKey].rules.push({
      format: type,
      errorMessage: `${currentDef[propertyKey].label}项应该为${type}类型`
    })
    currentDef[propertyKey].formatType = type
  }
}

export function isArray({itemType = '', min = 0} = {}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    currentDef[propertyKey].rules.push({
      validateFunction:function(rule,value,data,callback){
        if (value.length < min) {
          callback(`${currentDef[propertyKey].label}至少${min}个`)
        }
        return true
      }
    })
  }
}

export function field(label = '', {dynamic = false} ={}) {
  // console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // console.log("first(): called", currentDef);
    currentDef[propertyKey] = {
      rules: [],
      label: label ?? propertyKey,
      initValue: descriptor.get()
    }
    if (dynamic) {
      currentDef[propertyKey].vmType = 'arrayVmTpl'
      // currentDef[propertyKey].vm.add()
    }
  };
}

export function required() {
  // console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    currentDef[propertyKey].rules.push({
      'required': true,
      errorMessage: `${currentDef[propertyKey].label}项必填`
    })
  };
}

type MixinConfig = String | [String, any]

/**
 *
 * class VeryBase {
 *   static {
 *     defineSimpleForm('VeryBase', this);
 *     // console.log('sdsdsd', this.FORM_NAME);
 *   }
 *   @required()
 *   @field('sssss')
 *   get name1() {
 *     return ''
 *   }
 * }
 *
 * class VeryBase2 {
 *   static {
 *     defineSimpleForm('VeryBase2', this);
 *     // console.log('sdsdsd', this.FORM_NAME);
 *   }
 *   @required()
 *   @field('sssss')
 *   get name2() {
 *     return ''
 *   }
 * }
 *
 * export class UserDef {
 *   static {
 *     defineSimpleForm('UserDef', this, {
 *       mixins: [
 *         'VeryBase',
 *         'VeryBase2'
 *       ]
 *     });
 *   }
 *   @required()
 *   @field('密码')
 *   get password() {
 *     return ''
 *   }
 * }
 *
 * @param name 暂存key
 * @param target 目标类
 * @param mixins 混合使用
 */
export function defineSimpleForm(name, target: any, { mixins= [] } = {}) {
  // console.log('entry', name, context);
  if (cacheDefs[name]) {
    return
  }
  cacheDefs[name] = {}
  let proto: any = Reflect.getPrototypeOf(target)
  if (proto.__formName__) {
    let base = deepClone(cacheDefs[proto.__formName__])
    // console.log(base);
    cacheDefs[name] = {...base, ...cacheDefs[name]}
  }

  if (Array.isArray(mixins)) {
    mixins.forEach((mixinConfig: any) => {
        if (typeof mixinConfig === 'string') {
          if (cacheDefs[mixinConfig]) {
            let base = deepClone(cacheDefs[mixinConfig])
            // console.log(base);
            cacheDefs[name] = {...base, ...cacheDefs[name]}
          }
        }
        if (Array.isArray(mixinConfig)) {
          let base = deepClone(cacheDefs[mixinConfig[0]])
          if (mixinConfig[1] && mixinConfig[1].transform) {
            base = mixinConfig[1].transform(base)
          }
          cacheDefs[name] = {...base, ...cacheDefs[name]}
        }
    })
  }

  currentDef = cacheDefs[name]

  // target.FORM_NAME = name
  target.__formName__ = name
  return currentDef
}

interface RuleOption {
  rules: Array<any>,
  label: String,
  vmType: String | undefined,
  initValue: any
}

interface SimpleFormInf extends Record<any, any>{
  rules: Record<any, any>
  formData: UnwrapNestedRefs<Object>
  vmMap: Record<any, any>
  getFormData(): Record<any, any>
  reset(): Void<any>
  setFormData(data:Record<any, any>)
}

export function useSimpleForm(name) {

  let record:Record<any, any> = {}
  let obj: SimpleFormInf = {
    rules: {},
    formData: reactive(record),
    vmMap: {},
    // @ts-ignore
    getFormData(){},
    reset(){},
    setFormData(){}
  }

  let defs = deepClone(cacheDefs[name])

  Object.entries(defs).forEach(([key, def]: [string, RuleOption]) => {
    if (def?.vmType === 'arrayVmTpl') {
      obj.vmMap[key] = (function() {
        let list = reactive([])

        function funAdd() {
          let obj: Record<any, any> = {
            label:  def.label,
            rules:  def.rules
          }
          obj.id = Date.now()
          list.push(obj)
        }

        function funDel(id, afterCb: Function) {
          let index = list.findIndex(v => v.id === id)
          list.splice(index, 1);
          if (afterCb) {
            afterCb()
          }
        }

        return {
          list,
          funAdd,
          funDel,
        }
      })();
    }
  })

  obj.rules = defs

  obj.reset = function() {
    Object.entries(defs).forEach(([key, def]: [string, RuleOption]) => {
      obj.formData[key] = def.initValue;
    })
  }

  /**
   * 获取
   */
  obj.getFormData = function() {
    // @ts-ignore
    let formData = deepClone(unref(obj.formData))
    Object.entries(formData).forEach(([key, item]: [string, any]) => {
        let formatType = defs[key].formatType
        formData[key] = commonFormat(formatType, formData[key])
    })
    return formData
  }

  /**
   * 设置
   * @param data
   */
  obj.setFormData = function(data) {
    Object.entries(data).forEach(([key, item]: [string, any]) => {
      let formatType = defs[key].formatType
      // console.log(obj.formData);
      obj.formData[key] = commonFormat(formatType, data[key])
    })
  }

  obj.reset()
  return obj
}

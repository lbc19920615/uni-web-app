<template>
<view __eid__="id__ztw8n6"  class="">{{vm.price}}
<button  type="" open-type="" class="" @click="vm.openPopup()">+</button>
</view>
<uni-popup  ref="popup" background-color="#fff" style="z-index:20000" class=""><view __eid__="id__fcg7j4"  class="pb-150">
<image  src="" class="w-full"></image>
<view __eid__="id__hfaqrp"  class="">{{def.formData}}</view>
  <uni-forms  ref="form" form="def" :rules="def.rules" :modelValue="def.formData" class="">
    
  <uni-forms-item :label="def.optMap.name.label" name="name">
    <uni-data-checkbox v-model="def.formData.name" :localdata="vm.hobby"/>
  </uni-forms-item>
  
  <uni-forms-item :label="def.optMap.age.label" name="age">
    <uni-data-checkbox v-model="def.formData.age" :localdata="vm.tiandu"/>
  </uni-forms-item>
  
  <uni-forms-item :label="def.optMap.some.label" name="some">
    <uni-data-checkbox multiple v-model="def.formData.some" :localdata="vm.xiaoliao"/>
  </uni-forms-item>
  
  </uni-forms>
  <view __eid__="id__5kjjtw"  class="">
<button  type="" open-type="" class="" @click="vm.submit()">提交</button>
</view></view></uni-popup>

</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue} from "@/frame/app";
import { getCurPageOptions } from "@/utils/uni"


import { initModelContext, injectControl } from "@/frame/model";
let appContext = initModelContext('com-skuCalc');
let $control = new Proxy(appContext, {
  get(proxyObj, name) {
    // console.log(proxyObj, name);
    return proxyObj.getControl(name)
  }
})



const $app = getApp();
const $CurrentInstance = getCurrentInstance();
let $page = $CurrentInstance.proxy;
function $sel(name) {
  return $page.$refs[name]
}


function $callCom(refName, method, args = []) {
  let methodArr = method.split('.')
  return $sel(refName)?.run(methodArr[0], methodArr.slice(1).join('.'), args);
}

function submitForm(ref = '') {
  $page.$refs[ref].validate().then(res => {
    uni.showToast({
      title: '校验通过'
    })
    console.log(res);
  }).catch(err => {
    console.log('err', err);
  })
}

defineExpose({
  run(vmName, methodName, args = [])  {
    // console.log('ssss', vmName, methodName);
   if ($control[vmName]) {
    if ($control[vmName][methodName]) {
       let ret = $control[vmName][methodName](...args);

       return ret;
     }
   }
  }
})




        ;
let def = $frame.f.createFormContext('def', function({ context, field, required, isArray, format, validateFunction }) {
  context.init([
  ])

  class InnerCls {
  @required()
  @field('温度')
  get name() {
    return '冰的'
  }
  
  @required()
  @field('甜度')
  get age() {
    return '5分甜'
  }

  @field('小料')
  get some() {
    return []
  }
}

  return InnerCls
})
  
        ;@injectControl('vm')
class Some1 {
  price = 0
  hobby = [
    {
      text: '冰的',
      value: '冰的'
    },
    {
      text: '温的',
      value: '温的'
    },
    {
      text: '热的',
      value: '热的'
    },
  ]
  tiandu = [
    {
      text: '不额外加糖',
      value: '不额外加糖'
    },
    {
      text: '5分甜',
      value: '5分甜'
    },
    {
      text: '10分甜',
      value: '10分甜'
    },
  ]
  xiaoliao = [
    {
      text: '布丁',
      value: '布丁:200'
    },
    {
      text: '奶盖',
      value: '奶盖:200'
    },
    {
      text: '珍珠',
      value: '珍珠:200'
    },
  ]
  add() {
  }
  openPopup() {
    // $callCom('popup', 'open', ['bottom'])
    $sel('popup').open('bottom')
  }
  submit() {
    console.log(1111)
    $page.$emit('sku-calc-submit', def.getFormData())
    def.reset()
    $sel('popup').close()
  }
}

let vm = $control['vm'];

defineEmits(['sku-calc-submit'])
        
  let $pageFormConfig = {};

    
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

export default {
  name: 'com-sku-calc',
  props: {
  }
}  

</script>

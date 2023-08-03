<template>
<view __eid__="id__ztw8n6"  class="">
<button  @click="vm.openPopup()">+</button>
</view>
<uni-popup  ref="popup" background-color="#fff" style="z-index:20000"><view __eid__="id__fcg7j4"  class="pb-150">
<image  src="/static/test.jpeg" class="w-full"></image>
<view __eid__="id__hfaqrp"  class="mb-10">商品介绍</view>
  <uni-forms  ref="form" form="def" :rules="def.rules" :modelValue="def.formData" class="">
    
<uni-forms-item :label="def.optMap.name.label" name="name">
  <dym-input widgetType="radio" 
  :widgetConfig="{
  localdata: vm.hobby
}" 
  :placeholder="'请输入' + def.optMap.name.label"
  v-model="def.formData.name" form="form" ></dym-input>
</uni-forms-item>
  
<uni-forms-item :label="def.optMap.age.label" name="age">
  <dym-input widgetType="radio" 
  :widgetConfig="{
  localdata: vm.tiandu
}" 
  :placeholder="'请输入' + def.optMap.age.label"
  v-model="def.formData.age" form="form" ></dym-input>
</uni-forms-item>
  
<uni-forms-item :label="def.optMap.some.label" name="some">
  <dym-input widgetType="multiCheckbox" 
  :widgetConfig="{
  localdata: vm.xiaoliao
}" 
  :placeholder="'请输入' + def.optMap.some.label"
  v-model="def.formData.some" form="form" ></dym-input>
</uni-forms-item>
  
  </uni-forms>
  <view __eid__="id__5kjjtw"  class="">
<button  @click="vm.submit()">提交</button>
</view></view></uni-popup>

</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue} from "@/frame/app";


import { z, ZodError } from "zod"
import { initModelContext, injectControl, creteProxyControl, BaseVmControl } from "@/frame/model";
import { PageMethod } from "@/frame/page";
let appContext = initModelContext('com-skuCalc');
let $control = creteProxyControl(appContext)
import * as $glo from '@/glo'

function isDefined(v) {
  return typeof v !== 'undefined'
}


const $app = getApp();
const $CurrentInstance = getCurrentInstance();
let $page = $CurrentInstance.proxy;
let c = new PageMethod($CurrentInstance)
let {$sel, $submitForm, $callCom } = c.getMethods()


let submitForm = $submitForm


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

  @isArray({ max: 2 })
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
  openPopup() {
    // $callCom('popup', 'open', ['bottom'])
    $sel('popup').open('bottom')
  }
  submit() {
submitForm('form').then(() => {

      $page.$emit('sku-calc-submit', def.getFormData())
    def.reset()
    $sel('popup').close()
})
    
  }
}

let vm = $control['vm'];
        
  let $pageFormConfig = {};

    
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

export default {
  name: 'com-sku-calc',
  props: {
  },
  emits: [
    'sku-calc-submit'
  ]
}  

</script>

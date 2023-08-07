<template>
<view __eid__="id__qg3nqu"  class="p-20">
<view  class="dis-flex"><view __eid__="id__cxvlwo"  class="" @click="vm.setFirst()">选择起点</view><view __eid__="id__3ho90l"  class="flex-1 text-center">view</view><view __eid__="id__bvpgx3"  class="" @click="vm.setLast()">选择终点</view></view>
</view>
</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue, $filterArr, $deepClone, $nid} from "@/frame/app";


import { z, ZodError } from "zod"
import { initModelContext, injectControl, creteProxyControl, BaseVmControl } from "@/frame/model";
import { PageMethod } from "@/frame/page";
let appContext = initModelContext('com-selAddr');
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
        ;let baseCom = $glo.createBaseCom($page)

@injectControl('vm')
class Some extends baseCom.cls {
  value = []
  setFirst() {
    baseCom.isLocked = true
    this.value[0] = $nid()
    this.onChange()
  }
  setLast() {
    baseCom.isLocked = true
    this.value[1] = $nid()
    this.onChange()
  }
  init(newVal) {
    console.log(newVal)
    let cacheVal = $deepClone(newVal)
    this.value[0] = cacheVal[0]
    this.value[1] = cacheVal[1]
  }
}  

let vm = $control['vm'];

let props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return []
    }
  }
})

watch(() => props.modelValue, (newVal) => {
  if (baseCom.isLocked) {
    return
  }
  vm.init(newVal)
});


onLoad(() => {
  vm.init(props.modelValue)
})      
      
        
  let $pageFormConfig = {};

    
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

export default {
  name: 'ComSelAddr',
  emits: [
    'update:modelValue'
  ],
  watch: {
    
  }
}
  

</script>

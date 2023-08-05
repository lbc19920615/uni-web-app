<template>

<da-tree  :field="{ label: 'name', key: 'id' }" :data="vm.items" style="background-color:rgba(241, 241, 241, 1);--da-tree-item-mb:30rpx" class="h-full pt-20 pb-20 box-border" defaultExpandAll>

<template  v-slot:label="scope"><view __eid__="id__sxew7h"  style="" class="height-230 pl-20 pr-20"><view __eid__="id__sy1v9n"  style="background-color:rgba(255, 255, 255, 1)" class="h-full bdrs-10 p-20 box-border"><view __eid__="id__f6fe8o"  class="">{{scope.item.originItem}}</view><view __eid__="id__quotwd"  class="height-80">image list</view><view __eid__="id__vnpoxq"  class="">detail</view><view __eid__="id__jvg2oc"  class="">action</view></view></view></template>

</da-tree>

</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue} from "@/frame/app";


import { z, ZodError } from "zod"
import { initModelContext, injectControl, creteProxyControl, BaseVmControl } from "@/frame/model";
import { PageMethod } from "@/frame/page";
let appContext = initModelContext('com-gen');
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
        ;@injectControl('vm')
class Some1 {
  config = 1
  dialogVisible = false
  isOk = false
  items = []
  add() {
    let items = $mock({ name: String }).items
    items.forEach(v => {
      this.items.push(v)
    })
  }
  build() {
    return $mock({ name: String })
  }
}

let vm = $control['vm'];

// console.log(vm.build())
        
  let $pageFormConfig = {};

    
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

export default {
  name: 'com-gen',
  props: {
    test: {
      type: String
    }
  }
}  

</script>

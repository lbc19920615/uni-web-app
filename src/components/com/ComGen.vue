<template>

<da-tree  :field="{ label: 'name', key: 'id' }" :data="vm.items" style="background-color:rgba(241, 241, 241, 1);--da-tree-item-mb:30rpx" class="h-full pt-20 pb-20 box-border" defaultExpandAll>

<template  v-slot:label="scope" class=""><view __eid__="id__sxew7h"  style="" class="height-230 pl-20 pr-20"><view __eid__="id__sy1v9n"  style="background-color:rgba(255, 255, 255, 1)" class="h-full bdrs-10 p-20 box-border"><view __eid__="id__f6fe8o"  class="">{{scope.item.originItem}}</view><view __eid__="id__quotwd"  class="height-80">image list</view><view __eid__="id__vnpoxq"  class="">detail</view><view __eid__="id__jvg2oc"  class="">action</view></view></view><view __eid__="__context" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view><view __eid__="parentKey" ></view><view __eid__="parentContent" ><view __eid__="0" ></view><view __eid__="1" ></view></view></view><view __eid__="__originContext" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view></view></template>
<view __eid__="__context" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view></view><view __eid__="__originContext" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view></view>
</da-tree>
<button __eid__="id__zopstj"  style="" class="" @click="vm.add">添加</button>
</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue} from "@/frame/app";
import { getCurPageOptions } from "@/utils/uni"


import { initModelContext, injectControl } from "@/frame/model";
let appContext = initModelContext('com-gen');
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

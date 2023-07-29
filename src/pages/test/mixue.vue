<template>

<page-wrapper-detail>
<view __eid__="id__vf7jtt"  style="--zx-tab-nav-height:100rpx" class="h-full">
<ZxTab  v-model="state.tabIndex" :tabValue="state.tabs" style="" class="">
<template  v-slot:before="scope" class=""><view __eid__="id__hfctm1"  class=""></view><view __eid__="__context" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view><view __eid__="parentKey" ></view><view __eid__="parentContent" ><view __eid__="0" ></view><view __eid__="1" ></view></view></view><view __eid__="__originContext" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view></view></template>
<view __eid__="__context" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view><view __eid__="parentKey" ></view><view __eid__="parentContent" ></view></view><view __eid__="__originContext" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view></view></ZxTab>

<swiper  :current="state.tabIndex" @change="state.onSwiperChane" style="height:calc(100% - var(--zx-tab-nav-height))" class="">
<swiper-item  class="">
<ComGen  ref="list1" class=""><view __eid__="__context" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view><view __eid__="parentKey" ></view><view __eid__="parentContent" ><view __eid__="0" ></view><view __eid__="1" ></view></view></view><view __eid__="__originContext" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view></view></ComGen>
<view __eid__="__context" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view><view __eid__="parentKey" ></view><view __eid__="parentContent" ><view __eid__="0" ></view><view __eid__="1" ></view></view></view><view __eid__="__originContext" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view></view></swiper-item>

<swiper-item  some="" class="">
<ComGen  test="" ref="list2" class=""><view __eid__="__context" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view><view __eid__="parentKey" ></view><view __eid__="parentContent" ><view __eid__="0" ></view><view __eid__="1" ></view></view></view><view __eid__="__originContext" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view></view></ComGen>
<view __eid__="__context" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view><view __eid__="parentKey" ></view><view __eid__="parentContent" ><view __eid__="0" ></view><view __eid__="1" ></view></view></view><view __eid__="__originContext" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view></view></swiper-item>

<swiper-item  some="" class="">
<ComGen  test="" ref="list3" class=""><view __eid__="__context" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view><view __eid__="parentKey" ></view><view __eid__="parentContent" ><view __eid__="0" ></view><view __eid__="1" ></view></view></view><view __eid__="__originContext" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view></view></ComGen>
<view __eid__="__context" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view><view __eid__="parentKey" ></view><view __eid__="parentContent" ><view __eid__="0" ></view><view __eid__="1" ></view></view></view><view __eid__="__originContext" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view></view></swiper-item>
<view __eid__="__context" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view><view __eid__="parentKey" ></view><view __eid__="parentContent" ></view></view><view __eid__="__originContext" ><view __eid__="str" ></view><view __eid__="scss" ></view><view __eid__="config" ></view></view></swiper>
</view>
</page-wrapper-detail>
  
</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue} from "@/frame/app";
import { getCurPageOptions } from "@/utils/uni"


import { initModelContext, injectControl } from "@/frame/model";
let appContext = initModelContext('test-mixue');
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
  return $sel(refName)?.run(methodArr[0], methodArr.slice(1), args);
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




        ;
let {ins: state} = $getStore('TestMixue_state');
  
        ;@injectControl('some')
class Some1 {
  config = 1
  dialogVisible = false
  isOk = false
  get some() {
    return this.config
  }
  dom() {
    this.config = 22
  }
}

let vm = $control['some']


setTimeout(() => {
  $callCom('list1', 'vm.add');
  $callCom('list2', 'vm.add'); 
  $callCom('list3', 'vm.add'); 
}, 300)
        
  let $pageFormConfig = {};

    
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

</script>

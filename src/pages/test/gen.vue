<template>

<page-wrapper-detail>
<scroll-view __eid__="id111"  scroll-y="true" class="h-full">
<video  src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4" :autoplay="false" class="w-full display-block"></video>
<view __eid__="id__ojst8a"  class="" style="color:rgba(242, 244, 245, 1);background-color:rgba(37, 142, 228, 1)">测试1</view><view __eid__="id1212"  class="overflow-hidden height-150"><view __eid__="id11111"  class="">简单demo</view><view __eid__="id11112"  class="">{{state.a}} + {{state.b}} = {{state.c}}</view></view><button __eid__="id1213"  class="" @click="state.s">button</button>
<ResendButton  type="" text="" class=""></ResendButton>

<view  class="dis-flex"><view __eid__="id__fcpkga"  class="">view1</view><view __eid__="id__79dosj"  class="">view</view></view>

<ZxTab  v-model="state.tabIndex" :tabValue="state.tabs" style="--zx-tab-nav-height:120rpx" class="">
<template  v-slot:before="scope" class=""><view __eid__="id__k1vct2"  class="">{{scope.index}}</view></template>
</ZxTab>

<swiper  :current="state.tabIndex" @change="state.onSwiperChane" class="">
<swiper-item  class=""><view __eid__="id__exjfky"  class="bgc-primary h-full">swiper1</view></swiper-item>

<swiper-item  some="" class=""><view __eid__="id__vl37l0"  class="">swiper2</view></swiper-item>
</swiper>
</scroll-view>
</page-wrapper-detail>
  
</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue} from "@/frame/app";
import { getCurPageOptions } from "@/utils/uni"


import { z, ZodError } from "zod"
import { initModelContext, injectControl } from "@/frame/model";
let appContext = initModelContext('test-gen');
let $control = new Proxy(appContext, {
  get(proxyObj, name) {
    // console.log(proxyObj, name);
    return proxyObj.getControl(name)
  }
})
function isDefined(v) {
  return typeof v !== 'undefined'
}


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
  return new Promise(resolve => {
    $page.$refs[ref].validate().then(res => {
      // uni.showToast({
      //   title: '校验通过'
      // })
      resolve()
    }).catch(err => {
      console.log('err', err);
    })
  })
}





        ;
let {ins: state} = $getStore('TestGen_state');
  
        ;onLoad(async () => {
  let res = await $reqService('testDeep')  
  console.log('ssssss', res)
  if (isDefined(res)) {
    console.log('good')
  }
}) 

        
  let $pageFormConfig = {};

    
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

</script>

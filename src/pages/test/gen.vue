<template>

<page-wrapper-detail>
<scroll-view __eid__="id111"  scroll-y="true" class="h-full">
<video  src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4" :autoplay="false" class="w-full display-block"></video>
<view __eid__="id__ojst8a"  class="" style="color:rgba(242, 244, 245, 1);background-color:rgba(37, 142, 228, 1)">测试1</view><view __eid__="id1212"  class="overflow-hidden height-150"><view __eid__="id11111"  class="">简单demo</view><view __eid__="id11112"  class="">{{state.a}} + {{state.b}} = {{state.c}}</view><button __eid__="id1213"  class="" @click="state.s">计算</button></view>
<ResendButton  type="" text="" class=""></ResendButton>

<view  class="dis-flex"><view __eid__="id__fcpkga"  class="">view1</view><view __eid__="id__79dosj"  class="">view</view></view>

<ZxTab  v-model="state.tabIndex" :tabValue="state.tabs" style="--zx-tab-nav-height:120rpx" class="">
<template  v-slot:before="scope" class=""><view __eid__="id__k1vct2"  class="">{{scope.index}}</view></template>
</ZxTab>

<swiper  :current="state.tabIndex" @change="state.onSwiperChane" class="">
<swiper-item  class=""><view __eid__="id__exjfky"  class="bgc-primary h-full">swiper1</view></swiper-item>

<swiper-item  some="" class=""><view __eid__="id__vl37l0"  class="">swiper2</view></swiper-item>
</swiper>

<uni-popup  ref="popup" background-color="" @change="vm.onPopupChange" class=""><view __eid__="id__riinyi"  class="bgc-background">{{state.adNum}}
<mp-html  :content="vm.indexHtml" @linktap="vm.onIndexHtmlLinkTap" class=""></mp-html>
</view><view __eid__="id__483zys"  class="text-center fs-36" @click="$sel('popup')?.close()">x</view></uni-popup>
</scroll-view>
</page-wrapper-detail>
  
</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue} from "@/frame/app";
import { getCurPageOptions } from "@/utils/uni"
import { forward } from '@/utils/router';
import { injectStore, useCache, cacheStore } from "@/frame/storeMan";


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
  
        ;@injectControl('vm')
class Some1 {
  indexHtml = `<div>
  <div style="width: 350rpx; height:  520rpx;">image</div>
  <div style="text-align: center"><a data-code="['sss', [1,2,'3']]">指令</a></div>
  </div>`

  onIndexHtmlLinkTap(e) {

    $sel('popup')?.close()
    forward('act', {name: 'index'})
  }

  onPopupChange(e) {
    if (!e.show) {
       state.setNeedAd(false)
       cacheStore(state, {needKeys: ['needAd']}) 
    }
     console.log(e)
  }
}

let vm = $control['vm']

onLoad(async () => {
  let res = await $reqService('testDeep')  
  console.log('ssssss', res)
  if (isDefined(res)) {
    console.log('good', state.adNum)
    if (res.num > state.adNum) {
      state.needAd = true
      state.adNum = res.num
      cacheStore(state, {needKeys: ['needAd','adNum']})
    } 
    
    if (state.needAd) {
       $sel('popup')?.open() 
    }
  }
}) 



        
  let $pageFormConfig = {};

    
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

</script>

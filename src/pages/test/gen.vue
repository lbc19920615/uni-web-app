<template>

<page-wrapper-detail>
<scroll-view __eid__="id111"  scroll-y="true" class="h-full">
<video  src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4" :autoplay="false" class="w-full display-block"></video>
<view __eid__="id__ojst8a"  class="" style="color:rgba(242, 244, 245, 1);background-color:rgba(37, 142, 228, 1)">测试1</view><view __eid__="id1212"  class="overflow-hidden height-150"><view __eid__="id11111"  class="">简单demo</view><view __eid__="id11112"  class="">{{state.a}} + {{state.b}} = {{state.c}}</view><button __eid__="id1213"  class="" @click="state.s">计算</button></view>
<ResendButton  @click="sendReq"></ResendButton>

<view  class="dis-flex"><view __eid__="id__fcpkga"  class="">view1</view><view __eid__="id__79dosj"  class="">view</view></view>

<ZxTab  v-model="state.tabIndex" :tabValue="state.tabs" style="--zx-tab-nav-height:120rpx">
<template  v-slot:before="scope"><view __eid__="id__k1vct2"  class="">{{scope.index}}</view></template>
</ZxTab>

<swiper  :current="state.tabIndex" @change="state.onSwiperChane">
<swiper-item ><view __eid__="id__exjfky"  class="bgc-primary h-full">swiper1</view></swiper-item>

<swiper-item ><view __eid__="id__vl37l0"  class="">swiper2</view></swiper-item>
</swiper>

<uni-popup  ref="popup" @change="vm.onPopupChange"><view __eid__="id__riinyi"  class="bgc-background">{{state.adNum}}
<mp-html  :content="vm.indexHtml" @linktap="vm.onIndexHtmlLinkTap"></mp-html>
</view><view __eid__="id__483zys"  class="text-center fs-36" @click="$sel('popup')?.close()">x</view></uni-popup>
</scroll-view>
</page-wrapper-detail>
  
</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue} from "@/frame/app";
import { getCurPageOptions } from "@/utils/uni"
import { forward } from '@/utils/router';
import { injectStore, useCache, cacheStore, cacheStoreRun } from "@/frame/storeMan";


import { z, ZodError } from "zod"
import { initModelContext, injectControl, creteProxyControl } from "@/frame/model";
let appContext = initModelContext('test-gen');
let $control = creteProxyControl(appContext)

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
      cacheStoreRun(state, function (obj) {
         obj.needAd = false
      })
    }
     console.log(e)
  }
}

let vm = $control['vm']

async function sendReq() {
  let res = await $reqService('testDeep')  
  if (isDefined(res)) {
    console.log('good', state.adNum)
    if (res.num > state.adNum) {
      cacheStoreRun(state, function (obj) {
         obj.needAd = false
         obj.adNum = res.num
      })
    } 
    
    if (state.needAd) {
       $sel('popup')?.open() 
    }
  }
}

onLoad(async () => {
  sendReq()
}) 



        
  let $pageFormConfig = {};

    
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

</script>

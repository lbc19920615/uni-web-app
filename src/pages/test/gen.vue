<template>

<page-wrapper-detail>
<scroll-view __eid__="id111"  scroll-y="true" class="h-full"><video __eid__="id1223"  class="w-full display-block" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"></video><view __eid__="id__ojst8a"  class="" style="color:rgba(242, 244, 245, 1);background-color:rgba(37, 142, 228, 1)">测试1</view><view __eid__="id1212"  class="overflow-hidden height-150"><view __eid__="id11111"  class="">简单demo</view><view __eid__="id11112"  class="">{{state.a}} + {{state.b}} = {{state.c}}</view></view><button __eid__="id1213"  class="" @click="state.s">button</button>
<ResendButton  type="" text="" class=""></ResendButton>

<view  class="dis-flex"><view __eid__="id__fcpkga"  class="">view1</view><view __eid__="id__79dosj"  class="">view</view></view>

<ZxTab  v-model="state.tabIndex" :tabValue="state.tabs" class=""></ZxTab>

<swiper  :current="state.tabIndex" @change="state.onSwiperChane" class="">
<swiper-item  class=""><view __eid__="id__exjfky"  class="bgc-primary h-full">swiper1</view></swiper-item>

<swiper-item  some="" class=""><view __eid__="id__vl37l0"  class="">swiper2</view></swiper-item>
</swiper>
</scroll-view>
</page-wrapper-detail>
  
</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue} from "@/frame/app";

const $app = getApp();
const $CurrentInstance = getCurrentInstance();
let $page = $CurrentInstance.proxy;

let submitForm  = function(ref) {
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
let {ins: state} = $getStore('TestGen_state');
  
        ;console.log(1)
        
  let $pageFormConfig = {};

    
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

</script>

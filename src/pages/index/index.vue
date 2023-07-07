
<template>
  <pageWrapper :show-tabbar="true">
    <view class="flex flex-col"
          >
      <video id="myVideo"
             style="width: 100%"
             src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
             controls></video>


      <view class="fs-32 text-left">基本</view>
      <view class="text-center">{{refs.a}} + {{refs.b}} = {{refs.c}}</view>
      <button class="mb-20" @click="store.action1">第一个加1</button>

      <view class="mb-20">
        <zx-modal id="modal1">
          <view>1111</view>
        </zx-modal>
      </view>
      <button @click="open">打开modal</button>

      <view class="fs-32 text-left">DEMOS</view>
      <view class="grid grid-cols-3">
        <view  v-for="(item,index) in store.arr" :key="index">
          <view class="text-center h-60 lh-60" @click="goPage(item)">{{ item.name }}</view>
        </view>
      </view>



<!--  #ifdef H5    -->
      <view class="fs-32 text-left">APP能力</view>
      <button @click="openTest">打开webview</button>
<!--  #endif    -->

    </view>
  </pageWrapper>
</template>

<script setup lang="ts" auto>
import pageWrapper from "@/components/pageWrapper.vue"
import { forward } from '@/utils/router';
import { useModal } from '@/uni_modules/zx'
import { cacheStore } from "@/frame/storeMan";
import { openWebview } from "@/utils/navigate";

// console.log(Object.getOwnPropertyDescriptors(store).a.value.constructor.name);
let {ins: store, refs} = $getStore("Home")

function openTest() {
  openWebview("http://192.168.2.64:3100/#/folder")
}

function goPage(item) {
  forward(item.path, {})
}

const modal = useModal("modal1")
function open() {
  modal.showModal({
    title: '提示',
    content:'哈喽啊，树先生'
  })
}
</script>

<style lang="scss">

</style>


<template>
  <pageWrapper :show-tabbar="true">
    <view class="content">
      <!-- <image class="logo" src="/static/logo.png" /> -->
      <zx-modal id="modal1">
        <view>1111</view>
      </zx-modal>
      <button @click="open">打开modal</button>

      <view class="text-area">
        <text class="title">{{ title }}</text>
      </view>
      <view @click="changeTitle">changeTitle</view>
      <view @click="goTest">测试页</view>

      <view>{{refs.a}} {{refs.b}} {{refs.c}}</view>
      <button @click="store.action1">action1</button>

      <!--    {{store.arr}}-->
      <view v-for="(item,index) in store.arr">
        <!--      {{item}} {{index}}-->
        <view @click="goPage(item)">{{ item[0] }}</view>
      </view>
    </view>
  </pageWrapper>
</template>

<script setup lang="ts" auto>

import pageWrapper from "@/components/pageWrapper.vue"
import { useTitle } from '@/hooks/useTitle';
import { forward } from '@/utils/router';
import { useModal } from '@/uni_modules/zx'
const { title, changeTitle } = useTitle();

// console.log(Object.getOwnPropertyDescriptors(store).a.value.constructor.name);
let store = $getStore("Home")
let refs = storeToRefs(store);
// let { action1 } = store
// console.log(store, refs, $getStore);

function goTest() {
  forward('test', {
    a: 1
  });
}

function goPage(item) {
  forward(item[0], item[1])
}

const modal = useModal("modal1")
function open() {
  modal.showModal({
    title: '提示',
    content:'哈喽啊，树先生'
  })
}

</script>

<style scoped lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logo {
    margin-left: auto;
    margin-right: auto;
    margin-top: 200rpx;
    margin-bottom: 50rpx;
    width: 200rpx;
    height: 200rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>

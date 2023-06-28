
<template>
  <pageWrapper :show-tabbar="true">
    <view class="content">
      <!-- <image class="logo" src="/static/logo.png" /> -->
      <zx-modal id="modal1">
        <view>1111</view>
      </zx-modal>
      <button @click="open">打开modal</button>

      <view @click="goTest">测试页</view>

      <view>{{refs.a}} {{refs.b}} {{refs.c}}</view>
      <button @click="store.action1">action1</button>

      <view class="grid grid-cols-3 w-3/4 mt-60">
        <view  v-for="(item,index) in store.arr">
          <!--      {{item}} {{index}}-->
          <view class="text-center h-60 lh-60" @click="goPage(item)">{{ item[0] }}</view>
        </view>
      </view>
      <!--    {{store.arr}}-->
    </view>
  </pageWrapper>
</template>

<script setup lang="ts" auto>
import pageWrapper from "@/components/pageWrapper.vue"
import { forward } from '@/utils/router';
import { useModal } from '@/uni_modules/zx'

// console.log(Object.getOwnPropertyDescriptors(store).a.value.constructor.name);
let store = $getStore("Home")
let refs = storeToRefs(store);



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
</style>

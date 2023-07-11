<template>

  <page-wrapper-detail>
    <scroll-view __eid__="id111" scroll-y="true" class="h-full">
      <view __eid__="id1212" class="overflow-hidden height-260">
        <uni-forms-item label="姓名" name="name">
          <uni-easyinput type="text" placeholder="请输入姓名" />
        </uni-forms-item>
        <view __eid__="id11112" class="">{{ state.a }} + {{ state.b }} = {{ state.c }}</view>
      </view>
      <button __eid__="id1213" class="" @click="state.s">button</button>
    </scroll-view>
  </page-wrapper-detail>

</template>

<script setup lang="ts">

const $app = getApp();
const $frame = $app.globalData.frame;
const $getStore = $frame.getStore;


let { ins: state, refs } = $getStore("state");
console.log(state);


console.log(1);


</script>

<style lang="scss">


</style>

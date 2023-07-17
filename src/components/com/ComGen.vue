
<template>

<da-tree  :field="{ label: 'name', key: 'id' }" :data="state.items" class="" defaultExpandAll>
  <template #label="scope">
  {{ scope.item }}
  </template>
</da-tree>
<view __eid__="id__2zne4v"  class="">{{state.items}}
</view><button __eid__="id__zopstj"  class="">实打实打算</button>
<video  src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4" class="w-full"></video>

</template>

<script setup lang="ts">

import * as f from "@/frame/formMan";
import { $getStore,  $reqService, isNoneValue} from "@/frame/app";

const $frame = {
  f
};

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

onLoad(async () => {
  let ret = await $reqService('some')
  if (isNoneValue(ret)) return;
  console.log(ret);
})




        ;
let {ins: state} = $getStore('ComGen_state');
  
        ;let roomTreeData = ref([
])

        

</script>

<style lang="scss">


  
</style>
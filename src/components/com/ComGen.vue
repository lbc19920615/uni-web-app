
<template>
<view __eid__="id__2zne4v"  class="">{{state.items.length}}
</view>
<da-tree  :field="{ label: 'name', key: 'id' }" :data="state.items" class="h-740" defaultExpandAll>
  <template #label="scope">
  {{ scope.item }}
  </template>
</da-tree>
<button __eid__="id__zopstj"  class="">实打实打算</button>
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
let {ins: state} = $getStore('ComGen_state');
  
let {ins: other} = $getStore('ComGen_other');
  
        ;let some1 = $mock({ name: String });

console.log(some1);
        

</script>

<style lang="scss">


  
</style>

<template>
<view __eid__="id__2zne4v"  class="">{{state.items.length}}
</view>
<da-tree  :field="{ label: 'name', key: 'id' }" :data="state.items" class="h-740" defaultExpandAll>

<template  v-slot:label="scope" class=""><view __eid__="id__1bint5"  class="">{{scope.item}}</view></template>

</da-tree>
<button __eid__="id__zopstj"  class="" @click="state.add">button</button>
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
  
        ;
        

</script>

<style lang="scss">


  
</style>
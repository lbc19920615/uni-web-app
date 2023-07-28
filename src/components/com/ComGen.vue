<template>

<da-tree  :field="{ label: 'name', key: 'id' }" :data="state.items" style="color:rgba(8, 5, 5, 0.45)" class="h-740" defaultExpandAll>

<template  v-slot:label="scope" class="">{{scope.item}}</template>

</da-tree>
<button __eid__="id__zopstj"  style="" class="" @click="state.add">添加</button>
</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue} from "@/frame/app";
import { getCurPageOptions } from "@/utils/uni"

const $app = getApp();
const $CurrentInstance = getCurrentInstance();
let $page = $CurrentInstance.proxy;
function $sel(name) {
  return $page.$refs[name]
}

function submitForm(ref = '') {
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
        
  let $pageFormConfig = {};

    
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

export default {
  name: 'com-gen',
  props: {
    test: {
      type: String
    }
  }
}  

</script>

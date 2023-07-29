<template>

<page-wrapper-detail>
  <ComGen ref="host"></ComGen>
</page-wrapper-detail>
    
</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue} from "@/frame/app";
import { getCurPageOptions } from "@/utils/uni"


import { initModelContext, injectControl } from "@/frame/model";
let appContext = initModelContext('preview__com-gen');
let $control = new Proxy(appContext, {
  get(proxyObj, name) {
    // console.log(proxyObj, name);
    return proxyObj.getControl(name)
  }
})



const $app = getApp();
const $CurrentInstance = getCurrentInstance();
let $page = $CurrentInstance.proxy;
function $sel(name) {
  return $page.$refs[name]
}

function $callCom(refName, method, args = []) {
  let methodArr = method.split('.')
  return $sel(refName)?.run(methodArr[0], methodArr.slice(1), args);
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


;setTimeout(() => {
$callCom('host', 'vm.add')
}, 300)

</script>

<style lang="scss">

</style>

<script lang="ts">

</script>

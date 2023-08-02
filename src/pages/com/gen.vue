<template>

<page-wrapper-detail>
  <ComGen ref="host"></ComGen>
</page-wrapper-detail>
    
</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue} from "@/frame/app";
import { getCurPageOptions } from "@/utils/uni"
import { forward } from '@/utils/router';
import { injectStore, useCache, cacheStore, cacheStoreRun } from "@/frame/storeMan";


import { z, ZodError } from "zod"
import { initModelContext, injectControl, creteProxyControl } from "@/frame/model";
import { PageMethod } from "@/frame/page";
let appContext = initModelContext('preview__com-gen');
let $control = creteProxyControl(appContext)

function isDefined(v) {
  return typeof v !== 'undefined'
}


const $app = getApp();
const $CurrentInstance = getCurrentInstance();
let $page = $CurrentInstance.proxy;
let c = new PageMethod($CurrentInstance)
let {$sel, $submitForm, $callCom } = c.getMethods()

function submitForm(ref = '') {
  return new Promise(resolve => {
    $page.$refs[ref].validate().then(res => {
      // uni.showToast({
      //   title: '校验通过'
      // })
      resolve()
    }).catch(err => {
      console.log('err', err);
    })
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

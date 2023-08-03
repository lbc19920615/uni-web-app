<template>

<page-wrapper-detail>
  <ComSkuCalc ref="host"></ComSkuCalc>
</page-wrapper-detail>
    
</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue, $filterArr, $deepClone} from "@/frame/app";
import { getCurPageOptions } from "@/utils/uni"
import { forward } from '@/utils/router';
import { injectStore, useCache, cacheStore, cacheStoreRun } from "@/frame/storeMan";


import { z, ZodError } from "zod"
import { initModelContext, injectControl, creteProxyControl, BaseVmControl } from "@/frame/model";
import { PageMethod } from "@/frame/page";
let appContext = initModelContext('preview__com-skuCalc');
let $control = creteProxyControl(appContext)
import * as $glo from '@/glo'

function isDefined(v) {
  return typeof v !== 'undefined'
}


const $app = getApp();
const $CurrentInstance = getCurrentInstance();
let $page = $CurrentInstance.proxy;
let c = new PageMethod($CurrentInstance)
let {$sel, $submitForm, $callCom } = c.getMethods()

let submitForm = $submitForm



;

</script>

<style lang="scss">

</style>

<script lang="ts">

</script>

<template>

<page-wrapper-detail>
<view __eid__="id__0ql9az"  class="h-full dis-flex">
<rt-scroll-y  style="background-color:rgba(241, 241, 241, 1)" class="width-160 h-full">
<da-tree  :field="{ label: 'category_name', key: 'category_id' }" :data="vm.categorys" :defaultCheckedKeys="vm.curId" style="height:calc(100% - 120rpx)" class="" defaultExpandAll>

<template  v-slot:label="scope"><view __eid__="id__hfa3uf"  class="height-90 text-center lh-90" @click="vm.onCatSet(scope)">{{scope.item.originItem.category_name}}</view></template>

</da-tree>
</rt-scroll-y>
<view __eid__="id__gd35uv"  class="flex-1"><view __eid__="id__5koih3"  class="height-120">control </view>
<da-tree  :field="{ label: 'name', key: 'id' }" :data="vm.items" style="height:calc(100% - 120rpx)" class="" defaultExpandAll>

<template  v-slot:label="scope"><view __eid__="id__15ga67"  class="p-20 pb-0"><view __eid__="id__fjhlie"  class="mb-10">{{scope.item.originItem}}</view><view __eid__="id__z7ys99"  class="">{{scope.item.originItem.sku_name}}</view></view></template>

</da-tree>
</view></view>
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
let appContext = initModelContext('test-shoplist');
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
        ;import apiTest from "@/api/apiTest";

@injectControl('vm')
class Some1 extends $glo.BaseShopVm {
}

let vm = $control['vm'];

onLoad(async () => {
  let {items, newData} = await apiTest.fetchShopItems()
vm.cachedItems = items
  vm.setCatorys(newData.categories)
  vm.setCur(newData.categories[0])
})
        
  let $pageFormConfig = {};

    
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

</script>

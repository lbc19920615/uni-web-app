<template>

<page-wrapper-detail>
<view __eid__="id__0ql9az"  style="--shop-list-tab-h:120rpx" class="h-full"><view __eid__="id__ywijy0"  style="height:calc(100% - var(--shop-list-tab-h) + 6rpx)" class="dis-flex">
<rt-scroll-y  style="background-color:rgba(241, 241, 241, 1)" class="width-160 h-full">
<da-tree  :field="{ label: 'category_name', key: 'category_id' }" :data="vm.categorys" :defaultCheckedKeys="vm.categorys[0]?.category_id" style="height:calc(100% - 120rpx)" class="" defaultExpandAll>

<template  v-slot:label="scope"><view __eid__="id__hfa3uf"  class="height-90 text-center lh-90" @click="vm.onCatSet(scope)">{{scope.item.originItem.category_name}}</view></template>

</da-tree>
</rt-scroll-y>
<view __eid__="id__gd35uv"  class="flex-1"><view __eid__="id__5koih3"  class="height-90 p-20 box-border"><view __eid__="id__3h7pm4"  class="" @click="vm.设置条件('sku_price_order', ['sku_price', 'orderBy', 'asc'])">价格 {{vm.搜索条件.has('sku_price_order') ? '上': ''}}

{{vm.curSelect}}</view></view>
<da-tree  :field="{ label: 'sku_name', key: 'sku_id' }" :data="vm.filterItems" :defaultCheckedKeys="vm.items[0]" style="height:calc(100% - 90rpx)" class="" defaultExpandAll>

<template  v-slot:label="scope"><view __eid__="id__15ga67"  class="p-30 pb-0">
<view  class="dis-flex gap-20">
<image  style="background-color:rgba(242, 242, 242, 1)" class="width-120 height-120"></image>
<view __eid__="id__lbjrjy"  class="flex-1"><view __eid__="id__fjhlie"  class="mb-10">{{scope.item.originItem.sku_name}}</view><view __eid__="id__z7ys99"  class="">&#165; {{scope.item.originItem.sku_price_display}} 起</view></view>
<ComSkuCalc  @sku-calc-submit="vm.calcSubmit($event, scope.item.originItem)" :item="scope.item.originItem">
<template  v-slot:desc="scope1"><view __eid__="id__vbxsib"  class="">{{scope.item.originItem.sku_name}}</view></template>
</ComSkuCalc>
</view>
</view></template>

</da-tree>
</view></view></view><view __eid__="id__aakwk8"  style="height:120rpx;background-color:rgba(247, 247, 247, 1);z-index:1111" class="pos-absolute left-0 bottom-0 w-full"><view __eid__="id__drtyvo"  class="dis-flex items-center p-20"><view __eid__="id__38ea9f"  class="flex-1" @click="vm.openPopup(vm?.collectObj)">实付 &#165;{{vm.collectObj?.price_display}}</view>
<LockButton  @submit="vm.payOrder">确认支付</LockButton>
</view></view>
<uni-popup  ref="popup" @change="vm.onPopupChange"><view __eid__="id__pzzmfl"  style="" class="bgc-background mb-120">
<CusSkuCart >
<template  v-slot:desc="scope"><view __eid__="id__32yr6g"  class="">{{scope.extra.sku_name}}</view><view __eid__="id__f410us"  class="">{{scope.extra.sku_tags ? scope.extra.sku_tags.join(' ') : ''}}</view><view __eid__="id__gktos6"  class="">&#165; {{scope.num * scope.extra.sku_price / 100}} </view></template>
</CusSkuCart>
</view></uni-popup>

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

let {ins: storeCart} = $getStore("Cart");

@injectControl('vm')
class Some1 extends $glo.BaseShopVm {
  isOpen = false
  curSelect = null
  calcSubmit(extra, item) {
   let newItem = $glo.onSkuCalcSubmit(extra, item);
   // console.log('calcSubmit', newItem)
   storeCart.putSku(newItem.sku_id_display, newItem)
  }
  get collectObj() {
    return storeCart.getCollect()
  }
  async payOrder(e) {
    e.unLock()
  }
  openPopup(collectObj) {
    // console.log(collectObj)
    if (collectObj?.originItems?.length < 1) {
      return
    }
    if (!this.isOpen) {
      this.isOpen = true
      $sel('popup').open('bottom') 
    } else {
      this.isOpen = false
      $sel('popup').close()
    }
  }
}

let vm = $control['vm'];

onLoad(async () => {
  let {items, newData} = await apiTest.fetchShopItems()
  vm.缓存(items)
  vm.setCatorys(newData.categories)
  vm.setCur(newData.categories[0])
})
        
  let $pageFormConfig = {};

    
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

</script>

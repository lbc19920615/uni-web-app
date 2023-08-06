<template>

<page-wrapper-detail>
<view __eid__="id__e3nare"  style="--shopmap-tab-h:90rpx" class="h-full">
<ZxTab  v-model="vm.tabIndex" :tabValue="vm.tabs" style="--zx-tab-nav-height:var(--shopmap-tab-h)">
<template  v-slot:before="scope"><view __eid__="id__55nqe0"  class=""></view></template>
</ZxTab>

<swiper  :current="vm.tabIndex" @change="vm.onSwiperChane" :disable-touch="true" style="height:calc(100% - var(--shopmap-tab-h))">
<swiper-item  :catchtouchmove="vm.catchtouchmove"><view __eid__="id__rcu9bv"  class="h-full">
<map  ref="map" :latitude="31.1837" :longitude="120.635" class="w-full height-410"></map>
<view __eid__="id__8d7dy0"  style="height:calc(100% - 410rpx);background-color:rgba(249, 249, 249, 1);--control-bar-h:90rpx" class=""><view __eid__="id__xm2oh0"  style="height:var(--control-bar-h);background-color:rgba(255, 255, 255, 1)" class="box-border p-20 dis-flex items-center gap-10 fs-24"><view __eid__="id__uqo5wl"  class="">苏州</view>
<uni-forms-item  style="margin-bottom:0" class="flex-1" :label="def.optMap.name.label" name="name">
  <dym-input widgetType="text" 
  :widgetConfig="{}" 
  :placeholder="'请输入' + def.optMap.name.label"
  v-model="def.formData.name" form="null" ></dym-input>
</uni-forms-item>
  <view __eid__="id__af0oy4"  class="" @click="vm.searh(def)">搜索</view></view><view __eid__="id__am9rjf"  style="height:calc(100% - var(--control-bar-h))" class="">
<da-tree  :field="{ label: 'name', key: 'id' }" :data="vm.items" style="background-color:rgba(241, 241, 241, 1);--da-tree-item-mb:30rpx" class="h-full pt-20 pb-20 box-border" defaultExpandAll>

<template  v-slot:label="scope"><view __eid__="id__c1450t"  style="" class="height-230 pl-20 pr-20"><view __eid__="id__v5r8x3"  style="background-color:rgba(255, 255, 255, 1)" class="h-full bdrs-10 p-20 box-border"><view __eid__="id__b7g0fp"  class="">{{scope.item.originItem}}</view><view __eid__="id__quotwd"  class="height-80">image list</view><view __eid__="id__vnpoxq"  class="">detail</view><view __eid__="id__jvg2oc"  class="">action</view></view></view></template>

</da-tree>
</view></view></view></swiper-item>

<swiper-item  :catchtouchmove="vm.catchtouchmove"><view __eid__="id__vl37l0"  class="">开发中</view></swiper-item>
</swiper>
</view>
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
let appContext = initModelContext('test-shopmap');
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
let def = $frame.f.createFormContext('def', function({ context, field, required, isArray, format, validateFunction }) {
  context.init([
  ])

  class InnerCls {
  @required()
  @field('')
  get name() {
    return ''
  }
}

  return InnerCls
})
  
        ;@injectControl('vm')
class some {
  tabIndex = 0
  tabs = ['到店自提', '送货上门']
  onSwiperChane(e) {
    this.tabIndex = e.detail.current
  }
  catchtouchmove = 'no'
  items = []
  add() {
    let arr = $mock({name: String}).items
    this.items = this.items.concat(arr)
  }
  searh(formDef) {
    let data = formDef.getFormData()
    console.log(data)
  }
}  

let vm = $control['vm'];
vm.add()
        
  let $pageFormConfig = {};

    
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

</script>

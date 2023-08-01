<template>

<page-wrapper-detail>
<view __eid__="id__tvldsj"  class="">{{getCurPageOptions()}}<view __eid__="id__g8f7f8"  class="">
<da-tree  :field="{ label: 'name', key: 'id' }" :data="vm.items" class="h-740" defaultExpandAll>

<template  v-slot:label="scope" class=""><view __eid__="id__16shky"  class="dis-flex p-20"><view __eid__="id__hu95m4"  class="width-120">image</view><view __eid__="id__gqzhes"  class="flex-1"><view __eid__="id__ejex4v"  class="">{{scope.item.originItem[1]?.extra.sku_name}}</view><view __eid__="id__wm2ei6"  class="">{{scope.item.originItem[1]?.extra?.sku_tags.join('/')}}</view><view __eid__="id__i4wpek"  class="">{{scope.item.originItem[1].num}}</view></view><view __eid__="id__ewyt9e"  class=""> &#165; {{scope.item.originItem[1].curTotal / 100}}</view></view></template>

<template  v-slot:empty="scope" class=""><view __eid__="id__nz4yqp"  class="">怎么没有买东西</view></template>

</da-tree>
</view><view __eid__="id__hpa3ik"  class="pos-absolute left-0 bottom-0 w-full"><view __eid__="id__3j7lvi"  class="dis-flex items-center p-20"><view __eid__="id__kzpr5b"  class="flex-1">实付 &#165;{{vm.price}}</view>
<LockButton  type="" open-type="" @submit="vm.payOrder" class="">确认支付</LockButton>
</view></view></view>
</page-wrapper-detail>
  
</template>

<script setup lang="ts">

import { $frame, $getStore,  $reqService, isNoneValue} from "@/frame/app";
import { getCurPageOptions } from "@/utils/uni"
import { forward } from '@/utils/router';
import { injectStore, useCache, cacheStore } from "@/frame/storeMan";


import { z, ZodError } from "zod"
import { initModelContext, injectControl } from "@/frame/model";
let appContext = initModelContext('test-order');
let $control = new Proxy(appContext, {
  get(proxyObj, name) {
    // console.log(proxyObj, name);
    return proxyObj.getControl(name)
  }
})
function isDefined(v) {
  return typeof v !== 'undefined'
}


const $app = getApp();
const $CurrentInstance = getCurrentInstance();
let $page = $CurrentInstance.proxy;
function $sel(name) {
  return $page.$refs[name]
}


function $callCom(refName, method, args = []) {
  let methodArr = method.split('.')
  return $sel(refName)?.run(methodArr[0], methodArr.slice(1).join('.'), args);
}


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





        ;
        ;let {ins: storeCart} = $getStore("Cart");

let cached =  storeCart.getCollect()

@injectControl('vm')
class Some1 {
  detail = ''
  num = cached.num
  price = cached.price / 100
  items = cached.items
  payOrder(e) {
    setTimeout(() => {
      e.unLock()
    }, 3000)
  }
}

let vm = $control['vm']

        
  let $pageFormConfig = {};

    
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

</script>

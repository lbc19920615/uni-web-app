
<template>

<page-wrapper-detail>
<scroll-view __eid__="id111"  scroll-y="true" class="h-full">
  <uni-forms  ref="form" form="def" :rules="def.rules" :modelValue="def.formData" class="overflow-hidden height-260" @click="">
    
  <uni-forms-item label="姓名11" name="name">
    <uni-easyinput v-model="def.formData.name" 
    type="text" placeholder="请输入姓名11" />
  </uni-forms-item>
  
  </uni-forms>
  <button __eid__="id__dzukp4"  @click="function() {submitForm('form')}" class="">保存</button></scroll-view>
</page-wrapper-detail>
  
</template>

<script setup lang="ts">

import * as f from "@/frame/formMan";
import { $getStore,  $reqService, isNoneValue} from "@/frame/app";

const $frame = {
  f
};

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

onLoad(async () => {
  let ret = await $reqService('some')
  if (isNoneValue(ret)) return;
  console.log(ret);
})




        ;
  let def = $frame.f.createFormContext('def', function({ context, field, required, isArray, format, validateFunction }) {
    context.init([
    ])
    
    class InnerCls {
  @required()
  @field('姓名')
  get name() {
    return ''
  }

  @format('number')
  @required()
  @field('年龄')
  get age() {
    return 0
  }

  @isArray({ min: 2 })
  @required()
  @field('爱好')
  get hobby() {
    return []
  }
}
  
  
    return InnerCls
  })
  
  let {ins: state} = $getStore('TestGen2_state');
  
        ;console.log($frame)
        

</script>

<style lang="scss">


  
</style>

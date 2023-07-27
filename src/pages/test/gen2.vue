<template>

<page-wrapper-detail>
<scroll-view __eid__="id111"  scroll-y="true" class="h-full height-1350"><view __eid__="id__894a5o"  class="">{{ def.getFormData() }}</view>
  <uni-forms  ref="form" form="def" :rules="def.rules" :modelValue="def.formData" class="overflow-hidden" @click="">
    <view __eid__="_custom" ></view>
  <uni-forms-item :label="def.optMap.name.label" name="name">
    <uni-easyinput v-model="def.formData.name" type="text" :placeholder="'请输入' + def.optMap.name.label" />
  </uni-forms-item>
  
  <uni-forms-item :label="def.optMap.hobby.label" name="hobby">
    <uni-data-checkbox multiple v-model="def.formData.hobby" :localdata="state.hobby"/>
  </uni-forms-item>
  
<view  class="dis-flex items-start">
  <uni-forms-item :label="def.optMap.age.label" name="age">
    <uni-easyinput v-model="def.formData.age" type="number" :placeholder="'请输入' + def.optMap.age.label" />
  </uni-forms-item>
  
<ResendButton  type="" text="" class=""></ResendButton>
</view>

  <view  v-for='(item,index) in def.vmMap.objArr.list'>
    <uni-forms-item v-for="[propName, propDef] in item.props"
                    :key="item.id + '__' + propName" 
                    :label="item.label +' ' +index + ' ' + propName"
                    :rules="propDef.rules" 
                    :name="'objArr[' + index + '].' + propName">
      <view class="form-item">
        
  <template v-if="def.getItemClsDefProp('objArr', propName)?.widgetType === 'number'">
    <uni-easyinput v-model="def.formData.objArr[index][propName]" type="number" :placeholder="'请输入' + item.label"  />
  </template>
  <template v-else-if="def.getItemClsDefProp('objArr', propName)?.widgetType === 'multiCheckbox'">
    <uni-data-checkbox multiple v-model="def.formData.objArr[index][propName]"  v-bind="$pageFormConfig['objArr'][propName]" />
  </template>
  <template v-else>
    <uni-easyinput v-model="def.formData.objArr[index][propName]" type="text" :placeholder="'请输入' + item.label" />
  </template>
  
      </view>
    </uni-forms-item>
    <view __eid__="id__hoyu09" class=""><button __eid__="id__nygr7e" class="" @click="def.vmMap.objArr.$del(item.id)">删除</button></view> 
    <view __eid__="_custom"></view>
  </view>
  
  </uni-forms>
  
<button  type="" @click="def.vmMap.objArr.$add()" class="mb-20">添加arr</button>

<button  type="primary" @click="function() {submitForm('form')}" class="">保存</button>
</scroll-view>
</page-wrapper-detail>
  
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

  @field('数组', {
    dynamic: true, 
    itemCls: 'ObjItem'
  })
  get objArr() {
    return []
  }
}

  return InnerCls
})
  
let {ins: state} = $getStore('TestGen2_state');
  
        ;onLoad(() => {
  let form =  $page.$refs['form']
})
        
  let $pageFormConfig = {};

    
  $pageFormConfig['objArr'] = {
  hobby: {
    localdata:state.hobby
  }
};
  
  

</script>

<style lang="scss">


  
</style>

<script lang="ts">

</script>

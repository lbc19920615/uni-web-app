
  <template>

  <page-wrapper-detail>
<scroll-view __eid__="id111"  scroll-y="true" class="h-full">
  <uni-forms  ref="form" :rules="def.rules" :modelValue="def.formData" class="overflow-hidden height-260" @click="">
    
  <uni-forms-item label="姓名11" name="name">
    <uni-easyinput v-model="def.formData.name" 
    type="text" placeholder="请输入姓名11" />
  </uni-forms-item>
  
  </uni-forms>
  <button __eid__="id__dzukp4"  @click="function() {submitForm('form')}" class="">保存</button></scroll-view>
 </page-wrapper-detail>
  
</template>

<script setup lang="ts">

// { field, required, defineSimpleForm, useSimpleForm, isArray, format, validateFunction }
import * as f from "@/frame/formMan";
import { $getStore } from "@/frame/app";

const $frame = {
  f
};

const $app = getApp();
const $CurrentInstance = getCurrentInstance();
let $page = $CurrentInstance.proxy;

// console.log(def);

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





      let {ins: state, refs} = $getStore('state');
console.log(state);
      

        ;
  let def = $frame.f.createFormContext('A', function({ context, field, required, isArray, format, validateFunction }) {
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
  
        ;console.log($frame)
        

  
</script>

<style lang="scss">

  
  
</style>
  

  <template>

  <page-wrapper-detail>
<view __eid__="id__necih7"  style="color:rgba(197, 221, 76, 1);background-color:rgba(37, 145, 145, 1)" class="height-120" @click="testFun">testsdsdsdsds</view>
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





        ;
        ;function testFun() {
  console.log(11111)
}
        

  
</script>

<style lang="scss">

  
  
</style>
  
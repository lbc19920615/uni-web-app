
  <template>

  <page-wrapper-detail>
<scroll-view __eid__="id111"  scroll-y="true" class="h-full"><video __eid__="id1223"  class="w-full display-block" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"></video><view __eid__="id__ojst8a"  class="" style="color:rgba(242, 244, 245, 1);background-color:rgba(37, 142, 228, 1)">测试1</view><view __eid__="id1212"  class="overflow-hidden height-260"><view __eid__="id11111"  class="">简单demo</view><view __eid__="id11112"  class="">{{state.a}} + {{state.b}} = {{state.c}}</view></view><button __eid__="id1213"  class="" @click="state.s">button</button></scroll-view>
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
  let {ins: state} = $getStore('state');
  
        ;console.log(1)
        

  
</script>

<style lang="scss">

  
  
</style>
  
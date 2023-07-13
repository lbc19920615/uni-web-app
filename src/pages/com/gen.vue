
  <template>

  <page-wrapper-detail>

    <da-tree :data="roomTreeData" :field="{ label: 'name', key: 'id' }" defaultExpandAll>
      <template #label="scope">
      {{ scope.item }}
      </template>
    </da-tree>
    
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
        ;let roomTreeData = ref([
  {
    id: '21',
    name: '行政部',
  },
  {
    id: '22',
    name: '财务部',
  },
  {
    id: '23',
    name: '人力资源部',
  },
])


        

  
</script>

<style lang="scss">

  
  
</style>
  
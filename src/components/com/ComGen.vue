
  <template>

    <da-tree  :field="{ label: 'name', key: 'id' }" :data="roomTreeData" class="" defaultExpandAll>
      <template #label="scope">
      {{ scope.item }}
      </template>
    </da-tree>
    <view __eid__="id__2zne4v"  class="">{{state.items}}
</view>
</template>

<script setup lang="ts">

// { field, required, defineSimpleForm, useSimpleForm, isArray, format, validateFunction }
import * as f from "@/frame/formMan";
import { $getStore,  $reqService, isNoneValue} from "@/frame/app";

const $frame = {
  f
};

const $app = getApp();
const $CurrentInstance = getCurrentInstance();
let $page = $CurrentInstance.proxy;

// console.log(def);

// let submitForm  = function(ref) {
//   $page.$refs[ref].validate().then(res => {
//     uni.showToast({
//       title: '校验通过'
//     })
//     console.log(res);
//   }).catch(err => {
//     console.log('err', err);
//   })
// }

onLoad(async () => {
  let ret = await $reqService('some')
  if (isNoneValue(ret)) return;
  console.log(ret);
  
})





        ;
  let {ins: state} = $getStore('ComGen_state');
  
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
<template>
  <view       class="p-20">
    <view  v-if="store.items && store.items.length > 0">
      <view class="flex items-center pb-20" >
        <radio @click="onChangeCheckAll" :checked="store.checkedLen > 0" />
        <view>共{{refs.checkedLen}}件</view>
      </view>
    </view>
    <scroll-view style="max-height: 560rpx" scroll-y>
      <view class="flex items-end mb-20" v-for="(item, index) in store.items" :key="item[0]">
        <view class="flex items-center">
          <view>
<!--            {{item[1].checked + ''}}-->
            <radio @click="onChangeCheck(item)" :checked="item[1].checked" />
          </view>
          <view>
            <slot name="desc" :shop_id="item[0]" :extra="item[1].extra"></slot>
          </view>
        </view>
        <view class="flex-1">&nbsp;</view>
        <uni-number-box
          @change="onChangeBox(item, index)"
          :min="0"
          v-model="item[1].num"></uni-number-box>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts" auto>
import UniNumberBox from "@/uni_modules/uni-number-box/components/uni-number-box/uni-number-box.vue";

let {proxy} = getCurrentInstance()

defineEmits(['item_change'])

let {ins: store, refs} = $getStore("Cart");

function onChangeCheckAll() {
  store.toggleCheckAll()
  proxy.$emit("item_change", store.getSelectedItems())
}

function onChangeCheck(item) {
  store.toggleItemChecked(item)
  proxy.$emit("item_change", store.getSelectedItems())
}

function onChangeBox(item, index) {
  if (item[1].num < 1) {
    store.delItem(index)
  }
  proxy.$emit("item_change", store.getSelectedItems())
}

// export default {
//   components: { UniNumberBox },
//   emits: ['item_change'],
//   data() {
//     return {
//       items: []
//     }
//   },
//   computed: {
//     isAllCheck() {
//       if(!this.items || this.items.length <1){
//         return false;
//       }
//       return this.items.every(item => {
//         return item[1].checked
//       })
//     },
//     checkedLen() {
//       let count = 0;
//       if(!this.items || this.items.length <1){
//         return 0;
//       }
//        this.items.forEach(item => {
//          if (item[1].checked) {
//            count = item[1].num + count
//          }
//       })
//       return count
//     }
//   },
//   methods: {
//     pushItem(skuId, {num = 1, checked = true, extra = {}} = {}) {
//       this.items.push([skuId, { num:num, checked, extra }])
//       this.$nextTick(() => {
//         this.$emit("item_change", deepClone(this.items))
//       })
//     },
//     onChangeBox(item, index) {
//       if (item[1].num < 1) {
//         // console.log('sssssssssssssssssssss');
//         this.items.splice(index,1)
//       }
//       console.log(this.items);
//       this.$emit("item_change", deepClone(this.items))
//     },
//     onChangeCheck(item) {
//       // console.log('onChangeCheck', e);
//       item[1].checked = !item[1].checked
//     },
//     onChangeCheckAll() {
//       let checked =  this.checkedLen > 0 ? false : true
//       this.items.forEach(item => {
//         item[1].checked =checked
//       })
//     }
//   }
// }
</script>

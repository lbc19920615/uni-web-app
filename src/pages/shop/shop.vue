<template>
  <page-wrapper :show-tabbar="true">
<!--    {{shopStep}}-->
    <view
      class=" w-full h-full"
       v-if="shopStep === ''">
      <page-loading></page-loading>
    </view>
    <view
      class="flex flex-col w-full h-full"
      v-else-if="shopStep === 'needSelect'">
      <!--        {{longitude}} {{latitude}} {{needGetLocation}}-->
      <map
        style="width: 100%; height: 300px;"
        :latitude="latitude"
        :longitude="longitude" >
      </map>
      <view
        @click="store.shopStep = 'selected'">商店1</view>
    </view>

    <view
      class="flex flex-col w-full h-full sku-sell" style="position: relative"
      v-else>
      <view class="mb-30 p-20">
        <view class="fs-38 mb-10">商铺信息 <view class="arrow arrow-right"></view></view>
        <view class="text-thirdly">商铺1</view>
      </view>

      <button @click="onAdd">onAdd</button>

      <view class="flex items-center w-full pb-20 pt-20"
            style="position: absolute; bottom: 0; left: 0; z-index: 11111; background-color: #fff; height: var(--sku-cart-action-h); border-top: 1px solid #eee"
            v-show="isOpen || totalCount > 0"
      >
        <view class="flex items-center pl-20">
          <icon-mask>
            <template v-slot:mask><view class="fs-10 p-3 cart-action-dot">{{totalCount}}</view></template>
            <uni-icons type="cart" size="36" @click="open"></uni-icons>
          </icon-mask>
          <view>
            <view class="fs-36 ml-20">{{totalPrice}}</view>
          </view>
        </view>
        <view class="flex-1">&nbsp;</view>
        <view class="pr-20">
          <button>去结算</button>
        </view>
      </view>
      <uni-popup ref="popup" type="bottom" @change="onPopUpChange">
        <view class="w-full"
              style="background-color: #fff; position: absolute; bottom: var(--sku-cart-popup-b);">
          <sku-cart
            @item_change="onCartChange"
          >
            <template v-slot:desc="scope">
              <view class="fs-32 mb-20">{{scope.extra.sku_id}}</view>
              <view  class="fs-32 mb-30">{{scope.extra.sku_tags ? scope.extra.sku_tags.join(',') : ''}}</view>
              <view>{{scope.extra.price}}</view>
            </template>
          </sku-cart>
        </view>
      </uni-popup>

<!--      <sku-page class="overflow-hidden" id="page1"></sku-page>-->
    </view>
  </page-wrapper>
</template>

<script setup lang="ts" auto>
import { checkLocationEnable } from "@/utils/permission";
import { sleep } from "@/utils/time";
import IconMask from "@/components/iconMask.vue";
import PageLoading from "@/components/pageLoading.vue";


const {proxy} = getCurrentInstance()

let {ins: store, refs} = $getStore("Shop");
let { longitude, latitude, showMap, shopStep,needGetLocation } = refs

let {ins: storeCart} = $getStore("Cart");

let isOpen = ref(false);
function onPopUpChange(e) {
  isOpen.value = e.show
}
function open(){
  // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
  proxy.$refs?.popup[isOpen.value ? 'close' : 'open']()
  // console.log(proxy.$refs?.popup);
}

function onAdd() {
  let skuId = "sku" + Date.now()
  storeCart.pushItem(skuId, {
    num: 1,
    extra: {
      sku_id: skuId,
      price:10,
      sku_name: 'sku1',
      sku_tags: ['大杯','5分糖','正常冰']
    }
  })
  proxy.$nextTick(() => {
    onCartChange()
  })
}

let totalPrice = ref(0);
let totalCount = ref(0);

function onCartChange() {
  let {num, price} = storeCart.getCollect()
  totalCount.value = num
  totalPrice.value = price
}


onShow(async () => {
  await sleep(1000)
  store.shopStep = 'selected'
  // console.log(refs.needGetLocation, needGetLocation.value);
  // if (refs.needGetLocation.value) {
  //   store.shopStep = 'needSelect'
  //   checkLocationEnable(function() {
  //     uni.getLocation({
  //       type: 'gcj02',
  //       success: function (res) {
  //         store.longitude = res.longitude
  //         store.latitude = res.latitude
  //         // store.showMap = true
  //         console.log('当前位置的经度：' + res.longitude);
  //         console.log('当前位置的纬度：' + res.latitude);
  //         store.needGetLocation = false
  //       },
  //       fail: function(e) {
  //         console.log('getLocation：' + e.message);
  //         uni.showToast({
  //           title: '定位失败',
  //           duration: 2000
  //         });
  //       }
  //     });
  //   })
  // }
})
</script>

<style lang="scss">
.sku-sell {
  --sku-cart-action-h:80rpx;
  --sku-cart-popup-b: calc(var(--sku-cart-action-h) + var(--tabbar-height) + 40rpx);
}
.cart-action-dot {
  background-color: var(--color-success); transform: scale(.8) translateX(-40%) translateY(40%); text-align: center; width: 30rpx; height: 30rpx; color: #fff; border-radius: 1000px
}
.fz-less-webview .cart-action-dot {
  transform: scale(1);
  width: 20rpx;
  height: 20rpx;
  line-height: 20rpx;
}
</style>

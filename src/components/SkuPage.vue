<template>
  <view class="list-page h-full">
    <!--    {{ triggered }}-->
    <view class="flex h-full">
      <view class="list-page__categorys">
<!--        <view @click="goToIndex(2)">滚动到第2个</view>-->
        <view v-for="category in categories"
              class="list-page__category pl-10"
              @click="goToIndex(category.APP_SKU_INDEX)">
          <view>跳{{category?.APP_SKU_INDEX}}</view>
        </view>
      </view>
      <scroll-view
        id="scroll-con"
        :scroll-into-view="scrollTop"
        :scroll-with-animation="enableAnimation"
        class="list-scroll-con" scroll-y="true"
        :refresher-enabled="false"
        :refresher-triggered="triggered"
        :refresher-threshold="100"
        refresher-background="transparent"
        @refresherpulling="obj.onPulling"
        @refresherrefresh="obj.onRefresh"
        @refresherrestore="obj.onRestore"
        @refresherabort="obj.onAbort">
        <view style="height: var(--list-con-height)"
              v-if="items.length < 1">empty</view>
        <view class="list-card-item"
              :id="'item-' + index"
              :class="{['item-' + index]: true}"
              v-for="(item, index) in items">
          <view class="pb-10" v-if="item.needShowCategory">
            标题栏 {{item.category_id}}
          </view>
          <view>{{ item.sku_id }}</view>
          <view>{{index + 1}} </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts" auto>
import { sleep } from "@/utils/time";
import { useRefresh } from "@/hooks/useRefresh";
import { mockListData } from "@/frame/mock";
import apiTest from "@/api/apiTest";

let items = reactive([]);
let categories = reactive([]);

let { proxy } = getCurrentInstance()
let observer;

function reset(newItems = []) {
  if (observer) {
    observer.disconnect();
  }
  observer = uni.createIntersectionObserver(proxy)

  // console.log(' Record<any, any>', newItems);
  items.splice(0);
  newItems.slice(0, 20).forEach((item, index) => {
    items.push(item);
    // setTimeout(() => {
    //   observer.relativeTo(".list-scroll-con", { bottom: 50 })
    //     .observe(".item-" + item.id, (res) => {
    //       console.log(res.intersectionRatio, item.id, index);
    //       if (res.intersectionRatio > 0) {
    //         item.hide.value = true
    //       } else {
    //         item.hide.value = false
    //       }
    //     });
    // }, 300)
  });
  setTimeout(() => {
    newItems.slice(20).forEach(item => {
      // item.hide = ref(false);
      items.push(item);
    });

  }, 300);
}

// let getQueryRect = async function(sel) {
//   return new Promise<Object>(resolve => {
//     const query = uni.createSelectorQuery().in(proxy);
//     query.select(sel).boundingClientRect(data => {
//       resolve(data)
//     }).exec();
//   })
// }

// list 跳转
let scrollTop = ref('')
let enableAnimation = ref(false)
async function goToIndex(index) {
  enableAnimation.value = true
  scrollTop.value = 'item-' + index
  await sleep(1000)
  scrollTop.value = ''
  enableAnimation.value = false
}



function transformSeverData(obj = {}) {
  let str = JSON.stringify(obj);
  return JSON.parse(str, function(key, value) {
    // console.log(key);
    // console.log(key, value, this);
    if (key === 'create_time') {
      return new Date(value);
    }
    if (key === 'update_time') {
      return new Date(value);
    }
    if (key == 'category_skus') {
      return value.split(',')
    }
    return value
  })
}

async function fetchItems(): Promise<any> {
  let data = await apiTest.getShopSkus();
  let newData: Record<any, any> = transformSeverData(data)
  let skus = newData.skus

  // console.log('newData', newData);

  let items = []
  newData.categories.forEach(category => {
    category.category_skus.forEach((skuId, skuIdIndex) => {
      let sku = skus.find(item => item.sku_id === skuId);
      sku.category_id = category.category_id
      if (skuIdIndex === 0) {
        sku.needShowCategory = true
        category.APP_SKU_INDEX = items.length
      }
      items.push(sku)
    })
  })

  items = items.concat(mockListData())

  // console.log(items);

  return {items, newData}
}

async function getData() {

  let {items, newData} = await fetchItems()
  categories.splice(0)
  newData.categories.forEach(v => {
    categories.push(v)
  })
  // console.log(categories);
  reset(items);

  await sleep(300)
  // console.log('refresh');
  uni.stopPullDownRefresh();

}

onPullDownRefresh(() => {
  console.log('onPullDownRefresh');
  goToIndex(0)
  getData()
})


let obj = useRefresh(getData);
let { triggered } = obj;


// console.log("sssssssssssssssssssssssssssssssss");

setTimeout(() => {
  uni.startPullDownRefresh();
}, 50);

</script>


<style lang="scss">
.list-page {
  --list-con-height: calc(100%);
  --list-item-height: 150upx;
  &__categorys {
    width: 150upx;
  }
  &__category {
    height:120upx;
    //line-height:120upx;
  }
}

.list {
  &-scroll-con {
    height: var(--list-con-height);
  }


  &-card-item {
    min-height: var(--list-item-height);
    //contain-intrinsic-size: auto var(--list-item-height);
    //content-visibility: auto
  }

}
</style>

<template>
  <view class="page-wrapper"
        :class="{'page-wrapper--noTabbar': !showTabbar }"
      :style="styleObj"
  >
    <navigatorbar></navigatorbar>
    <view class="page-wrapper__content">
      <slot></slot>
    </view>
    <tabbar v-if="showTabbar" class="page-wrapper__tabbar"></tabbar>
  </view>
</template>

<script setup>
import tabbar from "@/components/tabbar.vue";
import navigatorbar from "@/components/navigatorbar.vue"

let systemInfo = uni.getSystemInfoSync();
// console.log(systemInfo);

let safeAreaInsets = systemInfo.safeAreaInsets

let styleObj = reactive({
  '--safe-area-inset-top': safeAreaInsets.top + 'px'
})

console.log(safeAreaInsets.top);

defineProps({
  showTabbar: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss">

.page-wrapper {
  height: 100%;
  &__content {
    height: calc(100% - var(--navigation-bar-height) - var(--tabbar-height) - var(--safe-area-inset-top));
  }
}
.page-wrapper--noTabbar {
  --tabbar-height: 0;
  .page-wrapper__content {
    //height: calc(100% - var(--navigation-bar-height) - var(--safe-area-inset-top));
  }
}

.page-wrapper__tabbar {
  //height: var(--tabbar-height);
  //background: var(--primary-color);
}
</style>

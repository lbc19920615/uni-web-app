<template>
  <view class="page-wrapper" :class="{'page-wrapper--noTabbar': !showTabbar }">
    <view class="page-wrapper__content">
      <slot></slot>
    </view>
    <tabbar v-if="showTabbar" class="page-wrapper__tabbar"></tabbar>
  </view>
</template>

<script setup>
import tabbar from "@/components/tabbar.vue";
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
    height: calc(100% - var(--tabbar-height));
  }
}
.page-wrapper--noTabbar {
  .page-wrapper__content {
    height: 100%;
  }
}

.page-wrapper__tabbar {
  //height: var(--tabbar-height);
  //background: var(--primary-color);
}
</style>

<template>
  <page-wrapper-detail>
    <view>
      linkScroll

      <linkScrollCom :left="goodLeft" @myevent="onMyevent"></linkScrollCom>
    </view>
  </page-wrapper-detail>
</template>

<script setup lang="ts">
import linkScrollCom from "@/components/linkScrollCom.vue"
import PageWrapperDetail from "@/components/pageWrapperDetail.vue";

let goodLeft = ref(0)
function onMyevent(e) {
  // console.log('onMyevent', e);
  goodLeft = e.left
}
</script>

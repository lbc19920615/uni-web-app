<template>
  <page-wrapper>
    <view>
      linkScroll

      <linkScrollCom :left="goodLeft" @myevent="onMyevent"></linkScrollCom>
    </view>
  </page-wrapper>
</template>

<script setup lang="ts">
import linkScrollCom from "@/components/linkScrollCom.vue"

let goodLeft = ref(0)
function onMyevent(e) {
  console.log('onMyevent', e);
  goodLeft = e.left
}
</script>

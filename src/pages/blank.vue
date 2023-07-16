<template>
  <page-wrapper>
    <view> 用于快速复制
    </view>
  </page-wrapper>
</template>

<script setup lang="ts">
let goodLeft = ref(0)
function onMyevent(e) {
  goodLeft = e.left
}
</script>

<style lang="scss">

</style>

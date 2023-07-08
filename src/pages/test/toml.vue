<template>
  <page-wrapper>
    <view class="flex gap-20 p-20">
      <view class="flex-1">
        <textarea
          class="w-full border border-solid bdc-text-fourth h-850"
          v-model="inputStr" @blur="onBlur" :maxlength="-1"></textarea>
      </view>
      <view class="flex-1">
        <textarea
          class="w-full border border-solid bdc-text-fourth h-850"
          v-model="outPutStr"
          cols="30"></textarea>
      </view>
    </view>
    <view class="flex p-20">
      <view v-html="errStr"></view>
    </view>
  </page-wrapper>
</template>

<script setup lang="ts">
import toml from "@/toml/index.js"

let inputStr = ref("")
let outPutStr = ref("")
let errStr = ref("")

function onBlur() {
  // console.log(inputStr.value);
  try {
    errStr.value = ''
    outPutStr.value = JSON.stringify(toml.parse(inputStr.value), null, 2);
  } catch (e) {
    // console.log(e);
    errStr.value = e.message;
  }
}
</script>

<style lang="scss">

</style>

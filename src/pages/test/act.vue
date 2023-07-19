<template>
  <page-wrapper-detail>
    <view class="act-con" :style="cssStyle">
      111 {{ state.options }}
    <mp-html :content="state.html" :editable="true" @linktap="onLinkTap"></mp-html>
    </view>
  </page-wrapper-detail>
</template>

<script setup lang="ts">
	import mpHtml from '@/components/mp-html/mp-html.vue'
let {proxy} = getCurrentInstance()

let state = reactive({
  options: {},
  html: '<div class="r-text">这是html</div><div> <a href="link">link1</a><a href="link">link2</a></div>'
})

let cssStyle = ref('')
cssStyle.value = '--text-color: rgb(67, 179, 179); '

onShow(() => {
  let lastPage = getCurrentPages().at(-1);
  console.log(lastPage);
  state.options = lastPage?.options || lastPage?.$page.options
})

function onLinkTap(e) {
  console.log(e);
}


</script>

<style lang="scss">
//  .act-con {
//     --text-color: rgb(67, 179, 179)
//   }

.r-text {
  color: var(--text-color)
}
</style>
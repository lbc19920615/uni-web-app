<template>
  <page-wrapper-detail>
    111 {{ state.options }}
    <mp-html :content="state.html" @linktap="onLinkTap"></mp-html>
  </page-wrapper-detail>
</template>

<script setup lang="ts">
let {proxy} = getCurrentInstance()

let state = reactive({
  options: {},
  html: '<div>这是html</div><div><a href="link">link</a></div>'
})
onShow(() => {
  let lastPage = getCurrentPages().at(-1);
  console.log(lastPage);
  state.options = lastPage?.options || lastPage?.$page.options
})

function onLinkTap(e) {
  console.log(e);
  
}

</script>
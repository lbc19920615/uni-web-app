<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>

<style lang="scss">
//@debug $uni-bg-color;

uni-page-wrapper {
  view-transition-name: wrapper;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: .1s;
}

::view-transition-old(wrapper),
::view-transition-new(wrapper) {
  animation-duration: 1s;
}
</style>

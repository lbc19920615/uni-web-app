<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import Button from "@/uni_modules/uv-ui-tools/libs/mixin/button";
onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
})
</script>

<script lang="ts">
import { initFrame } from "@/frame/app";
import { tabbarList } from "@/config/app";

export default {
  onLaunch() {
    console.log("Launch");
    initFrame({
      context: this
    })
  },
  globalData: {
    version: '1.0.1',
    tabbar: {
      list: tabbarList
    }
  }
}
</script>

<style lang="scss">


html, page {
  --tabbar-height: 100upx;
  --primary-color: #{$uni-color-primary};
  --color-primary: #{$uni-color-primary};
  --color-success: #{$uni-color-success};
  --color-warning: #{$uni-color-warning};
  --color-error: #{$uni-color-error};
  --text-primary: #{$uni-text-primary}; // 一级信息，标题，主内容文字等
  --text-secondary: #{$uni-text-secondary}; // 辅助文字，次要信息等
  --text-thirdly: #{$uni-text-thirdly};
  --text-fourth: #{$uni-text-fourth};
}

.page-wrapper {
  button {
    font-size: 28upx;
    &:after {
      border: none;
    }
  }
}

<!-- #ifdef H5 -->
uni-page-head {
  view-transition-name: head;
}

uni-page-body {
  height: 100%;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 1s;
}

::view-transition-old(head),
::view-transition-new(head) {
  animation-duration: .1s;
}

.uni-tabbar-bottom {
  display: none !important;
}

html {
  --tab-bar-height: 0px !important;
}


<!-- #endif -->

<!-- #ifdef MP-WEIXIN -->
page {
  height: 100%;
}

page-wrapper {
  height: 100%;
}

button:after {
  border: none;
}
<!-- #endif -->
</style>



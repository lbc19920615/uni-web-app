<script setup lang="ts" auto>
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import Button from "@/uni_modules/uv-ui-tools/libs/mixin/button";
import { $getStore } from "@/frame/app";
import { sleep } from "@/utils/time";
onLaunch(async () => {
  console.log('App Launch');

  // let { ins: storeList } = $getStore("List")

  // console.log(storeList);

  // await sleep(1000)
  //
  // storeList.setItems();
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
// import { tabbarList } from "@/config/app";
import pageJson from "./pages.json"

export default {
  onLaunch() {
    // console.log("Launch");
    initFrame({
      context: this
    })
  },
  globalData: {
    version: '1.0.1',
    infoSync: uni.getSystemInfoSync(),
    cacheSync: false,
    tabbar: pageJson.tabBar
  }
}
</script>

<style lang="scss">


html, page {
  --navigation-bar-height: 80upx;
  --navigation-bar-bg-color: var(--primary-color);
  --navigation-bar-text: #fff;
  --tabbar-height: 100upx;
  --primary-color: #{$uni-color-primary};
  --color-primary: #{$uni-color-primary};
  --color-success: #{$uni-color-success};
  --color-warning: #{$uni-color-warning};
  --color-error: #{$uni-color-error};
  --color-text-primary: #{$uni-text-primary}; // 一级信息，标题，主内容文字等
  --color-text-secondary: #{$uni-text-secondary}; // 辅助文字，次要信息等
  --color-text-thirdly: #{$uni-text-thirdly};
  --color-text-fourth: #{$uni-text-fourth};
  --color-background: #{$uni-bg-color-grey};
  --color-white: #fff;
  --text-primary: #{$uni-text-primary}; // 一级信息，标题，主内容文字等
  --text-secondary: #{$uni-text-secondary}; // 辅助文字，次要信息等
  --text-thirdly: #{$uni-text-thirdly};
  --text-fourth: #{$uni-text-fourth};
  --def-padding: 20upx;
  --def-bgc-color: #fff;
}

.page-wrapper {
  --font-def-size: 28upx;
  font-size: var(--font-def-size);
  button {
    font-size: var(--font-def-size);
    &:after {
      border: none;
    }
  }

  button[type=primary] {
    background-color: var(--primary-color);
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
  animation-duration: .5s;
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


@import "@/uni_modules/zx/index.scss";


.text-thirdly {
  color: var(--text-thirdly)
}

.text-fourth {
  color: var(--text-fourth)
}

.arrow {
  border: solid black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 2px;
  position: relative;
  top: -3rpx;
  &-right {
    transform: rotate(-45deg);
  }

  &-left {
    transform: rotate(135deg);
  }

  &-up {
    transform: rotate(-135deg);
  }

  &-down {
    transform: rotate(45deg);
  }
}


</style>



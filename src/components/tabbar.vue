<template>
  <view class="tabbar" >
    <view v-for="(tabbar, index) in tabbarList"
          :class="tabbarItemCls(index)"
          class="tabbar__item" @click="selectItem(index)"><view>{{tabbar.text}}</view></view>
  </view>

<!--  <custom-tab-bar :show-icon="false" :selected="selected" @onTabItemTap="onTabItemTap" />-->
</template>

<style lang="scss">
.tabbar {
  display: flex;
  align-items: center;
  height: var(--tabbar-height);
}
.tabbar__item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.tabbar-selected {
  color: var(--primary-color);
  //background: #333;
}
</style>

<!--<script setup lang="ts">-->
<!--import uvTabbar from "@/uni_modules/uv-tabbar/components/uv-tabbar/uv-tabbar.vue";-->
<!--import uvTabbarItem from "@/uni_modules/uv-tabbar/components/uv-tabbar-item/uv-tabbar-item.vue";-->
<!--</script>-->
<script  lang="ts">

import { tabbarList } from "@/config/app";
import { useInit } from "@/hooks/useInit";

export default {
  data() {
    // let pages = getCurrentPages()
    // let page = pages[0]
    // console.log(pages);
    // let curPath = '/' + page.route
    // console.log(curPath);
    return {
      isSelected: 0,
      tabbarList
    }
  },
  mounted() {
    const { pageName, pagePath, pageQuery } = useInit();
    console.log(pageName, pagePath, pageQuery, 'pageName,pagePath, pageQuery');
    this.isSelected = tabbarList.findIndex(v => pagePath.startsWith( v.pagePath))
  },
  methods: {
    tabbarItemCls(index) {
      return this.isSelected === index ? 'tabbar-selected' : ''
    },
    onTabItemTap(e) {
      console.log("onTabItemTap", e);
    },
    selectItem(index) {
      // this.isSelected = index
      uni.switchTab({
        url: this.tabbarList[index].pagePath
      })
    }
  }
}
</script>

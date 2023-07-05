<template>
  <view class="cus-tabbar"
        :style="{'--tabbar-selected-color': tabbar.selectedColor, '--tabbar-fz': tabbar.fontSize}">
    <view v-for="(tabbar, index) in tabbarList"
          :class="tabbarItemCls(index)"
          class="cus-tabbar__item" @click="selectItem(index)">
      <uni-icons color="var(--tabbar-item-color)" :type="tabbar.icon" size="30"></uni-icons>
      <view>{{tabbar.text}}</view>
    </view>
  </view>

<!--  <custom-tab-bar :show-icon="false" :selected="selected" @onTabItemTap="onTabItemTap" />-->
</template>

<style lang="scss">
.cus-tabbar {
  display: flex;
  align-items: center;
  height: var(--tabbar-height);
  position: fixed;
  width: 100%;
  z-index: 1000;
  background: #ffff;
}
.cus-tabbar__item {
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size:  var(--tabbar-fz);
}
.cus-tabbar-selected {
  color: var(--tabbar-selected-color);
  --tabbar-item-color:  var(--tabbar-selected-color)
}
</style>

<script  lang="ts">

import { useInit } from "@/hooks/useInit";
import pageJson from "../pages.json"
import UniIcons from "@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue";

// console.log(pageJson);

let tabbarList = pageJson.tabBar.list

export default {
  components: { UniIcons },
  data() {
    // let pages = getCurrentPages()
    // let page = pages[0]
    // console.log(pages);
    // let curPath = '/' + page.route
    // console.log(curPath);
    return {
      tabbar: pageJson.tabBar,
      isSelected: 0,
      tabbarList
    }
  },
  mounted() {
    const { pageName, pagePath, pageQuery } = useInit();
    // console.log(pageName, pagePath, pageQuery, 'pageName,pagePath, pageQuery');
    this.isSelected = tabbarList.findIndex(v => pagePath.startsWith( '/' +  v.pagePath))
  },
  methods: {
    tabbarItemCls(index) {
      return this.isSelected === index ? 'cus-tabbar-selected' : ''
    },
    onTabItemTap(e) {
      console.log("onTabItemTap", e);
    },
    selectItem(index) {
      // this.isSelected = index
      uni.switchTab({
        url: '/' + this.tabbarList[index].pagePath
      })
    }
  }
}
</script>

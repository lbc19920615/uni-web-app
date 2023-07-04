

<template>
  <pageWrapper :show-tabbar="true">
    <view>
      <!-- 头像显示圆点 -->
      <uni-list-chat title="用户名" class=" mb-20"
                     avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
                     note="" time="" badge-positon="left"></uni-list-chat>

      <uni-grid :square="false" :show-border="false" :column="4" :highlight="true" @change="onChange">
        <uni-grid-item v-for="(item, index) in 8" :index="index" :key="index">
          <view class="flex flex-col justify-center mb-20" >
            <uni-icons type="image" :size="30" color="#777" />
            <text class="text text-center fs-24">功能{{index}}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>
  </pageWrapper>
</template>

<script lang="ts" setup auto>
import pageWrapper from "@/components/pageWrapper.vue"
function onChange(e) {
  let {
    index
  } = e.detail
  this.list[index].badge && this.list[index].badge++

  uni.showToast({
    title: `点击第${index+1}个宫格`,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped></style>

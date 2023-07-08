
  <template>

  <page-wrapper-detail>
    <view class="bgc-background"><scroll-view __eid__="id111"  scroll-y="true" class="height-500"><view __eid__="id1212"  class="overflow-hidden height-360"><view __eid__="id11111" >简单demo</view><view __eid__="id11112" >{{page.a}} + {{page.b}} = {{page.c}}</view></view><button __eid__="id1213" >button</button></scroll-view></view>
  </page-wrapper-detail>
  
</template>

<script setup lang="ts">

      const $app = getApp();
      const $frame = $app.globalData.frame;
      const $getStore = $frame.getStore;

import { injectStore } from "@/frame/storeMan";



@injectStore('page')
class def{
 a = 1;
 b = 2;
get c() {
  return this.a+this.b
}
s() {
  this.a = this.a + 1
}

}

let {ins: page, refs} = $getStore('page');
console.log(page);
        
  
</script>

<style lang="scss">

  
  
</style>
  
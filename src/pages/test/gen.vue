
  <template>

  <page-wrapper-detail>
<scroll-view __eid__="id111"  scroll-y="true" class="h-full"><video __eid__="id1223"  class="w-full" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"></video><view __eid__="id__ojst8a"  class="" style="color:rgba(242, 244, 245, 1);background-color:rgba(37, 142, 228, 1)">测试</view><view __eid__="id1212"  class="overflow-hidden height-260"><view __eid__="id11111"  class="">简单demo</view><view __eid__="id11112"  class="">{{state.a}} + {{state.b}} = {{state.c}}</view></view><button __eid__="id1213"  class="" @click="state.s">button</button><view __eid__="idlnr5jbpb07"  class="">是的是的是</view></scroll-view>
 </page-wrapper-detail>
  
</template>

<script setup lang="ts">

      const $app = getApp();
      const $frame = $app.globalData.frame;
      const $getStore = $frame.getStore;




      let {ins: state, refs} = $getStore('state');
console.log(state);
      

        console.log(1)
        


  
</script>

<style lang="scss">

  
  
</style>
  
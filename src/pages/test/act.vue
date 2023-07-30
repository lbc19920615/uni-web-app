<template>
  <page-wrapper-detail>
    <view class="act-con" :style="cssStyle">
      {{ state.options }}


<!-- <rt-scroll-y style="width: 160rpx; --rt-scroll-y-h: 860rpx;" :lL="10">
  <view class="w-160 h-150">11111</view>
  <view class="w-160 h-150">11111</view>
  <view class="w-160 h-150">11111</view>
  <view class="w-160 h-150">11111</view>
  <view class="w-160 h-150">11111</view>
  <view class="w-160 h-150">11111</view>
  <view class="w-160 h-150">11111</view>
  <view class="w-160 h-150">11111</view>
  <view class="w-160 h-150">11111</view>
  <view class="w-160 h-150">11111</view>
</rt-scroll-y> -->

      <scroll-view style="height: 600rpx;" scroll-y>
        <view class="grid  grid-cols-10">
          <view v-for="code in strCodeArr">{{ code }}</view>
        </view>
      </scroll-view>
      <!-- <mp-html :content="state.html" :editable="true" @linktap="onLinkTap"></mp-html> -->

      <view id="some_div" style="font-size: 12px; position: absolute; scale: var(--result);">&nbsp;</view>
    </view>
  </page-wrapper-detail>
</template>

<script setup lang="ts">
import { getCurPageOptions } from "@/utils/uni"
import {initCssContainer} from "@/utils/style"
import { initModelContext, injectControl } from "@/frame/model";

// import mpHtml from '@/components/mp-html/mp-html.vue'
// import { sleep } from '@/utils/time'

let appContext = initModelContext('app');
let $control = new Proxy(appContext, {
  get(proxyObj, name) {
    // console.log(proxyObj, name);
    return proxyObj.getControl(name)
  }
})

let { proxy } = getCurrentInstance()


// import {strCodeArr} from "@/utils/code"

@injectControl('some')
class Some1 {
  config = 1
  dialogVisible = false
  isOk = false
  get some() {
    return this.config
  }
  dom() {
    this.config = 22
  }
}

console.log($control['some']);



let state = reactive({
  options: {},
  html: '<div class="r-text">这是html</div><div> <a href="link">link1</a><a href="link">link2</a></div>'
})

let cssStyle = ref('')


let cssCalcContainer = initCssContainer({
  cssMap: {
    main: {
      assignMents: [
        // ['fun', 'p3', ['fun1', ['p1']]],
        // ['assign', 's111', `@(fetch,['1', '2'])`],
        // ['worker', ['2 > 1'], '__fetch_c1',  '__if_else_empty'],    
        ['assign', 'p1', `(@(lastArg,[1, $gloA1]) + 1) / $gloA1`],
        ['assign', 'p2', `@(str_append,['1', '2'])`],
        ['log', `hello p1: $p1`],
        ['assign', 's1', `(2 > 1) + 2`],
        ['await:assign', '', `@(fetch,['1', '2'])`],
        // ['if', ['$p1 > 1', '$p1 > 0'], '__if_c1', '__if_c2',  '__if_else_empty'],    
        // ['for', [1,2,3,4,5,6,7,8,9,10], ['item', 'index'], '__loop_fun1']
      ],
    },
    fun1: {
      assignMents: [
        ['assign', 'fun1_p1', `($a1 + 1) + 1 + @(lastArg,[1,2,"3"])`],
        // ['assign', 'return', `@(get,["p3"])`],
      ],
      params: [
        'a1',
        'a2'
      ],
      outVars: ['fun1_p1']
    },
    __fetch_c1: {
      assignMents: [
        ['assign', 'f1', `1 + @(lastArg,[1,2,"3"])`],
      ],
      outVars: ['f1']
    },
    __if_c1: {
      assignMents: [
        ['assign', 'p1', `1 + @(lastArg,[1,2,"2"])`],
      ],
      outVars: ['p1']
    },
    __if_c2: {
      assignMents: [
        ['assign', 'p1', `1 + @(lastArg,[1,2,"2"])`],
      ],
      outVars: ['p1']
    },
    __if_else_empty: {
      assignMents: [
      ],
      outVars: []
    },
    __loop_fun1_c1: {
      assignMents: [
        ['log', `hello LOOP_INDEX: $item $index`],
        ['break']
      ],
      outVars: []
    },
    __loop_fun1: {
      assignMents: [
        ['assign', 'p1', `1 + $p1`],
        // ['log', `hello LOOP_ITEM: $item`],
        ['if', ['$index > 5'], '__loop_fun1_c1', '__if_else_empty']
      ],
      outVars: ['p1']
    }
  }
})



onShow(() => {
  // console.log(lastPage);
  state.options = getCurPageOptions()


  setTimeout(async () => {

    try {
      await cssCalcContainer.runCalc('main', {
        gloA1: 3
      })
    } catch(e) {
      console.log('cssCalcContainer error', e);
      
    }
  }, 50)
})

function onLinkTap(e) {
  console.log(e);
}


</script>

<style lang="scss">
.act-con {
  --result: 0
}

.r-text {
  color: var(--text-color)
}
</style>
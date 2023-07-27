<template>
  <page-wrapper-detail>
    <view class="act-con" :style="cssStyle">
      {{ state.options }}

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

// import mpHtml from '@/components/mp-html/mp-html.vue'
// import { sleep } from '@/utils/time'

let { proxy } = getCurrentInstance()

// import {strCodeArr} from "@/utils/code"

import {initCssContainer} from "@/utils/style"

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
        ['assign', 'p1', `(@(fun,[1, $gloA1]) + 1) / $gloA1`],
        ['assign', 'p2', `@(str_append,['1', '2'])`],
        ['log', `hello p1: $p1`],
        ['assign', 's1', `(2 > 1) + 2`],
        // ['if', ['2 > 1', 'c2'], '__if_c1', '__if_c2',  '__if_else_empty'],    
        ['for', 10, 'index', '__loop_fun1']
      ],
    },
    fun1: {
      assignMents: [
        ['assign', 'fun1_p1', `($a1 + 1) + 1 + @(fun,[1,2,"3"])`],
        // ['assign', 'return', `@(get,["p3"])`],
      ],
      params: [
        'a1',
        'a2'
      ],
      outVars: ['fun1_p1']
    },
    __if_c1: {
      assignMents: [
        ['assign', 'p1', `1 + @(fun,[1,2,"3"])`],
      ],
      outVars: ['p1']
    },
    __if_c2: {
      assignMents: [
        ['assign', 'p1', `1 + @(fun,[1,2,"3"])`],
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
        ['log', `hello LOOP_INDEX: $index`],
        ['break']
      ],
      outVars: []
    },
    __loop_fun1: {
      assignMents: [
        ['assign', 'p1', `1 + $p1`],
        // ['log', `hello LOOP_INDEX: $LOOP_INDEX`],
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
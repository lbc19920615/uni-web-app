<template>
  <page-wrapper-detail>
    <view class="act-con" :style="cssStyle">
      111 {{ state.options }}
      <mp-html :content="state.html" :editable="true" @linktap="onLinkTap"></mp-html>

      <view id="good" style="position: absolute; left: var(--result)">&nbsp;</view>
    </view>
  </page-wrapper-detail>
</template>

<script setup lang="ts">
import mpHtml from '@/components/mp-html/mp-html.vue'
import { sleep } from '@/utils/time'
let { proxy } = getCurrentInstance()
import JSON5 from 'json5'

const query = uni.createSelectorQuery()

let state = reactive({
  options: {},
  html: '<div class="r-text">这是html</div><div> <a href="link">link1</a><a href="link">link2</a></div>'
})

let cssStyle = ref('')


async function makestyle(cssCode = '') {
  return new Promise(resolve => {
    let context = {
    async fun(...args) {
      // console.log(args);
      return '1px'
    }
  }

  let regexp = /@\(([^\)]*)\)/g
  let match = cssCode.match(regexp)


  let newCssCode = cssCode
    match.forEach(async (funcArgBody, funcIndex) => {
      let funcNameRe = funcArgBody.match(/@\(([^,)]*)/)
      let funcName = funcNameRe[1]
      let args = funcArgBody.slice(funcNameRe[0].length).slice(1).slice(0, -1);
      // console.log(funcArgBody);
      // console.log(funcName);
      // console.log(args);
      if (context[funcName]) {
        let ret = await context[funcName](...JSON5.parse(args));
        // console.log(ret);
        
        newCssCode = newCssCode.replace(funcArgBody, ret)
      }
      
      if (funcIndex > match.length -2) {
        resolve(newCssCode)
      }
    });
  })
}




async function queryRect(key) {
  return new Promise(resolve => {
    query.select('#good').boundingClientRect(function (data) {
      // console.log(`得到布局位置信息 ${key}` + JSON.stringify(data));
      resolve(data.left)
    }).exec();
  })
}



let funMap = {
  main: {
    assignMents: [
      ['fun', 'p3',['fun1', ['p1']]],  
      ['assign', 'p1', `(@(fun,[1, {a: 1}]) + 1px) + 1px + @(fun,[1,2,"3"])`],
      ['assign', 'p2', `(@(fun,[1, {a: 1}]) + 1px) + 1px + @(fun,[1,2,"3"])`],   
    ],
  },
  fun1: {
    assignMents: [
      ['assign', 'p3', `(@(fun,["$a1"]) + 1px) + 1px + @(fun,[1,2,"3"])`],
      ['assign', 'return', `(@(fun,[1, {a: 1}]) + 1px) + 1px + @(fun,[1,2,"3"])`],
    ],
    params: [
      'a1',
      'a2'
    ]
  }
}

async function runFun(name, funContext = {}) {

  if (!funMap[name]) {
    throw new Error(`no fun ${name}`)
  }

  let assignMents = funMap[name]?.assignMents

  async function* __run() {
    for (let i = 0; i < assignMents.length; i++) {
      // console.log(funContext);
      let [type, key, item] = assignMents[i]
      if (type === 'assign') {
        let newCssCode = await makestyle(item)
        cssStyle.value = `--result: calc(${newCssCode})`;
        await sleep(60);
        let val =  await queryRect(key);
        console.log(key, newCssCode, val);
        
        funContext[key] = val
        yield val;
      } 
      else if(type === 'fun') {
        let inlineContext = {}
        let fun = funMap[item[0]]
        let params = fun.params ?? [];
        // console.log(params);

        params.forEach((paramName, index) => {
          inlineContext[paramName] = funContext[item[1][index]]
        })


        let val = await runFun(item[0], inlineContext)
        funContext[key] = val
        yield val
      }
      else {
        yield undefined
      }
    }
  }


  // let ret;
  for await (const num of __run()) {
      // console.log(`yield ${name}`, num);
      // Expected output: 1
      // ret = num
  }

  console.log(funContext);
  

  return funContext.return
}



onShow(() => {
  let lastPage = getCurrentPages().at(-1);
  // console.log(lastPage);
  state.options = lastPage?.options || lastPage?.$page?.options;


  setTimeout(async () => {
    await runFun('main')
  }, 1000)

  // query.select('#good').boundingClientRect(data => {
  //   console.log("得到布局位置信息" + JSON.stringify(data));
  // }).exec();
})

function onLinkTap(e) {
  console.log(e);
}


</script>

<style lang="scss">
//  .act-con {
//     --text-color: rgb(67, 179, 179)
//   }
.act-con {
  --result: 0
}

.r-text {
  color: var(--text-color)
}
</style>
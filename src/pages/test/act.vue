<template>
  <page-wrapper-detail>
    <view class="act-con" :style="cssStyle">
      {{ state.options }}
      <mp-html :content="state.html" :editable="true" @linktap="onLinkTap"></mp-html>

      <view id="good" style="font-size: 12px; position: absolute; scale: var(--result);">&nbsp;</view>
    </view>
  </page-wrapper-detail>
</template>

<script setup lang="ts">
import mpHtml from '@/components/mp-html/mp-html.vue'
import { sleep } from '@/utils/time'
// import { templateCalc } from '@/utils/calc'
import { deepClone } from '@/utils/clone'
let { proxy } = getCurrentInstance()
import JSON5 from 'json5'


let state = reactive({
  options: {},
  html: '<div class="r-text">这是html</div><div> <a href="link">link1</a><a href="link">link2</a></div>'
})

const query = uni.createSelectorQuery()

let cssStyle = ref('')

let varregexp = /\$([^\t\n\s\]\)'"])*/g;

function parseArgs(argStr, funContext = {}) {
  if (argStr) {
    if (typeof argStr === 'string') {
      let newVal;
      let newStr = argStr
      
      let vars = newStr.match(varregexp);
      if (Array.isArray(vars)) {
        // console.log(newStr);
        vars.forEach(varName => {
          let varPath = varName.slice(1)
          // console.log(varPath, funContext);
          
          newStr = newStr.replace(varName, funContext[varPath])
          // if (typeof funContext[varPath] === 'number') {
          //   newVal = parseFloat(newStr)
          // }
          newVal = newStr
        })
      } else {
        newVal = newStr
      }
      // console.log(newVal);
      
      return newVal
    }
  }
  return argStr
}

async function makestyle(cssCode = '', funContext = {}) {
  // console.log(funContext);
  return new Promise(resolve => {
    let functions = {
      async fun(...args) {
        return 1
      },
      async get(...args) {
        let name = args[0]
        // console.log(funContext[name]);

        return (funContext[name] ?? 0) + 'px'
      },
      str_append(...args) {
        let str = ''
        args.forEach(item => {
          str = str + item
        })
        return str
      }
    }

    let regexp = /@\(([^\)]*)\)/g
 
    let newCssCode =  parseArgs(cssCode, funContext)
    let match = newCssCode.match(regexp)

    match.forEach(async (funcArgBody, funcIndex) => {
      let funcNameRe = funcArgBody.match(/@\(([^,)]*)/)
      let funcName = funcNameRe[1]
      let args = funcArgBody.slice(funcNameRe[0].length).slice(1).slice(0, -1);
      // console.log(funcArgBody);
      // console.log(funcName);
      // console.log(args);
      if (functions[funcName]) {
        let ret = await functions[funcName](...JSON5.parse(args));
        // console.log(ret);

        newCssCode = newCssCode.replace(funcArgBody, ret)
      }

      if (funcIndex > match.length - 2) {
        resolve(newCssCode)
      }
    });
  })
}


async function queryRect(key) {
  return new Promise(resolve => {
    // query.select('#good').boundingClientRect(function (data) {
    //   console.log(`得到布局位置信息 ${key}` + JSON.stringify(data));
    //   resolve(data.left)
    // }).exec();
    query.select('#good').fields({
      // dataset: true,
      size: true,
      // scrollOffset: true,
      // properties: ['scrollX', 'scrollY'],
      computedStyle: ['scale', 'fontSize', 'backgroundColor'],
    }, function (res) {
      console.log(res);
      
      resolve(parseFloat(res.scale ) )
    }).exec();
  })
}



let funMap = {
  main: {
    assignMents: [
      // ['fun', 'p3', ['fun1', ['p1']]],
      ['assign', 'p1', `(@(fun,[1, '$gloA1']) + 1) / $gloA1`],
      ['assign', 'p2', `@(str_append,['1', '2'])`],
      ['log', `hello p1: $p1`]
      // ['if', 'p1', '__if_fun1', '__if_fun2'],    
      // ['for', 10, '__loop_fun1']
    ],
  },
  fun1: {
    assignMents: [
      ['assign', 'fun1_p1', `(@(get,["a1"]) + 1px) + 1px + @(fun,[1,2,"3"])`],
      // ['assign', 'return', `@(get,["p3"])`],
    ],
    params: [
      'a1',
      'a2'
    ],
    outVars: ['fun1_p1']
  },
  __if_fun1: {
    assignMents: [
      ['assign', 'p1', `1px + @(fun,[1,2,"3"])`],
    ],
    outVars: ['p1']
  },
  __if_fun2: {
    assignMents: [
      ['assign', 'p1', `1px + @(fun,[1,2,"3"])`],
    ],
    outVars: ['p1']
  },
  __loop_fun1: {
    assignMents: [
      ['assign', 'p1', `1px + @(get,["p1"])`],
    ],
    outVars: ['p1']
  }
}



async function runFun(name, funContext = {}) {

  if (!funMap[name]) {
    throw new Error(`no fun ${name}`)
  }

  let curFun = funMap[name]
  let assignMents = curFun?.assignMents
  let outVars = curFun.outVars ?? []

  async function* __run() {
    for (let i = 0; i < assignMents.length; i++) {
      // console.log(funContext);
      let type = assignMents[i][0]
      if (type === 'assign') {
        let [type, key, item] = assignMents[i]
        let val = undefined
        let newCssCode: any = await makestyle(item, funContext)
        // val = templateCalc(newCssCode, {})
        if (['+', '-', '/', '*'].some(v => newCssCode.includes(v))) {

          // val = templateCalc(newCssCode, {})          
          
          console.log(newCssCode);
          
          
            
          cssStyle.value = `--result: calc(${newCssCode})`;
          await sleep(30);
          val = await queryRect(key);
        }
        else {
          val = newCssCode
        }
        // console.log(key, newCssCode, val);        

        yield [key, val];
      }
      else if (type === 'fun') {
        let [type, key, item] = assignMents[i]
        let inlineContext = {}
        let fun = funMap[item[0]]
        let params = fun.params ?? [];
        // console.log(params);

        params.forEach((paramName, index) => {
          inlineContext[paramName] = funContext[item[1][index]]
        })


        let val = await runFun(item[0], inlineContext)
        // funContext[key] = val
        yield [key, val]
      }
      else if (type === 'if') {
        let [type, condition, fun1Name, fun2Name] = assignMents[i]
        let funName = condition ? fun1Name : fun2Name;

        // console.log(assignMents[i]);
        let objfunContext = deepClone(funContext)
        let val = await runFun(funName, objfunContext)
        let fun = funMap[funName]
        let outVars = fun.outVars ?? [];
        outVars.forEach(key => {
          funContext[key] = objfunContext[key]
        })
      }
      else if (type === 'for') {
        let [type, condition, funName] = assignMents[i]
        let fun = funMap[funName]
        let objfunContext = deepClone(funContext)
        let outVars = fun.outVars ?? [];
        for (let i = 0; i < condition; i++) {
          let val = await runFun(funName, objfunContext);
          outVars.forEach(key => {
            objfunContext[key] = objfunContext[key]
          })
        }

        outVars.forEach(key => {
          funContext[key] = objfunContext[key]
        })
      }
      else if (type === 'log') {
        let [type, ...args] = assignMents[i];
        let result = args.map(argStr => {
          let newStr = parseArgs(argStr, funContext)
          // let vars = argStr.match(varregexp)
          // vars.forEach(varName => {
          //   let varPath = varName.slice(1)
          //   newStr = newStr.replace(varName, funContext[varPath])
          // })
          return newStr
        })

        console.log(...result);
      }
      else {
        yield undefined
      }
    }
  }


  // let ret;
  for await (const ret of __run()) {
    // console.log(`yield ${name}`, num);
    // Expected output: 1
    // ret = num
    if (Array.isArray(ret)) {
      let [key, val] = ret
      funContext[key] = val
    }
  }

  console.log(funContext);


  return funContext[outVars[0]]
}



onShow(() => {
  let lastPage = getCurrentPages().at(-1);
  // console.log(lastPage);
  state.options = lastPage?.options || lastPage?.$page?.options;

  setTimeout(async () => {
    await runFun('main', { gloA1: 6 })
  }, 50)
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
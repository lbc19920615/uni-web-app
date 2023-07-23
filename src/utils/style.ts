import { templateCalc } from '@/utils/calc'
import { deepClone } from '@/utils/clone'

import JSON5 from 'json5'

const varregexp = /\$([^\t\n\s\]\)'"])*/g;

/**
 * 
 * @param key 
 * @param query 
 * @returns 
 */
async function queryRect(key, query = uni.createSelectorQuery()) {
  return new Promise(resolve => {
    query.select('#some_div').fields({
      // dataset: true,
      size: true,
      // scrollOffset: true,
      // properties: ['scrollX', 'scrollY'],
      computedStyle: ['scale', 'fontSize', 'backgroundColor'],
    }, function (res: any): void {
      // console.log(res);

      resolve(parseFloat(res.scale))
    }).exec();
  })
}

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

  
  return new Promise(resolve => {
    let functions = {
      async fun(...args) {
        console.log(this);
        
        if (Array.isArray(args) && args.length > 0) {
          return args.at(-1)
        }
        return 0
      },
      async get(...args) {
        let name = args[0]
        return (funContext[name] ?? 0)
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

    // console.log(funContext);
    
    let newCssCode = parseArgs(cssCode, funContext)
    let match = newCssCode.match(regexp);
    // console.log(match);


    if (Array.isArray(match)) {
      match.forEach(async (funcArgBody, funcIndex) => {
        let funcNameRe = funcArgBody.match(/@\(([^,)]*)/)
        let funcName = funcNameRe[1]
        let args = funcArgBody.slice(funcNameRe[0].length).slice(1).slice(0, -1);
        // console.log(funcArgBody);
        // console.log(funcName);
        // console.log(args);
        if (functions[funcName]) {
          // let parsedArgs = parseArgs(args, funContext)
          // console.log(args);
          
          let ret = await functions[funcName].bind({})(...JSON5.parse(args));
          // console.log(ret);

          newCssCode = newCssCode.replace(funcArgBody, ret)
        }

        if (funcIndex > match.length - 2) {
          resolve(newCssCode)
        }
      });
    } else {
      // console.log(newCssCode);

      resolve(newCssCode)
    }
  })
}


let BreakFLagSymbol = Symbol('BreakFLag');


let curRunCalcPoint = {
  context: null,
  name: ''
}


export function initCssContainer({ cssMap = {}, cssHack = null } = {}) {
  async function runCalc(name = 'main', funContext = {}) {

    if (!cssMap[name]) {
      throw new Error(`no fun ${name}`)
    }

    curRunCalcPoint = {
      context: funContext,
      name: name
    }

    let curFun = cssMap[name]
    let assignMents = curFun?.assignMents
    let outVars = curFun.outVars ?? []
    let hasBreak = false;


    async function* __run() {

      for (let i = 0; i < assignMents.length; i++) {    
        
        // console.log(funContext);
        let type = assignMents[i][0]
        if (type === 'assign') {
          let [type, key, item] = assignMents[i]
          let val = undefined;
          // console.log(item);
          let newCssStr: any = await makestyle(item, funContext);

          // if (['+', '-', '/', '*'].some(v => newCssStr.includes(v))) {
          //   // cssStyle.value = `--result: calc(${newCssStr})`;
          //   // await sleep(30);
          //   // val = await queryRect(key);
          //   val = templateCalc(newCssStr, {})
          // }
          // else {
          //   val = newCssStr
          // }

          if (cssHack) {
            val = await cssHack(newCssStr, funContext)
          } else {
            val = templateCalc(newCssStr, {})
          }

          yield [key, val];
        }
        else if (type === 'fun') {
          let [type, key, item] = assignMents[i]
          let inlineContext = {}
          let fun = cssMap[item[0]]
          let params = fun.params ?? [];
          // console.log(params);

          params.forEach((paramName, index) => {
            inlineContext[paramName] = funContext[item[1][index]]
          })


          let val = await runCalc(item[0], inlineContext)
          // funContext[key] = val
          yield [key, val]
        }
        else if (type === 'if') {
          let [type, conditions, ...functions] = assignMents[i]
          let funNameIndex = -1;
          conditions.some((condition, index) => {
            let newStr = parseArgs(condition, funContext);
            console.log(newStr);
            
            if (templateCalc(newStr, {})) {
              funNameIndex = index;
              return true
            }
            return false
          });

          // console.log(funNameIndex);
          

          let funName = functions.at(funNameIndex)


          // console.log(assignMents[i]);
          let objfunContext = deepClone(funContext)
          let val = await runCalc(funName, objfunContext)
          let fun = cssMap[funName]
          let outVars = fun.outVars ?? [];
          outVars.forEach(key => {
            funContext[key] = objfunContext[key]
          });

          // console.log(val);

          if (val === BreakFLagSymbol) {
            hasBreak = true
          }
        }
        else if (type === 'for') {
          let [type, max, indexName = 'LOOP_INDEX', funName] = assignMents[i]
          let fun = cssMap[funName]
          let objfunContext: any = deepClone(funContext)
          let outVars = fun.outVars ?? [];
          for (let i = 0; i < max; i++) {
            objfunContext[indexName]  = i;
            let val = await runCalc(funName, objfunContext);
            outVars.forEach(key => {
              objfunContext[key] = objfunContext[key]
            })

            // console.log(val);
            
            if (val === BreakFLagSymbol) {
               console.log('for break');
              //  throw new Error(`no fun ${curRunCalcPoint.name}`)
              //  return Promise.reject('sss')
               break;
            }
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
        else if (type === 'break') {
          // console.log(funContext, curRunCalcPoint);
          
          yield BreakFLagSymbol
        }
        else {
          yield undefined
        }
      }
    }


    // let ret;
    try {
      for await (const ret of __run()) {
        // console.log(`yield ${name}`, num);
        // Expected output: 1
        // ret = num
        if (Array.isArray(ret)) {
          let [key, val] = ret
          funContext[key] = val
        }
        if (ret === BreakFLagSymbol) {
          hasBreak = true
        }
      }
    } catch(e) {
      console.log('error', e);      
      throw e;
    }

    if (hasBreak) {
      return BreakFLagSymbol
    }

    // console.log(funContext);


    return funContext[outVars[0]]
  }

  return {
    runCalc
  }
}







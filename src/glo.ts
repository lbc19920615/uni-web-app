import { BaseVmControl } from "./frame/model";
import { $filterArr, $deepClone, $orderBy} from "@/frame/app";
import { deepClone } from "./utils/clone";

// export function App({globalData}) {
//     console.log(globalData);   
// }

export function isDefined(v) {
  return typeof v !== 'undefined'
}

export function onSkuCalcSubmit(extra: any, item: any) {
  let newItem = deepClone(unref(item))
  newItem.extra = deepClone(unref(extra));

  let somePriceTotal = 0;
  let somePrice = []
  let someGood = []
  extra.some.map(v => {
      let arr = v.split(':')
      let price =  parseFloat(arr.at(-1));
      if (!Number.isNaN(price)) {
        // // 转换成分
        // price = price * 100
        somePriceTotal = somePriceTotal + price;
      } else {
        price = 0
      }
      somePrice.push(price)
      someGood.push(arr[0])
  })

  if (!newItem.sku_tags) {
    newItem.sku_tags = []
  }

  newItem.sku_tags.push(extra.name)
  newItem.sku_tags.push(extra.age)

  // console.log(newItem.sku_id_display, someGood);
  

  newItem.sku_id_display  =  newItem.sku_id

  if (somePrice.length > 0) {
    newItem.sku_price = newItem.sku_price + somePriceTotal   
    newItem.sku_price_display =  newItem.sku_price / 100
    newItem.sku_tags = newItem.sku_tags.concat(someGood)
  }
  if (someGood.length > 0) {
    newItem.sku_id_display = newItem.sku_id + ":" + someGood.join('_')
  }

  
  console.log(newItem.sku_id_display, someGood);
  return newItem
}

export class BaseShopVm extends BaseVmControl {
  cachedItems = []
  items = []
  categorys = []
  curId = ''
  缓存(v = []) {
    this.cachedItems = v
  }
  搜索条件 = new Map()
  设置条件(name = '', order ='') {
    let v = this.搜索条件.get(name)
    if (v) {
      this.搜索条件.delete(name)
      
    } else {
      this.搜索条件.set(name, order)
    }
  }
  setCatorys(newItems = []){
     this.categorys.splice(0, this.categorys.length)
     this.categorys = newItems
  }
  onCatSet(scope) {
    // console.log(scope.item.originItem)
    this.setCur(scope.item.originItem)
  }
  setCur({category_id} = {}) {
    this.items.splice(0, this.items.length)
    let items = $filterArr($deepClone(this.cachedItems), [
      ['category_id', 'eq', category_id]
    ]);
    // console.log(items, category_id)
    this.items = items
    this.curId = category_id
  }
  get filterItems() {
    let arr = this.搜索条件
    let items = $deepClone(this.items)
    arr.forEach((value, key) => {
      // console.log(key)
      if (value[1] === 'orderBy') {
       items = $orderBy(items, [value[0]], [ value[2]]) 
      }
    })
    // console.log( items)
    return items
  }
  get initId() {
    if (!this.categorys[0]) {
      return ''
    }
    return this.categorys[0].category_id
  }
}
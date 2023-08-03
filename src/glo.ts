import { BaseVmControl } from "./frame/model";
import { $filterArr, $deepClone} from "@/frame/app";
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

  if (somePrice.length > 0) {
    newItem.sku_price = newItem.sku_price + somePriceTotal   
    newItem.sku_price_display =  newItem.sku_price / 100
    newItem.sku_tags = newItem.sku_tags.concat(someGood)
  }
  return newItem
}

export class BaseShopVm extends BaseVmControl {
  cachedItems = []
  items = []
  categorys = []
  curId = ''
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
  get initId() {
    if (!this.categorys[0]) {
      return ''
    }
    return this.categorys[0].category_id
  }
}
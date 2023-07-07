import { injectStore, useCache } from "@/frame/storeMan";
import { createBaseListItemConfig } from "@/next/store/baseList";

@injectStore('Shop', {
  partials: [
    ['BaseList'],
  ]
})
export default class {

  // @ts-ignore
  @useCache()
  longitude = 116.397486

  // @ts-ignore
  @useCache()
  latitude = 39.907013

  showMap = true

  needGetLocation = true

  shopStep = ""

  centerLocation = {}

  items = [
    ['shop0000001', createBaseListItemConfig({shop_name: "商铺1"})],
    ['shop0000001', createBaseListItemConfig({shop_name: "商铺1"})]
  ]
}

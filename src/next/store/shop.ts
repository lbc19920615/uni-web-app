import { injectStore, useCache } from "@/frame/storeMan";

@injectStore('Shop')
export default class {

  // @ts-ignore
  @useCache()
  longitude = 116.405285

  // @ts-ignore
  @useCache()
  latitude = 39.904989

  showMap = true

  needGetLocation = true

  shopStep = ""
}

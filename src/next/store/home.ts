import { injectStore } from "@/frame/storeMan";

import pageConfig from "../../pages.json"

@injectStore('Home')
export default class {
  a = 1
  b = 2

  arr = pageConfig.subPackages[0].pages
  get c() { return this.a + this.b }
  action1() {
    this.a = this.a + 1
  }
}

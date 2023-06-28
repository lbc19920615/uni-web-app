import { injectStore } from "@/frame/storeMan";

@injectStore('Home')
export default class {
  a = 1
  b = 2

  arr = Object.entries({
    'linkScroll': {},
    'form': {}
  })
  get c() { return this.a + this.b }
  action1() {
    this.a = this.a + 1
  }
}

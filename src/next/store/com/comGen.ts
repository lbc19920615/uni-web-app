
import { injectStore } from "@/frame/storeMan";
import { mock } from "@/frame/mock";
let $mock = mock

    
@injectStore('ComGen_state')
class state {
  a = 1
  items = $mock({ name: String }).items
  add() {
    let items = $mock({ name: String }).items
    items.forEach(v => {
      this.items.push(v)
    })
  }
}
   


@injectStore('ComGen_other')
class other {
  a = 1
}
   
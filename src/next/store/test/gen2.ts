
import { injectStore } from "@/frame/storeMan";
import { mock } from "@/frame/mock";
let $mock = mock;

    
@injectStore('TestGen2_state')
class state {
 a = 1;
 b = 2;
get c() {
  return this.a+this.b
}
s() {
  this.a = this.a + 1
}

  hobby = [
    {
      text: '111',
      value: '111'
    },
    {
      text: '222',
      value: '222'
    }
  ]
}
   
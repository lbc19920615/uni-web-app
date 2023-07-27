
import { injectStore } from "@/frame/storeMan";
import { mock } from "@/frame/mock";
let $mock = mock;

    
@injectStore('TestGen_state')
class state {
 a = 1;
 b = 2;
get c() {
  return this.a+this.b
}
s() {
  this.a = this.a + 1
}

  tabIndex = 0;
  tabs = ['示例1',  '示例2', '示例2', '示例2', '示例2', '示例2', '示例2', '示例2', '示例2', '示例2', '示例2'];

onSwiperChane(e) {
  this.tabIndex = e.detail.current;
}
}
   
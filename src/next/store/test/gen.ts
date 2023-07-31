
import { injectStore, useCache, cacheStore } from "@/frame/storeMan";
import { mock } from "@/frame/mock";
import { forward } from '@/utils/router';
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

@useCache()
needAd = false

@useCache()  
adNum = 0  
  
  tabIndex = 0;
  tabs = ['示例1',  '示例2', '示例3'];

  setNeedAd(val) {
    this.needAd = val
  }
  
onSwiperChane(e) {
  this.tabIndex = e.detail.current;
}
}
   

import { injectStore } from "@/frame/storeMan";
import { mock } from "@/frame/mock";
let $mock = mock;

    
@injectStore('TestMixue_state')
class state {
  tabIndex = 0;
  tabs = ['全部',  '历史', '退单'];

  onSwiperChane(e) {
    this.tabIndex = e.detail.current;
  }
}
   
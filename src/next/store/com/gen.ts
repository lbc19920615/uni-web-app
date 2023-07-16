
    import { injectStore } from "@/frame/storeMan";

    
  @injectStore('ComGen_state')
  class state {
  a = 1
  items = [
    {
      id: '21',
      name: '行政部',
    },
    {
      id: '22',
      name: '财务部',
    },
    {
      id: '23',
      name: '人力资源部',
    },
  ]
}
  
import { getStore } from "@/frame/storeMan";

interface Config {
   context: {
     globalData: Record<any, any>
   }
}

/**
 * 初始化
 */
export function initFrame(config: Config) {
  import.meta.glob('../next/store/*.ts', { eager: true });

  let frame = {
    getStore
  }
  config.context.globalData.frame =  frame
}

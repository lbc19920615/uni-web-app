import { getStore, getStoreMap } from "@/frame/storeMan";

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
  import.meta.glob('../next/store/*/*.ts', { eager: true });
  import.meta.glob('../next/form/*.ts', { eager: true });

  // let storeMap = getStoreMap();
  // console.log(storeMap);

  let frame = {
    getStore
  }
  config.context.globalData.frame =  frame
}

export let $getStore = getStore

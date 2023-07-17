import { getStore } from "@/frame/storeMan";
import { initServiceRes, reqService } from "@/frame/serviceMan";
import * as f from "@/frame/formMan";
import Nid from "nid";

interface Config {
   context: {
     globalData: Record<any, any>
   }
}

export let $nid = Nid

export let $reqService = reqService

export const $frame = {
  f
};

export function isNoneValue(v: any) {
  return typeof v === 'undefined'
}

/**
 * 初始化
 */
export function initFrame(config: Config) {
  import.meta.glob('../next/store/*.ts', { eager: true });
  import.meta.glob('../next/store/*/*.ts', { eager: true });
  import.meta.glob('../next/form/*.ts', { eager: true });
  let modules = import.meta.glob('../next/service/*.ts', { eager: true });
  initServiceRes(modules)

  // let storeMap = getStoreMap();
  // console.log(storeMap);

  // let frame = {
  //   getStore
  // }
  // config.context.globalData.frame =  frame
}

export let $getStore = getStore

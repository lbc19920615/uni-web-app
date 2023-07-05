import { uuidv4 } from "./utils/uuidv4";
import { deepClone } from "@/utils/clone";

let folderIndex = 0;

function simpleFolder(obj: any, i: number) {
  if (i % 10 === 0) {
    folderIndex = folderIndex + 1;
    obj.needTop = true;
  }
}

export function mockListData(total = 100, handle = simpleFolder) {
  let arr = [];
  for (let i = 0; i < total; i++) {
    let id = uuidv4();
    let obj = {
      id,
      sku_id: "p-" + id,
      category_id: "folder-" + folderIndex,
      needShowCategory: false
    };
    handle(obj, i);
    arr.push(obj);
  }
  return arr;
}

export function mockShops(total = 100) {
  let tpl = {
    "shopId": "shop000001",
    "shopUserId": "user0000001",
    "shopCategorys": "ca000001,ca000002",
    "create_time": "2023-06-30",
    "udpate_time": null,
    "shop_state": "online",
    "shop_name": "店铺1"
  };

  let arr = []

  for (let i = 0; i < total; i++) {
    let clone = deepClone(tpl)
    clone.shopId = "shop" + i
    clone.shop_name = "shop" + i
    arr.push(clone)
  }

  return arr
}

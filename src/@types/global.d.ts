
declare namespace Types {
  type Query = {
    replace?: boolean
    [propName: string]: any
  }
}

declare type Class = { new(...args: any[]): any; };

type ExtStore  = import("pinia").StoreGeneric

declare function $getStore(key: String): ExtStore | undefined;

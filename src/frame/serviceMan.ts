import __to from "await-to-js";
import __http from "@/utils/request";

let serviceModules = {};

export async function reqService(serviceName = '', data = {}) {
  if (serviceModules[serviceName]) {
    let def = new serviceModules[serviceName];
    console.log(def);
    let [err, ret] = await __to(__http[def.method](def.url, data))
    // console.log(err, ret);
    if (err) {
      return undefined
    }
    return ret
  }
  return undefined
}

export function initServiceRes(modules) {
  Object.entries(modules).forEach(([_, module]) => {
    Object.entries(module).forEach(([key, value]) => {
      serviceModules[key] = value
    })
  })

  console.log(serviceModules);
}

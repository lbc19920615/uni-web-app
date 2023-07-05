import { injectStore, partialStore, useCache } from "@/frame/storeMan";
import { deepClone } from "@/utils/clone";

@partialStore("BaseCart")
class BaseCart {
  // items = []
  items = []

  get checkedLen() {
    let count = 0;
    if(!this.items || this.items.length <1){
      return 0;
    }
    this.items.forEach((item: any) => {
      if (item[1].checked) {
        count = item[1].num + count
      }
    })
    return count
  }

  clearAllItems() {
    this.items.splice(0)
  }

  pushItem(skuId, {num = 1, checked = true, extra = {}} = {}) {
    this.items.push([skuId, { num:num, checked, extra }])
  }

  delItem(index) {
    this.items.splice(index,1)
  }

  toggleItemChecked(item) {
    item[1].checked = !item[1].checked
  }

  toggleCheckAll() {
    let checked =  this.checkedLen > 0 ? false : true
    this.items.forEach(item => {
      item[1].checked =checked
    })
  }

  getSelectedItems() {
    let res = deepClone(unref(this.items))
    return res.filter(v => {
      return v[1].checked
    })
  }
}

@injectStore('Cart', {
  partials: [
    ['BaseCart'],
  ]
})
export default class extends BaseCart {

  getCollect() {
    let items = this.getSelectedItems()
    let res = deepClone(items)
    let num = 0;
    let price = 0;
    res.forEach(item => {
      let curNum = item[1].num
      num = num + parseFloat(curNum)
      price = price + item[1].extra?.price * curNum
    })
    return {num, price}
  }
}

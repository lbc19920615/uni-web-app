import { initForm, field, required } from "@/frame/formMan"

class ObjItem {  
  @initForm('ObjItem')
  __init__;

  @required()
  @field('name1')
  get name1() {
    return ''
  }

  @required()
  @field('name2')
  get name2() {
    return ''
  }
}

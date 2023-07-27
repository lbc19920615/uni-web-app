import { initForm, field, required, format, isArray  } from "@/frame/formMan"

class ObjItem {  
  @initForm('ObjItem')
  __init__;

  @required()
  @field('name1')
  get name1() {
    return ''
  }

  @format('number')
  @required()
  @field('num1', {widgetType: 'number'})
  get num1() {
    return 0
  }

  @isArray({ min: 2 })
  @required()
  @field('爱好', {widgetType: 'multiCheckbox'})
  get hobby() {
    return []
  }
}

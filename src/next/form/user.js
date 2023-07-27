import { initForm, esObj  } from "@/frame/formMan.ts"
const { field, required, format } = esObj

@initForm('ObjItem1')
class ObjItem1 {  
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
}

<template>
  <page-wrapper-detail>
    <view>
      {{def.formData}}
      <uni-forms ref="dynamicForm2" :rules="def.rules" :modelValue="def.formData">
        <uni-forms-item label="姓名" name="name">
          <uni-easyinput type="text" v-model="def.formData.name" placeholder="请输入姓名" />
        </uni-forms-item>
        <uni-forms-item label="年龄" name="age">
          <uni-easyinput type="number" v-model="def.formData.age" placeholder="请输入年龄" />
        </uni-forms-item>
        <uni-forms-item name="hobby" label="兴趣爱好">
          <uni-data-checkbox multiple v-model="def.formData.hobby" :localdata="hobby"/>
        </uni-forms-item>
        <uni-forms-item v-for="(item,index) in def.vmMap.domains.list"
                        :key="item.id" :label="item.label+' '+item.id"
                        required :rules="item.rules" :name="'domains[' + item.id + ']'">
          <view class="form-item">
            <uni-easyinput v-model="def.formData.domains[item.id]" placeholder="请输入域名" />
            <button class="button" @click="def.vmMap.domains.funDel(item.id, () => { funDeleteProperty(def.formData.domains, item.id) })">删除</button>
          </view>
        </uni-forms-item>
      </uni-forms>

      <view class="button-group">
        <button type="primary"  @click="def.vmMap.domains.funAdd">新增域名</button>
        <button type="primary"  @click="submitForm('dynamicForm2')">提交</button>
      </view>


      <view>基础form</view>
      <view>{{formData}}</view>
      <uni-forms ref="dynamicForm" :rules="dynamicRules" :modelValue="formData">
        <uni-forms-item label="姓名" name="name">
          <uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
        </uni-forms-item>
        <uni-forms-item label="年龄" name="age">
          <uni-easyinput type="number" v-model="formData.age" placeholder="请输入年龄" />
        </uni-forms-item>
        <uni-forms-item  name="hobby" label="兴趣爱好">
          <uni-data-checkbox multiple v-model="formData.hobby" :localdata="hobby"/>
        </uni-forms-item>
        <uni-forms-item  name="birthDay" label="生日">
          <uni-datetime-picker
            type="date"
            v-model="formData.birthDay"
          />
        </uni-forms-item>
        <uni-forms-item v-for="(item,index) in dynamicLists" :key="item.id" :label="item.label+' '+item.id"
                        required :rules="item.rules" :name="'domains[' + item.id + ']'">
          <view class="form-item">
            <uni-easyinput v-model="formData.domains[item.id]" placeholder="请输入域名" />
            <button class="button" @click="del(item.id, formData.domains, item.id)">删除</button>
          </view>
        </uni-forms-item>
      </uni-forms>
      <view class="button-group">
        <button type="primary"  @click="add">新增域名</button>
        <button type="primary"  @click="submitForm('dynamicForm')">提交</button>
      </view>
    </view>
  </page-wrapper-detail>
</template>

<script setup lang="ts">
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;


import { field, required, defineSimpleForm, useSimpleForm, isArray, format, validateFunction } from "@/frame/formMan";
import { deepClone } from "@/utils/clone";
import PageWrapperDetail from "@/components/pageWrapperDetail.vue";

function validateEmail(rule,value,data,callback){
  if (typeof value === 'string') {
    if (!value.match(/\w+[^\s]+(\.[^\s]+){1,}/)) {
      callback('域名格式不对')
    }
  }
  return true
}

class A {
  static {
    defineSimpleForm('A', this, {
      mixins: [
        ['UserDef', {
          transform(base) {
            // console.log('base', base);
            base.birthDay = deepClone(base.birthDayTpl);
            Reflect.deleteProperty(base, 'birthDayTpl')
            return base
          }
        }]
      ]
    });
  }

  @required()
  @field('姓名')
  get name() {
    return ''
  }

  @format('number')
  @required()
  @field('年龄')
  get age() {
    return 0
  }

  @isArray({min: 2})
  @required()
  @field('爱好')
  get hobby() {
    return []
  }

  @validateFunction(validateEmail)
  @required()
  @field('域名', {dynamic: true})
  get domains() {
    return {}
  }
}

let def = useSimpleForm('A');

console.log(def.rules);

let funDeleteProperty = function(obj, id) {
  Reflect.deleteProperty(obj, id)
}




let formData = reactive({
  name: '',
  age: 0,
  birthDay: '',
  hobby: [],
  domains: {}
})

let hobby = [
  {
    text: '111',
    value: '111'
  },
  {
    text: '222',
    value: '222'
  }
]

let dynamicLists = reactive([])
let dynamicRules = {
  hobby: {
    rules: [
      {required: true, errorMessage: '爱好项必填'},
      {
        validateFunction:function(rule,value,data,callback){
          if (value.length < 2) {
            callback(`格式不对`)
          }
          return true
        }
      }
    ]
  }
}
function add() {
  let obj: Record<any, any> = {
    label: '域名',
    rules: [
      {
        'required': true,
         errorMessage: '域名项必填'
      },
      {
        validateFunction: function(rule, value, data, callback) {
          if (typeof value === 'string') {
            if (!value.match(/\w+[^\s]+(\.[^\s]+){1,}/)) {
              callback('域名格式不对')
            }
          }
          return true
        }
      }
    ],
  }
  obj.id = Date.now()
  dynamicLists.push(obj)
}
function del(id, obj, key) {
  let index = dynamicLists.findIndex(v => v.id === id)
  dynamicLists.splice(index, 1);
  Reflect.deleteProperty(obj, key);
}


function submitForm(ref) {
  console.log('submitForm', ref);
  proxy.$refs[ref].validate().then(res => {
    uni.showToast({
      title: `校验通过`
    })

    console.log(def.getFormData());
  }).catch(err => {
    console.log('err', err);
  })
}

// 业务代码
setTimeout(() => {
  def.setFormData({
    age: "1111"
  })
}, 1000)
</script>

<style lang="scss">

</style>

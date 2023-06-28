<template>
  <page-wrapper>
    <view>
      <uni-forms ref="dynamicForm" :rules="dynamicRules" :modelValue="formData">
        <uni-forms-item label="姓名" name="name">
          <uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
        </uni-forms-item>
        <uni-forms-item label="年龄" name="age">
          <uni-easyinput type="number" v-model="formData.age" placeholder="请输入年龄" />
        </uni-forms-item>
        <uni-forms-item required name="hobby" label="兴趣爱好">
          <uni-data-checkbox multiple v-model="formData.hobby" :localdata="hobby"/>
        </uni-forms-item>
        <uni-forms-item required name="birthDay" label="生日">
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
  </page-wrapper>
</template>

<script setup lang="ts">






import { ComponentInternalInstance } from "vue";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

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
  email: {
    rules: [{
      required: true,
      errorMessage: '域名不能为空'
    }, {
      format: 'email',
      errorMessage: '域名格式错误'
    }]
  }
}
function add() {
  dynamicLists.push({
    label: '域名',
    rules: [{
      'required': true,
      errorMessage: '域名项必填'
    }],
    id: Date.now()
  })
}
function del(id, obj, key) {
  let index = dynamicLists.findIndex(v => v.id === id)
  dynamicLists.splice(index, 1);
  Reflect.deleteProperty(obj, key);
  console.log(unref(formData));
}


function submitForm(ref) {
  console.log(ref,unref(formData));
  proxy.$refs[ref].validate().then(res => {
    console.log('success', res);
    uni.showToast({
      title: `校验通过`
    })
  }).catch(err => {
    console.log('err', err);
  })
}
</script>

<style lang="scss">

</style>

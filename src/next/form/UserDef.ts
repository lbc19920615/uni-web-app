import { defineSimpleForm, field, required } from "@/frame/formMan";

class VeryBase {
  static {
    defineSimpleForm('VeryBase', this);
    // console.log('sdsdsd', this.FORM_NAME);
  }
  @required()
  @field('生日')
  get birthDayTpl() {
    return ''
  }
}

class VeryBase2 {
  static {
    defineSimpleForm('VeryBase2', this);
    // console.log('sdsdsd', this.FORM_NAME);
  }
  @required()
  @field('sssss')
  get name2() {
    return ''
  }
}

export class UserDef {
  static {
    defineSimpleForm('UserDef', this, {
      mixins: [
        'VeryBase',
        // 'VeryBase2'
      ]
    });
  }
  @required()
  @field('密码')
  get password() {
    return ''
  }
}

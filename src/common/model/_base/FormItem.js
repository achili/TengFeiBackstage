import {validateEmail} from '../../../common/filter/validate'
import {randomFormItemId} from '../../util/Utils'
import Base from "./Base";

let Type = {
  //用于文本输入筛选
  INPUT: 'INPUT',
  TEXT_AREA: 'TEXT_AREA',
  //数字、小数
  NUMBER: 'NUMBER',
  //文件
  TANK: 'TANK',
  TANK_APP: 'TANK_APP',
  //文件
  TANKS: 'TANKS',
  //富文本编辑器
  RICH_TEXT: "RICH_TEXT",
  //隐藏
  HIDDEN: "HIDDEN",
  //时间
  DATE: "DATE",
  //详细地址(经纬度)
  MAP_ADDRESS: "MAP_ADDRESS",
  //Checkbox
  CHECKBOX:"CHECKBOX",
  //select
  SELECT:"SELECT",
  SPACE_BUILDING_SELECTION:"SPACE_BUILDING_SELECTION",
  SPACE_RESERVATION_SELECTION:"SPACE_RESERVATION_SELECTION",
  CONFERENCE_ROOM_SELECTION:"CONFERENCE_ROOM_SELECTION",
  CODE_MIRROR: "CODE_MIRROR",
  //
  SELECT_SPACE:"SELECT_SPACE"
};

export default class FormItem {
  //表单类型、表单说明、是否必填、提交名、调用backFill的选用属性、默认值、规则(如字数、大小)、提交前预处理
  constructor (type, description, isRequired, name, fillKey, defaultValue, rule = {},beforeSubmit) {
    if (!type || !description || !name) {
      console.error('FormItem 传入的参数缺失！' + type + ' ' + name);
      return
    }
    this.id = randomFormItemId(4);
    this.type = type;
    this.description = description;
    this.isRequired = isRequired;
    this.name = name;
    this.fillKey = fillKey;
    this.value = defaultValue;
    this.rule = rule;
    this.beforeSubmit = beforeSubmit;

    this.errorMsg = null;
  }

  backFill(parameter) {
    if(this.fillKey) {
      let arr = this.fillKey.split(".");
      if(this.value instanceof Base) {
        this.value.render(parameter[arr[0]][arr[1]]);
      } else {
        this.value = parameter[arr[0]][arr[1]];
      }

    }
  }

  validate() {
    this.errorMsg = null;
    switch(this.type) {
      case Type.INPUT:
      case Type.TEXT_AREA:
      case Type.RICH_TEXT:
        return this.inputValidate();
      case Type.NUMBER:
        return this.numberValidate();
      case Type.TANK:
        return this.defaultEntityValidate();
      case Type.TANKS:
        return this.defaultTanks();
      case Type.MAP_ADDRESS:
        return this.detailAddressValidate();
      case Type.CHECKBOX:
        return this.defaultCheckBoxdate();
      case Type.SELECT:
        return this.inputValidate();
      case Type.SELECT_SPACE:
        return this.defaultEntityValidate();
      case Type.SPACE_BUILDING_SELECTION:
        return this.defaultEntityValidate();
      case Type.CONFERENCE_ROOM_SELECTION:
        return this.defaultEntityValidate();
      default:
        return true;
    }

  }

  watch(newVal,oldVal) {
    //避免输入框自带的赋值效果影响errorMsg
    if(oldVal !== null && oldVal !== undefined) {
      this.errorMsg = null;
    }
    switch(this.type) {
      case Type.INPUT:
      case Type.TEXT_AREA:
      case Type.RICH_TEXT:
        return this.inputWatch(newVal,oldVal);
      case Type.NUMBER:
        return this.numberWatch(newVal,oldVal);
      case Type.TANK:
        return this.defaultWatch(newVal,oldVal);
    }

  }

  getParam() {
    if(typeof this.beforeSubmit === 'function') {
      return this.beforeSubmit();
    } else {
      return this.value;
    }
  }

  static validateAll(form) {
    if(!FormItem.checkForm(form)) {
      return false
    }
    let isPass = true;
    form.forEach(formItem => {
      if(!formItem.validate()) {
        isPass = false;
      }
    });
    return isPass;
  }

  static getParamAll(form) {
    if(!FormItem.checkForm(form)) {
      return {}
    }
    let param = {};
    form.forEach(formItem => {
      param[formItem.name] = formItem.getParam();
    });
    return param;
  }

  static checkForm(form) {
    if(!form) {
      console.error("validateAll : from is false")
      return false;
    }
    if(!(form instanceof Array)) {
      console.error("validateAll : from is not Array")
      return false;
    }
    return true;
  }

  /************************************ input *************************************************/
  inputValidate() {
    if(!this.defaultValidate()) {
      return false;
    }
    if(this.value) {
      if(this.rule.max) {
        if(this.value.length > this.rule.max) {
          this.errorMsg = "最大可填写 " +  this.rule.max  + " 个字，" + "您已超出 " +  (this.value.length - this.rule.max) + " 个字。";
          return false
        }
      }
      if(this.rule.min) {
        if(this.value.length < this.rule.min) {
          this.errorMsg = "最少填写 " + this.rule.min + " 个字，尚差 " + (this.rule.min - this.value.length) + " 个字。";
          return false
        }
      }
      if(this.rule.isEmail) {
        if(!validateEmail(this.value)) {
          this.errorMsg = "您填写的邮箱格式不正确。";
          return false
        }
      }
    }
    return true;
  }
  inputWatch(newVal,oldVal) {
    if(this.rule.max) {
      if(this.value) {
        if(this.value.length > this.rule.max) {
          this.errorMsg = "您已超出 " +  (this.value.length - this.rule.max) + " 个字。";
          return false
        }
        if(this.value.length > this.rule.max * 0.8 && this.rule.max > 50) {
          this.errorMsg = "您还可以填写 " +  (this.rule.max - this.value.length) + " 个字。";
          return false
        }
      }
    }
  }
  /************************************ input *************************************************/

  /************************************ number *************************************************/
  numberValidate() {
    if(!this.defaultValidate()) {
      return false;
    }
    if(this.rule.max) {
      if((Number)(this.value) > this.rule.max) {
        this.errorMsg = "您已超出最大数字限制，最大大小 " + this.rule.max + " 。";
        return false
      }
    }
    if(this.rule.min) {
      if((Number)(this.value) < this.rule.min) {
        this.errorMsg = "您输入的数字小于最小限制，最小 " + this.rule.min + " 。";
        return false
      }
    }
    return true;
  }
  numberWatch(newVal,oldVal) {
    if(this.rule.max) {
      if((Number)(this.value) > this.rule.max) {
        this.errorMsg = "已超出最大数字限制。";
        return false
      }
    }
  }
  /************************************ input *************************************************/

  /************************************ 地址 *************************************************/
  detailAddressValidate() {
    if(this.isRequired) {
      if(this.value === null || this.value === undefined || this.value === "") {
        this.errorMsg = "请选择地图上的坐标确定 " + this.description + "。";
        return false
      } else {
        if(!this.value.lng || !this.value.lat) {
          this.errorMsg = "请选择地图上的坐标确定 " + this.description + "。";
          return false
        }
        if(this.value.address === null || this.value.address === undefined || this.value.address === "") {
          this.errorMsg = "请填写 " + this.description + " 的具体地址。";
          return false
        }
      }
      return true
    }
  }
  /************************************ 地址 *************************************************/

  /************************************ default *************************************************/
  defaultValidate() {
    if(this.isRequired) {
      //避免无法填0的问题
      if(this.value === null || this.value === undefined || this.value === "") {
        this.errorMsg = "请填写 " + this.description + "。";
        return false
      }
    }
    return true;
  }
  defaultEntityValidate() {
    if(this.isRequired) {
      if(this.value) {
        if(this.value.uuid) {
          return true;
        }
      }
      this.errorMsg = "请选择 " + this.description + "。";
      return false;
    }
    return true;
  }
  defaultWatch(newVal,oldVal) {
    this.errorMsg = null;
    return true;
  }

  static defaultEntityBeforeSubmit = function () {
    if(this.value) {
      return this.value.uuid;
    }
    return null;
  }
  //json转字符串
  static jsonTransformation = function () {
    if(this.value){
      return  JSON.stringify(this.value)
    }
    return null;
  }
  defaultCheckBoxdate = function () {
    if(this.value){
      if(this.value instanceof Array && this.value.length !== 0){
          return true;
      }
    }
    this.errorMsg = "请至少选择选择一项" + this.description + "。";
    return false;
  }

  defaultTanks = function () {
    if(this.value){
      if(this.value instanceof Array && this.value.length !== 0){
          return true;
      }
    }
    this.errorMsg = "请至少上传一张" + this.description + "。";
    return false;
  }

  /************************************ default *************************************************/
}

FormItem.prototype.Type = Type;

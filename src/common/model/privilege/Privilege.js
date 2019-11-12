import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import Tank from '../tank/Tank'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import {simpleDateTime} from "../../filter/time";
import Vue from 'vue'
import MessageManager from "../message/MessageManager";
import SpaceRegional from "../space/SpaceRegional";


let Type = {
  'CORPORATE': 'CORPORATE',
  'INDIVIDUAL': 'INDIVIDUAL'
};
let TypeMap = {
  CORPORATE: {
    name: "企业服务",
    value: "CORPORATE",
    style: "success"
  },
  INDIVIDUAL: {
    name: "会员优惠",
    value: "INDIVIDUAL",
    style: "warning"
  }
};
export default class Privilege extends BaseEntity {

  constructor(args) {
    super(args);
    this.creator = new User();
    this.type = Type.CORPORATE;
    //图片
    this.poster = new Tank('image', false, 1024 * 1024, '图片不能超过1M');
    //标题
    this.title = null;
    //详情介绍
    this.description = null;
    //有效期 会员优惠
    this.validTime = new Date();
    //合作伙伴 企业服务
    this.cooperativePartner = [];
  }
  getTAG() {
    return "Privilege"
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SELECTION, '福利', 'type',this.getTypeList()),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null)
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('poster', Tank);
    this.renderEntity('validTime', Date);

    this.cooperativePartner = JSON.parse(this.cooperativePartner);

    this.cooperativePartner.forEach(e => {
      let tank =  new Tank();
      tank.render(e.picture);
      e.picture = tank;
    })
  }

  validate() {
    if (!this.spaceRegional.uuid) {
      this.errorMessage = '请选择所属空间！';
      return
    }
    if (!this.poster.uuid) {
      this.errorMessage = '请选择上传图片';
      return
    }
    if(!this.title){
      this.errorMessage = '标题必填';
      return
    }
    if (!this.description) {
      this.errorMessage = '详情介绍必填';
      return
    }
    if(!this.validTime && this.type === 'INDIVIDUAL'){
      this.errorMessage = '请选择有效期';
      return
    }
    if(this.cooperativePartner.length < 1 && this.type === 'CORPORATE'){
      this.errorMessage = '至少添加一个合作伙伴';
      return
    }
    this.errorMessage = null;
    return true
  }

  validator(cooperativePartner){
      if(!cooperativePartner.picture.uuid){
        this.errorMessage = '请上传合作伙伴中的图片';
        return
      }
      if(!cooperativePartner.name){
        this.errorMessage = '合作伙伴名称必填';
        return
      }
      if(!cooperativePartner.subtitle){
        this.errorMessage = '副标题必填';
        return
      }
      if(cooperativePartner.subtitle.length > 18) {
        this.errorMessage = '副标题不能超过18个字符';
        return
      }
      if(!cooperativePartner.ddddd){
        this.errorMessage = '详情必填';
        return
      }
      if(cooperativePartner.ddddd.length > 35){
        this.errorMessage = '详情不能超过35个字符';
        return
      }
      this.errorMessage = null;
      return true;
  }

  httpSave (successCallback, errorCallback) {
    let that = this;
    //验证是否装填好
    if (!this.validate()) {
      return
    }
    for(let i = 0; i < this.cooperativePartner.length; i++ ){
        let question = this.cooperativePartner[i];
          if(!this.validator(question)){
            return
          }
    }


    let form = {
      type: this.type,
      poster: this.poster.uuid,
      title: this.title,
      description: this.description,
      validTime: simpleDateTime(this.validTime),
      cooperativePartner:JSON.stringify(this.cooperativePartner),
      spaceRegional:this.spaceRegional.uuid
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    super.httpSave(form, function (response) {

      successCallback && successCallback(response);
    }, errorCallback);
  }

  addCooperativePartner(cooperativePartner){
    this.cooperativePartner.push(cooperativePartner);
  }

  delCooperativePartners(cooperativePartner){
    let index = this.cooperativePartner.indexOf(cooperativePartner);
    this.cooperativePartner.splice(index, 1);
  }

  getHttpCorporateCreate() {  // 企业服务
    return new HttpForm(HttpForm.prototype.Type.ORDINARY, "/privilege/{editMode}", [
      new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "privilege.uuid"),
      new FormItem(FormItem.prototype.Type.HIDDEN, "类型", true, "type", "privilege.type","CORPORATE"),
      new FormItem(FormItem.prototype.Type.TANK, "图片", true, "poster", "privilege.poster", new Tank(), {}, FormItem.defaultEntityBeforeSubmit),
      new FormItem(FormItem.prototype.Type.INPUT, "标题", true, "title", "privilege.title", null,{max: 100, placeholder: "这里填写标题"}),
      new FormItem(FormItem.prototype.Type.TEXT_AREA, "详情介绍", true, "description", "privilege.description", null,{max: 100, placeholder: "这里填写详情介绍"})

    ])
  };

  getHttpCreate() { // 会员福利
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/privilege/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "privilege.uuid"),
        new FormItem(FormItem.prototype.Type.HIDDEN, "类型", true, "type", "privilege.type","INDIVIDUAL"),
        new FormItem(FormItem.prototype.Type.TANK, "图片", true, "poster", "privilege.poster", new Tank(), {}, FormItem.defaultEntityBeforeSubmit),
        new FormItem(FormItem.prototype.Type.INPUT, "标题", true, "title", "privilege.title", null,{max: 100, placeholder: "这里填写标题"}),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "详情介绍", true, "description", "privilege.description", null,{max: 100, placeholder: "这里填写详情介绍"}),
        new FormItem(FormItem.prototype.Type.DATE, "有效期", true, "validTime", "privilege.validTime",new Date(),{},function(){ return simpleDateTime(this.value) })
      ]
    );
  };

}
Privilege.prototype.Type = Type;
Privilege.prototype.TypeMap = TypeMap;
Privilege.prototype.TypeList = Privilege.prototype.getTypeList();

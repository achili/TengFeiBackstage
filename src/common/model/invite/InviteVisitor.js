import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";
import {simpleDateTime} from "../../filter/time";
import HttpForm from "../_base/HttpForm";
import FormItem from "../_base/FormItem";
import { Message, Notification } from 'element-ui'

export default class InviteVisitor extends BaseEntity{

  constructor(args) {
    super(args);
    this.creator = new User();
    this.inviteName = null;
    this.name = null;
    this.invitingTime = new Date();
    this.accessTime = new Date();
    this.visitorsNum = 0;
    this.remark = null;
    this.address = {lng: null, lat: null, address: ""};
  }

  //获取静态地图
  getStaticImage(){  //&size=750*300 宽 * 高
    return 'http://restapi.amap.com/v3/staticmap?location=' + this.address.lng + ',' + this.address.lat + '&size=750*300&zoom=10&markers=mid,,A:' + this.address.lng + ',' + this.address.lat + '&key=0bc4ea1d32f89194bc7840b91afc7cc0';
  }

  static URL_CREATE_USER = "/invite/visitor/create/user";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '创建时间', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SORT, '到访日期', 'orderInvitingTime'),
      new Filter(Filter.prototype.Type.SORT, '离开时间', 'orderAccessTime'),
      new Filter(Filter.prototype.Type.CHECK,"所有",'all'),
      new Filter(Filter.prototype.Type.CHECK,"已删除",'deleted'),
      new Filter(Filter.prototype.Type.CHECK, '已过期', 'isOverdue'),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null)

    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('invitingTime', Date);
    this.renderEntity('accessTime', Date);
  }

  getTAG(){
    return "InviteVisitor"
  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/invite/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "inviteVisitor.uuid"),
        new FormItem(FormItem.prototype.Type.INPUT, "邀请人用户名", true, true, "inviteName", "inviteVisitor.inviteName",null,{max: 20, placeholder: "这里填写邀请人用户名"}),
        new FormItem(FormItem.prototype.Type.INPUT, "邀请人姓名", true,true, "name", "inviteVisitor.name", null,{max: 20, placeholder: "这里填写邀请人姓名"}),
        new FormItem(FormItem.prototype.Type.DATE, "邀请日期", true,true, "invitingTime", "inviteVisitor.invitingTime",new Date(),{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.DATE, "访问时间", true,true, "accessTime", "inviteVisitor.accessTime",new Date(),{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.NUMBER, "访问人数", true,true, "visitorsNum", "inviteVisitor.visitorsNum", null,{max: 99}),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "备注", true,true, "remark", "inviteVisitor.remark", null,{height: "300px",placeholder: "填写备注信息..."})
        // new FormItem(FormItem.prototype.Type.REMINDER, "友情提醒:",false, true, "text", "inviteVisitor.text", null,{placeholder: "离会议开始时间少于2小时，将不再允许您取消或修改。"})
      ]
    );
  };

  httpCreateUser (uuid, name, phone, phoneCode, successCallback, errorCallback) {
    let that = this;
    if (!name) {
      Message.error({
        message: '名字必填~'
      });
      return;
    }
    if (!phone) {
      Message.error({
        message: '手机必填~'
      });
      return;
    }
    if (!phoneCode) {
      Message.error({
        message: '手机验证码必填~'
      });
      return;
    }
    let form = {
      inviteVisitor: uuid,
      name: name,
      phone: phone,
      phoneCode: phoneCode
    };
    this.httpPost(InviteVisitor.URL_CREATE_USER, form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback)
  }
}

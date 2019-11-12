import BaseEntity from "../../_base/BaseEntity";

import Filter from "../../_base/Filter";
import {simpleDateTime} from "../../../filter/time";
import HttpForm from "../../_base/HttpForm";
import FormItem from "../../_base/FormItem";
import InviteVisitor from "../InviteVisitor";
import SpaceBuilding from "../../space/SpaceBuilding";

export default class InviteVisitorUser extends BaseEntity{

  constructor(args) {
    super(args);
    this.inviteVisitor = new InviteVisitor();
    this.name = null;
    this.phone = null;

    // 敏锐方给予的id
    this.externalId = null;
    // 门禁通行证
    this.qrCode = null;
    //门禁权限
    this.enclosedList = null;
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.HTTP_SELECTION, "访客", "inviteVisitorUuid", null, InviteVisitor)
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('inviteVisitor', InviteVisitor);
  }

  getTAG(){
    return "InviteVisitorUser"
  }


}

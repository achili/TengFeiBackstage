import BaseEntity from "../../_base/BaseEntity";
import User from "../../user/User";
import {Action, ActionMap, ActionList} from "../../core/action/Action";
import {EntityType, EntityTypeMap, EntityTypeList} from "../../core/type/EntityType";
import Filter from "../../_base/Filter";


let Status = {
  OK: "OK"
}

let StatusMap = {
  OK: {
    name: "正常",
    value: "OK",
    style: "info"
  }
}
export default class MessageNotify extends BaseEntity {

  constructor(args) {
    super(args);
    this.sender = new User();
    this.receiver = new User();

    this.action = "";
    this.content = "";
    this.remark = null;

    this.status = Status.OK;
    this.uuid = null;
    this.entityType = null;
  }

  getTAG() {
    return "MessageNotify"
  }

  getFilters(){
    return [
      new Filter("SORT", "ID", "orderId"),
      new Filter("SORT", "创建时间", "orderCreateTime"),
      new Filter("INPUT", "实体ID", "entityId"),
      new Filter("INPUT", "实体类型", "entityType")
    ]
  }

  render(obj){
    super.render(obj);
    this.renderEntity("sender",User);
    this.renderEntity("receiver",User);
    if(this.content ){
      this.content = JSON.parse(this.content)
    }
  }
  getActionItem(){
    let item = ActionMap[this.action];
    if (item) {
      return item;
    } else {
      return {
        name: "未知状态",
        value: null,
        style: "danger",
        icon: "ban"
      };
    }
  }
  getActionName(){
    return this.getActionItem().name;
  }
  getActionIcon(){
    return this.getActionItem().icon;
  }
  getActionStyle(){
    return this.getActionItem().style;
  }
}

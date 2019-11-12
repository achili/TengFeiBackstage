import BaseEntity from '../../_base/BaseEntity'
import User from "../../user/User";
import Filter from "../../_base/Filter";
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../../util/Utils";
import store from '../../../../_store'
import SpaceOffice from "../../space/SpaceOffice";
import MessageLetter from "./MessageLetter";

export default class LastMessage extends BaseEntity {

  constructor(args) {
    super(args);
    this.senderUuid = null;
    this.content = null;
    this.read = null;
    this.name = null;
    this.createTime = new Date();

    this.checked = false;
  }


  getTAG() {
    return "LastMessage"
  }

  getFilters() {
    return [
      new Filter("SORT", "发送时间", "orderCreateTime"),
      new Filter("INPUT", "关键词", "keyword")
    ];
  };

  render(obj) {
    super.render(obj);
    this.renderEntity("createTime", Date);
  };
}

LastMessage.prototype.URL_PAGE = "/message/letter/unread";


import BaseEntity from '../../_base/BaseEntity'
import User from "../../user/User";
import Filter from "../../_base/Filter";
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../../util/Utils";
import store from '../../../../_store'
import SpaceOffice from "../../space/SpaceOffice";

export default class MessageLetter extends BaseEntity {

  constructor(args) {
    super(args);
    this.sender = new User();
    this.receiver = new User();
    this.content = null;
    this.read = null;

    this.checked = false;
  }
  getTAG() {
    return "MessageLetter"
  }

  static URL_READ = "/message/letter/read";
  static URL_UNREAD = "/message/letter/unread";
  static URL_UNREAD_SYSTEM = "/message/letter/unread/system";
  static URL_SEND_ALL = "/message/letter/send/all";
  static URL_NEWS = "/message/letter/news";
  static URL_ALL_MESSAGE = "/message/letter/all/message";

  getFilters() {
    return [
      new Filter("SORT", "发送时间", "orderCreateTime"),
      new Filter("CHECK", "读取信息状态", "read"),
      new Filter(Filter.prototype.Type.HTTP_SELECTION, "发送者", "sender", null, User),
      new Filter(Filter.prototype.Type.HTTP_SELECTION, "接收者", "receiver", null, User),
      new Filter(Filter.prototype.Type.HTTP_SELECTION, "发送中间人", "aboutSender", null, User),
      new Filter(Filter.prototype.Type.HTTP_SELECTION, "接收中间人", "aboutReceiver", null, User)
    ];
  };

  render(obj) {
    super.render(obj);
    this.renderEntity("sender", User);
    this.renderEntity("receiver", User);
  };

  //标记或者已读或未读
  httpRead = function (senderUuid, successCallback, errorCallback) {

    let form = {
      sender: senderUuid
    };
    this.httpPost(MessageLetter.URL_READ, form, successCallback, errorCallback);

  };

  httpUnRead = function (successCallback, errorCallback) {
    if (store.state.user.isLogin) {
      this.httpPost(MessageLetter.URL_UNREAD, {}, function (response) {
        successCallback && successCallback(response);
      }, errorCallback);
    }

  };

  httpUnReadSYSTEM(successCallback, errorCallback) {
    if (store.state.user.isLogin) {
      this.httpPost(MessageLetter.URL_UNREAD_SYSTEM, {}, function (response) {
        successCallback && successCallback(response);
      }, function () {

      });
    }

  };

  httpAllMessage = function (successCallback, errorCallback) {
    if (store.state.user.isLogin) {
      this.httpPost(MessageLetter.URL_ALL_MESSAGE, {}, function (response) {
        successCallback && successCallback(response);
      }, errorCallback);
    }

  };

  httpSendAll = function (receiverUuidList, successCallback, errorCallback) {
    let form = {
      receiverUuidList: receiverUuidList,
      content: this.content
    };
    this.httpPost(MessageLetter.URL_SEND_ALL, form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  };

  saveToLocalStorage = function () {
    saveToLocalStorage("MessageLetters", JSON.stringify(this));
  };

  renderFromLocalStorage = function (currentUserUuid) {
    // let localMessageLetter = [];
    // console.log(currentUserUuid);
    // this["MessageLetters"].forEach(messageLetter => {
    //   if (currentUserUuid === messageLetter.receiverUuid) {
    //     let String = readLocalStorage("MessageLetters");
    //     if (String) {
    //       let json = JSON.parse(String);
    //       this.render(json);
    //     }
    //   }
    // });
    // return localMessageLetter;
  };

  httpSave (receiverUuid, successCallback, errorCallback) {
    let that = this;
    let form = {
      content: this.content,
      receiver: receiverUuid
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }

    if (!this.content) {
      this.errorMessage = "私信正文不能为空！";
      return false;
    }

    BaseEntity.prototype.httpSave.call(this,form, function (response) {
      that.saveToLocalStorage(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback);
  };

}


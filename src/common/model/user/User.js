import Vue from 'vue'
import $ from 'jquery'

import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import UserRole from './role/UserRole'
import PhoneValidation from '../validation/PhoneValidation'

import {str2Date} from '../../filter/time'
import {validatePhone} from '../../filter/validate'
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../util/Utils";
import Tank from "../tank/Tank";
import FormItem from "../_base/FormItem";
import MessageLetter from "../message/letter/MessageLetter";
import HttpForm from "../_base/HttpForm";

let StatusMap = {
  OK: {
    name: "正常",
    value: "OK",
    style: "success"
  },
  LOGIN_LOCK: {
    name: "锁定",
    value: "LOGIN_LOCK",
    style: "warning"
  },
  DISABLE: {
    name: "封禁",
    value: "DISABLE",
    style: "error"
  }
};

export default class User extends BaseEntity{

  constructor(args) {
    super(args);
    this.role = new UserRole();

    //手机验证码模块。
    this.phoneValidation = new PhoneValidation();
    this.name = "用户名";
    this.email = null;
    this.phone = null;
    this.description = null;
    this.gender = null;

    this.password = null;
    this.avatar = new Tank('image', false, 1024 * 1024, '图片不能超过1M');
    this.avatarUrl = null;
    this.lastIp = null;
    this.lastTime = null;
    this.status = StatusMap.OK.value;
    this.emailValidate = null;

    //非持久化
    this.isLogin = false;
    //修改密码用到的字段
    this.oldPassword = null;
    this.repeatPassword = null;
  }

  getTAG() {
    return "User"
  }

  static URL_LOGIN = "/user/login";
  static URL_UPDATE = "/user/update";
  static URL_LOGOUT = "/user/logout";
  static URL_FAST_LOGIN = "/user/fast/login";
  static URL_PASSWORD_CHANGE = "/user/change/password";
  static URL_PASSWORD_RESET = "/user/password/reset";
  static URL_PHOEN_CHANGE = "/user/phone/change";
  static URL_EMAIL_SEND = "/user/email/send";
  static URL_EMAIL_VALIDATE = "/user/email/validate";

  getLink() {
    return {
      nameField: "name",
      path: "/{:by}/user/detail?uuid={uuid}"
    }
  };

  getFilters() {
    return [
      // new Filter("SORT", "ID", "orderId"),
      new Filter("SORT", "上次登录", "orderLastTime"),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList(),null,null,false),
      new Filter("INPUT", "关键词", "keyword")
    ];
  };
  render(obj) {
    BaseEntity.prototype.render.call(this, obj);
    this.lastTime = str2Date(this.lastTime);
    this.renderEntity("avatar", Tank);
    this.renderEntity("role", UserRole);
    this.role.renderAccessMap();
    this.renderEntity("phoneValidation", PhoneValidation);
  };

  //登陆
  httpLogin (captcha, successCallback, errorCallback) {
    let that = this;
    //验证参数。
    if (!this.email) {
      this.errorMessage = '邮箱/手机必填';
      return
    }
    if (!this.password) {
      this.errorMessage = '密码必填';
      return
    }
    this.errorMessage = null;
    let form = {
      email: this.email,
      password: this.password
    };
    if (captcha) {
      form.captcha = captcha
    }
    this.httpPost(User.URL_LOGIN, form, function (response) {
      that.innerLogin(response);
      successCallback && successCallback(response)
    }, function (response) {
      that.errorMessage = that.getErrorMessage(response);
      errorCallback && errorCallback(response)
    })
  }

  //修改用户信息成功后快速更新用户信息
  innerLogin (response) {
    let that = this;
    that.errorMessage = null;
    that.isLogin = true;
    that.render(response.data.data);
    //登录成功后去本地保存一下用户的简单信息，方便下次自动填入个别字段。
    this.saveUser(response.data.data)
  }

  //将用户信息存储在本地。
  saveUser(rawUserObject = null) {
    if (rawUserObject) {
      rawUserObject.isLogin = true;
    }
    saveToLocalStorage(this.getTAG(), JSON.stringify(rawUserObject));
  }

  //获取用户头像的url.
  getAvatarUrl = function (h = 200, w = 200) {
    if (this.avatar && this.avatar.url) {
      return this.avatar.getUrlBySize(h,w);
    } else if (this.avatarUrl) {
      return this.avatarUrl;
    } else {
      return require("../../../assets/img/avatar.png");
    }
  };

  httpLogout (successCallback, errorCallback) {
    let that = this;
    that.innerLogout();
    this.httpPost(User.URL_LOGOUT, {}, function (response) {
      successCallback && successCallback(response);
    }, errorCallback)
  }

  //保存用户基本信息
  getHttpEdit() {
    return new HttpForm(HttpForm.prototype.Type.ORDINARY, "/user/edit", [
      new FormItem(FormItem.prototype.Type.TANK, "头像", true, "avatar", "user.avatar", new Tank(), {}, FormItem.defaultEntityBeforeSubmit),
      new FormItem(FormItem.prototype.Type.INPUT, "用户名", true, "name", "user.name", null,{max: 100, placeholder: "这里填写用户名"}),
      new FormItem(FormItem.prototype.Type.SELECT, "角色", false, "roleUuid", "user.role", null,{list: this.role.accesses}),
      new FormItem(FormItem.prototype.Type.INPUT, "邮箱", true, "email",  "user.email", null,{max: 100, placeholder: "这里填写邮箱", isEmail: true}),
      new FormItem(FormItem.prototype.Type.HIDDEN, "UUID", true, "uuid",  "user.uuid", this.uuid),
      new FormItem(FormItem.prototype.Type.TEXT_AREA, "个人简介", false, "description",  "user.description", null, {max: 200, placeholder: "个人简介"})
    ]);
  };

  httpSave (successCallback, errorCallback) {
    let that = this;
    let form = {
      name: this.name,
      password: this.password,
      phone: this.phone,
      description: this.description,
      email: this.email,
      avatar: this.avatar
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    super.httpSave(form, function (response) {
      if (Vue.store.state.user.id === that.id) {
        Vue.store.state.user.name = that.name;
        Vue.store.state.user.password = that.password;
        Vue.store.state.user.phone = that.phone;
        Vue.store.state.user.avatar = that.avatar;
        Vue.store.state.user.description = that.description;
      }
      successCallback && successCallback(response);
    }, errorCallback);
  }

  //手机快速登录
  httpFastLogin (successCallback, errorCallback) {

    if (!this.phone) {
      this.errorMessage = "手机必填！";
      return;
    }
    if (!this.phoneValidation.value) {
      this.errorMessage = "手机验证码必填！";
      return;
    }

    let that = this;
    this.errorMessage = null;
    let form = {
      phone: this.phone,
      phoneCode: this.phoneValidation.value
    };
    this.httpPost(User.URL_FAST_LOGIN, form, function (response) {
      that.innerLogin(response);

      successCallback && successCallback(response);
    }, errorCallback)

  }

  httpUserChangePassword (successCallback, errorCallback) {
    if (!this.oldPassword || !this.password || !this.repeatPassword) {
      Notification.error({
        message: '不能为空！'
      });
      return
    }

    if (this.repeatPassword !== this.password) {
      Notification.error({
        message: '两次输入不一致！'
      });
      return
    }

    let form = {
      oldPassword: this.oldPassword,
      newPassword: this.password
    };
    console.log("oldPassword :" + this.oldPassword);
    console.log("newPassword :" + this.password);
    this.httpPost(User.URL_PASSWORD_CHANGE, form, successCallback, errorCallback);
  }

  httpPhoneChange (newPhone,phoneCode,successCallback, errorCallback) {
    if (!newPhone) {
      this.errorMessage = "新手机必填";
      return;
    }

    this.errorMessage = null;
    let form = {
      phone: newPhone,
      phoneCode: phoneCode
    };

    console.log(phoneCode);
    this.httpPost(User.URL_PHOEN_CHANGE, form, successCallback, errorCallback);
  }

  //从本地存储中读取用户信息
  renderFromLocalStorage() {
    try {
      let userString = readLocalStorage(this.getTAG());
      if (userString) {
        let json = JSON.parse(userString);
        this.render(json);
      }

    } catch (e) {
      removeLocalStorage(this.getTAG());
    }
  }



  //清除本地的user信息
  clearLocalStorage() {
    removeLocalStorage(this.getTAG());
  };

  //退出登陆
  innerLogout() {
    this.render(new User());
    this.clearLocalStorage();
  };

  hasPermission(featureType) {
    if (this.role) {
      return this.role.hasPermission(featureType);
    } else {
      console.error("该用户没有角色，请及时排查。");
      return false;
    }
  };

  hasPermissionSpace(featureType,spaceRegional) {
    if (this.role) {
      return this.role.hasPermissionSpace(featureType,spaceRegional);
    } else {
      console.error("该用户没有角色，请及时排查。");
      return false;
    }
  };


  //自动登陆的更新用户信息
  httpUpdateInfo(successCallback, errorCallback) {
    if (this.isLogin) {
      let that = this;
      this.httpPost(User.URL_UPDATE, {}, function (response) {
        that.errorMessage = null;
        that.isLogin = true;
        that.render(response.data.data.user);
        //登录成功后去本地保存一下用户的简单信息，方便下次自动填入个别字段。
        that.saveUser(response.data.data.user);
        successCallback && successCallback(response);
      }, errorCallback);
    }
  };


  checkFeatureType(featureType) {
    if(!this.role || !this.role.accesses) {
      return false;
    }
    let res = false;
    this.role.accesses.forEach(acc => {
      if(acc.featureType.value === featureType) {
        res = acc.active;
      }
    });
    return res;
  }

}
User.prototype.StatusMap = StatusMap;
User.prototype.StatusList = User.prototype.getStatusList();





import BaseEntity from "../../_base/BaseEntity";
import Filter from "../../_base/Filter";
import UserAccess from "../access/UserAccess";

import {isEmptyObject} from "../../../util/Utils";
import SpaceRegional from "../../space/SpaceRegional";
import HttpForm from "../../_base/HttpForm";
import FormItem from "../../_base/FormItem";


let Type = {
	PROGRAMMER: "PROGRAMMER",
	ADMINISTRATOR: "ADMINISTRATOR",
	USER: "USER",
	GUEST: "GUEST",
	CUSTOM: "CUSTOM"
}
let TypeMap = {
	PROGRAMMER: {
		name: "网站维护人员",
		value: "PROGRAMMER",
		style: "success"
	},
	ADMINISTRATOR: {
		name: "超级管理员",
		value: "ADMINISTRATOR",
		style: "success"
	},
	USER: {
		name: "注册用户",
		value: "USER",
		style: "success"
	},
	GUEST: {
		name: "游客",
		value: "GUEST",
		style: "success"
	},
	CUSTOM: {
		name: "自定义角色",
		value: "CUSTOM",
		style: "success"
	}
};

export default class UserRole extends BaseEntity {

  constructor () {
    super();
    this.name = null;
    this.description = null;
    this.special = false;
    this.type = Type.GUEST;
    this.accesses = [];
    //权限的二维数组。
    this.accessMap = {};
  }

  getTAG() {
    return "UserRole"
  }

  static URL_PERMISSION = "/user/role/permission";

  getFilters() {
    return [
      new Filter("INPUT", "角色名", "name"),
      new Filter("SORT", "ID", "orderId"),
      new Filter("SORT", "创建时间", "orderCreateTime"),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null)
    ];
  };

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/user/role/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "userRole.uuid"),
        new FormItem(FormItem.prototype.Type.INPUT, "角色名称",true, "name", "userRole.name", null,{max: 100, placeholder: "这里填写名称"}),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "详情",true, "description", "userRole.description", null,{max: 150, placeholder: "这里填写详情"}),
        new FormItem(FormItem.prototype.Type.SELECT_SPACE, "所属空间", true, "spaceRegional", "userRole.spaceRegional", new SpaceRegional(),{},FormItem.defaultEntityBeforeSubmit)

      ]
    );
  };

  render(obj) {
    super.render(obj);
    // BaseEntity.prototype.render.call(this, obj);
    this.renderList("accesses", UserAccess);
    // this.renderAccessMap();
  }

  //渲染accessMap
  renderAccessMap() {
    this.accessMap = {};
    this.accesses.forEach(access => {
      if(!this.accessMap[access.spaceRegional.uuid]) {
        this.accessMap[access.spaceRegional.uuid] = {}
      }
      this.accessMap[access.spaceRegional.uuid][access.featureType.value] = access.active;
    });

  }

  //获取更改的accessMap
  getAccessMap() {
    let accessMap = {};
    this.accesses.forEach(access => {
      if(access.newActive !== access.active) {
        if(!accessMap[access.spaceRegional.uuid]) {
          accessMap[access.spaceRegional.uuid] = {}
        }
        accessMap[access.spaceRegional.uuid][access.featureType.value] = access.newActive;
      }
    });
    return accessMap;
  }

  //快速查看对某一项功能点是否有权限
  hasPermission = function (featureType) {
    if (isEmptyObject(this.accessMap)) {
      console.error(this.accessMap);
      console.error("角色未渲染权限，请及时排查。");
      return false;
    } else if (!this.accessMap.hasOwnProperty(featureType)) {
      console.error("数据库中没有" + featureType + ",请及时排查");
      return false;
    } else {
      return this.accessMap[featureType];
    }
  };

  //快速查看对某一项功能点是否有权限
  hasPermissionSpace = function (featureType,spaceRegional) {
    let access = this.accessMap[spaceRegional];
    if (isEmptyObject(this.accessMap)) {
      console.error(this.accessMap);
      console.error("角色未渲染权限，请及时排查。");
      return false;
    } else if (!this.accessMap.hasOwnProperty(spaceRegional)) {
      console.error("数据库中没有" + spaceRegional + "的权限" + ",请及时排查");
      return false;
    } else if(!access || !access.hasOwnProperty(featureType)) {
      console.error("数据库中没有" + spaceRegional + "的" + featureType + ",请及时排查");
      return false;
    } else {
      return this.accessMap[spaceRegional][featureType];
    }
  };

  httpPermission = function (successCallback, errorCallback) {
    let that = this;
    let url = UserRole.URL_PERMISSION;
    let sss = this.getAccessMap();
    let form = {
      uuid: this.uuid,
      accessesInfo: JSON.stringify(sss)
    };
    this.httpPost(url, form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback);
  }

}

import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import Tank from '../tank/Tank'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import {simpleDateTime, str2Date} from "../../filter/time";
import Enclose from "../enclose/Enclose";
import Pager from "../_base/Pager";
import SpaceRegional from "../space/SpaceRegional";


let ServicesMap = {
  "LED":{
    val: "LED",
    name:"两个带有VGA/HDMI连接口的84\" LED"
  },
  "DEMONSTRATION":{
    val: "DEMONSTRATION",
    name:"无线演示设备"
  },
  "VIDEO":{
    val: "VIDEO",
    name:"企业级视频会议"
  },
  "MICROPHONE":{
    val: "MICROPHONE",
    name:"企业级桌面话筒"
  },
  "HORN":{
    val: "HORN",
    name:"顶置式喇叭"
  },
  "WIFI":{
    val: "WIFI",
    name:"高速WIFI"
  },
  "STATIONERY":{
    val: "STATIONERY",
    name:"可移动白板，带马克笔和文具"
  },
  "TEA":{
    val: "TEA",
    name:"免费咖啡/茶水"
  },
  "PROJECTION":{
    val: "PROJECTION",
    name:"投影仪及幕布"
  },
  "LED65":{
    val: "LED65",
    name:"两个带有VGA/HDMI连接口的65\" LED"
  },
  "LED55":{
    val: "LED55",
    name:"两个带有VGA/HDMI连接口的55\" LED"
  }
};


let CapacityMap = {
  "MINIMUM":{
    val: "MINIMUM",
    name:"1-6人"
  },
  "SECONDARY":{
    val: "SECONDARY",
    name:"6-10人"
  },
  "SPACIOUS":{
    val: "SPACIOUS",
    name:"10人以上"
  }
}

export default class ConferenceRoom extends BaseEntity {

  constructor(args) {
    super(args);

    this.creator = new User();
    this.name = "会议室";
    this.introduce = "详细说明";
    this.capacity = null;
    this.price = null;
    this.vipPrice = null;
    this.services = [];

    this.posters = [];

    this.address = "";

    this.enclosedId = null;

  }

  static GET_ENCLOSE_ENUM_URL = "";

  getTAG() {
    return "ConferenceRoom"
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword',null,null,'名称/简介/创建者'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.CHECK,"已删除",'deleted'),
      new Filter(Filter.prototype.Type.CHECK,"正常",'normal'),
      new Filter(Filter.prototype.Type.CHECK,"所有",'all'),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null)
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderList('posters', Tank);
    if(this.services && !(this.services instanceof Array)){
      this.services = JSON.parse( this.services );
    }
  }

  getHttpCreate() {
    let encloseEnum = [];
    let enclosePager = new Pager(Enclose);
    enclosePager.pageSize = 50;
    enclosePager.httpFastPage(function () {
      enclosePager.data.forEach(enclose => {
        encloseEnum.push({name: enclose.enclosedName, val: enclose.enclosedId});
      })
    });

    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/conference/room/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "conferenceRoom.uuid"),
        new FormItem(FormItem.prototype.Type.SELECT_SPACE, "所属空间", true, "spaceRegional", "conferenceRoom.spaceRegional", new SpaceRegional(),{},FormItem.defaultEntityBeforeSubmit,false),
        new FormItem(FormItem.prototype.Type.INPUT, "会议室名称", true, "name", "conferenceRoom.name", null,{max: 100, placeholder: "这里填写会议室类型"}),
        new FormItem(FormItem.prototype.Type.TANKS, "图片", true, "posters", "conferenceRoom.posters",  [], {max: 6,templateTank: new Tank('image', false, 1024 * 1024 * 5)}, function () {
          let ids = [];
          if(this.value) {
            this.value.forEach(tank => {
              ids.push(tank.uuid)
            })
          }
          return  ids.toString()
        }),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "详细介绍", true, "introduce", "conferenceRoom.introduce", null,{height: "300px"}),
        new FormItem(FormItem.prototype.Type.INPUT, "详细地址", true, "address", "conferenceRoom.address", null,{max: 100, placeholder: "这里填写详细地址"}),
        new FormItem(FormItem.prototype.Type.NUMBER,"每小时价格",true,"price","conferenceRoom.price",null,{max:9999}),
        new FormItem(FormItem.prototype.Type.NUMBER,"每小时价格(会员)",true,"vipPrice","conferenceRoom.vipPrice",null,{max:9999}),
        new FormItem(FormItem.prototype.Type.SELECT,"可容纳人数",true,"capacity","conferenceRoom.capacity",null,{
        list:ConferenceRoom.prototype.CapacityList}),
        new FormItem(FormItem.prototype.Type.SELECT,"会议室门禁",true,"enclosedId","conferenceRoom.enclosedId",null,{
          list:encloseEnum}),
        new FormItem(FormItem.prototype.Type.CHECKBOX,"设施及服务",true,"services","conferenceRoom.services", null,
          {list: ConferenceRoom.prototype.ServicesList},FormItem.jsonTransformation)
      ]
    );
  };


}

ConferenceRoom.registerEnum("Services", ServicesMap);
ConferenceRoom.registerEnum("Capacity", CapacityMap);

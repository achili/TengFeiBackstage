import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import Tank from '../tank/Tank'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import SpaceRegional from "../space/SpaceRegional";
let StatusMap = {
  OK:{
    value: "OK",
    name:"正常",
    style: "success"
  }
};

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
    name:"一个带有VGA/HDMI连接口的65\" LED"
  },
  "LED55":{
    val: "LED55",
    name:"一个带有VGA/HDMI连接口的55\" LED"
  }
};

export default class ActiveSite extends BaseEntity {

  constructor(args) {
    super(args);
    //会议室类型
    this.name = "默认类型";
    this.creator = new User();
    this.introduce = "详细说明";
    //服务
    this.services = [];
    //封面图片
    this.poster = new Tank('image', false, 1024 * 1024, '图片不能超过1M');
    //内容
    this.address = "详细地址";
  }
  getTAG() {
    return "ActiveSite"
  }


  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword',null,null,'名称/介绍/创建者'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList(),null,null,false),
      new Filter(Filter.prototype.Type.CHECK,"已删除",'deleted'),
      new Filter(Filter.prototype.Type.CHECK,"正常",'normal'),
      new Filter(Filter.prototype.Type.CHECK,"所有",'all'),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, SpaceRegional,null),
      new Filter(Filter.prototype.Type.SPACE_MULTI_SELECTION, "所属空间", "spaceRegionalUuids", null, SpaceRegional,null)
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('poster', Tank);
    if(this.services && !(this.services instanceof Array)){
      this.services = JSON.parse( this.services );
    }
  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/active/site/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "activeSite.uuid"),
        new FormItem(FormItem.prototype.Type.SELECT_SPACE, "所属空间", true, "spaceRegional", "activeSite.spaceRegional", new SpaceRegional(),{},FormItem.defaultEntityBeforeSubmit),
        new FormItem(FormItem.prototype.Type.INPUT, "名称", true, "name", "activeSite.name", null,{max: 100, placeholder: "这里填写会议室类型"}),
        new FormItem(FormItem.prototype.Type.TANK, "图片", true, "poster", "activeSite.poster", new Tank(), {}, FormItem.defaultEntityBeforeSubmit),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "介绍", true, "introduce", "activeSite.introduce", null,{height: "300px"}),
        new FormItem(FormItem.prototype.Type.CHECKBOX,"设施及服务",true,"services","activeSite.services", null,
          {list: ActiveSite.prototype.ServicesList},FormItem.jsonTransformation)
      ]
    );
  };

}

ActiveSite.registerEnum("Services", ServicesMap);
ActiveSite.prototype.StatusMap = StatusMap;
ActiveSite.prototype.StatusList = ActiveSite.prototype.getStatusList();

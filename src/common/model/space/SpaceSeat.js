import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import SpaceBuilding from "./SpaceBuilding";
import SpaceOffice from "./SpaceOffice";
import ProtocolSpace from "../protocol/space/ProtocolSpace";

let Type = {
  OFFICE: "OFFICE",
  SEAT: "SEAT"
};
let TypeMap = {
  OFFICE: {
    value: "OFFICE",
    name: "独立办公室",
    style: "info"
  },
  SEAT: {
    value: "SEAT",
    name: "移动办公桌",
    style: "info"
  }
};

let Status = {
  FREE:'FREE',
  PRE_ALLOCATION:'PRE_ALLOCATION',
  OCCUPIED:'OCCUPIED'
};
let StatusMap = {
  FREE:{
    value: "FREE",
    name:"空闲",
    style: "#84e599"
  },
  PRE_ALLOCATION:{
    value: "PRE_ALLOCATION",
    name:"预分配",
    style: "#ffdc6f"
  },
  OCCUPIED:{
    value: "OCCUPIED",
    name:"被占用",
    style: "#ff9a9a"
  }
};

let AttributeMap = {
  "SOUTH":{
    val: "SOUTH",
    name:"朝南"
  },
  "NORTH":{
    val: "NORTH",
    name:"朝北"
  },
  "BESIDE_THE_WINDOW":{
    val: "BESIDE_THE_WINDOW",
    name:"靠窗"
  },
  "OFFICE_SUPPLIES":{
    val: "OFFICE_SUPPLIES",
    name:"带办公用品"
  },
  "NEAR_THE_AISLE":{
    val: "NEAR_THE_AISLE",
    name:"临近走道"
  },
  "QUIET":{
    val: "QUIET",
    name:"安静"
  }
};

export default class SpaceSeat extends BaseEntity {

  constructor(args) {
    super(args);

    this.creator = new User();
    this.spaceOffice = new SpaceOffice();
    this.stationNo = null;
    this.name = null;
    this.address = null;
    this.day = null;
    this.month = null;
    this.attribute = [];
    this.type = Type.SEAT;

    this.status = Status.FREE;
  }

  getTAG() {
    return "SpaceSeat"
  }


  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword',null,null,'名称/地址'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList()),
      new Filter(Filter.prototype.Type.MULTI_SELECTION, '状态', 'statuses',this.getStatusList()),
      new Filter(Filter.prototype.Type.HTTP_SELECTION, "独立办公室", "spaceOfficeUuid", null, SpaceOffice),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null)
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('spaceOffice', SpaceOffice);
    if(this.attribute ){
      this.attribute = JSON.parse(this.attribute)
    }

  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/space/seat/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "spaceSeat.uuid"),
        //new FormItem(FormItem.prototype.Type.INPUT, "所属房间",true, "name", "spaceSeat.name", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "工位名称",true, "name", "spaceSeat.name", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "地址",true, "address", "spaceSeat.address", null,{}),
        new FormItem(FormItem.prototype.Type.NUMBER, "价格",true, "stationNo", "spaceSeat.stationNo", null,{}),
        new FormItem(FormItem.prototype.Type.NUMBER, "价格",true, "ownershipNo", "spaceSeat.ownershipNo", null,{}),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "描述", true, "depict", "spaceSeat.depict", null,{})
      ]
    );
  };

  validate() {
    if (!this.spaceOffice.uuid) {
      this.errorMessage = '请选择所属房间';
      return
    }
    if(!this.name){
      this.errorMessage = '工位名称/编号必填';
      return
    }
    if (!this.address) {
      this.errorMessage = '地址必填';
      return
    }
    if(!this.month){
      this.errorMessage = '请将月租价格补充完整';
      return
    }
    if(this.attribute.length < 1 ){
      this.errorMessage = '至少选择一个属性';
      return
    }
    this.errorMessage = null;
    return true
  }

  httpSave (successCallback, errorCallback) {
    let that = this;
    //验证是否装填好
    if (!this.validate()) {
      return
    }
    let form = {
      spaceOffice: this.spaceOffice.uuid,
      name: this.name,
      address: this.address,
      day: this.day,
      month: this.month,
      attribute:JSON.stringify(this.attribute)
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    super.httpSave(form, function (response) {

      successCallback && successCallback(response);
    }, errorCallback);
  }

}
SpaceSeat.prototype.Type = Type;
SpaceSeat.prototype.TypeMap = TypeMap;
SpaceSeat.prototype.TypeList = SpaceSeat.prototype.getTypeList();
SpaceSeat.prototype.Status = Status;
SpaceSeat.prototype.StatusMap = StatusMap;
SpaceSeat.prototype.StatusList = SpaceSeat.prototype.getStatusList();
SpaceSeat.registerEnum("Attribute", AttributeMap);

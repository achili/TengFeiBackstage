import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import {simpleDateTime, str2Date,simpleMinute} from "../../filter/time";
import SpaceBuilding from "./SpaceBuilding";
import SpaceRegional from "./SpaceRegional";

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
export default class SpaceOffice extends BaseEntity {

  constructor(args) {
    super(args);
    this.creator = new User();
    this.spaceBuilding = new SpaceBuilding();
    this.name = null;
    this.address = null;
    this.area = null;
    this.seatNum = null;
    this.remarks = null;
    this.status = Status.FREE;
    this.type = Type.OFFICE;
  }

  getTAG() {
    return "SpaceOffice"
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword',null,null,'名称/地址'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList()),
      new Filter(Filter.prototype.Type.MULTI_SELECTION, '状态', 'statuses',this.getStatusList()),
      new Filter(Filter.prototype.Type.HTTP_SELECTION, "大楼", "spaceBuildingUuid", null, SpaceBuilding),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null),
      new Filter(Filter.prototype.Type.SPACE_MULTI_SELECTION, "所属空间", "spaceRegionalUuids", null, SpaceRegional,null)

    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('spaceBuilding', SpaceBuilding);
  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/space/office/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "spaceOffice.uuid"),
        new FormItem(FormItem.prototype.Type.SPACE_BUILDING_SELECTION, "所属大楼",true, "spaceBuilding", "spaceOffice.spaceBuilding", new SpaceBuilding(),{  },FormItem.defaultEntityBeforeSubmit),
        new FormItem(FormItem.prototype.Type.INPUT, "空间名称",true, "name", "spaceOffice.name", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "地址",true, "address", "spaceOffice.address", null,{}),
        new FormItem(FormItem.prototype.Type.NUMBER, "面积",true, "area", "spaceOffice.area", null,{placeholder:"      m²"}),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "备注", false, "remarks", "spaceOffice.remarks", null,{})
      ]
    );
  };

}
SpaceOffice.prototype.Type = Type;
SpaceOffice.prototype.TypeMap = TypeMap;
SpaceOffice.prototype.TypeList = SpaceOffice.prototype.getTypeList();
SpaceOffice.prototype.Status = Status;
SpaceOffice.prototype.StatusMap = StatusMap;
SpaceOffice.prototype.StatusList = SpaceOffice.prototype.getStatusList();

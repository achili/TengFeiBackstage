import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import SpaceRegional from "./SpaceRegional";
let StatusMap = {
  OK:{
    value: "OK",
    name:"正常",
    style: "#84e599"
  }
};
export default class SpaceBuilding extends BaseEntity {

  constructor(args) {
    super(args);

    this.creator = new User();
    this.name = null;
    this.address = null;
    this.depict = null;
    this.city = null;
    this.certificateNo = null;
    this.area = null;

    }

  getTAG() {
    return "SpaceBuilding"
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword',null,null,'名称/地址'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList(),null,null,false),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, SpaceRegional,null),
      new Filter(Filter.prototype.Type.SPACE_MULTI_SELECTION, "所属空间", "spaceRegionalUuids", null, SpaceRegional,null)

    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/space/building/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "spaceBuilding.uuid"),
        new FormItem(FormItem.prototype.Type.SELECT_SPACE, "所属空间", true, "spaceRegional", "spaceBuilding.spaceRegional", new SpaceRegional(),{},FormItem.defaultEntityBeforeSubmit),
        new FormItem(FormItem.prototype.Type.INPUT, "所属城市",true, "city", "spaceBuilding.city", null,{max: 100, placeholder: "这里填写城市（比如：上海）"}),
        new FormItem(FormItem.prototype.Type.INPUT, "楼栋名称",true, "name", "spaceBuilding.name", null,{max: 100, placeholder: "这里填写名称"}),
        new FormItem(FormItem.prototype.Type.INPUT,"地址",true,"address","spaceBuilding.address", null,{ max: 100, placeholder: "这里填写地址" }),
        new FormItem(FormItem.prototype.Type.INPUT,"产权证编号",true,"certificateNo","spaceBuilding.certificateNo", null,{ max: 100 }),
        new FormItem(FormItem.prototype.Type.INPUT,"面积",true,"area","spaceBuilding.area", null,{ max: 100, placeholder: "m²" }),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "描述",false, "depict", "spaceBuilding.depict", null,{max: 150, placeholder: "这里填写描述"})
      ]
    );
  };

}
SpaceBuilding.prototype.StatusMap = StatusMap;
SpaceBuilding.prototype.StatusList = SpaceBuilding.prototype.getStatusList();

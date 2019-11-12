import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import Tank from '../tank/Tank'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";

export default class appsettings extends BaseEntity {

  constructor() {
    super();
    //标题
    this.splash = new Tank('image', false, 1024 * 1024);
    this.splashList = [];
    this.creator = new User();
    this.digest = null;
    //封面图片
    this.tank = new Tank('image', false, 1024 * 1024, '图片不能超过1M');
    //内容
    this.content = null;
  }
  getTAG() {
    return "Appsettings"
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null)

    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('tank', Tank);
  }

}

import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";

export default class ArticleTag extends BaseEntity {

  constructor(args) {
    super(args);
    //标题
    this.title = null;
    this.creator = new User();
    this.description = null;
  }
  getTAG() {
    return "ArticleTag"
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime')
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/article/tag/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "articleTag.uuid"),
        new FormItem(FormItem.prototype.Type.INPUT, "名称", true, "title", "articleTag.title", null,{max: 20, placeholder: "这里填写标签名称"}),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "描述", false, "description", "articleTag.description", null,{max: 20, placeholder: "提示文字"})
      ]
    );
  };

  static link = {
    nameField: "title",
    path: "/{:by}/article/tag/detail?uuid={uuid}"
  };

}

import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";
import Tank from "../tank/Tank";
import HttpForm from "../_base/HttpForm";
import FormItem from "../_base/FormItem";

export default class CommunityPostsWord extends BaseEntity{
  constructor(args) {
    super(args);

    this.creator = new User();
    //标题
    this.name = null;
    this.description = null;
  }
  getTAG() {
    return "CommunityPostsWord"
  }

  static URL_LOOKUP = "/community/news/lookup";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.CHECK,"已删除",'deleted')
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('poster', Tank);

  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/community/posts/word/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "uuid", true, "uuid", "communityPostsWord.uuid"),
        new FormItem(FormItem.prototype.Type.INPUT, "屏蔽词", true, "name", "communityPostsWord.name", null,{max: 20, placeholder: "屏蔽词名称"}),
        new FormItem(FormItem.prototype.Type.INPUT, "描述信息", true, "description", "communityPostsWord.description", null,{max: 30, placeholder: "提示文字"})
      ]
    );
  };


}

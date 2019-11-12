import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import Tank from '../tank/Tank'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";

export default class Article extends BaseEntity {

  constructor(args) {
    super(args);
    //标题
    this.title = "默认标题";
    this.creator = new User();
    this.digest = null;
    //封面图片
    this.posterTank = new Tank('image', false, 1024 * 1024, '图片不能超过1M');
    //内容
    this.content = null;
  }
  getTAG() {
    return "Article"
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '名称/内容/创建者', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime')
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('posterTank', Tank);
  }

  getHttpDome() {
    return new HttpForm(HttpForm.prototype.Type.ORDINARY, "/article/demo", [
      new FormItem(FormItem.prototype.Type.INPUT, "单行输入", true, "input", null, "默认值",{max: 20, min: 2}),
      new FormItem(FormItem.prototype.Type.TEXT_AREA, "多行输入", false, "textArea", null, "多行输入默认值",{max: 20, placeholder: "提示文字"}),
      new FormItem(FormItem.prototype.Type.NUMBER, "数字输入(兼容IE)", true, "number", null, null, {max: 999, min: 1,placeholder: "提示文字", allowedDecimal: false}),
      new FormItem(FormItem.prototype.Type.TANK, "文件上传", false, "tank", null, new Tank(), {}, FormItem.defaultEntityBeforeSubmit),
      new FormItem(FormItem.prototype.Type.MAP_ADDRESS, "地图地址", true, "address", null, {
        lng: null,
        lat: null,
        address: ""
      }, {}, function () {
        return JSON.stringify(this.value)
      })
    ])
  };

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/article/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "article.uuid"),
        new FormItem(FormItem.prototype.Type.INPUT, "标题", true, "title", "article.title", null,{max: 100, placeholder: "这里填写文章标题"}),
        new FormItem(FormItem.prototype.Type.TANK, "摘要图片", true, "poster", "article.poster", new Tank(), {}, FormItem.defaultEntityBeforeSubmit),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "摘要", false, "digest", "article.digest", null,{max: 100, placeholder: "这里填写文章摘要"}),
        new FormItem(FormItem.prototype.Type.RICH_TEXT, "文章内容", true, "content", "article.content", null, {height: "600px"})
      ]
    );
  };

  static link = {
    nameField: "title",
    path: "/{:by}/article/detail?uuid={uuid}"
  };

}

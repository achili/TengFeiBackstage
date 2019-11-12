import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";
import Tank from "../tank/Tank";
import HttpForm from "../_base/HttpForm";
import FormItem from "../_base/FormItem";
import SpaceRegional from "../space/SpaceRegional";

export default class CommunityNews extends BaseEntity{
  constructor(args) {
    super(args);

    this.creator = new User();
    //图片
    this.poster = new Tank('image', false, 5 * 1024 * 1024, '图片不能超过5M');
    this.posterUrl = null;
    //标题
    this.title = null;
    this.content = null;
    this.list = [];
  }
  getTAG() {
    return "CommunityNews"
  }

  static URL_LOOKUP = "/community/news/lookup";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
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
    this.renderEntity('poster', Tank);

  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/community/news/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "communityNews.uuid"),
        new FormItem(FormItem.prototype.Type.SELECT_SPACE, "所属空间", true, "spaceRegional", "communityNews.spaceRegional", new SpaceRegional(),{},FormItem.defaultEntityBeforeSubmit),
        new FormItem(FormItem.prototype.Type.TANK, "图片", true, "poster", "communityNews.poster",  new Tank(), {}, FormItem.defaultEntityBeforeSubmit),
        new FormItem(FormItem.prototype.Type.INPUT, "名称", true, "title", "communityNews.title", null,{max: 20, placeholder: "这里填写名称"}),
        new FormItem(FormItem.prototype.Type.RICH_TEXT, "内容", true, "content", "communityNews.content", null,{height: "600px"})
      ]
    );
  };

  //搜索全部
  httpQueryAll(content,successCallback, errorCallback){
    let that = this;
    let form = {
      content:content
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(CommunityNews.URL_LOOKUP,form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }
}

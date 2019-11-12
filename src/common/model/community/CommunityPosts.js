import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";
import HttpForm from "../_base/HttpForm";
import FormItem from "../_base/FormItem";
import Tank from "../tank/Tank";
import Commentary from "./commentary/Commentary";
import SpaceOffice from "../space/SpaceOffice";
import BookTour from "../booktour/BookTour";

let Status = {
  ALL: 'ALL',
  OK:'OK',
  CLOSURE:'CLOSURE'
};
let StatusMap = {
  ALL:{
    value: "ALL",
    name:"所有",
    style: "info"
  },
  OK:{
    value: "OK",
    name:"正常",
    style: "info"
  },
  CLOSURE:{
    value: "CLOSURE",
    name:"封禁",
    style: "danger"
  }
};
export default class CommunityPosts extends BaseEntity{

  constructor(args) {
    super(args);
    this.creator = new User();
    this.content = null;
    this.posters = [];
    this.postersUrls = [];
    this.likes = 0;
    this.isPraise = null;
    this.isTop = false;
    this.commentaries = [];
    this.commentaryList = [];
    this.status = Status.FREE;

  }
  getTAG() {
    return "CommunityPosts"
  }
  static URL_APPLAUD = "/community/posts/applaud";
  static URL_COMMENT = "/community/posts/commentary";
  static URL_TOP = "/community/posts/top";
  static URL_STATUS = "/community/posts/status";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '置顶', 'orderTop'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList())
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderList("posters", Tank);
    this.renderList("commentaries", Commentary);
    this.renderList("commentaryList", Commentary);

  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/community/posts/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "communityPosts.uuid"),
        new FormItem(FormItem.prototype.Type.TANKS, "图片", false, "posters", "communityPosts.posters",  [], {max: 9}, function () {
          let ids = [];
          if(this.value) {
            this.value.forEach(tank => {
              ids.push(tank.uuid)
            })
          }
          return  ids.toString()
        }),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "内容", true, "content", "communityPosts.content", null,{max: 350, placeholder: "提示文字"})
      ]
    );
  };

  //点赞
  httpApplaud (successCallback, errorCallback) {
    let that = this;
    let form = {
      likes: this.likes
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(CommunityPosts.URL_APPLAUD,form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  };

  httpToTop (up,successCallback, errorCallback) {
    let that = this;
    let form = {
      up:true
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(CommunityPosts.URL_TOP,form, function (response) {
      that.render(response.data.data);
      console.log(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback);
  }
  httpDownTop (up,successCallback, errorCallback) {
    let that = this;
    let form = {
      up:false
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(CommunityPosts.URL_TOP,form, function (response) {
      that.render(response.data.data);
      console.log(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback);
  }

  //评论
  httpComment(content,successCallback, errorCallback){
    let that = this;
    let form = {
      content:content
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(CommunityPosts.URL_COMMENT,form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  //删除评论
  delComment(index){
    let commentary = new Commentary();
    this.commentaries.splice(index, 1);
    this.commentaries.push(commentary);

  }

  //修改状态
  httpStatus(status,successCallback, errorCallback){
    let that = this;
    this.httpPost(CommunityPosts.URL_STATUS,{ "uuid":this.uuid , status }, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

}
CommunityPosts.prototype.Status = Status;
CommunityPosts.prototype.StatusMap = StatusMap;
CommunityPosts.prototype.StatusList = CommunityPosts.prototype.getStatusList();

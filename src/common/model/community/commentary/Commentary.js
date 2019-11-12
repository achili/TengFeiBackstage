import BaseEntity from "../../_base/BaseEntity";
import User from "../../user/User";
import CommunityPosts from "../CommunityPosts";
import Filter from "../../_base/Filter";
import SpaceBuilding from "../../space/SpaceBuilding";
import CommunityEvents from "../CommunityEvents";

export default class Commentary extends BaseEntity{

  constructor(args) {
    super(args);
    this.creator = new User();
    this.communityPosts = new CommunityPosts();
    this.content = null;
  }
  getTAG() {
    return "Commentary"
  }

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    //this.renderEntity("communityPosts", CommunityPosts);
    this.renderList("communityEvents", CommunityEvents);

  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.HTTP_SELECTION, "朋友圈", "communityPostsUuid", null, CommunityPosts),
      new Filter(Filter.prototype.Type.HTTP_SELECTION, "朋友圈", "communityPosts", null, CommunityPosts)
    ]
  };

}

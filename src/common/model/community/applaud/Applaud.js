import BaseEntity from "../../_base/BaseEntity";
import User from "../../user/User";
import CommunityPosts from "../CommunityPosts";

export default class Applaud extends BaseEntity{

  constructor(args) {
    super(args);
    this.creator = new User();
    this.communityPosts = new CommunityPosts();
    this.praise = false;
  }
  getTAG() {
    return "Applaud"
  }

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderList("communityPosts", CommunityPosts);
  }

}

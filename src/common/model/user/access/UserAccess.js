import BaseEntity from "../../_base/BaseEntity";
import UserRole from "../role/UserRole";

export default class UserAccess extends BaseEntity {
  constructor(args) {
    super(args);
    this.active = null;
    this.role = new UserRole();
    this.featureType = null;

    this.newActive = null;
  }
  getTAG() {
    return "UserAccess"
  }

  render(obj) {
    //BaseEntity.prototype.render.call(this, obj);
    super.render(obj);
    this.renderEntity("role", UserRole);
    this.newActive = this.active;
  }

  getForm() {
    let form = {
      active: this.active,
      roleId: this.role.uuid,
      nodeId: this.node.uuid
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    return form;
  }
}

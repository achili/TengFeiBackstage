import Base from "../_base/Base";

export default class Menu extends Base{

  constructor(name, path, featureType, icon = null, children = [], contain = [], but = []) {
    super();
    this.name = name;
    this.featureType = featureType;
    this.active = false;
    this.icon = icon;
    this.router = {
      path: path
    };
    this.children = children;
    this.contain = contain;
    this.but = but;
    this.isOpen = false;
  }


  add(menu) {
    this.children.push(menu);
  }

  refreshChildrenActivity(path) {
    //递归函
    this.active = false;
    this.isOpen = false;
    if(!this.children || this.children.length === 0) {

      //
      let indexOfList1 = this.router.path.lastIndexOf('/list');
      let indexOfList21 = path.lastIndexOf('/detail');
      let indexOfList22 = path.lastIndexOf('/edit');
      let indexOfList23 = path.lastIndexOf('/create');
      let indexOfList24 = path.lastIndexOf('/profile');
      let indexOfList25 = path.lastIndexOf('/list');
      let isList = false;
      if(indexOfList1 !== -1 && (indexOfList21 !== -1 || indexOfList22 !== -1 || indexOfList23 !== -1 || indexOfList24 !== -1 || indexOfList25 !== -1)) {
        let indexOfSpecific = Math.max(indexOfList21, indexOfList22, indexOfList23, indexOfList24, indexOfList25);
        isList = path.substring(0 ,indexOfSpecific) === (this.router.path.substring(0 ,indexOfList1));
      } else {
        isList = path === this.router.path;
      }
      if(isList === false) {
        this.contain.forEach(url => {
          if(url === path) {
            isList = true;
          }
        })
      }

      if(isList === true) {
        this.but.forEach(url => {
          if(url === path) {
            isList = false;
          }
        })
      }

      if(isList) {
        this.active = true;
        this.isOpen = true;
        return true;
      } else {
        return false;
      }
    } else {
      let isActivity = false;
      this.children.forEach(menu => {
        if(menu.refreshChildrenActivity(path)) {
          isActivity = true;
        }
      });
      this.isOpen = isActivity;
      return isActivity;
    }

  }

}








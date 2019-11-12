import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'

export default class Enclose extends BaseEntity {

  constructor(args) {
    super(args);
    this.enclosedId = null;
    this.enclosedName = null;
    this.enclosedPid = null;

  }
  getTAG() {
    return "Enclose"
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword',null,null,'名称')
    ]
  };

}


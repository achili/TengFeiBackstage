import BaseEntity from "../../_base/BaseEntity";
import Filter from "../../_base/Filter";
import ProtocolSpace from "../space/ProtocolSpace";
import FinancePayInfo from "../../finance/FinancePayInfo";


export default class ProtocolCompany extends BaseEntity {

  constructor(args) {
    super(args);
    this.name = null;
    this.arrearsDay = null;
    this.arrearsStartTime = null;
    this.arrearsTotal = null;
    this.protocolSpaces = [];
    this.financePayInfos = [];
    this.arrearsFinancePayInfo = [];
  }

  getTAG() {
    return "ProtocolCompany"
  }

  getFilters(){
    return [
      new Filter("INPUT", "关键字", "keyword"),
      new Filter("INPUT", "是否欠款", "isArrears"),
      new Filter("SORT", "创建时间", "orderStartTime"),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null)

    ]
  }

  render(obj){
    super.render(obj);
    this.renderList("protocolSpaces", ProtocolSpace);
    this.renderList("financePayInfos", FinancePayInfo);
    this.renderEntity("arrearsStartTime", Date);
  }

}

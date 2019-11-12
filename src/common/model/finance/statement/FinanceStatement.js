import BaseEntity from "../../_base/BaseEntity";
import FinanceStatementItem from "./FinanceStatementItem";
import Vue from 'vue'
import {simpleDateTime} from "../../../filter/time";
import Filter from "../../_base/Filter";


export default class FinanceStatement extends BaseEntity {

  constructor(args) {
    super(args);
    //合同条目数
    this.items = [];
  }

  getTAG() {
    return "FinanceStatement"
  }

  render(obj) {
    super.render(obj);
    this.renderList("items", FinanceStatementItem);
  }
  static URL_REPORT = "/finance/statement/report";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null)
    ]
  };

  getForm(){
    let form = {};
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    return form;
  }

  httpReport(spaceRegionalUuid,successCallback,errorCallback){
    let that = this;
    this.httpPost(FinanceStatement.URL_REPORT,{"spaceRegionalUuid":spaceRegionalUuid}, function (response) {
      // that.render(response.data.data);
      successCallback && successCallback(response.data.data.items);
    }, errorCallback)
  }

  downloadEtlXLSUrl(startTime, endTime,spaceRegionalActive,user) {
    return Vue.http.options.root + "/finance/statement/download/xls_etl_vat?statTime=" + simpleDateTime(startTime) + "&endTime=" + simpleDateTime(endTime) + "&spaceRegionalUuid=" + spaceRegionalActive + "&userUuid=" + user;
  }
  downloadPayXLSUrl(startTime, endTime,spaceRegionalActive,user) {
    return Vue.http.options.root + "/finance/statement/download/xls_pay_bill?statTime=" + simpleDateTime(startTime) + "&endTime=" + simpleDateTime(endTime) + "&spaceRegionalUuid=" + spaceRegionalActive + "&userUuid=" + user;
  }

}

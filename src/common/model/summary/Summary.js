import Vue from "vue";
import BaseEntity from "../_base/BaseEntity";
import Filter from "../_base/Filter";
import SummaryAttribute from "./SummaryAtrribute";
import SpaceOrder from "../spaceOrder/SpaceOrder";
import SpaceRegional from "../space/SpaceRegional";
import {simpleDateTime} from "../../filter/time";


let Status = {
  OK: "OK"
};

let StatusMap = {
  OK: {
    name: "OK",
    value: "OK",
    style: "success",
    icon: "hourglass"
  }
};

export default class Summary extends BaseEntity {

  constructor(args) {
    super(args);
    this.name = null;
    this.description = null;
    this.mainEntityClazz = null;
    this.summaryAttributeInfo = [];

    //界面控制
    this.mainEntityPackage = null;
    this.pageSize = null;
    this.page = null;

    this.token = null;

    if (Vue.store.state.debug) {
      this.mockData();
    }
  }

  getTAG() {
    return "Summary"
  }

  static URL_REPORT = '/summary/report';
  static URL_EXPORT_EXCEL = '/summary/export/excel?token={token}';//
  static URL_EXCEL  = '/summary/export/excel/get/token';

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.SORT, 'ID', 'orderId'),
      new Filter("INPUT", "关键字", "keyword"),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, SpaceRegional,null)

    ];
  };

    //测试数据。
   mockData () {
        //this.summaryAttributeInfo = [new SummaryAttribute(), new SummaryAttribute()];
   }

   //We use this method to get the full js Object
  render(obj) {
    super.render(obj);
      // console.log(this.summaryAttributeInfo);
      if (this.summaryAttributeInfo) {
        if (this.summaryAttributeInfo.length !== 0) {
          this.summaryAttributeInfo = JSON.parse(this.summaryAttributeInfo);
        }
      }
   }

  httpReport (page, pageSize,spaceRegional, successCallback, failureCallback) {
    if (!this.mainEntityPackage) {
      this.errorMessage = "请先选择主要数据！";
      return;
    }
    if (!this.spaceRegional.uuid) {
      this.errorMessage = "请先选择所属空间！";
      return;
    }
    this.page = page;
    this.pageSize = pageSize;
    this.spaceRegional = spaceRegional;
    let form = {
      mainEntityClazz: this.mainEntityPackage,
      summaryAttributeInfo: JSON.stringify(this.summaryAttributeInfo),
      page: this.page,
      pageSize: this.pageSize,
      spaceRegional:this.spaceRegional.uuid
    };
    let that = this;
    this.httpPost(Summary.URL_REPORT, form, function (response) {
      successCallback && successCallback(response);
    }, failureCallback);
  }

  exportExcelUrl (summary,successCallback,failureCallback) {
     let that = this;
    let url = "";
    if (!this.mainEntityPackage) {
      this.errorMessage = "请先选择主要数据！";
      return;
    }
    if (!this.spaceRegional.uuid) {
      this.errorMessage = "请先选择所属空间！";
      return;
    }
    let form = {
      mainEntityClazz: summary.mainEntityPackage,
      summaryAttributeInfo: JSON.stringify(summary.summaryAttributeInfo),
      spaceRegionalUuid: summary.spaceRegional.uuid
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(Summary.URL_EXCEL, form, function (response) {
      that.token = response.bodyText;
      that.showUrl(response.bodyText);
      successCallback && successCallback(response);

    }, failureCallback);

    // url = Vue.http.options.root + Summary.URL_EXPORT_EXCEL.replace("{spaceRegionalUuid}",summary.spaceRegional.uuid).replace("{mainEntityClazz}", this.mainEntityPackage).replace("{summaryAttributeInfo}",JSON.stringify(this.summaryAttributeInfo));
    // return encodeURI(url);
  }

  showUrl(token){
    let url = "";
    if(token != null){
      url = Vue.http.options.root + Summary.URL_EXPORT_EXCEL.replace("{token}",token);
      window.open(url);
      return url;
    }

  }



  downloadEtlXLSUrl(mainEntityPackage,summaryAttributeInfo,spaceRegional) {

    return Vue.http.options.root + '/summary/export/excel?mainEntityClazz=' + mainEntityPackage + '&summaryAttributeInfo=' + JSON.stringify(summaryAttributeInfo) + '&spaceRegionalUuid=' + spaceRegional;
  }

  getForm() {
      let form = {
        name: this.name,
        spaceRegional: this.spaceRegional.uuid,
        description: this.description,
        mainEntityClazz: this.mainEntityPackage,
        summaryAttributeInfo: JSON.stringify(this.summaryAttributeInfo)
      };
      if (this.uuid) {
        form.uuid = this.uuid;
      }
      return form;
    }

  validate() {
      this.errorMessage = null;
      if(!this.spaceRegional.uuid){
        this.errorMessage = "请选择所属空间！";
        return false;
      }
      if (!this.name) {
        this.errorMessage = "名称必填！";
        return false;
      }
      if (!this.mainEntityClazz) {
        this.errorMessage = "主要数据对象必填！";
        return false;
      }
      if (!this.summaryAttributeInfo.length) {
        this.errorMessage = "请至少选择一个属性！";
        return false;
      }
      return true;
   }

  httpSave (successCallback, errorCallback) {
    let that = this;
    //验证是否装填好
    if (!this.validate()) {
      return
    }
    super.httpSave(this.getForm(), function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  }

}
Summary.prototype.Status = Status;
Summary.prototype.StatusMap = StatusMap;
Summary.prototype.StatusList = Summary.prototype.getStatusList();

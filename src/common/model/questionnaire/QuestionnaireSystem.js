import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import User from '../user/User'
import QuestionnaireQuestion from "./QuestionnaireQuestion";
import Vue from "vue";
import $ from "jquery";

//edit mode的表达能力不够，因此借用Procedure
let Procedure = {
  SURVEY_CREATE: 'SURVEY_CREATE',
  SURVEY_EDIT: 'SURVEY_EDIT',
  SURVEY_DISPLAY: 'SURVEY_DISPLAY',
  ANSWER_EDIT: 'ANSWER_EDIT',
  ANSWER_DISPLAY: 'ANSWER_DISPLAY'

};
let Status = {
  'NEW': 'NEW',
  'RUNNING': 'RUNNING',
  'STOP': 'STOP'
};
let StatusMap = {
  NEW: {
    name: "待发布",
    value: "NEW",
    style: "warning"
  },
  RUNNING: {
    name: "运行中",
    value: "RUNNING",
    style: "success"
  },
  STOP: {
    name: "已停止",
    value: "STOP",
    style: "danger"
  }
};
export default class QuestionnaireSystem extends BaseEntity {

  constructor(args) {
    super(args);
    this.creator = new User();
    this.status = Status.NEW;
    //标题
    this.title = null;
    //详情介绍
    this.description = null;
    this.questions = [];
    this.questionMapList = [];
    this.questionnaireAnswer = [];
    //local fields.
    this.procedure = null;
  }

  getTAG() {
    return "QuestionnaireSystem"
  }

  static URL_STATUS = "/questionnaire/system/status";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList()),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null)

    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderList("questions", QuestionnaireQuestion);

  }

  validate() {
    // if (!this.spaceRegional.uuid) {
    //   this.errorMessage = "请选择所属空间！";
    //   return
    // }
    if (!this.title) {
      this.errorMessage = "标题必填！";
      return
    }
    if (!this.questions || this.questions.length === 0) {
      this.errorMessage = "请至少准备一个问题！";
      return
    }
    //每个question都不是处于edit状态
    for (let index in this.questions) {
      let question = this.questions[index];
      if (question.editMode) {
        this.errorMessage = "请确保所有问题都处于非编辑状态！";
        return
      }
    }
    this.errorMessage = null;
    return true;
  }

  getForm(){
    let questionsInfo = [];
    if (this.questions) {
      for (let i = 0; i < this.questions.length; i++) {
        let question = this.questions[i];
        questionsInfo.push(question.getForm());
      }
    }

    let form = {
      spaceRegional:this.spaceRegional.uuid,
      title: this.title,
      description: this.description,
      questions: JSON.stringify(questionsInfo)
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    return form;
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

  downloadCsv(){
    window.location = Vue.http.options.root + "/questionnaire/system/download/csv/" + this.uuid;
  }

  downloadXls(){
    window.location = Vue.http.options.root + "/questionnaire/system/download/xls?uuid=" + this.uuid;
  }

  addQuestion(type){
    let question = new QuestionnaireQuestion(type);
    question.setProcedure(this.procedure);
    question.editMode = true;
    this.questions.push(question);
  }

  copyQuestion(index){
    let question = this.questions[index];
    this.questions.push($.extend(new QuestionnaireQuestion(), question));
  }

  upQuestion(index){
    let question = this.questions[index];
    if (index !== 0) {
      this.questions.splice(index, 1);
      this.questions.splice(index - 1, 0, question);
    }
  }

  downQuestion(index){
    let question = this.questions[index];
    if (index < this.questions.length - 1) {
      this.questions.splice(index, 1);
      this.questions.splice(index + 1, 0, question);
    }
  }

  delQuestion(index){
    this.questions.splice(index, 1);
  }

  setProcedure(p){
    this.procedure = p;
    for (let i = 0; i < this.questions.length; i++) {
      let question = this.questions[i];
      question.setProcedure(p);
    }
  }

  httpStatus(status, successCallback, errorCallback){
    if (status === this.status) {
      this.errorMessage = "状态未作修改";
      this.defaultErrorHandler(this.errorMessage, errorCallback);
      return;
    }
    if (!StatusMap[status]) {
      this.errorMessage = "状态:" + status + "不存在";
      this.defaultErrorHandler(this.errorMessage, errorCallback);
      return;
    }
    let that = this;
    let form = {
      status:status
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(QuestionnaireSystem.URL_STATUS, form, function (response) {
      that.status = status;
      successCallback && successCallback(response);
    }, errorCallback)
  }

}
QuestionnaireSystem.prototype.Procedure = Procedure;
QuestionnaireSystem.prototype.Status = Status;
QuestionnaireSystem.prototype.StatusMap = StatusMap;
QuestionnaireSystem.prototype.StatusList = QuestionnaireSystem.prototype.getStatusList();

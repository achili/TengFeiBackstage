import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import User from '../user/User'
import QuestionnaireSystem from "./QuestionnaireSystem";

export default class QuestionnaireAnswer extends BaseEntity {

  constructor(args) {
    super(args);
    this.creator = new User();
    this.questionniareSystem = new QuestionnaireSystem();
    this.content = new QuestionnaireSystem();
  }

  getTAG() {
    return "QuestionnaireAnswer"
  }

  static URL_READY = "/questionnaire/answer/ready{questionnaireSystemUuid}";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.INPUT, 'id', 'questionnaireSystemUuid',null,QuestionnaireSystem,null,false)
    ]
  };

  render(obj) {
    super.render(obj);
    if (this.content) {
      this.renderEntity("content", QuestionnaireSystem);
    }
    if (this.creator) {
      this.renderEntity('creator', User);
    }
  }

  validate() {
    for (let index in this.content.questions) {
      let question = this.content.questions[index];
      if (!question.answerValidate() ) {
        this.errorMessage = "请按照要求填写每个问题。";
        return
      }
    }
    this.errorMessage = null;
    return true;
  }

  getForm(){
    let form = {
      content: JSON.stringify(this.content.getForm())
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    return form;
  }

  httpSave (successCallback, errorCallback) {
    let that = this;
    //验证是否装填好
    // if (!this.validate()) {
    //   return
    // }
    super.httpSave(this.getForm(), function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  }

  setProcedure(p){
    this.questionniareSystem.setProcedure(p);
    this.content.setProcedure(p);
  }

  httpReady(questionnaireSystemUuid,questionnaireSystemKey,successCallback, errorCallback){
    let that = this;
    this.httpPost(QuestionnaireAnswer.URL_READY,{uuid:questionnaireSystemUuid,questionnaireSystemKey:questionnaireSystemKey} , function (response) {
      that.render(response.data.data);
      that.setProcedure(QuestionnaireSystem.prototype.Procedure.ANSWER_EDIT);
      successCallback && successCallback(response);
    }, errorCallback)
  }
}

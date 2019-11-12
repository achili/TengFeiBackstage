import Base from "../_base/Base";



export default class QuestionnaireComponent extends Base {

  constructor(args) {
    super(args);
    this.forAnswer = null;
    this.required = null;
    this.procedure = null;
  }
  getTAG() {
    return "QuestionnaireComponent"
  }
  setProcedure(p){
    this.procedure = p;
  }

}

import QuestionnaireComponent from "./QuestionnaireComponent";

export default class QuestionnaireChoice extends QuestionnaireComponent {

  constructor(args) {
    super(args);
    this.title = null;
    this.col = 12;
    this.other = null;
  }
  getTAG() {
    return "QuestionnaireChoice"
  }

  getForm(){
    return {
      title: this.title,
      col: this.col,
      other:this.other
    }
  }

}

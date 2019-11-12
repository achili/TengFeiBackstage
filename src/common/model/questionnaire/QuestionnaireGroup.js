import QuestionnaireInput from "./QuestionnaireInput";
import QuestionnaireSystem from "./QuestionnaireSystem";
import QuestionnaireComponent from "./QuestionnaireComponent";



export default class QuestionnaireGroup extends QuestionnaireComponent {

  constructor(args) {
    super(args);
    this.title = null;
    this.max = 10;
    this.min = 1;

    this.inputs = [];
    this.inputs.push(new QuestionnaireInput());

    //Array little trick. Use the same object with inputs in Creation stage.
    this.inputsList = [];
    this.inputsList.push(this.inputs);
  }

  getTAG() {
    return "QuestionnaireGroup"
  }

  setProcedure(p){
    this.procedure = p;
    if (p === QuestionnaireSystem.prototype.Procedure.SURVEY_CREATE || p === QuestionnaireSystem.prototype.Procedure.SURVEY_EDIT) {
      this.inputsList = [];
      this.inputsList.push(this.inputs);
    }
    if (this.inputs) {
      for (let i = 0; i < this.inputs.length; i++) {
        let input = this.inputs[i];
        input.setProcedure(p);
      }
    }
    if (this.inputsList) {
      for (let j = 0; j < this.inputsList.length; j++) {
        let inputs = this.inputsList[j];
        if (inputs) {
          for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            input.setProcedure(p);
          }
        }
      }
    }
  }

  render(obj) {
    super.render(obj);

    let inputsListInfo = [];
    for (let i = 0; i < this.inputsList.length; i++) {
      let inputs = this.inputsList[i];
      let inputsInfo = [];
      for (let j = 0; j < inputs.length; j++) {
        let input = inputs[j];
        let clazz = new QuestionnaireInput();
        clazz.render(input);
        inputsInfo.push(clazz);
      }
      inputsListInfo.push(inputsInfo);
    }
    this.inputsList = inputsListInfo;

    let inputsInfo = [];
    for (let j = 0; j < this.inputs.length; j++) {
      let input = this.inputs[j];
      let clazz = new QuestionnaireInput();
      clazz.render(input);
      inputsInfo.push(clazz);
    }
    this.inputs = inputsInfo;
  }

  getForm(){
    let inputsListInfo = [];
    for (let i = 0; i < this.inputsList.length; i++) {
      let inputs = this.inputsList[i];
      let inputsInfo = [];
      for (let j = 0; j < inputs.length; j++) {
        let input = inputs[j];
        inputsInfo.push(input.getForm());
      }
      inputsListInfo.push(inputsInfo);
    }
    let inputsInfo = [];
    for (let j = 0; j < this.inputs.length; j++) {
      let input = this.inputs[j];
      inputsInfo.push(input.getForm());
    }
    return {
      title: this.title,
      max: this.max,
      min: this.min,
      col: this.col,
      inputsList: inputsListInfo,
      inputs: inputsInfo
    }
  }

  newInputs(inputs){
    if (!inputs) {
      inputs = this.inputs;
    }
    let inputsInfo = [];
    for (let j = 0; j < inputs.length; j++) {
      let input = inputs[j];
      let clazz = new QuestionnaireInput();
      clazz.setProcedure(this.procedure);
      clazz.render(input.getForm());
      if (clazz.type === "TIME") {
      }
      inputsInfo.push(clazz);
    }
    return inputsInfo;
  }

  canAdd(index){
    return this.inputsList.length < this.max;
  }

  addGroup(index){
    if (this.canAdd(index)) {
      this.inputsList.splice(index + 1, 0, this.newInputs());
    }
  }

  canCopy(index){
    return this.inputsList.length < this.max;
  }

  copyGroup(index){
    if (this.canCopy(index)) {
      let inputs = this.inputsList[index];
      this.inputsList.push(this.newInputs(inputs));
    }
  }

  canUp(index){
    return index > 0;
  }

  upGroup(index){
    if (index !== 0) {
      let item = this.inputsList[index];
      this.inputsList.splice(index, 1);
      this.inputsList.splice(index - 1, 0, item);
    }
  }

  canDown(index){
    return index < this.inputsList.length - 1;
  }

  downGroup(index){
    if (index < this.inputsList.length - 1) {
      let item = this.inputsList[index];
      this.inputsList.splice(index, 1);
      this.inputsList.splice(index + 1, 0, item);
    }
  }

  canDel(index){
    return this.inputsList.length > this.min;
  }

  delGroup(index){
    if (this.inputsList.length > this.min) {
      this.inputsList.splice(index, 1);
    }
  }

}

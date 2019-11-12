import QuestionnaireChoice from "./QuestionnaireChoice";
import QuestionnaireInput from "./QuestionnaireInput";
import QuestionnaireGroup from "./QuestionnaireGroup";
import {isInteger} from "../../util/Utils";
import QuestionnaireComponent from "./QuestionnaireComponent";

let Type = {
  //单项选择
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  //多项选择
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  //单项填空
  SINGLE_BLANK: 'SINGLE_BLANK',
  //多项填空
  MULTIPLE_BLANK: 'MULTIPLE_BLANK',
  //动态分组
  DYNAMIC_GROUP: 'DYNAMIC_GROUP'
};
let TypeMap = {
  SINGLE_CHOICE: {
    name: "单项选择",
    value: 'SINGLE_CHOICE',
    icon: "fa fa-check-circle-o",
    style: "success"
  },
  MULTIPLE_CHOICE: {
    name: "多项选择",
    value: 'MULTIPLE_CHOICE',
    icon: "fa fa-check-square-o",
    style: "success"
  },
  SINGLE_BLANK: {
    name: "单项填空",
    value:'SINGLE_BLANK',
    icon: "fa fa-pencil-square-o",
    style: "success"
  },
  MULTIPLE_BLANK: {
    name: "多项填空",
    value: 'MULTIPLE_BLANK',
    icon: "fa fa-pencil-square",
    style: "success"
  },
  DYNAMIC_GROUP: {
    name: "动态分组",
    value: 'DYNAMIC_GROUP',
    icon: "fa fa-snowflake-o",
    style: "success"
  }
};
export default class QuestionnaireQuestion extends QuestionnaireComponent {

  constructor(type = Type.SINGLE_CHOICE) {
    super(type);
    this.title = null;
    this.type = type;
    //必答题
    this.required = true;
    //对于 SINGLE_CHOICE 有用
    this.value = null;
    //对于 MULTIPLE_CHOICE 有用
    this.values = [];
    this.choices = [];
    this.input = new QuestionnaireInput();
    this.inputs = [];
    this.group = new QuestionnaireGroup();

    if (type === Type.SINGLE_CHOICE) {
      this.choices = [];
      this.choices.push(new QuestionnaireChoice());
      this.choices.push(new QuestionnaireChoice());
      let questionnaireChoice = new QuestionnaireChoice();
      questionnaireChoice.title = '其它,请说明';
      this.choices.push(questionnaireChoice);
      this.value = null;

    } else if (type === Type.MULTIPLE_CHOICE) {
      this.choices = [];
      this.choices.push(new QuestionnaireChoice());
      this.choices.push(new QuestionnaireChoice());
      let questionnaireChoice = new QuestionnaireChoice();
      questionnaireChoice.title = '其它,请说明';
      this.choices.push(questionnaireChoice);
      this.values = [];

    } else if (type === Type.SINGLE_BLANK) {
      this.input = new QuestionnaireInput();

    } else if (type === Type.MULTIPLE_BLANK) {
      this.inputs = [];
      this.inputs.push(new QuestionnaireInput());
      this.inputs.push(new QuestionnaireInput());

    } else if (type === Type.DYNAMIC_GROUP) {
      this.group = new QuestionnaireGroup();

    }
  }

  getTAG() {
    return "QuestionnaireQuestion"
  }
  setProcedure(p){
    this.procedure = p;
    if (this.input) {
      this.input.setProcedure(p);
    }
    if (this.inputs) {
      for (let i = 0; i < this.inputs.length; i++) {
        let input = this.inputs[i];
        input.setProcedure(p);
      }
    }
    if (this.choices) {
      for (let i = 0; i < this.choices.length; i++) {
        let choice = this.choices[i];
        choice.setProcedure(p);
      }
    }
    if (this.group) {
      this.group.setProcedure(p);
    }
  }

  render(obj) {
    super.render(obj);
    this.renderList("choices", QuestionnaireChoice);
    this.renderList("inputs", QuestionnaireInput);
    if (this.group) {
      this.renderEntity("group", QuestionnaireGroup);
    }
    if (this.input) {
      this.renderEntity("input", QuestionnaireInput);
    }

  }

  finish(){
    if (this.validate()) {
      this.editMode = false;
    }
  }

  validate() {
    //check title
    if (!this.title) {
      this.errorMessage = "请输入标题!";
      return;
    }

    if (this.type === Type.SINGLE_CHOICE || this.type === Type.MULTIPLE_CHOICE) {
      for (let i = 0; i < this.choices.length; i++) {
        let choice = this.choices[i];
        if (!choice.title) {
          this.errorMessage = "请输入选项" + (i + 1) + "的标题!";
          return;
        }
      }
    } else if (this.type === Type.MULTIPLE_BLANK) {
      for (let i = 0; i < this.inputs.length; i++) {
        let input = this.inputs[i];
        if (!input.title) {
          this.errorMessage = "请输入文本框" + (i + 1) + "的标题!";
          return;
        }
      }
    } else if (this.type === Type.DYNAMIC_GROUP) {
      for (let i = 0; i < this.group.inputs.length; i++) {
        let input = this.group.inputs[i];
        if (!input.title) {
          this.errorMessage = "请输入文本框" + (i + 1) + "的标题!";
          return;
        }
      }
      if (!isInteger(this.group.min) || !isInteger(this.group.max)) {
        this.errorMessage = "最小组数和最大组数都必须是整数";
        return;
      }
      if (this.group.min > this.group.max) {
        this.errorMessage = "最小组数不能大于最大组数！";
        return;
      }
    }
    this.errorMessage = null;
    return true;
  }

  answerValidate(){

    if (this.type === Type.SINGLE_CHOICE) {
      if (this.value === null) {
        this.errorMessage = "请选择内容";
        return
      }
    } else if (this.type === Type.MULTIPLE_CHOICE) {
      if (this.values === null || this.values.length === 0) {
        this.errorMessage = "请选择内容";
        return
      }
    } else if (this.type === Type.SINGLE_BLANK) {
      if (!this.input.answerValidate()) {
        this.errorMessage = this.input.errorMessage;
        return
      }
    } else if (this.type === Type.MULTIPLE_BLANK) {
      for (let i = 0; i < this.inputs.length; i++) {
        let input = this.inputs[i];
        if (!input.answerValidate()) {
          this.errorMessage = input.errorMessage;
          return
        }
      }
    } else if (this.type === Type.DYNAMIC_GROUP) {
      let inputsList = this.group.inputsList;
      for (let n = 0; n < inputsList.length; n++) {
        let inputs = inputsList[n];
        for (let i = 0; i < inputs.length; i++) {
          let input = inputs[i];
          if (!input.answerValidate()) {
            this.errorMessage = input.errorMessage;
            return
          }
        }
      }
    }
    this.errorMessage = null;
    return true;
  }

  getItems(){
    if (this.type === Type.SINGLE_CHOICE || this.type === Type.MULTIPLE_CHOICE) {
      return this.choices;
    } else if (this.type === Type.MULTIPLE_BLANK) {
      return this.inputs;
    } else if (this.type === Type.DYNAMIC_GROUP) {
      return this.group.inputs;
    }
  }

  newItem(){
    if (this.type === Type.SINGLE_CHOICE || this.type === Type.MULTIPLE_CHOICE) {
      return new QuestionnaireChoice();
    } else if (this.type === Type.MULTIPLE_BLANK) {
      return new QuestionnaireInput();
    } else if (this.type === Type.DYNAMIC_GROUP) {
      return new QuestionnaireInput();
    }
  }

  addItem(index){
    this.getItems().splice(index + 1, 0, this.newItem());
  }

  delItem(index){
    this.getItems().splice(index, 1);
  }

  upItem(index){
    if (index !== 0) {
      let item = this.getItems()[index];
      this.getItems().splice(index, 1);
      this.getItems().splice(index - 1, 0, item);
    }
  }

  downItem(index){
    if (index < this.getItems().length - 1) {
      let item = this.getItems()[index];
      this.getItems().splice(index, 1);
      this.getItems().splice(index + 1, 0, item);
    }
  }

  getForm() {
    let choicesInfo = [];
    if (this.choices) {
      for (let i = 0; i < this.choices.length; i++) {
        let choice = this.choices[i];
        choicesInfo.push(choice.getForm());
      }
    }

    let inputsInfo = [];
    if (this.inputs) {
      for (let i = 0; i < this.inputs.length; i++) {
        let input = this.inputs[i];
        inputsInfo.push(input.getForm());
      }
    }

    if (this.type === Type.SINGLE_CHOICE) {
      return {
        "title": this.title,
        "type": this.type,
        "required": this.required,
        "value": this.value,
        "choices": choicesInfo
      };

    } else if (this.type === Type.MULTIPLE_CHOICE) {
      return {
        "title": this.title,
        "type": this.type,
        "required": this.required,
        "values": this.values,
        "choices": choicesInfo
      };
    } else if (this.type === Type.SINGLE_BLANK) {
      let form = {
        "title": this.title,
        "type": this.type,
        "required": this.required,
        "input": this.input ? this.input.getForm() : null
      };

      return form;
    } else if (this.type === Type.MULTIPLE_BLANK) {
      return {
        "title": this.title,
        "type": this.type,
        "required": this.required,
        "inputs": inputsInfo
      };
    } else if (this.type === Type.DYNAMIC_GROUP) {
      return {
        "title": this.title,
        "type": this.type,
        "required": this.required,
        "group": this.group ? this.group.getForm() : null
      };
    }
  }

}
QuestionnaireQuestion.prototype.Type = Type;
QuestionnaireQuestion.prototype.TypeMap = TypeMap;
QuestionnaireQuestion.prototype.TypeList = QuestionnaireQuestion.prototype.getTypeList();

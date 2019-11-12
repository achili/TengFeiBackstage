import BaseEntity from "../_base/BaseEntity";
import Filter from "../_base/Filter";
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import ConferenceRoom from "../conferenceroom/ConferenceRoom";

let Type = {
	//邮件模板
	MAIL: "MAIL",
	//pdf模板
	PDF: "PDF",
	//短信模板
	SMS: "SMS"
};


let TypeMap = {
	MAIL: {
		name: "邮件",
		val: Type.MAIL,
		style: "primary"
	},
	PDF: {
		name: "PDF",
    val: Type.PDF,
		style: "info"
	},
	SMS: {
		name: "短信",
    val: Type.SMS,
		style: "success"
	}
};


export default class Template extends BaseEntity {
  constructor(args) {
    super(args);

    this.name = null;
    this.type = Type.MAIL;
    this.key = null;
    this.description = null;
    this.content = null;

  }

  getTAG() {
    return "Template"
  }
  render(obj) {
    super.render(obj);
  }
  getFilters() {
    return [
      new Filter("SORT", "时间", "orderCreateTime"),
      new Filter("INPUT", "名称", "name"),
      new Filter("INPUT", "关键字", "keyword"),
      new Filter("SELECTION", "类型", "type", this.getTypeList())
    ]
  }
  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/template/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "template.uuid"),
        new FormItem(FormItem.prototype.Type.INPUT, "名称", true, "name", "template.name",  "", {max: 60}),
        new FormItem(FormItem.prototype.Type.INPUT, "KEY", true, "templateKey", "template.templateKey",  "", {max: 45}),
        new FormItem(FormItem.prototype.Type.SELECT, "类型", true, "type", "template.type", null,{
          list:Template.prototype.TypeList}),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "详情", true, "description", "template.description", null,{max: 250}),
        new FormItem(FormItem.prototype.Type.CODE_MIRROR  , "内容", true, "content", "template.content", null)
      ]
    );
  }

}
Template.registerTypeEnum(TypeMap);

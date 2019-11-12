import TemplateList from "../../view/developer/template/List";
import TemplateCreate from "../../view/developer/template/Create";

export default [
  {
    path: 'template/list',
    component: TemplateList,
    meta: {
      name: "消息模板"
    }
  },
  {
    path: 'template/create',
    component: TemplateCreate,
    meta: {
      name: "创建消息模板"
    }
  },
  {
    path: 'template/edit',
    component: TemplateCreate,
    meta: {
      name: "编辑消息模板"
    }
  }
]



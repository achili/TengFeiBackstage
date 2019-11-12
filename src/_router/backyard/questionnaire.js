import QuestionnaireSystemList from "../../view/backyard/questionnaire/List";
import QuestionnaireSystemCreate from "../../view/backyard/questionnaire/Create";
import QuestionnaireSystemDetail from "../../view/backyard/questionnaire/Detail";
import QuestionnaireAnswerReady from "../../view/backyard/questionnaire/UserAnswer";
import Answer from "../../view/backyard/questionnaire/Answer";


export default [
  {
    path: 'questionnaire/system/list',
    component: QuestionnaireSystemList,
    meta: {
      name: "问卷系统"
    }
  },
  {
    path: 'questionnaire/system/create',
    component: QuestionnaireSystemCreate,
    meta: {
      name: "创建问卷"
    }
  },
  {
    path: 'questionnaire/system/edit',
    component: QuestionnaireSystemCreate,
    meta: {
      name: "编辑问卷"
    }
  },
  {
    path: 'questionnaire/system/detail',
    component: QuestionnaireSystemDetail,
    meta: {
      name: "问卷详情"
    }
  },
  {
    path: 'questionnaire/answer/ready',
    component: QuestionnaireAnswerReady,
    meta: {
      name: "问卷"
    }
  },
  {
    path: 'questionnaire/answer',
    component: Answer,
    meta: {
      name: "答卷详情"
    }
  }
]

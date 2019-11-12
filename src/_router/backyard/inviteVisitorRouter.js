import InviteVisitorList from "../../view/backyard/invite/List";
import InviteVisitorCreate from "../../view/backyard/invite/Create";
import InviteVisitorDetail from "../../view/backyard/invite/Detail";

export default [
  {
    path: 'invite/visitor/list',
    component: InviteVisitorList,
    meta: {
      name: "邀请访客"
    }
  },
  {
    path: 'invite/visitor/create',
    component: InviteVisitorCreate,
    meta: {
      name: "新增邀请访客"
    }
  },
  {
    path: 'invite/visitor/edit',
    component: InviteVisitorCreate,
    meta: {
      name: "编辑邀请访客"
    }
  },
  {
    path: 'invite/visitor/detail',
    component: InviteVisitorDetail,
    meta: {
      name: "邀请访客详情"
    }
  }
]



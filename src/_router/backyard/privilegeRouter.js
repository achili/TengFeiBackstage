import PrivilegeList from "../../view/backyard/privilege/List";
import PrivilegeCreate from "../../view/backyard/privilege/Create";

export default [
  {
    path: 'privilege/list',
    component: PrivilegeList,
    meta: {
      name: "福利"
    }
  },
  {
    path: 'privilege/create',
    component: PrivilegeCreate,
    meta: {
      name: "创建福利"
    }
  },
  {
    path: 'privilege/edit',
    component: PrivilegeCreate,
    meta: {
      name: "编辑福利"
    }
  }
]

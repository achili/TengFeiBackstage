import UserList from "../../view/backyard/user/List";
import UserRoleList from "../../view/backyard/user/role/List";
import UserRoleCreate from "../../view/backyard/user/role/Create"
import UserRoleDetail from "../../view/backyard/user/role/Detail";

export default [
  {
    path: 'user/list',
    component: UserList,
    meta: {
      name: "用户列表"
    }
  },
  {
    path: 'user/role/list',
    component: UserRoleList,
    meta: {
      name: "角色列表"
    }
  },
  {
    path: 'user/role/create',
    component: UserRoleCreate,
    meta: {
      name: "新建角色"
    }
  },
  {
    path: 'user/role/detail',
    component: UserRoleDetail,
    meta: {
      name: "角色详情"
    }
  },
  {
    path: 'user/role/edit',
    component: UserRoleCreate,
    meta: {
      name: "编辑角色"
    }
  }
]

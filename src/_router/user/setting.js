import UserEdit from "../../view/user/Edit";
import UserChangePassword from "../../view/user/ChangePassword";
import UserMessageList from "../../view/user/message/letter/List";
import SystemMessageList from "../../view/user/message/letter/ListSystem";

export default [
  {
    path: 'user/edit',
    component: UserEdit,
    meta: {
      name: "编辑基本信息"
    }
  },
  {
    path: 'user/change/password',
    component: UserChangePassword,
    meta: {
      name: "修改密码/手机"
    }
  },
  {
    path: 'user/message/letter/list',
    component: UserMessageList,
    meta: {
      name: "用户消息"
    }
  },
  {
    path: 'system/message/letter/list',
    component: SystemMessageList,
    meta: {
      name: "系统通知"
    }
  }
]

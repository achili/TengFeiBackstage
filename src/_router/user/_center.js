import Center from "../../view/user/Center";
import UserLogin from '../../view/user/Login.vue'
import UserFastLogin from '../../view/user/FastLogin.vue'

export default [
  {
    path: 'usr-center',
    component: Center
  },
  {
    path: 'login',
    component: UserLogin,
    meta: {
      title: '登录',
      ignoreAuth: true
    }
  },
  {
    path: 'fast/login',
    component: UserFastLogin,
    meta: {
      title: '注册',
      ignoreAuth: true
    }
  }
]



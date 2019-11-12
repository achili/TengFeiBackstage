import FinanceOfficePayList from "../../view/backyard/finance/office/List";
import FinanceOfficePayCreate from "../../view/backyard/finance/office/Create";
import FinanceOfficePayDetail from "../../view/backyard/finance/office/Detail"

export default [
  {
    path: 'finance/office/pay/list',
    component: FinanceOfficePayList,
    meta: {
      name: "会议室付款通知书列表"
    }
  },
  {
    path: 'finance/office/pay/create',
    component: FinanceOfficePayCreate,
    meta: {
      name: "创建会议室付款通知书"
    }
  },
  {
    path: 'finance/office/pay/edit',
    component: FinanceOfficePayCreate,
    meta: {
      name: "编辑会议室付款通知书"
    }
  },
  {
    path:'finance/office/pay/detail',
    component:FinanceOfficePayDetail,
    meta:{
      name:"会议室付款通知书详情"
    }
  }
]

import FinancePayInfoList from "../../view/backyard/finance/pay/List";
import FinancePayInfoCreate from "../../view/backyard/finance/pay/Create";
import FinancePayInfoDetail from "../../view/backyard/finance/pay/Detail"
import FinancePayInfoReminder from "../../view/backyard/finance/pay/Reminder"

export default [
  {
    path: 'finance/pay/info/list',
    component: FinancePayInfoList,
    meta: {
      name: "付款信息单列表"
    }
  },
  {
    path: 'finance/pay/info/create',
    component: FinancePayInfoCreate,
    meta: {
      name: "创建付款信息单"
    }
  },
  {
    path: 'finance/pay/info/edit',
    component: FinancePayInfoCreate,
    meta: {
      name: "编辑付款信息单"
    }
  },
  {
    path:'finance/pay/info/detail',
    component:FinancePayInfoDetail,
    meta:{
      name:"付款信息单详情"
    }
  },
  {
    path:'finance/pay/info/reminder',
    component:FinancePayInfoReminder,
    meta:{
      name:"催款信息列表"
    }
  }
]

import FinanceHedgingPayList from "../../view/backyard/finance/hedging/List";
import FinanceHedgingPayCreate from "../../view/backyard/finance/hedging/Create";
import FinanceStatement from "../../view/backyard/finance/Statement";
import FinanceArrears from "../../view/backyard/finance/Arrears";
import FinanceHedgingPayDetail from "../../view/backyard/finance/hedging/Detail";


export default [
  {
    path: 'finance/hedging/pay/list',
    component: FinanceHedgingPayList,
    meta: {
      name: "对冲付款信息列表"
    }
  },
  {
    path: 'finance/hedging/pay/create',
    component: FinanceHedgingPayCreate,
    meta: {
      name: "创建对冲付款信息单"
    }
  },
  {
    path: 'finance/hedging/pay/detail',
    component: FinanceHedgingPayDetail,
    meta: {
      name: "对冲单付款单详情"
    }
  },
  {
    path: 'finance/statement',
    component: FinanceStatement,
    meta: {
      name: "对账单"
    }
  },
  {
    path: 'finance/arrears',
    component: FinanceArrears,
    meta: {
      name: "欠账单"
    }
  }
]

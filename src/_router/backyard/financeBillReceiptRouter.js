import FinanceBillReceiptList from "../../view/backyard/finance/bill/List";
import FinanceBillReceiptCreate from "../../view/backyard/finance/bill/Create";
import FinanceBillReceiptDetail from "../../view/backyard/finance/bill/Detail"

export default [
  {
    path: 'finance/bill/receipt/list',
    component: FinanceBillReceiptList,
    meta: {
      name: "已收账款信息列表"
    }
  },
  {
    path: 'finance/bill/receipt/create',
    component: FinanceBillReceiptCreate,
    meta: {
      name: "创建已收账款信息"
    }
  },
  {
    path: 'finance/bill/receipt/edit',
    component: FinanceBillReceiptCreate,
    meta: {
      name: "编辑已收账款信息"
    }
  },
  {
    path:'finance/bill/receipt/detail',
    component:FinanceBillReceiptDetail,
    meta:{
      name:"已收账款信息详情"
    }
  }
]

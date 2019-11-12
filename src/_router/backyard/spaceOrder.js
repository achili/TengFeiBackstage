import SpaceOrderList from "../../view/backyard/spaceorder/List";
import SpaceOrderCreate from "../../view/backyard/spaceorder/Create";
import SpaceOrderDetail from "../../view/backyard/spaceorder/Details"

export default [
  {
    path: 'spaceOrder/list',
    component: SpaceOrderList,
    meta: {
      name: "空间订单管理"
    }
  },
  {
    path: 'spaceOrder/create',
    component: SpaceOrderCreate,
    meta: {
      name: "创建空间订单"
    }
  },
  {
    path: 'spaceOrder/edit',
    component: SpaceOrderCreate,
    meta: {
      name: "编辑空间订单"
    }
  },
  {
    path:'spaceOrder/detail',
    component:SpaceOrderDetail,
    meta:{
      name:"空间订单详情"
    }
  }
]

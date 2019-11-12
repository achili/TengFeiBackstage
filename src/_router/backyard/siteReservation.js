import SiteReservationList from "../../view/backyard/sitereservation/List";
import SiteReservationCreate from "../../view/backyard/sitereservation/Create";
import SiteReservationDetail from "../../view/backyard/sitereservation/Details"

export default [
  {
    path: 'siteReservation/list',
    component: SiteReservationList,
    meta: {
      name: "活动场地订单"
    }
  },
  {
    path: 'siteReservation/create',
    component: SiteReservationCreate,
    meta: {
      name: "创建活动场地"
    }
  },
  {
    path: 'siteReservation/edit',
    component: SiteReservationCreate,
    meta: {
      name: "编辑活动场地"
    }
  },
  {
    path:'siteReservation/detail',
    component:SiteReservationDetail,
    meta:{
      name:"活动场地详情"
    }
  }
]

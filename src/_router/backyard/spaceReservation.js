import SpaceReservationList from "../../view/backyard/spacereservation/List";
import SpaceReservationCreate from "../../view/backyard/spacereservation/Create";
import SpaceReservationDetail from "../../view/backyard/spacereservation/Details"

export default [
  {
    path: 'spaceReservation/list',
    component: SpaceReservationList,
    meta: {
      name: "会议室管理"
    }
  },
  {
    path: 'spaceReservation/create',
    component: SpaceReservationCreate,
    meta: {
      name: "创建会议室"
    }
  },
  {
    path: 'spaceReservation/edit',
    component: SpaceReservationCreate,
    meta: {
      name: "编辑会议室"
    }
  },
  {
    path:'spaceReservation/detail',
    component:SpaceReservationDetail,
    meta:{
      name:"会议室详情"
    }
  }
]

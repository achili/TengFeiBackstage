import ConferenceRoomList from "../../view/backyard/conferenceroom/List";
import ConferenceRoomCreate from "../../view/backyard/conferenceroom/Create";
import ConferenceRoomDetail from "../../view/backyard/conferenceroom/Details"

export default [
  {
    path: 'conferenceRoom/list',
    component: ConferenceRoomList,
    meta: {
      name: "会议室管理"
    }
  },
  {
    path: 'conferenceRoom/create',
    component: ConferenceRoomCreate,
    meta: {
      name: "创建会议室"
    }
  },
  {
    path: 'conferenceRoom/edit',
    component: ConferenceRoomCreate,
    meta: {
      name: "编辑会议室"
    }
  },
  {
    path:'conferenceRoom/detail',
    component:ConferenceRoomDetail,
    meta:{
      name:"会议室详情"
    }
  }
]

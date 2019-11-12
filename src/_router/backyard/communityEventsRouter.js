import CommunityEventsList from "../../view/backyard/community/events/List";
import CommunityEventsCreate from "../../view/backyard/community/events/Create";
import CommunityEventsDetail from "../../view/backyard/community/events/Detail";

export default [
  {
    path: 'community/events/list',
    component: CommunityEventsList,
    meta: {
      name: "一起玩"
    }
  },
  {
    path: 'community/events/create',
    component: CommunityEventsCreate,
    meta: {
      name: "发布活动"
    }
  },
  {
    path: 'community/events/edit',
    component: CommunityEventsCreate,
    meta: {
      name: "编辑活动"
    }
  },
  {
    path: 'community/events/detail',
    component: CommunityEventsDetail,
    meta: {
      name: "活动详情"
    }
  }
]

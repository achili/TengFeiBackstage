import SpaceSeatList from "../../view/backyard/space/seat/List";
import SpaceSeatCreate from "../../view/backyard/space/seat/Create";
import SpaceSeatDetail from "../../view/backyard/space/seat/Detail";

export default [
  {
    path: 'space/seat/list',
    component: SpaceSeatList,
    meta: {
      name: "办公桌"
    }
  },
  {
    path: 'space/seat/create',
    component: SpaceSeatCreate,
    meta: {
      name: "创建办公桌"
    }
  },
  {
    path: 'space/seat/edit',
    component: SpaceSeatCreate,
    meta: {
      name: "编辑办公桌"
    }
  },
  {
    path: 'space/seat/detail',
    component: SpaceSeatDetail,
    meta: {
      name: "办公桌详情"
    }
  }
]

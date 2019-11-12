import SpaceBuildingList from "../../view/backyard/space/building/List";
import SpaceBuildingCreate from "../../view/backyard/space/building/Create";
import SpaceBuildingDetail from "../../view/backyard/space/building/Detail";

export default [
  {
    path: 'space/building/list',
    component: SpaceBuildingList,
    meta: {
      name: "楼栋"
    }
  },
  {
    path: 'space/building/create',
    component: SpaceBuildingCreate,
    meta: {
      name: "创建楼栋"
    }
  },
  {
    path: 'space/building/edit',
    component: SpaceBuildingCreate,
    meta: {
      name: "编辑楼栋"
    }
  },
  {
    path: 'space/building/detail',
    component: SpaceBuildingDetail,
    meta: {
      name: "楼栋详情"
    }
  }
]

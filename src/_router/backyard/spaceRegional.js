import SpaceRegionalList from "../../view/backyard/space/regional/List";
import SpaceRegionalCreate from "../../view/backyard/space/regional/Create";
import SpaceRegionalDetail from "../../view/backyard/space/regional/Detail"

export default [
  {
    path: 'space/regional/list',
    component: SpaceRegionalList,
    meta: {
      name: "空间区域管理"
    }
  },
  {
    path: 'space/regional/create',
    component: SpaceRegionalCreate,
    meta: {
      name: "创建空间区域"
    }
  },
  {
    path: 'space/regional/edit',
    component: SpaceRegionalCreate,
    meta: {
      name: "编辑空间区域"
    }
  },
  {
    path:'space/regional/detail',
    component:SpaceRegionalDetail,
    meta:{
      name:"空间区域详情"
    }
  }
]

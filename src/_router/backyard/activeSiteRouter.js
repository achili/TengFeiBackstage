import ActiveSiteList from "../../view/backyard/activesite/List";
import ActiveSiteCreate from "../../view/backyard/activesite/Create";
import ActiveSiteDetail from "../../view/backyard/activesite/Details"

export default [
  {
    path: 'activeSite/list',
    component: ActiveSiteList,
    meta: {
      name: "活动场地管理"
    }
  },
  {
    path: 'activeSite/create',
    component: ActiveSiteCreate,
    meta: {
      name: "创建活动场地"
    }
  },
  {
    path: 'activeSite/edit',
    component: ActiveSiteCreate,
    meta: {
      name: "编辑活动场地"
    }
  },
  {
    path:'activeSite/detail',
    component:ActiveSiteDetail,
    meta:{
      name:"活动场地详情"
    }
  }
]

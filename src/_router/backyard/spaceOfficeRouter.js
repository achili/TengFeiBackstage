import SpaceOfficeList from "../../view/backyard/space/office/List";
import SpaceOfficeCreate from "../../view/backyard/space/office/Create";
import SpaceOfficeDetail from "../../view/backyard/space/office/Detail";

export default [
  {
    path: 'space/office/list',
    component: SpaceOfficeList,
    meta: {
      name: "办公室"
    }
  },
  {
    path: 'space/office/create',
    component: SpaceOfficeCreate,
    meta: {
      name: "创建办公室"
    }
  },
  {
    path: 'space/office/edit',
    component: SpaceOfficeCreate,
    meta: {
      name: "编辑办公室"
    }
  },
  {
    path: 'space/office/detail',
    component: SpaceOfficeDetail,
    meta: {
      name: "办公室详情"
    }
  }
]

import SpaceSettingCreate from "../../view/backyard/spacesetting/Create";
import SpaceSettingDetail from "../../view/backyard/spacesetting/Detail";

export default [

  {
    path: 'spaceSetting/create',
    component: SpaceSettingCreate,
    meta: {
      name: "空间价格修改"
    }
  },
  {
    path: 'spaceSetting/detail',
    component: SpaceSettingCreate,
    meta: {
      name: "系统设置详情"
    }
  },
  {
    path: 'spaceSetting/edit',
    component: SpaceSettingDetail,
    meta: {
      name: "编辑系统设置"
    }
  }
]

import ProtocolSpaceList from "../../view/backyard/protocol/space/List";
import ProtocolSpaceCreate from "../../view/backyard/protocol/space/Create";
import ProtocolSpaceDetail from "../../view/backyard/protocol/space/Detail";

export default [
  {
    path: 'protocol/space/list',
    component: ProtocolSpaceList,
    meta: {
      name: "租赁协议列表"
    }
  },
  {
    path: 'protocol/space/create',
    component: ProtocolSpaceCreate,
    meta: {
      name: "创建租赁协议"
    }
  },
  {
    path: 'protocol/space/edit',
    component: ProtocolSpaceCreate,
    meta: {
      name: "编辑租赁协议"
    }
  },
  {
    path: 'protocol/space/detail',
    component: ProtocolSpaceDetail,
    meta: {
      name: "租赁协议详情"
    }
  }
]

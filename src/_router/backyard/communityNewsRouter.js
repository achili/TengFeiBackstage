import CommunityNewsList from "../../view/backyard/community/news/List";
import CommunityNewsCreate from "../../view/backyard/community/news/Create";
import CommunityNewsDetail from "../../view/backyard/community/news/Detail";

export default [
  {
    path: 'community/news/list',
    component: CommunityNewsList,
    meta: {
      name: "新鲜事"
    }
  },
  {
    path: 'community/news/create',
    component: CommunityNewsCreate,
    meta: {
      name: "发布新鲜事"
    }
  },
  {
    path: 'community/news/edit',
    component: CommunityNewsCreate,
    meta: {
      name: "编辑新鲜事"
    }
  },
  {
    path: 'community/news/detail',
    component: CommunityNewsDetail,
    meta: {
      name: "新鲜事详情"
    }
  }
]

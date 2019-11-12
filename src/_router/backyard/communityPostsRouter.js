import CommunityPostsList from "../../view/backyard/community/posts/List";
import CommunityPostsCreate from "../../view/backyard/community/posts/Create";
import CommunityPostsDetail from "../../view/backyard/community/posts/Detail";
import CommunityPostsWordList from "../../view/backyard/community/postsword/List";
import CommunityPostsWordCreate from "../../view/backyard/community/postsword/Create";
import CommunityPostsWordDetail from "../../view/backyard/community/postsword/Detail";

export default [
  {
    path: 'community/posts/list',
    component: CommunityPostsList,
    meta: {
      name: "朋友圈"
    }
  },
  {
    path: 'community/posts/create',
    component: CommunityPostsCreate,
    meta: {
      name: "发布"
    }
  },
  {
    path: 'community/posts/edit',
    component: CommunityPostsCreate,
    meta: {
      name: "编辑朋友圈"
    }
  },
  {
    path: 'community/posts/detail',
    component: CommunityPostsDetail,
    meta: {
      name: "朋友圈详情"
    }
  },
  {
    path: 'community/posts/word/list',
    component: CommunityPostsWordList,
    meta: {
      name: "屏蔽词列表"
    }
  },
  {
    path: 'community/posts/word/create',
    component: CommunityPostsWordCreate,
    meta: {
      name: "创建屏蔽词"
    }
  },
  {
    path: 'community/posts/word/edit',
    component: CommunityPostsWordCreate,
    meta: {
      name: "编辑屏蔽词"
    }
  },
  {
    path: 'community/posts/word/detail',
    component: CommunityPostsWordDetail,
    meta: {
      name: "屏蔽词详情"
    }
  }
]

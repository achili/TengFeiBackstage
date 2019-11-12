import ArticleList from "../../view/developer/article/List";
import ArticleCreate from "../../view/developer/article/Create";
import ArticleDetail from "../../view/developer/article/details"
import ArticleTagList from "../../view/developer/article/tag/List";
import ArticleTagCreate from "../../view/developer/article/tag/Create";
import ArticleTagDetail from "../../view/developer/article/tag/Detail"

export default [
  {
    path: 'article/list',
    component: ArticleList,
    meta: {
      name: "文章"
    }
  },
  {
    path: 'article/create',
    component: ArticleCreate,
    meta: {
      name: "创建文章"
    }
  },
  {
    path: 'article/edit',
    component: ArticleCreate,
    meta: {
      name: "编辑文章"
    }
  },
  {
    path:'article/detail',
    component:ArticleDetail,
    meta:{
      name:"文章详情"
    }
  },
  {
    path: 'article/tag/list',
    component: ArticleTagList,
    meta: {
      name: "标签"
    }
  },
  {
    path: 'article/tag/create',
    component: ArticleTagCreate,
    meta: {
      name: "创建标签"
    }
  },
  {
    path: 'article/tag/edit',
    component: ArticleTagCreate,
    meta: {
      name: "编辑标签"
    }
  },
  {
    path: 'article/tag/detail',
    component: ArticleTagDetail,
    meta: {
      name: "标签详情"
    }

  }
]



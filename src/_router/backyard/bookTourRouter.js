import BookTourList from "../../view/backyard/booktour/List";
import BookTourCreate from "../../view/backyard/booktour/Create";
import BookTourDetail from "../../view/backyard/booktour/Detail";

export default [
  {
    path: 'book/tour/list',
    component: BookTourList,
    meta: {
      name: "预约参观"
    }
  },
  {
    path: 'book/tour/create',
    component: BookTourCreate,
    meta: {
      name: "创建预约参观"
    }
  },
  {
    path: 'book/tour/edit',
    component: BookTourCreate,
    meta: {
      name: "编辑预约参观"
    }
  },
  {
    path: 'book/tour/detail',
    component: BookTourDetail,
    meta: {
      name: "预约参观详情"
    }
  }
]

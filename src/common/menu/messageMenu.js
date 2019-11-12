import Menu from '../model/_menu/Menu'

let messageMenu = [
  new Menu("开发者中心", "/by/index", "OTHER", "fa fa-home"),
  new Menu("文章(示例)", null, "OTHER", "fa fa-desktop", [
    new Menu("文章", "/by/official/carousel/list", "OTHER", "fa fa-image"),
    new Menu("标签", "/by/official/carousel/list", "OTHER", "fa fa-image")
  ]),
  new Menu("文件", "/by/index", "OTHER", "fa fa-home"),
  new Menu("自家轮子", null, "OTHER", "fa fa-desktop", [
    new Menu("会议室", "/by/official/carousel/list", "OTHER", "fa fa-image"),
    new Menu("办公空间", "/by/official/carousel/list", "OTHER", "fa fa-image"),
    new Menu("独立空间", "/by/official/carousel/list", "OTHER", "fa fa-image")
  ])
];

export  default messageMenu;

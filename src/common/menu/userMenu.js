import Menu from '../model/_menu/Menu'

let userMenu = [
  // new Menu("用户中心", "/usr/usr-center", "OTHER", "fa fa-wrench"),
  new Menu("编辑基本信息", "/usr/user/edit", "OTHER", "fa fa-vcard-o"),
  new Menu("安全中心", "/usr/user/change/password", "OTHER", "fa fa-bell-o"),
  new Menu("消息", "/usr/user/message/letter/list", "OTHER", "fa fa-image")
];

export  default userMenu;

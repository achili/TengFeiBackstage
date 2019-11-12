import Menu from '../model/_menu/Menu'

let backyardMenu = [
  new Menu("管理中心", "/by/by-center", "OTHER", "fa fa-home"),
  new Menu("启动页图片","/by/appsettings/create", "OTHER","fa fa-image"),
  new Menu("邀请管理", "/by/invite/visitor/list", "OTHER", "fa fa-id-badge"),

  //订单管理-》维护，预定-》管理
  new Menu("社区管理", null, "OTHER", "fa fa-universal-access", [

    new Menu("发布朋友圈", "/by/community/posts/list", "OTHER", "fa fa-eye"),
    new Menu("朋友圈屏蔽词", "/by/community/posts/word/list", "OTHER", "fa fa-tags"),
    new Menu("一起玩", "/by/community/events/list", "OTHER", "fa fa-slideshare"),
    new Menu("新鲜事", "/by/community/news/list", "OTHER", "fa fa-pagelines")
  ]),
  new Menu("创业中心", null, "OTHER", "fa fa-desktop",[
    new Menu("会议室", null, "OTHER", "fa fa-desktop", [
      new Menu("会议室管理","/by/conferenceRoom/list", "OTHER","fa fa-image"),
      new Menu("会议室订单","/by/spaceReservation/list", "OTHER","fa fa-image")
    ]),
    new Menu("活动场地",null,"OTHER","fa fa-desktop",[
      new Menu("活动场地管理","/by/activeSite/list", "OTHER","fa fa-image"),
      new Menu("活动场地订单","/by/siteReservation/list", "OTHER","fa fa-image")
    ]),
    new Menu("预约参观","/by/book/tour/list", "OTHER","fa fa-phone")
    // new Menu("空间预约","/by/spaceOrder/list", "OTHER","fa fa-phone")
  ]),

  new Menu("空间", null, "OTHER", "fa fa-object-group", [
    new Menu("订单管理","/by/spaceOrder/list", "OTHER","fa fa-building"),

    new Menu("空间管理", null, "OTHER", "fa fa-universal-access", [
      new Menu("楼栋","/by/space/building/list", "OTHER","fa fa-building-o"),
      new Menu("办公室","/by/space/office/list", "OTHER","fa fa-microchip"),
      new Menu("办公桌","/by/space/seat/list", "OTHER","fa fa-desktop")
    ]),
      new Menu("空间区域管理","/by/space/regional/list", "OTHER","fa fa-building")
  ]),


  new Menu("合同签约", null, "OTHER", "fa fa-file-o", [
    new Menu("租赁协议","/by/protocol/space/list", "OTHER","fa fa-file"),
    new Menu("系统设置","/by/spaceSetting/create", "OTHER","fa fa-gears")
  ]),

  new Menu("财务管理", null, "OTHER", "fa fa-rmb", [
    new Menu("付款信息单","/by/finance/pay/info/list", "OTHER","fa fa-file-text-o"),
    new Menu("会议室付款信息单","/by/finance/office/pay/list", "OTHER","fa fa-file-text-o"),
    new Menu("对冲付款信息单","/by/finance/hedging/pay/list", "OTHER","fa fa-file-text-o"),
    new Menu("催款通知","/by/finance/pay/info/reminder", "OTHER","fa fa-bullhorn"),
    new Menu("已收款账单","/by/finance/bill/receipt/list", "OTHER","fa fa-file-text-o"),
    new Menu("对账单","/by/finance/statement", "OTHER","fa fa-file-text-o"),
    new Menu("欠账单","/by/finance/arrears", "OTHER","fa fa-file-text-o")
  ]),


  new Menu("用户管理", null, "OTHER", "fa fa-users",[
    new Menu("用户列表", "/by/user/list", "OTHER", "fa fa-user-o"),
    new Menu("角色列表", "/by/user/role/list", "OTHER", "fa fa-user")
  ]),
  new Menu("第三方服务", "/by/privilege/list", "OTHER", "fa fa-child"),
  new Menu("通知中心", null, "OTHER", "fa fa-user-o", [
    new Menu("系统通知", "/by/system/message/letter/list", "OTHER", "fa fa-user-o"),
    new Menu("用户消息", "/by/user/message/letter/list", "OTHER", "fa fa-user")
  ]),
  new Menu("问卷系统", "/by/questionnaire/system/list", "OTHER", "fa fa-list-alt"),

  new Menu("汇总统计", null, "OTHER", "fa fa-users",[
    new Menu("汇总统计列表", "/by/summary/list", "OTHER", "fa fa-user-o"),
    new Menu("图表分析列表", "/by/summary/analysis/list", "OTHER", "fa fa-user-o")
  ]),

  new Menu("静态二维码", "/by/qr/code", "OTHER", "fa fa-list-alt"),
  new Menu("预约参观", "/by/appointment/visit/list", "OTHER", "fa fa-list-alt")

];

export  default backyardMenu;

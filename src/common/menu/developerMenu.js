import Menu from '../model/_menu/Menu'

let developerMenu = [
  new Menu("开发者中心", "/dev/dev-center", "OTHER", "fa fa-wrench"),
  new Menu("文章(示例)", null, "OTHER", "fa fa-database", [
    new Menu("文章", "/dev/article/list", "OTHER", "fa fa-file-text-o"),
    new Menu("标签", "/dev/article/tag/list", "OTHER", "fa fa-tag")
  ]),
  new Menu("消息模板", "/developer/template/list", "OTHER", "fa fa-folder"),
  new Menu("文件", "/developer/tank/list", "OTHER", "fa fa-folder"),
  new Menu("自家轮子", null, "OTHER", "fa fa-cogs", [
    new Menu("NbTank", "/dev/wheel/nb-tank", "OTHER", "fa fa-image"),
    new Menu("NbFrom", "/dev/wheel/nb-form", "OTHER", "fa fa-image"),
    new Menu("NbQRCode", "/dev/wheel/nb-qr-code", "OTHER", "fa fa-image"),
    new Menu("NbTabs", "/dev/wheel/nb-tabs", "OTHER", "fa fa-image"),
    new Menu("NbCheck", "/dev/wheel/nb-check", "OTHER", "fa fa-image"),
    new Menu("NbDateRange", "/dev/wheel/nb-date-range", "OTHER", "fa fa-image"),
    new Menu("NbDistrict", "/dev/wheel/nb-district", "OTHER", "fa fa-image"),
    new Menu("NbEditor", "/dev/wheel/nb-editor", "OTHER", "fa fa-image"),
    new Menu("NbExpanding", "/dev/wheel/nb-expanding", "OTHER", "fa fa-image"),
    new Menu("NbFlip", "/dev/wheel/nb-flip", "OTHER", "fa fa-image"),
    new Menu("NbSlidePanel", "/dev/wheel/nb-slide-panel", "OTHER", "fa fa-image"),
    new Menu("NbSwitcher", "/dev/wheel/nb-switcher", "OTHER", "fa fa-image"),
    new Menu("NbBtnDrop", "/dev/wheel/nb-btndrop", "OTHER", "fa fa-image"),
    new Menu("SummaryChat", "/dev/wheel/nb-summer-chart", "OTHER", "fa fa-image"),
    new Menu("Map", "/dev/wheel/nb-map", "OTHER", "fa fa-image"),
    new Menu("NbRecord", "/dev/wheel/nb-record", "OTHER", "fa fa-image")
  ])
];

export  default developerMenu;

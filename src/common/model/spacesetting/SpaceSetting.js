import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import Tank from '../tank/Tank'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";

export default class SpaceSetting extends BaseEntity {

  constructor(args) {
    super(args);
    this.station = "移动工位";
    this.space = "独立空间";

    //甲方
    this.contractParty = null;
    //法人或授权人
    this.legalPerson = null;
    //法人或授权人电话
    this.legalPhone = null;
    //开户银行
    this.accountBank = null;
    //银行户名
    this.accountBankName = null;
    //开户银行账户
    this.openAccountBank = null;
    //开票信息-甲方纳税人识别号
    this.partNumber = null;
    //开票信息-甲方地址
    this.partAddress = null;
    //开票信息-甲方电话
    this.partPhone = null;
    //签约地点
    this.signArea = null;
    //财务部联系人
    this.financeContact = null;
    //财务部联系电话
    this.financeContactPhone = null;
    //财务部地址
    this.financeArea = null;
    this.xiaoQiaoUser = new User();
    this.xiaoQiaoPhone = null;

    this.iosUrl = null;
    this.versionNumber = null;
    this.kernelVersion = null;
    this.androidFile = new Tank();
  }

  getTAG() {
    return "Appsettings"
  }
  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '名称/内容/创建者', 'keyword'),
     // new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList()),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null)

    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('xiaoQiaoUser', User);
    this.renderEntity('posterTank', Tank);
    this.renderEntity('androidFile', Tank);
  }

  getHttpEdit() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/appsettings/edit",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "SpaceSetting.uuid","d4bc8d8d-5d40-466c-9b0a-bd3b6d5218b8"),
        new FormItem(FormItem.prototype.Type.INPUT, "移动办公桌价格", true, "stationPrice", "SpaceSetting.stationPrice", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "独立办公室价格", true, "spacePrice", "SpaceSetting.spacePrice", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "快速入驻办公桌价格", true, "onePrice", "SpaceSetting.onePrice", null,{})
      ]
    );
  };
}


import BaseEntity from "../../_base/BaseEntity";

import Filter from "../../_base/Filter";
import {addDate, simpleDateTime} from "../../../filter/time";
import HttpForm from "../../_base/HttpForm";
import FormItem from "../../_base/FormItem";
import Vue from 'vue'
import User from "../../user/User";
import SpaceOrder from "../../spaceOrder/SpaceOrder";
import Tank from "../../tank/Tank";
import QuestionnaireQuestion from "../../questionnaire/QuestionnaireQuestion";
import SummaryAttribute from "../../summary/SummaryAtrribute";
import Commentary from "../../community/commentary/Commentary";
import SpaceOffice from "../../space/SpaceOffice";
import SpaceSeat from "../../space/SpaceSeat";
import SpaceRegional from "../../space/SpaceRegional";

let Status = {
  'NEW': 'NEW',
  'PROCESSING': 'PROCESSING',
  'EXCEPTION': 'EXCEPTION',
  'SOON': 'SOON',
  'EXPIRE': 'EXPIRE'
};
let StatusMap = {
  NEW: {
    name: "等待附件上传",
    value: "NEW",
    style: "#ffdc6f"
  },
  PROCESSING: {
    name: "合同履约中",
    value: "PROCESSING",
    style: "#84e599"
  },
  EXCEPTION: {
    name: "合同终止",
    value: "EXCEPTION",
    style: "#ff9a9a"
  },
  SOON: {
    name: "即将到期",
    value: "SOON",
    style: "#ffdc6f",
    icon: "fa-hourglass-half"
  },
  EXPIRE: {
    name: "合同到期",
    value: "EXPIRE",
    style: "#ff9a9a",
    icon: "close"
  }
};

export default class ProtocolSpace extends BaseEntity{

  constructor(args) {
    super(args);
    //乙方用户
    this.user = new User();
    //关联的创业空间申请。
    this.spaceOrder = new SpaceOrder();
    //签约主体类型
    this.mainType = "公司";

    this.spaceUuids = [];

    //名称 标题。
    this.name = null;
    //合同编号
    this.no = null;
    //产权证编号
    this.propertyNo = null;

    //开始时间
    this.startTime = new Date();
    //结束时间
    this.endTime = new Date();
    //租金（月）
    this.rental = 0;
    //大写租金
    this.capitalRental = null;
    //履约保证金缴纳月数
    this.depositMonth = null;
    //履约保证金金额
    this.deposit = 0;

    this.scanning = new Tank(".doc|.docx|.pdf|.jpg|.jpeg|.png", false, 50 * 1024 * 1024, "可上传doc,docx,pdf,jpg,jpeg,png格式的扫描件");
    //附件
    this.attachments = [];

    this.reason = null;

    this.archive = false;

    this.cumulativeDeductions = null;

    //状态
    this.status = StatusMap.NEW.value;

    //合同版本号
    this.contractNo = null;

    //新增字段
    //基本信息
    //签约会员银行账号
    this.accountBankNumber = null;
    //备注
    this.description = null;
    //纳税人类型
    this.taxType = "一般纳税人";
    //签约会员银行开户行
    this.accountBank = null;
    //签约会员银行户名
    this.accountName = null;
    //打印和复印设备使用限额(每月)
    this.useLimit = 0;
    //会议室使用限额
    this.qiaoCoin = 0;
    //首期会员费
    this.firstPhaseMemberFee = null;
    //首期会员费缴纳时间
    this.firstPhaseMemberFeePayTime = new Date();
    //最后一月会员费
    this.lastMemberFee = 0;
    //会员费
    this.memberFee = 0;
    //首月会员费
    this.firstMouthMemberFee = 0;
    //租赁方式
    this.memberFeePayStyle = null;
    //抵扣后总会员费
    this.totalInnoToken = 0;
    //抵扣比例
    this.ratioInnoToken = 0;
    //授权使用人数/空间容量
    this.spaceCapactiy = null;
    //总价格
    this.totalPrice = 0;
    //身份证明种类
    this.idType = null;
    //公司名称
    this.companyName = null;
    //统一信用代码
    this.registerNumber = null;
    //注册地址
    this.registerAddress = null;
    //个人姓名
    this.personName = null;
    //身份证号/护照号
    this.idNumber = null;
    //签署日期
    this.applyTime = new Date();
    //会员类型/产品类型
    this.memberType = null;
    //签约空间名称
    this.accountSpaceName = 0;
    //签约空间价格
    this.accountSpacePrice = 0;

    //群组
    this.personnel = [];
    //其他附件
    this.currentAttachments = [];

    //奕桥信息
    //公司名称
    this.baseName = null;
    //联系地址
    this.baseAddress = null;
    //联系人
    this.basePerson = null;
    //电话
    this.basePhone = null;
    //电子邮箱
    this.baseEmail = null;
    //银行账户名
    this.baseBankName = null;
    //银行账号
    this.baseBankNumber = null;
    //开户银行
    this.baseBank = null;
    //备注
    this.baseDescription = "在付款时请务必备注公司名称，未在'备注'一行中列明贵公司详细名称可能导致奕桥无法辨别签约会员与奕桥的钱款来往。" +
      "奕桥不对银行转账中缺乏付款方详细名称的款项支付问题承担任何责任。";

    this.refund = null;
    this.refundEnclosures = [];
    //new Tank(".doc|.docx|.pdf|.jpg|.jpeg|.png", false, 50 * 1024 * 1024, "可上传doc,docx,pdf,jpg,jpeg,png格式的扫描件");

    //客户公司电话
    this.clientTelephone = null;
    this.contactAddress = null;
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '创建日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SORT, '编号', 'orderNo'),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList()),
      new Filter("SORT", 'id', 'spaceOfficeUuid',null, SpaceOffice,null, false),
      new Filter("SORT", 'id', 'spaceSeatUuid',null, SpaceSeat, null,false),
      new Filter(Filter.prototype.Type.CHECK,"已创建完会议室付款信息",'record',null,null,null,false),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null),
      new Filter(Filter.prototype.Type.SPACE_MULTI_SELECTION, "所属空间", "spaceRegionalUuids", null, SpaceRegional,null)
    ]
  };

  static URL_GROUP = "/protocol/space/group";
  static URL_UPLOAD_ATTACHMENTS = "/protocol/space/upload/attachments";
  static URL_DOWNLOAD_PDF = "/protocol/space/download/pdf/{uuid}";
  static URL_RENDER_PDF = "/protocol/space/render/pdf";
  static URL_STATUS = "/protocol/space/status";
  static URL_REFUND = "/protocol/space/refund";

  render(obj) {
    super.render(obj);
    this.renderEntity('user', User);
    this.renderEntity('spaceOrder', SpaceOrder);
    this.renderEntity('startTime', Date);
    this.renderEntity('endTime', Date);
    this.renderEntity('firstPhaseMemberFeePayTime', Date);
    this.renderEntity('applyTime', Date);
    this.renderEntity('scanning', Tank);
    if (this.attachments) {
      this.renderList("attachments", Tank)
    } else {
      this.attachments = [];
    }
    if (this.refundEnclosures) {
      this.renderList("refundEnclosures", Tank)
    } else {
      this.refundEnclosures = [];
    }
  }
  getTAG(){
    return "ProtocolSpace"
  }

  //群组
  httpGroup(personnel,successCallback, errorCallback){
    let that = this;
    let form = {
      personnel: personnel
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(ProtocolSpace.URL_GROUP,form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  httpUploadAttachments (successCallback, errorCallback) {
    let attachments = [];
    this.attachments.forEach(tank => {
      attachments.push(tank.uuid)
    });
    let form = {
      'uuid': this.uuid,
      'attachments': JSON.stringify(attachments)
    };

    let that = this;
    this.httpPost(ProtocolSpace.URL_UPLOAD_ATTACHMENTS, form, function (response) {
      that.render(response.data[that.getTAG()]);
      successCallback && successCallback(response)
    }, errorCallback)
  }

  downloadPdfUrl () {
    return Vue.http.options.root + ProtocolSpace.URL_DOWNLOAD_PDF.replace("{uuid}", this.uuid);
  }

  fetchTemplate (successCallback, errorCallback) {
    this.httpPost(ProtocolSpace.URL_RENDER_PDF, { "uuid":this.uuid }, function (response) {
      successCallback && successCallback(response)
    }, errorCallback);
  }

  //修改状态
  httpStatus(status, reason, scanning, successCallback, errorCallback){
    let that = this;
    let form = {
      status: status,
      reason: reason,
      scanning: scanning.uuid
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(ProtocolSpace.URL_STATUS, form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  availableStatusList() {
    let list = [];
    if (this.status === this.Status.NEW) {
      list.push(this.StatusMap[this.Status.PROCESSING]);
      list.push(this.StatusMap[this.Status.EXCEPTION]);
    } else if (this.status === this.Status.PROCESSING) {
      list.push(this.StatusMap[this.Status.EXCEPTION]);
    }  else if (this.status === this.Status.SOON) {
      list.push(this.StatusMap[this.Status.EXCEPTION]);
    }else if (this.status === this.Status.EXCEPTION) {
      list.push(this.StatusMap[this.Status.EXCEPTION]);
    }
    return list;
  }

  //修改
  httpRefund(refund, refundEnclosures,successCallback, errorCallback){
    let that = this;
    let refundEnclosure = [];
    this.refundEnclosures.forEach(tank => {
      refundEnclosure.push(tank.uuid)
    });
    let form = {
      'uuid': this.uuid,
      'refund': refund,
      'refundEnclosures': JSON.stringify(refundEnclosure)
    };
    this.httpPost(ProtocolSpace.URL_REFUND, form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

}

ProtocolSpace.prototype.Status = Status;
ProtocolSpace.prototype.StatusMap = StatusMap;
ProtocolSpace.prototype.StatusList = ProtocolSpace.prototype.getStatusList();

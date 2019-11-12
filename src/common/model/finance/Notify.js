import BaseEntity from '../_base/BaseEntity'
export default class Notify extends BaseEntity {

  constructor(args) {
    super(args);
    this.name = null;
    this.mailEnable = true;
    this.mailFromAddress = null;
    this.mailToAddress = null;
    this.mailSubject = null;
    this.mailContent = null;
    this.mailPressContent = null;
    this.messageEnable = true;
    this.messageSubject = null;
    this.messageContent = null;
    this.smsEnable = true;
    this.smsPhone = null;
    this.smsContent = null;

    this.type = null;
  }

  getTAG() {
    return "Notify"
  }

  render(obj) {
    super.render(obj);

  }
  static URL_SEND = "/send/{username}";

  fillByFinanceOfficePay(financeOfficePay){
    //邮件
    this.mailFromAddress = "Bridge+";
    this.mailToAddress = financeOfficePay.spaceReservation.creator.email;
    this.mailSubject = financeOfficePay.name;
    this.mailContent = financeOfficePay.officePayEmail;
    //APP
    this.messageSubject = financeOfficePay.name;
    this.messageContent =  financeOfficePay.officePayAPP;
    //SMS
    this.smsPhone = financeOfficePay.spaceReservation.creator.phone;
    this.smsContent = financeOfficePay.officePaySMS;

  }

  fillByFinancePayInfo(financePayInfo){
    //邮件
    this.mailFromAddress = "Bridge+";
    this.mailToAddress = financePayInfo.protocolSpace.spaceOrder.creator.email;
    this.mailSubject = financePayInfo.name;
    this.mailContent = financePayInfo.payEmail;
    this.mailPressContent = financePayInfo.payPressEmail;
    //APP
    this.messageSubject = financePayInfo.name;
    this.messageContent =  financePayInfo.payApp;
    //SMS
    this.smsPhone = financePayInfo.protocolSpace.user.phone;
    this.smsContent = financePayInfo.paySMS;
  }

  fillByFinancePayInfoPress(financePayInfo){
    //邮件
    this.mailFromAddress = "Bridge+";
    this.mailToAddress = financePayInfo.protocolSpace.spaceOrder.creator.email;
    this.mailSubject = financePayInfo.name;
    this.mailContent = financePayInfo.payEmail;
    this.mailPressContent = financePayInfo.payPressEmail;
    //APP
    this.messageSubject = financePayInfo.name;
    this.messageContent =  financePayInfo.payApp;
    //SMS
    this.smsPhone = financePayInfo.protocolSpace.user.phone;
    this.smsContent = financePayInfo.paySMS;
  }

  fillBySpaceOrder(spaceOrder){
    this.name = "空间订单";
    //邮件
    this.mailFromAddress = "Bridge+";
    this.mailToAddress = spaceOrder.creator.email;
    this.mailSubject = spaceOrder.name;
    this.mailContent = spaceOrder.orderEmail;
    this.mailToAddress = spaceOrder.creator.email;
    this.mailSubject = spaceOrder.spaceRegional.name;
    //APP
    this.messageSubject = spaceOrder.name;
    this.messageContent =  spaceOrder.orderApp;
    this.messageSubject = spaceOrder.spaceRegional.name;
    //SMS
    this.smsPhone = spaceOrder.creator.phone;
    this.smsContent = spaceOrder.orderSMS;
  }

  validate(){

    // if(!this.handleTotal){
    //   this.errorMessage = '应付总额';
    //   return
    // }

    this.errorMessage = null;
    return true
  }

  httpSend(notify,successCallback,errorCallback){
    let that = this;
    // let list = [];
    // list.push(notify);
    console.log(notify.toString())
    let notify1 = [];
    notify1.push(notify)
    console.log(notify1)
    this.httpPost(Notify.URL_SEND,{ notify1 }, function (response) {

      successCallback && successCallback(response);
    }, errorCallback)
  }

}

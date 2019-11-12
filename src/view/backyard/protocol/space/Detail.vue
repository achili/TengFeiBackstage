<template>
  <div class="animated fadeIn protocol-cell">

    <div class="row">
      <div class="col-md-12">
        <NbLoadingFrame :loading="protocolSpace.detailLoading">

          <div class="row">
            <div class="col-md-12">
              <div class="pull-left f24">
                <div title="返回" class="cursor-pointer" @click.stop.prevent="$router.go(-1)">
                  <span><img class="logo" width="30" height="30" src="../../../../assets/img/return.png"/></span>
                  <span class="ml15 ">租赁协议详情</span>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt20">
            <div class="col-md-12">
              <div class="segmenting-line"></div>
            </div>
          </div>

          <div class="row mt35 ml20">
            <div class="col-md-12">
              <div class="cell-subtitle">基本内容 </div>
            </div>
          </div>

          <div class="row mt30">
            <div class="col-md-12">
              <div class="mail-box" style="border: 0;">
                <div class="mail-body ml15" style="border: 0;">

                  <div class="row mt10">
                    <label class="col-md-3">关联空间申请</label>
                    <div class="col-md-9">{{protocolSpace.spaceOrder.applyName}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">签约主体类型</label>
                    <div class="col-md-9">{{protocolSpace.mainType}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">合同编号</label>
                    <div class="col-md-9">{{protocolSpace.no}}</div>
                  </div>

                  <div v-if="protocolSpace.mainType === '公司'">
                    <div class="row mt10">
                      <label class="col-md-3">公司名称</label>
                      <div class="col-md-9">{{protocolSpace.companyName}}</div>
                    </div>

                    <div class="row mt10">
                      <label class="col-md-3">统一信用代码</label>
                      <div class="col-md-9">{{protocolSpace.registerNumber}}</div>
                    </div>

                    <div class="row mt10">
                      <label class="col-md-3">注册地址</label>
                      <div class="col-md-9">{{protocolSpace.registerAddress}}</div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="row mt10">
                      <label class="col-md-3">个人姓名</label>
                      <div class="col-md-9">{{protocolSpace.personName}}</div>
                    </div>

                    <div class="row mt10">
                      <label class="col-md-3">身份证/护照</label>
                      <div class="col-md-9">{{protocolSpace.idType}}</div>
                    </div>

                    <div class="row mt10">
                      <label class="col-md-3">身份证号/护照号码</label>
                      <div class="col-md-9">{{protocolSpace.idNumber}}</div>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">签署日期</label>
                    <div class="col-md-9">{{protocolSpace.applyTime | simpleDateMinute }}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">会员类型/产品类型</label>
                    <div class="col-md-9">
                      {{protocolSpace.memberType}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">签约空间名称</label>
                    <div class="col-md-9">
                      <span v-for="order in protocolSpace.spaceOrder.spaceOrderList" :key="order.index">
                        <a v-if="protocolSpace.memberType === '移动办公桌'" @click.stop.prevent="$router.push({path:'/by/space/seat/detail',query:{uuid:order.uuid}})">{{order.name}} </a>
                        <a v-else @click.stop.prevent="$router.push({path:'/by/space/office/detail',query:{uuid:order.uuid}})">{{order.name}} </a>
                      </span>
                    </div>
                  </div>

                  <div class="row mt10" v-if="protocolSpace.memberType === '移动办公桌'">
                    <label class="col-md-3">租赁方式</label>
                    <div class="col-md-9">
                      {{protocolSpace.memberFeePayStyle}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">签约空间价格</label>
                    <div class="col-md-9">
                      {{protocolSpace.accountSpacePrice}} 元/<span v-if="protocolSpace.memberFeePayStyle === '小于一个月'">日</span><span v-else>月</span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">起始日</label>
                    <div class="col-md-9">{{protocolSpace.startTime | simpleDateMinute }}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">终止日</label>
                    <div class="col-md-9">{{protocolSpace.endTime | simpleDateMinute }}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">授权使用人数/空间容量</label>
                    <div class="col-md-9">
                      {{protocolSpace.spaceCapactiy}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">总价格</label>
                    <div class="col-md-9">
                      {{protocolSpace.totalPrice}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">抵扣比例</label>
                    <div class="col-md-9">
                      {{protocolSpace.ratioInnoToken}} %
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">抵扣后总会员费</label>
                    <div class="col-md-9">
                      {{protocolSpace.totalInnoToken}} 元
                    </div>
                  </div>

                  <div v-if="protocolSpace.memberFeePayStyle === '大于一个月' || protocolSpace.spaceOrder.characteristic === 'INDEPENDENT_SPACE'">
                    <div class="row mt10">
                      <label class="col-md-3">首月会员费</label>
                      <div class="col-md-9">
                        {{protocolSpace.firstMouthMemberFee}} 元
                      </div>
                    </div>
                    <div class="row mt10">
                      <label class="col-md-3">每月会员费</label>
                      <div class="col-md-9">
                        {{protocolSpace.memberFee}} 元/月
                      </div>
                    </div>
                  </div>

                  <div v-if="protocolSpace.memberFeePayStyle === '大于一个月'">
                    <div class="row mt10">
                      <label class="col-md-3">最后一月会员费</label>
                      <div class="col-md-9">
                        {{protocolSpace.lastMemberFee}} 元
                      </div>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">首期会员费缴纳时间</label>
                    <div class="col-md-9">{{protocolSpace.firstPhaseMemberFeePayTime | simpleDateMinute }}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">首期会员费</label>
                    <div class="col-md-9">
                      {{protocolSpace.firstPhaseMemberFee}} 元
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">履约保证金缴纳月数</label>
                    <div class="col-md-9">
                      {{protocolSpace.depositMonth}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">履约保证金金额</label>
                    <div class="col-md-9">
                      {{protocolSpace.deposit}}
                    </div>
                  </div>

                  <!--<div class="row mt10">-->
                    <!--<label class="col-md-3">会议室使用限额(每月)</label>-->
                    <!--<div class="col-md-9">-->
                      <!--{{protocolSpace.qiaoCoin}}-->
                    <!--</div>-->
                  <!--</div>-->

                  <!--<div class="row mt10">-->
                    <!--<label class="col-md-3">打印和复印设备使用限额(每月)</label>-->
                    <!--<div class="col-md-9">-->
                      <!--{{protocolSpace.useLimit}}-->
                    <!--</div>-->
                  <!--</div>-->

                  <div class="row mt10">
                    <label class="col-md-3">签约会员银行户名</label>
                    <div class="col-md-9">
                      {{protocolSpace.accountName}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">签约会员银行账号</label>
                    <div class="col-md-9">
                      {{protocolSpace.accountBankNumber}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">纳税人类型</label>
                    <div class="col-md-9">
                      {{protocolSpace.taxType}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">签约会员银行开户行</label>
                    <div class="col-md-9">
                      {{protocolSpace.accountBank}}
                    </div>
                  </div>
                  <div class="row mt10">
                    <label class="col-md-3">客户公司电话</label>
                    <div class="col-md-9">
                      {{protocolSpace.clientTelephone}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">备注</label>
                    <div class="col-md-9">
                      {{protocolSpace.description}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">状态</label>
                    <div class="col-md-9">
                      <span :style="'color:'+protocolSpace.getStatusStyle()">{{protocolSpace.getStatusName()}}</span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">PDF下载：</label>
                    <div class="col-md-9 ">
                      <a class="btn btn-success" target="_blank" :href="protocolSpace.downloadPdfUrl()">
                        <i class="fa fa-file-pdf-o"></i>
                        下载
                      </a>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">合同附件供下载：</label>
                    <div class="col-md-9 ">
                      <NbTank :tank="protocolSpace.scanning" :edit="false"/>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">纳税人类型：</label>
                    <div class="col-md-9 ">
                      {{protocolSpace.taxType}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">所属空间：</label>
                    <div class="col-md-9 ">
                      {{protocolSpace.spaceRegional.name}}
                    </div>
                  </div>

                  <div class="row mb10" v-if="!(protocolSpace.status != 'NEW')">
                    <a title="编辑" class="btn btn-info pull-right" style="width: 100px;height: 37px;"
                       @click.stop.prevent="$router.push({path:'/by/protocol/space/edit',query:{uuid: protocolSpace.uuid}})">
                      编辑
                    </a>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </NbLoadingFrame>
      </div>

      <div class="col-md-12">
        <NbLoadingFrame :loading="protocolSpace.detailLoading">

          <div class="row mt20 ml20">
            <div class="col-md-12">
              <div class="cell-subtitle">奕桥信息</div>
            </div>
          </div>

          <div class="row mt30">
            <div class="col-md-12">
              <div class="mail-box" style="border: 0;">
                <div class="mail-body ml15" style="border: 0;">

                  <div class="row mt10">
                    <label class="col-md-3">运营方公司名称</label>
                    <div class="col-md-9">{{protocolSpace.baseName}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">联系地址</label>
                    <div class="col-md-9">{{protocolSpace.baseAddress}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">联系人</label>
                    <div class="col-md-9">{{protocolSpace.basePerson}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">电话</label>
                    <div class="col-md-9">{{protocolSpace.basePhone}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">电子邮箱</label>
                    <div class="col-md-9">{{protocolSpace.baseEmail}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">银行账户名</label>
                    <div class="col-md-9">{{protocolSpace.baseBankName}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">银行账号</label>
                    <div class="col-md-9">{{protocolSpace.baseBankNumber}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">开户银行</label>
                    <div class="col-md-9">
                      {{protocolSpace.baseBank}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">备注</label>
                    <div class="col-md-9">
                      {{protocolSpace.baseDescription}}
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          <div class="row mt20 ml20">
            <div class="col-md-12">
              <div class="cell-subtitle">大事记录 </div>
            </div>
          </div>

          <!--大事记录-->
          <div class="row mt30">
            <div class="col-md-12">
              <MessageNotifyView ref="messageNotifyView" :entity="protocolSpace"/>
            </div>
          </div>

          <div class="row mt35 ml20">
            <div class="col-md-12">
              <div class="cell-subtitle">操作面板</div>
            </div>
          </div>

          <div class="row mt30">
            <div class="col-md-12">
              <div class="mail-box" style="border: 0;">
                <div class="mail-body ml15" style="border: 0;">

                  <div class="row">
                    <label class="col-md-3 control-label">当前状态</label>
                    <div class="col-md-9">
                      <span :style="'color:'+protocolSpace.getStatusStyle()">{{protocolSpace.getStatusName()}}</span>
                    </div>
                  </div>

                  <div class="row mt10" v-if="!isException">
                    <label class="col-md-3 control-label">更改状态</label>
                    <div class="col-md-9">
                      <NbBtnDropdown :name="reviewStatusMap['name']" size="sm" :color="reviewStatusMap['style']">
                        <ul>
                          <li v-for="(option, index) in protocolSpace.availableStatusList()" :key="index">
                            <a href="javascript:void(0)"
                               @click="reviewStatus = option.value">{{option.name}}</a>
                          </li>
                        </ul>
                      </NbBtnDropdown>

                      <div class="mt5">
                    <span v-if="reviewStatus === Status.PROCESSING">
                      <i class="fa fa-info-circle ml10"></i>
                      履约中的合同可以创建付款信息单。
                    </span>
                        <span v-if="reviewStatus === Status.EXCEPTION">
                      <i class="fa fa-info-circle ml10"></i>
                      合同中止后状态不可再更改，并且不能再创建付款信息单，关联的场地会设置为空闲状态。
                    </span>
                        <span v-if="reviewStatus === Status.EXPIRE">
                      <i class="fa fa-info-circle ml10"></i>
                      合同到期后状态不可再更改。
                    </span>
                      </div>
                    </div>
                  </div>

                  <div v-if="reviewStatus === Status.PROCESSING">
                    <div class="row mt10">
                      <label class="col-md-3 control-label compulsory">扫描件上传：</label>
                      <div class="col-md-9 mt5">
                        <NbTank :tank="protocolSpace.scanning"/>
                      </div>
                    </div>
                  </div>

                  <div v-if="reviewStatus === Status.EXCEPTION || isException">
                    <div class="form-group clearfix mt10">
                      <div class="row">
                        <label class="col-md-3 control-label">中止原因</label>
                        <div class="col-md-9">
                          <input type="text" placeholder="请填写中止原因……" class="form-control"
                                 :disabled="protocolSpace.status === 'EXCEPTION'"
                                 v-model="protocolSpace.reason">
                          <!--<textarea class="form-control" rows="3" v-model="protocolSpace.reason" :disabled="protocolSpace.status === 'EXCEPTION'"-->
                                  <!--placeholder="请填写中止原因……"></textarea>-->
                        </div>
                      </div>

                    </div>

                  </div>
                  <div class="row mt10" v-show="protocolSpace.errorMessage">
                    <div class="alert alert-danger">
                      {{protocolSpace.errorMessage}}
                    </div>
                  </div>
                  <div class="row mt10" v-if="protocolSpace.status !== 'EXCEPTION'">
                    <button style="width: 100px;height: 37px;" class="btn btn-info pull-right f16 mr30 mb10"
                            @click="save()" >提交</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt20 ml20">
            <div class="col-md-12">
              <div class="cell-subtitle">附件上传/ 修改</div>
            </div>
          </div>

          <div class="row mt30">
            <div class="col-md-12">
              <UploadAttachments :protocolSpace="protocolSpace" :successCallback="uploadSuccessCallback"/>
            </div>
          </div>

          <div class="row mt20 ml20">
            <div class="col-md-12">
              <div class="cell-subtitle">群组</div>
            </div>
          </div>

          <div class="row mt30">
            <div class="col-md-12">
              <div class="mail-box" style="border: 0;">
                <div class="mail-body ml15" style="border: 0;">
                  <div class="row">
                    <div class="row f16 mb10 pl35">
                      已添加的用户
                    </div>
                    <div v-for="user in protocolSpace.personnel" :key="user.uuid">
                      <div class="pl30">
                        <div class="col-md-3 col-sm-2 col-xs-2 cell-user">
                          <span >用户名： {{user.name}}</span>
                        </div>
                        <div class="col-md-5 col-sm-6 col-xs-6  cell-user" >
                          <span >手机号码： {{user.phone}}</span>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-4  cell-user" >
                          <a title="删除" @click.stop.prevent="goDel(user)">
                            <img class="logo pull-right mr40" style="width: 18px;height: 22px;" src="../../../../assets/img/del.png"/>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mt20">
                    <label class="col-md-3 control-label">人员</label>
                    <div class="col-md-9">
                      <Selection class="mr5" :activeUser="user"/>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <NbLoadingButton saveClass="mt10 mr40 f16 mb30 pull-right btn btn-info" :entity="protocolSpace"
                             style="width: 100px;height: 37px;"
                                     :createText="'添加人员'" :save-text="'添加人员'" :callback="savePersonnel"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--<NbSlidePanel type="primary">-->
            <!--<span slot="heading">-->
               <!--<i class="fa fa-dot-circle-o"></i>-->
                <!--租赁协议-->
            <!--</span>-->
            <!--<div slot="body">-->
              <!--<div v-html="content"></div>-->
            <!--</div>-->
          <!--</NbSlidePanel>-->

          <div class="row mt20 ml20">
            <div class="col-md-12">
              <div class="cell-subtitle">是否退还押金</div>
            </div>
          </div>

          <div class="row mt30">
            <div class="col-md-12">
              <div class="mail-box" style="border: 0;">
                <div class="mail-body ml15" style="border: 0;">
                  <div class="row mt20">
                    <label class="col-md-3 control-label">当前状态</label>
                    <div class="col-md-9  pr35" v-if="protocolSpace.refund">
                      押金已退还
                    </div>
                    <div class="col-md-9  pr35" v-else>
                      押金未退还
                    </div>
                  </div>
                  <div class="row mt20" v-show="protocolSpace.refund">
                    <label class="col-md-3 control-label">附件</label>
                    <div class="col-md-9  pr35" >
                      <NbTanks :tanks="protocolSpace.refundEnclosures" :edit="false"/>
                    </div>
                  </div>

                  <div class="row mt20" v-show="!protocolSpace.refund">
                    <label class="col-md-3 control-label">是否已经退还押金</label>
                    <div class="col-md-9 pr35">
                      <select class="form-control" v-model="refund">
                        <option value="true">押金已退还</option>
                        <option value="false">押金未退还</option>
                      </select>
                    </div>
                  </div>
                  <div class="row mt20" v-if="refund === 'true'" v-show="!protocolSpace.refund">
                    <label class="col-md-3 control-label compulsory">上传附件</label>
                    <div class="col-md-9 pr35">
                      <NbTanks :tanks="protocolSpace.refundEnclosures"/>
                    </div>
                  </div>
                </div>
                <div class="row" v-show="!protocolSpace.refund">
                  <div class="col-md-12">
                    <NbLoadingButton saveClass="mt10 mr40 f16 mb30 pull-right btn btn-info" :entity="protocolSpace"
                                     style="width: 100px;height: 37px;"
                                     :createText="'保存'" :save-text="'保存'" :callback="updateRefund"/>
                  </div>
                </div>
                <div class="row pr30 pl30" v-show="protocolSpace.errorMessage">
                  <div class="col-md-12 alert alert-danger ">
                    {{protocolSpace.errorMessage}}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </NbLoadingFrame>
      </div>

    </div>
  </div>
</template>

<script>
  import NbSlidePanel from "../../../../components/NbSlidePanel";
  import NbLoadingFrame from "../../../../components/NbLoadingFrame";
  import NbPager from "../../../../components/NbPager";
  import ProtocolSpace from "../../../../common/model/protocol/space/ProtocolSpace";
  import NbLoadingButton from "../../../../components/NbLoadingButton";
  import MessageNotifyView from "../../../../components/NbRecord";
  import User from "../../../../common/model/user/User";
  import { Notification, MessageBox } from 'element-ui'
  import Selection from "../../../../view/backyard/user/Selection";
  import NbBtnDropdown from "../../../../components/NbBtnDropdown";
  import NbTanks from "../../../../components/NbTanks";
  import NbTank from "../../../../components/NbTank";
  import UploadAttachments from "./UploadAttachments";

  export default {
    data () {
      return {
        protocolSpace: new ProtocolSpace(),
        Status: ProtocolSpace.prototype.Status,
        reviewStatus: ProtocolSpace.prototype.Status.NEW,
        user: new User(),
        nameList: [],
        content: "",
        isException: false,
        refund:null
      }
    },
    computed: {
      reviewStatusMap(){
        return this.protocolSpace.getStatusItem(this.reviewStatus);
      }
    },
    components: {
      NbSlidePanel,
      NbLoadingFrame,
      NbPager,
      NbLoadingButton,
      Selection,
      NbBtnDropdown,
      NbTanks,
      NbTank,
      UploadAttachments,
      MessageNotifyView
    },
    watch: {
      "protocolSpace.status"(newVal, oldVal) {
        this.updateReviewStatus();
      },
      "protocolSpace.refund"(newVal, oldVal){
        this.updateReviewRefund();
      }
    },
    methods: {
      updateReviewStatus(){
        let protocolSpaceStatus = this.Status.NEW;
        if (this.protocolSpace) {
          protocolSpaceStatus = this.protocolSpace.status;
        }

        if (protocolSpaceStatus === this.Status.NEW) {
          this.reviewStatus = this.Status.PROCESSING;
        } else if (protocolSpaceStatus === this.Status.PROCESSING) {
          this.reviewStatus = this.Status.EXCEPTION;
        } else if (protocolSpaceStatus === this.Status.SOON) {
          this.reviewStatus = this.Status.EXCEPTION;
        } else if (protocolSpaceStatus === this.Status.EXPIRE) {
          this.reviewStatus = this.Status.EXPIRE;
        } else {
          this.reviewStatus = protocolSpaceStatus;
        }
      },
      refresh() {
        this.pager.httpFastPage();
      },
      goDel(user) {
        let that = this;
        this.confirmDel(user, function () {

        });
      },
      refreshEvent(){
        this.$refs.messageNotifyView.refresh();
      },
      uploadSuccessCallback() {
        Notification.success({
          message: '附件修改成功！'
        });
        this.refreshEvent();
      },
      confirmDel(user, successCallback, failureCallback) {
        let that = this;
        MessageBox.confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
            let personnel = [];
            that.protocolSpace.personnel.forEach(e => {
              personnel.push(e.uuid);
            });

            personnel.splice(personnel.indexOf(user.uuid), 1);
            that.protocolSpace.httpGroup(JSON.stringify(personnel) ,function () {
              Notification.success({
                message: '成功删除!'
              });
              if (typeof successCallback === 'function') {
                successCallback()
              }
            }, failureCallback)
          },
          function () {
            if (typeof failureCallback === 'function') {
              failureCallback()
            }
          }
        )
      },
      savePersonnel() {
        let that = this;
        let personnel = [];
        if(!this.protocolSpace.personnel){
          this.protocolSpace.personnel = [];
        }
        this.protocolSpace.personnel.forEach(e => {
          personnel.push(e.uuid);
        });
        if(personnel.indexOf(this.user.uuid) !== -1) {
          Notification.error({
            message:  '不能重复添加！'
          });
          return
        }
        if(!this.user.uuid){
          Notification.error({
            message:  '请选择一位用户！'
          });
          return
        }
        personnel.push(this.user.uuid);
        this.protocolSpace.httpGroup(JSON.stringify(personnel), function () {
          Notification.success({
            message:  '修改成功！'
          });
        });
      },
      save(){
        let that = this;
        if (this.reviewStatus === this.Status.EXCEPTION) {
          if (!this.protocolSpace.reason) {
            this.protocolSpace.errorMessage = "请填写理由";
            return;
          }
        }
        if (this.reviewStatus === this.Status.PROCESSING) {
          if (!this.protocolSpace.scanning.uuid) {
            this.protocolSpace.errorMessage = "请上传扫描件";
            return;
          }
        }
        this.protocolSpace.httpStatus(this.reviewStatus, this.protocolSpace.reason,this.protocolSpace.scanning, function () {
          Notification.success({
            message:  '修改成功！'
          });
          that.protocolSpace.errorMessage = "";
          if (that.protocolSpace.status === "EXCEPTION") {
            that.isException = true;
          }
          that.refreshEvent();
          that.updateReviewStatus();
        });
      },
      updateRefund(){
        let that = this;
        if(!this.protocolSpace.refundEnclosures.length > 0 && this.refund === 'true'){
          this.protocolSpace.errorMessage = "请上传已收押金附件";
          return;
        }
        console.log(this.protocolSpace.refundEnclosures)
        this.protocolSpace.httpRefund(this.refund,this.protocolSpace.refundEnclosures,function () {
          Notification.success({
            message:  '修改成功！'
          });
          that.refreshEvent();
          that.updateReviewRefund();
          that.refreshRefund();
        });
        this.protocolSpace.errorMessage = "";
      },

      updateReviewRefund(){
        let protocolSpaceRefund = 'false';
        if (this.protocolSpace) {
          protocolSpaceRefund = this.protocolSpace.refund;
        }
        if (protocolSpaceRefund) {
          this.refund = 'true';
        } else if (protocolSpaceRefund === null) {
          this.refund = 'false';
        } else {
          this.refund = 'false';
        }

      },
      refreshRefund(){
        let that = this;
        this.protocolSpace.uuid = this.$route.query.uuid;
        this.protocolSpace.httpDetail(function (response) {
          that.refreshEvent();
          that.protocolSpace.memberType = that.protocolSpace.spaceOrder.getCharacteristicName();
        });
      }
    },
    mounted(){
      let that = this;
      this.protocolSpace.uuid = this.$route.query.uuid;
      this.protocolSpace.httpDetail(function (response) {
        that.refreshEvent();
        that.protocolSpace.memberType = that.protocolSpace.spaceOrder.getCharacteristicName();
      });
      this.updateReviewStatus();
      this.protocolSpace.fetchTemplate(function (response) {
        that.content = response.data.data.templateMap;
      })
      this.updateReviewRefund();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .protocol-cell{
    padding: 20px 100px 0 30px;
    .cell-user{
      font-size: 14px;
      color: #666666;
      white-space:nowrap;

    }
  }
</style>


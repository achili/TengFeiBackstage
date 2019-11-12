<template>
  <div class="animated fadeIn space-order-list-cell">
    <div class="row">
      <div class="col-md-12">
        <NbLoadingFrame :loading="spaceOrder.detailLoading">

          <div class="row">
            <div class="col-md-12">
              <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
                <span><img class="logo" width="30" height="30" src="../../../assets/img/return.png"/></span>
              </div>
              <div class="pull-left">
                <span class="ml15 cell-max-title">空间订单详情</span>
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
              <div class="cell-subtitle">基本信息 </div>
            </div>
          </div>

          <div class="mb50">
            <a title="编辑" class="btn btn-success pull-right" v-if="spaceOrder.status === 'AUDITING'"
               @click.stop.prevent="$router.push({path:'/by/spaceOrder/edit',query:{uuid:spaceOrder.uuid}})">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
          </div>

          <div class="row mt5">
            <div class="col-md-12">
              <div class="mail-box" style="border: 0;">
                <div class="mail-body ml15" style="border: 0;">

                  <div class="row mt10">
                    <div class="col-md-3">空间申请名称</div>
                    <div class="col-md-9">{{spaceOrder.applyName}}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">空间地点</div>
                    <div class="col-md-9">{{spaceOrder.name}}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">状态</div>
                    <div class="col-md-9"><span :style="'color:'+ spaceOrder.getStatusStyle()">{{spaceOrder.getStatusName()}}</span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">空间类型</div>
                    <div class="col-md-9">
                      <span>{{ spaceOrder.getCharacteristicName()}}</span>
                    </div>
                  </div>

                  <div class="row mt10" v-if="spaceOrder.getCharacteristicName() == '移动办公桌'">
                    <div class="col-md-3">需求</div>
                    <div class="col-md-9">
                      <span v-for="(a,index) in AttributeMap" :key="index">
                      <span v-for="(c,index) in spaceOrder.attribute" :key="index">
                        <span class="mr10" v-if="c === a.val">{{a.name}}</span>
                      </span>
                    </span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">需求工位数量</div>
                    <div class="col-md-9">{{spaceOrder.number}}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">入驻时间</div>
                    <div class="col-md-9">{{spaceOrder.startTime | simpleDate }}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">所属空间</div>
                    <div class="col-md-9">{{spaceOrder.spaceRegional.name }}</div>
                  </div>

                  <div class="row mt10" v-show="spaceOrder.endTime">
                    <div class="col-md-3">结束时间</div>
                    <div class="col-md-9">{{spaceOrder.endTime | simpleDate }}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">中介机构</div>
                    <div class="col-md-9">
                      <input type="text" style="max-width: 1080px;" class="form-control " v-model="spaceOrder.agency">
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">佣金(单位: 元)</div>
                    <div class="col-md-9">
                      <input type="text" style="max-width: 1080px;" class="form-control" v-model="spaceOrder.commission">
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">备注</div>
                    <div class="col-md-9">
                      <input type="text" style="max-width: 1080px;" class="form-control" v-model="spaceOrder.remarks">
                    </div>
                  </div>

                  <div class="row mt20">
                    <div v-if="spaceOrder.status === 'HAVE_PAY' && spaceOrder.type === 'DAY_PASS'" class="col-md-10">
                      <button style="width: 100px;height: 37px;" class="btn btn-theme f16 pull-right"
                              @click.stop="spaceOrderRefund()" >线下退款</button>
                    </div>

                    <div class="mr40">
                      <button style="width: 100px;height: 37px;" class="btn btn-theme f16 pull-right" @click.stop="submit">提交</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          <div class="row mt15 ml20">
            <div class="col-md-12">
              <div class="cell-subtitle">大事记录 </div>
            </div>
          </div>

          <!--大事记录-->
          <div class="row mt25">
            <div class="col-md-12">
              <NbRecord ref="nbRecord" :entity="spaceOrder"></NbRecord>
            </div>
          </div>

          <div class="row mt35 ml20">
            <div class="col-md-12">
              <div class="cell-subtitle">空间分配</div>
            </div>
          </div>

          <div class="row mt25" v-if="spaceOrder.status !== 'REFUSE'">
            <div class="col-md-12">
            <div class="mail-box" style="border: 0;">
              <div class="mail-body ml15" style="border: 0;">
                <div class="mt10" v-if="spaceOrder.status === 'AUDITING'">
                  <div class="row">
                    <label class="col-md-3 control-label">当前状态</label>
                    <div class="col-md-9">
                      <span :class="'text-'+spaceOrder.getStatusStyle()">{{spaceOrder.getStatusName()}}</span>
                    </div>
                  </div>

                  <div class="row">
                    <label class="col-md-3 control-label">更改状态</label>
                    <div class="col-md-9">
                      <NbBtnDropdown :name="reviewStatusMap['name']" size="sm" :color="reviewStatusMap['style']">
                        <ul>
                          <li v-for="(option, index) in spaceOrder.availableStatusList()" :key="index">
                            <a href="javascript:void(0)"
                               @click="reviewStatus = option.value">{{option.name}}</a>
                          </li>
                        </ul>
                      </NbBtnDropdown>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div v-if="spaceOrder.characteristic === 'MOBILE_STATION'">
                    <div v-for="spaceSeat in spaceOrder.spaceOrderList" :key="spaceSeat.index"
                         class="col-lg-4 col-md-6 border p10 mb10">
                      <div class="cell-title">
                        <span>{{spaceSeat.name}} </span>
                        <!--<span :class="'label label-'+spaceSeat.getStatusStyle(spaceSeat.status)">{{spaceSeat.getStatusName(spaceSeat.status)}}</span>-->
                      </div>
                      <div class="mt10 cell-content one-line">
                        <span>价格：{{spaceSeat.day}}元/天</span>
                        <span>{{spaceSeat.month}}元/月</span>
                      </div>
                      <div class="mt10 one-line">
                        <span>地址：{{spaceSeat.address}}</span>
                      </div>
                    </div>
                  </div>
                  <div v-if="spaceOrder.characteristic === 'INDEPENDENT_SPACE'">
                    <div v-for="spaceOffice in spaceOrder.spaceOrderList" :key="spaceOffice.index"
                         class="col-lg-4 col-md-6">

                      <div class="space-room-list-cell border">
                        <div class="cell-title">
                          <span>{{spaceOffice.name}} </span>
                          <!--<span :class="'label label-'+spaceOffice.getTypeStyle()">{{spaceOffice.getTypeName()}}</span>-->
                          <!--<span :class="'label label-'+spaceOffice.getStatusStyle()">{{spaceOffice.getStatusName()}}</span>-->
                        </div>
                        <div class="cell-description">
                          {{spaceOffice.description}}
                        </div>
                        <div class="mt10 one-line">
                          <span class="mr10">地址:{{spaceOffice.address}}</span>

                        </div>
                        <div class="cell-content one-line">
                        <span class="mr10">
                        工位数量: {{spaceOffice.seatNum}}</span>
                          <span class="mr10">面积:{{spaceOffice.area}}㎡</span>
                          <!--<span class="mr10">-->
                          <!--所属大楼: {{spaceOffice.spaceBuilding.name}} </span>-->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="reviewStatus === Status.ACCEPT && isSubmit">
                  <ChooseStationOffice :spaceOrder="spaceOrder"></ChooseStationOffice>
                </div>

                <div class="row mr40" v-if="isAccept">
                  <button style="width: 100px;height: 37px;" class="btn btn-info f16 pull-right" @click="save(spaceOrder)">提交</button>
                </div>
                <div class="row mr40" v-else>
                  <button  style="width: 100px;height: 37px;" class="btn btn-info f16 pull-right" @click="reset(spaceOrder)">修改</button>
                </div>

                <div class="row mt10" v-show="spaceOrder.errorMessage">
                  <div class="alert alert-danger">
                    {{spaceOrder.errorMessage}}
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          <div class="row mt20 ml20" v-if="spaceOrder.status === 'ACCEPT'">
            <div class="col-md-12">
              <div class="cell-subtitle">通知 </div>
            </div>
          </div>

          <!--消息通知面板-->
          <div class="row mt25" v-if="spaceOrder.status === 'ACCEPT'">
            <div class="col-md-12">
              <div class="mail-box" style="border: 0;">
                <div class="mail-body" style="border: 0;">
                  <SpaceOrderOperationPanel :spaceOrder="spaceOrder"
                                            :notify="notify"
                                            :successCallback="successCallback"/>
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
  import NbSlidePanel from "../../../components/NbSlidePanel";
  import NbLoadingFrame from "../../../components/NbLoadingFrame";
  import SpaceOrder from "../../../common/model/spaceOrder/SpaceOrder";
  import NbBtnDropdown from "../../../components/NbBtnDropdown";
  import {Notification, MessageBox} from 'element-ui'
  import {simpleDateTime} from "../../../common/filter/time";
  import Selection from "../../../view/backyard/user/Selection";
  import User from "../../../common/model/user/User";
  import NbLoadingButton from "../../../components/NbLoadingButton";
  import ProtocolSpace from "../../../common/model/protocol/space/ProtocolSpace";
  import ChooseStationOffice from "../protocol/space/ChooseStationOffice";
  import NbRecord from "../../../components/NbRecord"
  import SpaceOrderOperationPanel from "./widget/ControlPanel"
  import Notify from "../../../common/model/finance/Notify";

  export default {
    data() {
      return {
        AttributeMap: SpaceOrder.prototype.AttributeMap,
        spaceOrder: new SpaceOrder(),
        protocolSpace: new ProtocolSpace(),
        Status: SpaceOrder.prototype.Status,
        reviewStatus: SpaceOrder.prototype.Status.AUDITING,
        startTime: new Date(),
        endTime: new Date(),
        user: new User(),
        isAccept: true,
        notify: new Notify(),
        isSubmit: true,
        text: ""
      }
    },
    computed: {
      reviewStatusMap() {
        return this.spaceOrder.getStatusItem(this.reviewStatus);
      }
    },
    components: {
      NbSlidePanel,
      NbLoadingFrame,
      NbBtnDropdown,
      Selection,
      NbLoadingButton,
      ChooseStationOffice,
      NbRecord,
      SpaceOrderOperationPanel
    },
    methods: {
      refreshEvent() {
        this.$refs.nbRecord.refresh();
      },
      reset() {
        this.isAccept = true;
        this.isSubmit = true;
        this.reviewStatus = SpaceOrder.prototype.Status.ACCEPT;
      },
      successCallback() {
        this.refresh();
        this.refreshEvent();
      },

      spaceOrderRefund(){
        let that = this;
        MessageBox.confirm('确定执行线下退款么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.spaceOrder.spaceOrderRefund(that.spaceOrder.uuid, function (res) {
            that.$router.push({path: '/by/spaceOrder/list'});
          })
        }, function () {

        });

      },

      submit() {
        let that = this;
        let form = {
          name: this.spaceOrder.name,
          characteristic: this.spaceOrder.characteristic,
          number: this.spaceOrder.number,
          startTime: simpleDateTime(this.spaceOrder.startTime),
          agency: this.spaceOrder.agency,
          commission: this.spaceOrder.commission,
          remarks: this.spaceOrder.remarks,
          attribute: JSON.stringify(this.spaceOrder.attribute),
          spaceRegional:this.spaceOrder.spaceRegional.uuid
        };
        if (this.spaceOrder.uuid != null) {
          form.uuid = this.spaceOrder.uuid;
        }
        this.spaceOrder.httpSave(form, function () {
          Notification.success({
            message: '编辑成功!'
          });
          that.$refs.nbRecord.refresh();
        });
      },
      confirmDel(user, successCallback, failureCallback) {
        let that = this;
        MessageBox.confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
            let personnel = [];
            that.spaceOrder.personnel.forEach(e => {
              personnel.push(e.uuid);
            });

            personnel.splice(personnel.indexOf(user.uuid), 1);
            that.spaceOrder.httpGroup(JSON.stringify(personnel), function () {
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
      updateReviewStatus() {
        // console.log(this.spaceOrder.status)
        // this.reviewStatus = this.spaceOrder.status;
        if (this.spaceOrder.status === 'ACCEPT') {
          this.reviewStatus = this.Status.ACCEPT;
        }
        if (this.spaceOrder.status === 'AUDITING') {
          this.reviewStatus = this.Status.AUDITING;
        }
      },
      save(spaceOrder) {
        let that = this;
        if (this.reviewStatus === 'AUDITING') {
          if (spaceOrder.status === 'AUDITING') {
            spaceOrder.errorMessage = "不能将履约中的合同设置为履约中，请重新更改状态！";
            return false;
          }
        }

        if (this.reviewStatus === 'ACCEPT') {
          if (spaceOrder.spaceUuids.length === 0) {
            spaceOrder.errorMessage = "请先选择至少一个房间！";
            return false;
          }
        }

        if (this.reviewStatus === 'REFUSE') {
          this.text = "是否将状态改为未通过,确认后就不可再更改状态。"
        } else {
          this.text = "是否确认审核通过?"
        }

        MessageBox.confirm(this.text , '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          spaceOrder.httpStatus(that.reviewStatus, spaceOrder.spaceUuids, function () {
            Notification.success({
              message: '修改成功！'
            });
            spaceOrder.errorMessage = "";
            that.isAccept = false;
            that.isSubmit = false;
            that.reviewStatus = that.Status.ACCEPT;
            that.$refs.nbRecord.refresh();
            that.updateReviewStatus();
          });
        }, function () {
        });
      },
      refresh() {
        let that = this;
        this.spaceOrder.uuid = this.$route.query.uuid;
        if (this.spaceOrder.uuid) {
          this.spaceOrder.httpDetail(function () {
            if (that.spaceOrder.status === 'ACCEPT') {
              that.isAccept = false;
            } else {
              that.isAccept = true;
            }
            that.notify.fillBySpaceOrder(that.spaceOrder);
          });
        }
      }
    },
    mounted() {
      let that = this;
      this.refresh();
      this.refreshEvent();
      this.updateReviewStatus();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .space-order-list-cell{
    padding: 20px 30px 0 30px;
  }
</style>

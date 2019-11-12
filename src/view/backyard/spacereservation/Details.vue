<template>
  <div class="by-reservation-detail animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <div title="返回" class="pull-left mt5 cursor-pointer" @click.stop.prevent="$router.go(-1)">
          <span><img width="30" height="30" src="../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left">
          <span class="ml15 cell-max-title">会议室预定详情</span>
        </div>
      </div>
    </div>

    <div class="row pt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">

            <div class="row">
              <div class="col-md-3">名称</div>
              <div class="col-md-9">{{spaceReservation.name}}</div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">会议室地点</div>
              <div class="col-md-9">{{spaceReservation.location}}</div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">开始时间</div>
              <div class="col-md-9">{{spaceReservation.startTime | simpleDateTime}}</div>
            </div>

            <div class="row" style="padding-top: 20px;">
              <div class="col-md-3">结束时间</div>
              <div class="col-md-9">{{spaceReservation.endTime | simpleDateTime}}</div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">会议室价格</div>
              <div class="col-md-9">
                {{spaceReservation.price}}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">用户类型</div>
              <div class="col-md-9">
                {{spaceReservation.getTypeName()}}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">编号</div>
              <div class="col-md-9">
                {{spaceReservation.no}}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3 mt5">备注</div>
              <div class="col-md-9">
                {{spaceReservation.remarks}}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3 mt5">所属空间</div>
              <div class="col-md-9">
                {{spaceReservation.spaceRegional.name}}
              </div>
            </div>

            <div v-if="spaceReservation.status === 'HAVE_PAY'" class="row mt10">
              <button style="width: 100px;height: 37px;" class="btn btn-info pull-right f16 mr30 mb10"
                      @click="offlineRefund()" >线下退款</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SpaceReservation from "../../../common/model/spacereservation/SpaceReservation";
  import NbLoadingFrame from "../../../components/NbLoadingFrame";
  import {Notification, MessageBox} from 'element-ui';
  import {humanTime} from "../../../common/filter/time"

  export default {
    data () {
      return {
        spaceReservation: new SpaceReservation()
      }
    },
    components: {
      NbLoadingFrame
    },
    computed: {},
    watch: {},
    methods: {
      offlineRefund(){
        let that = this;
        MessageBox.confirm('确定执行线下退款么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.spaceReservation.offlineRefund(that.spaceReservation.uuid, function (res) {
            that.$router.push({path: '/by/spaceReservation/list'});
          })
        }, function () {

        });

      }
    },
    mounted(){
      this.spaceReservation.uuid = this.$route.query.uuid;
      this.spaceReservation.httpDetail();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .by-reservation-detail{
    padding: 20px 120px 0 30px;
    font-size: 14px;
    color: #555555;

  }
</style>

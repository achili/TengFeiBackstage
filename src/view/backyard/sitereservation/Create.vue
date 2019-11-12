<template>
  <div class="animated fadeIn site-reservation-create">
    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left mt5">
          <div title="返回" class="cursor-pointer"  @click.stop.prevent="$router.go(-1)">
            <span><img class=" mr15" width="30" height="30" src="../../../assets/img/return.png"/></span>
          </div>
        </div>
        <div class="pull-left title">
          <span v-show="!siteReservation.editMode">创建场地预订</span>
          <span v-show="siteReservation.editMode">编辑场地预订</span>
        </div>
      </div>
    </div>

    <div class="row mt30">
      <div class="col-md-12">
        <div class="segmenting-line"> </div>
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
            <div class="row">
              <label class="col-md-3 control-label mt5 compulsory">预约日期;</label>
              <div class="col-md-9">
                <el-date-picker
                  v-model="siteReservation.startTime"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">场地地点:</label>
              <div class="col-md-9">
                <input type="text" class="form-control"  v-model="siteReservation.address">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 no-compulsory">备注:</label>
              <div class="col-md-9">
                <textarea v-model="siteReservation.remarks" rows="2" class="form-control"></textarea>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">关联用户:</label>
              <div class="col-md-9">
                <UserSelection :activeUser="siteReservation.user" ></UserSelection>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">活动场地:</label>
              <div class="col-md-9">
                <ActiveSelection :activeActiveSite="siteReservation.activeSite" :initFilter="{deleted:'false'}"></ActiveSelection>
              </div>
            </div>

            <div class="alert alert-danger mt20" v-show="siteReservation.errorMessage">
              {{siteReservation.errorMessage}}
            </div>

            <div class="row mt10">
              <div class="col-md-12">
                <NbLoadingButton :entity="siteReservation" :callback="save"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        <!--<div class="row">-->
          <!--<div class="col-md-12">-->
            <!--<NbForm :httpForm="httpCreate" :successCallback="successCallback" :errorCallback="errorCallback"></NbForm>-->
          <!--</div>-->
        <!--</div>-->


  </div>
</template>
<script>
  import NbSlidePanel from "../../../components/NbSlidePanel";
  import NbForm from "../../../components/NbForm";
  import SiteReservation from "../../../common/model/sitereservation/SiteReservation";
  import {Notification} from 'element-ui'
  import NbLoadingButton from "../../../components/NbLoadingButton";
  import UserSelection from "../../../view/backyard/user/Selection";
  import ActiveSelection from "../../../view/backyard/activesite/Selection";

  export default {
    data () {
      return {
        siteReservation: new SiteReservation()
      }
    },
    components: {
      NbSlidePanel,
      NbForm,
      NbLoadingButton,
      UserSelection,
      ActiveSelection
    },
    computed: {},
    watch: {},
    methods: {
      successCallback(res){
        let that = this;
        Notification.success({
          message: '提交成功!'
        });
        that.$router.push("/by/SiteReservation/list");
      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        })
      },
      save(){
        let that = this;
        this.siteReservation.httpSave(function (response) {
          Notification.success({
            message: that.siteReservation.editMode ? '修改成功！' : '创建成功！'
          });
          that.$router.push("/by/siteReservation/list");
        });
      }
    },
    mounted(){
      let that = this;
      this.siteReservation.uuid = this.$route.query.uuid;
      if(this.$route.query.uuid) {
        //this.httpCreate.editMode = true;
        this.siteReservation.httpDetail(function (res) {
          that.siteReservation.user.render(res.data.data.creator)
          //that.httpCreate.backFill({siteReservation: that.siteReservation});
        });
      }
      //this.httpCreate.backFill({siteReservation: this.siteReservation});
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .site-reservation-create {
    padding: 20px 120px 0 30px;
    .title{
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }

  }
</style>

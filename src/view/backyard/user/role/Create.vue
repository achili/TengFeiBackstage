<template>
  <div class="animated fadeIn building-create">
    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo mr15" width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left f26 title">
          <span v-show="!userRole.editMode">创建角色</span>
          <span v-show="userRole.editMode">编辑角色</span>
        </div>
      </div>
    </div>

    <div class="row mt30">
      <div class="col-md-12">
        <div class="segmenting-line" > </div>
      </div>
    </div>

    <div class="row mt35 ml40">
      <div class="col-md-12">
        <div class="cell-subtitle">基本内容 </div>
      </div>
    </div>

    <div class="row mt25">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <NbForm :httpForm="httpCreate" :successCallback="successCallback" ></NbForm>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import NbSlidePanel from "../../../../components/NbSlidePanel";
  import NbForm from "../../../../components/NbForm";
  import {Notification} from 'element-ui'
  import SpaceBuilding from "../../../../common/model/space/SpaceBuilding";
  import UserRole from "../../../../common/model/user/role/UserRole";


  export default {
    data () {
      return {
        userRole: new UserRole(),
        httpCreate: new UserRole().getHttpCreate()
      }
    },
    components: {
      NbSlidePanel,
      NbForm
    },
    computed: {},
    watch: {},
    methods: {
      successCallback(res){
        let that = this;
        Notification.success({
          message: '提交成功!'
        });
        that.$router.push({path:'/by/user/role/detail/',query:{ uuid: res.data.data.uuid }});
      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        });
      }
    },
    mounted(){
      let that = this;
      this.userRole.uuid = this.$route.query.uuid;
      if (this.userRole.uuid) {
        this.httpCreate.editMode = true;
        this.userRole.httpDetail(function (){
          that.httpCreate.backFill({userRole: that.userRole});
        });
      }
      this.httpCreate.backFill({userRole: this.userRole});
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .building-create {
    padding: 20px 100px 0 30px;
    .title{
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }
  }
</style>

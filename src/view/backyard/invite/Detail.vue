<template>
  <div class="by-inviteVisitor-detail animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo" width="30" height="30" src="../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left">
          <span class="ml15 cell-max-title">邀请访客详情</span>
        </div>
      </div>
    </div>

    <div class="row inviteVisitor">
      <div class="col-md-12">
        <div class="pull-right">
          <span class="mr15">邀请人用户名: <a class="cell-blue f16" @click.stop.prevent="$router.push({path:'/by/user/edit',query:{uuid:inviteVisitor.creator.uuid}})">{{inviteVisitor.inviteName}}</a></span>
          <span class="mr15">邀请人姓名: {{inviteVisitor.name}}</span>
          <span>邀请人数: {{inviteVisitor.visitorsNum}}</span>
        </div>
      </div>
    </div>

    <div class="row mt5">
      <div class="col-md-12">
        <div class="segmenting-line"></div>
      </div>
    </div>

    <div class="row mt35">
      <div class="col-md-12 visitorUser-title pl40" >
        <div class="col-md-3 col-sm-3 col-xs-3">访客名</div>
        <div class="col-md-3 col-sm-3 col-xs-3">手机</div>
        <div class="col-md-3 col-sm-3 col-xs-3">到访时间</div>
        <div class="col-md-3 col-sm-3 col-xs-3" align="center">离开时间</div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 mt20">
        <div v-for="(visitorUser,index) in inviteVisitorUserPager.data" :key="index"  style="height: 100px;" class="bg-white mt10">
          <div class="media pl25" >
            <div class="col-md-3 col-sm-3 col-xs-3 font-middle-height">{{visitorUser.name}}</div>
            <div class="col-md-3 col-sm-3 col-xs-3 font-middle-height" >{{visitorUser.phone}}</div>
            <div class="col-md-3 col-sm-3 col-xs-3 font-middle-height">{{inviteVisitor.invitingTime | simpleDateMinute }}</div>
            <div class="col-md-3 col-sm-3 col-xs-3 font-middle-height" align="center">{{inviteVisitor.accessTime | simpleDateMinute }}</div>
          </div>
        </div>
     </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <NbPager :pager="inviteVisitorUserPager" :callback="search"></NbPager>
      </div>
    </div>

    </div>
</template>
<script>
  import {Notification,MessageBox} from 'element-ui';
  import InviteVisitor from "../../../common/model/invite/InviteVisitor";
  import NbSlidePanel from "../../../components/NbSlidePanel.vue";
  import Pager from "../../../common/model/_base/Pager";
  import InviteVisitorUser from "../../../common/model/invite/inviteUser/InviteVisitorUser";
  import NbPager from "../../../components/NbPager.vue";

  export default {
    data () {
      return {
        inviteVisitor: new InviteVisitor(),
        inviteVisitorUserPager: new Pager(InviteVisitorUser),
        reviewContent:null
      }
    },
    components: {
      NbSlidePanel,
      NbPager
    },
    methods: {
      search(){
        this.inviteVisitorUserPager.httpFastPage();
      },
      refresh(){
        let that = this;
        this.inviteVisitor.uuid = this.$route.query.uuid;
        if (this.inviteVisitor.uuid) {
          this.inviteVisitor.httpDetail();
        }
      }
    },
    mounted(){
      this.refresh();
      this.inviteVisitorUserPager.setFilterValue("inviteVisitorUuid", this.inviteVisitor.uuid);
      this.inviteVisitorUserPager.httpFastPage();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .by-inviteVisitor-detail {
    padding: 20px 30px 0 30px;
    .inviteVisitor{
      color: #9c9c9c;
      font-size: 16px;
    }
    .visitorUser-title{
      color: #888888;
      font-size: 18px;
    }

  }
</style>


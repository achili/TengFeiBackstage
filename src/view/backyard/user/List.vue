<template>
  <div class="animated fadeIn user-list">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left f24">
          <span>用户列表</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>

        </div>
      </div>
    </div>

    <div class="row mt20">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="segmenting-line"></div>
      </div>
    </div>

    <div class="row mt35">

      <div class="col-md-12 col-sm-12 col-xs-12 table-title pl40" >
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">用户名</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">角色</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">邮箱</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">电话</div>
        <div class="col-md-1 col-sm-1 col-md-1 col-sm-1 col-xs-1 font-cell-min">上次登录</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">个人介绍</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">上次IP</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">操作</div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt15" >
        <div v-for="user in pager.data"  style="height: 100px;font-size: 16px;color: #666666;line-height: 100px;" class="bg-white mt10 " :key="user.uuid" :class="user.deleted === true ? 'bg-change':''"
             >
          <div class="media pl25">
            <div class="col-md-2 col-sm-2 col-xs-2 f14" style="white-space:nowrap;">
              <img class="image img-rounded img-md"  :src="user.getAvatarUrl()">
              {{user.name}}
              <span v-if="user.uuid === currentUser.uuid" class="text-danger">(It's you)</span>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height">{{user.role.name}}</div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height">{{user.email}}</div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height">{{user.phone}}</div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" >{{user.lastTime | complexHumanTime()}}</div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height">
              <span v-show="user.description">{{user.description}}</span>
              <span v-show="!user.description"><span class="f14 cell-danger">未填写！</span></span>
            </div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height">{{user.lastIp}}</div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height">
              <a title="编辑" @click.stop.prevent="$router.push({path: '/by/user/edit/',query: {uuid: user.uuid}})">
                <img  style="width: 20px;height: 20px;" src="../../../assets/img/edit.png"/>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xs-12 mt20">
          <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>
    </div>
  </div>
</template>
<script>

  import NbFilter from "../../../components/filter/NbFilter";
  import NbPager from "../../../components/NbPagerNew";
  import NbPhotoFrame from "../../../components/NbPhotoFrame";
  import {MessageBox, Notification} from 'element-ui'

  import Pager from "../../../common/model/_base/Pager";
  import User from  "../../../common/model/user/User"

  export default {

    data () {
      return {
        pager: new Pager(User),
        currentUser: this.$store.state.user
      }
    },
    components: {
      NbFilter,
      NbPager,
      NbPhotoFrame
    },
    computed: {},
    watch: {},
    methods: {
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      }
    },
    mounted(){
      this.pager.enableHistory();
      this.refresh();
    }
  }

</script>
<style lang="less" rel="stylesheet/less">
  .user-list{
    padding: 20px 30px 0 30px;
    .image{
      border-radius:50%;
      overflow:hidden;
      width: 40px;
      height: 40px
    }
    .table-title{
      color: #888888;
      font-size: 18px;
    }
    .input-sm{
      width: 180px;
      height: 38px;
      background-color: #ffffff;
      border-radius: 19px;
      border: solid 1px #e9e9e9;
    }
    .bg-change{
      background-color: #f6f6f6 !important;
    }
  }
</style>


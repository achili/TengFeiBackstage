<template>
  <div class="animated fadeIn posts-list">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left cell-max-title">
          <span>朋友圈列表</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
            <button style="width: 128px;height: 37px;" class="btn btn-theme" @click.stop.prevent="$router.push('/by/community/posts/create')">
              <span>发布朋友圈</span>
            </button>
          </span>
          <span class="pull-right mr20">
              <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                     v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>
          <span class="pull-right mr5 mt5">
             <NbMultiFilter :filter="pager.getFilter('status')" :filters="pager.FILTERS" :callback="refresh"/>
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

      <div class="col-md-12 col-sm-12 col-xs-12 table-title">
        <div class="col-md-3 col-sm-3 col-xs-3 font-cell-mid">用户</div>
        <div class="col-md-3 col-sm-3 col-xs-3 font-cell-mid">内容</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">
          <NbTableFilter name="创建时间" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid" align="center">状态</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid" align="center">操作</div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt15" >
        <div v-for="communityPosts in pager.data"  style="height: 100px;" class="bg-white mt10 cursor" :key="communityPosts.uuid" :class="communityPosts.deleted === true ? 'bg-change':''"
             @click.stop.prevent="communityPosts.deleted||$router.push({path:'/by/community/posts/detail',query:{uuid:communityPosts.uuid}})" >
          <div class="media pl25" >
            <div class="col-md-3 col-sm-3 col-xs-3 font-middle-height">
              <img class="img-avatar" :src="communityPosts.creator.getAvatarUrl()">
              <span @click.stop.prevent="$router.push({path:'/by/user/edit',query:{uuid:communityPosts.creator.uuid}})"><NbEntityLink :entity="communityPosts.creator"></NbEntityLink></span>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-3 font-middle-height" >{{communityPosts.content}}</div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-middle-height">{{communityPosts.createTime | simpleDateMinute }}</div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-middle-height" align="center">
              <span class="f16 cell-danger" v-if="communityPosts.status === 'CLOSURE'">封禁</span>
              <span v-else class="f16 cell-normal" >正常</span>
            </div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-middle-height" align="center">
              <a title="封禁"  @click.stop.prevent="closure(communityPosts)" v-show="communityPosts.status === 'OK'" >
                <i class="fa fa-times-circle f25 cell-danger" ></i>
              </a>
              <a title="取消封禁"  @click.stop.prevent="qxClosure(communityPosts)" v-show="communityPosts.status === 'CLOSURE'"  >
                <i class="fa fa-check-circle f25 cell-normal" ></i>
              </a>
              <span v-if="communityPosts.isTop">
                <span title="取消置顶" @click.stop.prevent="downTop(communityPosts)">
                  <i class="fa fa-arrow-circle-o-up f25 cell-blue" ></i>
                </span>
              </span>
              <span title="置顶" v-if="communityPosts.status === 'OK' && !communityPosts.isTop" @click.stop.prevent="toTop(communityPosts)">
                <i class="fa fa-arrow-circle-o-up f25 cell-gray"></i>
              </span>
              <!--<a title="删除" href="javascript:void(0)" @click.stop.prevent="communityPosts.confirmDel(refresh)">-->
                <!--<i class="fa fa-trash text-danger f20"></i>-->
              <!--</a>-->
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt20 ">
        <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>
    </div>
  </div>
</template>
<script>
  import Pager from "../../../../common/model/_base/Pager";
  import NbPager from "../../../../components/NbPagerNew";
  import NbFilter from "../../../../components/filter/NbFilter";
  import NbEntityLink from "../../../../components/NbEntityLink";
  import CommunityPosts from "../../../../common/model/community/CommunityPosts";
  import {Notification,MessageBox} from 'element-ui';
  import NbTableFilter from "../../../../components/filter/NbTableFilter";
  import NbMultiFilter from "../../../../components/filter/NbMultiFilter";

  export default {
    data () {
      return {
        pager: new Pager(CommunityPosts, 10),
        user: this.$store.state.user
      }
    },
    components: {
      NbPager,
      NbFilter,
      NbEntityLink,
      NbTableFilter,
      NbMultiFilter
    },
    props:{},
    computed: {},
    watch: {},
    methods: {
      closure(communityPosts){
        let that = this;
        communityPosts.httpStatus(communityPosts.Status.CLOSURE, function () {
          communityPosts.status = communityPosts.Status.CLOSURE;
          that.refresh();
        });
        Notification.success({
          message: '修改状态成功！'
        });
      },
      qxClosure(communityPosts){
        let that = this;
        communityPosts.httpStatus(communityPosts.Status.OK, function () {
          communityPosts.status = communityPosts.Status.OK;
          that.refresh();
        });
        Notification.success({
          message: '修改状态成功！'
        });
      },
      addLike(communityPosts){
        let that = this;
        communityPosts.httpApplaud(function () {
          that.refresh();
        })
      },
      toTop(communityPosts) {
        let that = this;
        communityPosts.httpToTop(function () {
          that.refresh();
        })
      },
      downTop(communityPosts) {
        let that = this;
        communityPosts.httpDownTop(function () {
          that.refresh();
        })
      },
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      }
    },
    mounted(){
      let that = this;
      if(this.pager.getFilter("orderCreateTime")){
        this.pager.setFilterValue("orderCreateTime", "DESC");
      }
      if (this.pager.getFilter("orderTop")) {
        this.pager.setFilterValue("orderTop", "DESC");
      }

      this.pager.enableHistory();
      this.refresh();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .posts-list {
    padding: 20px 30px 20px 30px;
    .input-sm{
      width: 180px;
      height: 38px;
      background-color: #ffffff;
      border-radius: 19px;
      border: solid 1px #e9e9e9;
    }
    .img-avatar{
      border-radius:50%;
      overflow:hidden;
      width: 40px;
      height: 40px;
    }
    .table-title{
      color: #888888;
      font-size: 18px;
      padding-left: 40px;
    }

  }
</style>

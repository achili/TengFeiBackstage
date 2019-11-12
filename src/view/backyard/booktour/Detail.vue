<template>
  <div class="by-bookTour-detail animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <div title="返回" class="pull-left mt5 cursor-pointer"  @click.stop.prevent="$router.go(-1)">
          <span><img width="30" height="30" src="../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left ">
          <span class="ml15 cell-max-title">预约参观详情</span>
        </div>
      </div>
    </div>

    <div class="row pt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">

            <div class="row">
              <div class="col-md-3">空间地点</div>
              <div class="col-md-9">{{bookTour.address}}</div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">状态</div>
              <div class="col-md-9">
                <span class="f14 cell-danger" v-if="bookTour.status === 'NOT_RECEIVE'">未接待</span>
                <span v-else class="f14 cell-normal">已接待</span>
              </div>
            </div>

            <div class="row pt15" >
              <div class="col-md-3 mt5">姓名</div>
              <div class="col-md-9">
                <a class="f14 cell-blue" @click.stop.prevent="$router.push({path:'/by/user/edit',query:{uuid:siteReservation.creator.uuid}})">{{bookTour.name}}</a>
              </div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">电话</div>
              <div class="col-md-9">
                {{bookTour.phone}}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">参观时间</div>
              <div class="col-md-9">
                {{bookTour.startTime | simpleDateTime }}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">我感兴趣的是</div>
              <div class="col-md-9">
                <span v-for="(n,index) in bookTour.characteristic" :key="index">{{ n }}&nbsp;&nbsp;</span>
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">备注</div>
              <div class="col-md-9">
                {{bookTour.remarks}}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">所属空间</div>
              <div class="col-md-9">
                {{bookTour.spaceRegional.name}}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NbSlidePanel from "../../../components/NbSlidePanel";
  import NbLoadingFrame from "../../../components/NbLoadingFrame";
  import BookTour from "../../../common/model/booktour/BookTour";

  export default {
    data () {
      return {
        bookTour: new BookTour(),
        StatusMap: BookTour.prototype.StatusMap
      }
    },
    computed: {},
    components: {
      NbSlidePanel,
      NbLoadingFrame
    },
    methods: {
    },
    mounted(){
      this.bookTour.uuid = this.$route.query.uuid;
      this.bookTour.httpDetail();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .by-bookTour-detail {
    padding: 20px 120px 0 30px;
    font-size: 14px;
    color: #555555;
  }
</style>

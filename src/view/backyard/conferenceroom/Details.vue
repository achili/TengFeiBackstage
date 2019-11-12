<template>
  <div class="by-room-detail animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <div title="返回" class="pull-left mt5 cursor-pointer" @click.stop.prevent="$router.go(-1)">
          <span><img width="30" height="30" src="../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left ">
          <span class="ml15 cell-max-title" >会议室详情</span>
        </div>
      </div>
    </div>

    <div class="row pt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">

            <div class="row">
              <div class="col-md-3">会议室名称</div>
              <div class="col-md-9">{{conferenceRoom.name}}</div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">详情介绍</div>
              <div class="col-md-9">{{conferenceRoom.introduce}}</div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">详情地址</div>
              <div class="col-md-9">{{conferenceRoom.address}}</div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">每小时价格</div>
              <div class="col-md-9">{{conferenceRoom.price}}</div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">每小时价格(会员)</div>
              <div class="col-md-9">{{conferenceRoom.vipPrice}}</div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">可容纳人数</div>
              <div class="col-md-9">
                <span v-for="(c,index) in conferenceRoom.getCapacityMap()" :key="index">
                  <span v-if="c.val === conferenceRoom.capacity">{{c.name}}</span>
                </span>
              </div>
            </div>

            <div class="row pt15" >
              <div class="col-md-3 mt5">设施及服务</div>
              <div class="col-md-9">
                <div class="mt5" v-for="(s,index) in conferenceRoom.services" :key="index">
                  <div v-for="(c,indexC) in conferenceRoom.getServicesMap()" :key="indexC">
                   <span  v-if="s === c.val">{{index + 1}}.{{c.name}}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">图片</div>
              <div class="col-md-9">
                 <span class="mr18" v-for="url in conferenceRoom.posters" :key="url.uuid">
                    <img class="posters-image" :src="url.getUrlBySize(122,122)"/>
                 </span>
              </div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">所属空间</div>
              <div class="col-md-9">
                 {{conferenceRoom.spaceRegional.name}}
              </div>
            </div>

            </div>
            <div class="row pr50 pb30">
              <button title="编辑" class="btn btn-theme pull-right" style="width: 122px;height: 46px;"
                      @click.stop.prevent="$router.push({path:'/by/conferenceRoom/edit',query:{uuid:conferenceRoom.uuid}})">
                编辑
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import ConferenceRoom from "../../../common/model/conferenceroom/ConferenceRoom";
  import NbLoadingFrame from "../../../components/NbLoadingFrame";

  export default {
    data () {
      return {
        conferenceRoom: new ConferenceRoom()
      }
    },
    components: {
      NbLoadingFrame
    },
    computed: {},
    watch: {},
    methods: {},
    mounted(){
      this.conferenceRoom.uuid = this.$route.query.uuid;
      this.conferenceRoom.httpDetail();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .by-room-detail{
    padding: 20px 120px 0 30px;
    font-size: 14px;
    color: #555555;

  }
</style>

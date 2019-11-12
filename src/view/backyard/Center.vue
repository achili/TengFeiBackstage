<template>
  <div class="backyard-index">
    <div class="row">
      <div class="col-md-12">

        <div class="row mt20">
          <div class="f26 ml40">
            数据统计
          </div>
          <div class="f14 mr20 pull-right">
            <div  @click="change">
              <span class="mr20 f14" v-for="(option,index) in list" :key="index" @click.stop.prevent="change">
                <NbRadio :value="option.uuid" :val="option.uuid" v-model="spaceRegional.uuid"  name="status" @click.stop.prevent="change"></NbRadio>
                <span class="f14 " style="color: #999999;">{{option.name}}</span>
              </span>
            </div>
          </div>
        </div>

        <div class="row cir ph20" style="max-width: 1415px;">
          <div class="col-lg-6 col-sm-12 col-xs-12 p20">
            <div class="cir-box circle-block" style="max-width: 650px">
              <Circular :indexDeveloper="indexDeveloper" :spaceRegional="spaceRegional" :type="spaceOffice" ></Circular>
            </div>
          </div>
          <div class="col-lg-6 col-sm-12 col-xs-12 p20">
            <div class="cir-box-right circle-bolck" style="max-width: 650px">
              <Circular :indexDeveloper="indexDeveloper" :spaceRegional="spaceRegional" :type="spaceSeat"></Circular>
            </div>
          </div>
        </div>

      <div class="row mt40 mh25" style="max-width: 1338px;">
       <div>

         <div class="col-xs-6 col-sm-6 col-lg-3 " style="background-color: #ffffff;">
           <div class="card-box" style="padding-bottom: 30px;" @click.stop.prevent="$router.push('/by/privilege/list')">
             <div class="service" >
               <div style="border-right: 1px solid white;height: 100px;"></div>
               <div class="card-service">
                 <div class="card-service-out">
                   <div class="card-service-icon">
                       <span>
                        <img class="logo" style="width: 31px;height: 31px;" src="../../assets/img/service.png"/>
                       </span>
                   </div>
                 </div>
               </div>
               <div align="center" style="padding-top: 20px;">
                 <div style="font-size: 28px;color: #555555;">{{indexDeveloper.privilegeCorporateCount}}</div>
                 <div class="f16" style="color: #666666;">企业服务数</div>
               </div>
               <div style="border-right: 1px solid #e4e4e4;height: 100px;"></div>
             </div>
           </div>
         </div>

         <div class="col-xs-6 col-sm-6 col-lg-3" style="background-color: #ffffff;">
           <div class="card-box" style="padding-bottom: 30px;" @click.stop.prevent="$router.push('/by/user/list')">
             <div class="service-user">
               <div style="border-right: 1px solid white;height: 100px;"></div>
               <div class="card-user">
                 <div class="card-user-out">
                   <div class="card-user-icon">
                     <img class="logo" style="width: 27px;height: 28px;" src="../../assets/img/user.png"/>
                   </div>
                 </div>
               </div>
               <div align="center" style="padding-top: 20px;">
                 <div style="font-size: 28px;color: #555555;">{{indexDeveloper.userCount}}</div>
                 <div class="f16" style="color: #666666;">用户人数</div>
               </div>
               <div style="border-right: 1px solid #e4e4e4;height: 100px;"></div>
             </div>
           </div>
         </div>

         <div class="col-xs-6 col-sm-6 col-lg-3" style="background-color: #ffffff;">
           <div class="card-box" style="padding-bottom: 30px;" @click.stop.prevent="$router.push('/by/space/seat/list')">
             <div class="service-seat">
               <div style="border-right: 1px solid white;height: 100px;"></div>
               <div class="card-station">
                 <div class="card-station-out">
                   <div class="card-station-icon">
                     <img class="logo" style="width: 27px;height: 27px;" src="../../assets/img/seat.png"/>
                   </div>
                 </div>
               </div>
               <div align="center" style="padding-top: 20px;">
                 <div style="font-size: 28px;color: #555555;">{{indexDeveloper.mobileStationCount}}</div>
                 <div class="f16" style="color: #666666;">移动办公桌数</div>
               </div>
               <div style="border-right: 1px solid #e4e4e4;height: 100px;"></div>
             </div>
           </div>
         </div>

         <div class="col-xs-6 col-sm-6 col-lg-3" style="background-color: #ffffff;">
           <div class="card-box" style="padding-bottom: 30px;" @click.stop.prevent="$router.push('/by/space/office/list')">
             <div class="service-office">
               <div style="border-right: 1px solid white;height: 100px;"></div>
               <div class="card-office">
                 <div class="card-office-out">
                   <div class="card-office-icon">
                     <img class="logo" style="width: 29px;height: 28px;" src="../../assets/img/office.png"/>
                   </div>
                 </div>
               </div>
               <div align="center" style="padding-top: 20px;">
                 <div style="font-size: 28px;color: #555555;">{{indexDeveloper.independentSpaceCount}}</div>
                 <div class="f16" style="color: #666666;">独立办公室数</div>
               </div>
               <div style="border-right: 0px solid #e4e4e4;height: 100px;"></div>
             </div>
           </div>
         </div>


       </div>
      </div>

    </div>
  </div>
</div>
</template>
<script>

  import CommunityNewsCell from "./index/CommunityNewsCell";
  import CommunityEventsCell from "./index/CommunityEventsCell";
  import CommunityNews from "../../common/model/community/CommunityNews";
  import CommunityEvents from "../../common/model/community/CommunityEvents";
  import Pager from "../../common/model/_base/Pager";
  import IndexDeveloper from "../../common/model/_index/IndexDeveloper";
  import NbTabs from "../../components/NbTabs";
  import NbTabPanel from "../../components/NbTabPanel";
  import NbPager from "../../components/NbPager";
  import CommunityPostsCell from "./index/CommunityPostsCell";
  import CommunityPosts from "../../common/model/community/CommunityPosts";
  import Circular from '../../components/statistics/Circular'
  import SpaceRegional from "../../common/model/space/SpaceRegional";
  import NbRadio from "../../components/NbRadio";


  export default {

    data () {
      return {
        user: this.$store.state.user,
        communityNewsPager: new Pager(CommunityNews, 3),
        communityEventsPager: new Pager(CommunityEvents, 3),
        communityPostsPager: new Pager(CommunityPosts, 3),
        indexDeveloper: new IndexDeveloper(),
        interval: null,
        spaceOffice:'spaceOffice',
        spaceSeat:'spaceSeat',
        spaceRegional: new SpaceRegional(),
        list:null,
        spaceRegionalActive: new SpaceRegional()
      }
    },
    components: {
      CommunityPostsCell,
      CommunityEventsCell,
      CommunityNewsCell,
      NbPager,
      NbTabs,
      NbTabPanel,
      Circular,
      NbRadio
    },
    watch:{
      "spaceRegional.uuid"(){
        this.change();
      }
    },
    methods: {
      refreshArticle(){
        this.communityNewsPager.setFilterValue('deleted', false);
        this.communityNewsPager.setFilterValue("orderCreateTime", "DESC");
        this.communityNewsPager.httpFastPage();
      },
      refreshActivity(){
        this.communityEventsPager.setFilterValue('deleted', false);
        this.communityEventsPager.setFilterValue('overdue', false);
        this.communityEventsPager.setFilterValue("orderCreateTime", "DESC");
        this.communityEventsPager.httpFastPage();
      },
      refreshPosts(){
        this.communityPostsPager.setFilterValue('status', 'OK');
        this.communityPostsPager.setFilterValue("orderCreateTime", "DESC");
        this.communityPostsPager.httpFastPage();
      },
      refresh() {
        this.refreshArticle();
        this.refreshActivity();
        this.refreshPosts();
      },
      change(){
        let that = this;
        this.indexDeveloper.httpManage(this.spaceRegional.uuid,function () {});

      }
    },
    mounted(){

      let that = this;
      this.spaceRegionalActive.httpList(function (res) {
        that.list = res.data.data.list;
      })

      // this.refresh();
      this.indexDeveloper.httpManage(this.spaceRegional.uuid,function () {});
        //每隔10 秒刷新一次
        this.interval = setInterval( function () {
          that.indexDeveloper.httpManage(that.spaceRegional.uuid,function () {
          })
        }, 10000);

    },
    beforeDestroy(){
      if(this.interval) {
        clearInterval(this.interval)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .backyard-index {
    width: 100%;
    height: 100%;
    // 1
    .service {
      padding-top: 47px;
      display: flex;
      justify-content: space-between;
      .card-service {
        color: #ffffff;
        cursor: pointer;
        min-width: 90px;
        width: 90px;
        height: 90px;
        background-color: rgba(255, 220, 111, 0.2);
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        .card-service-out {
          padding: 10px 10px 10px 10px;
          .card-service-icon {
            padding: 20px;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background-color: #ffdc6f;
            position: absolute;
          }
        }
      }
    }
    // 2
    .service-user {
      padding-top: 47px;
      display: flex;
      justify-content: space-between;
      .card-user {
        color: #ffffff;
        cursor: pointer;
        width: 90px;
        min-width: 90px;
        height: 90px;
        background-color: rgba(140, 224, 255, 0.2);
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        .card-user-out {
          padding: 10px;
          .card-user-icon {
            padding: 21px;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background-color: #8ce0ff;
            position: absolute;
          }
        }
      }
    }
    // 3
    .service-seat {
      padding-top: 47px;
      display: flex;
      justify-content: space-between;
      .card-station {
        color: #ffffff;
        cursor: pointer;
        width: 90px;
        min-width: 90px;
        height: 90px;
        background-color: rgba(255, 184, 193, 0.2);
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        .card-station-out {
          padding: 10px;
          .card-station-icon {
            padding: 21px;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background-color: #ffb8c1;
            position: absolute;
          }
        }
      }
    }
    // 4
    .service-office{
      padding-top: 47px;
      display: flex;
      justify-content: space-between;
      .card-office{
        color: #ffffff;
        cursor:pointer;
        min-width: 90px;
        width: 90px;
        height: 90px;
        background-color: rgba(172, 240, 172, 0.2);
        border-radius:50%;
        overflow:hidden;
        position: relative;
        .card-office-out{
          padding: 10px;
          .card-office-icon{
            padding: 21px;
            width: 70px;
            height: 70px;
            border-radius:50%;
            background-color: #acf0ac;
            position: absolute;
          }
        }
      }
    }

    @media (min-width: 992px) {
      .circle-block {

      }
    }

  }
</style>

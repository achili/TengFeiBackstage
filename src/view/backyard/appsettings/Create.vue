<template>
	<div class="animated fadeIn appseting-create">
		<div class="row">
			<div class="col-xs-12">
        <div class="pull-left f24 mb40">
          <span>配置图片上传</span>
        </div>
        <div class="pull-left ml70">
          <NbLoadingButton createText="保存" :entity="appsettings.tank" :callback="save" createIcon="fa fa-save"/>
        </div>
			</div>

		</div>

    <div class="row">
      <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
        <NbTankApp :tank="tank"></NbTankApp>
      </div>
      <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12 pr10">
        <NbLoadingFrame :loading="pager.loading">
          <div class="pr10 " align="center" v-show="tank.uuid">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <div class="posiphone">
                <!--<img src="../../../assets/img/iPhone.png" alt="">-->
                <div class="posiphone-img">
                  <div class="iphoneimg" >
<!--                    <div class="top-triangle"></div>-->
<!--                    <div class="bottom-triangle"></div>-->
                    <div class="count-down">跳过{{countDown}}</div>
                    <img class="iphsize" :src="tank.getUrlBySize(489,235)" alt="">
                  </div>
                </div>
                <div class="mt20">IOS</div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <div class="posandroid">
                <div class="androidimg-img">
                <!--<img src="../../../assets/img/Android.png" alt="">-->
                 <div class="androidimg">
<!--                    <div class="top-triangle"></div>-->
<!--                    <div class="bottom-triangle"></div>-->
                    <div class="count-down" v-show="tank.uuid">跳过{{countDown}}</div>
                    <img class="andsize" :src="tank.getUrlBySize(354,206)" alt="">
                  </div>
                </div>
                <div class="mt20">Android</div>
              </div>
            </div>
          </div>
          <div v-show="!tank.uuid">无启动图片配置</div>
        </NbLoadingFrame>
      </div>
    </div>

    <div class="row mt20">
      <div class="col-md-12">
        <div style="font-size: 26px;color: #666666;">历史图片</div>
      </div>
    </div>

    <div class="mt20">
      <div>
        <NbLoadingFrame :loading="pager.loading">
          <div class="confect" align="center">
            <div class="confect-cell" v-for="page in pager.data" :key="page.uuid" v-if="page.uuid !== 'd4bc8d8d-5d40-466c-9b0a-bd3b6d5218b8'&& page.uuid !== 'db4cdcc1-32b6-494f-a50a-12a16f642a6f' && page.uuid !== 'c68984c2-a3b2-45a5-b425-578d0136218a'">
              <div>
                <div class="photo-frame">
                  <div class="support"></div>
                  <div class="img">
                    <div class="del" title="删除" @click.stop.prevent="del(page)">x</div>
                    <img :src="page.tank.getUrlBySize(400,280)" alt="" class="img-cell" @click="createSetting(page)">
                  </div>
                </div>
                <div class="f18 mt10 mb50" style="color: #888888;">
                  {{page.createTime | simpleDateTime}}
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
  import NbTankApp from "../../../components/NbTankApp";
  import NbLoadingButton from "../../../components/NbLoadingButton";
  import Appsettings from "../../../common/model/appsettings/appsettings";
  import NbForm from "../../../components/NbForm";
  import NbLoadingFrame from "../../../components/NbLoadingFrame";
  import {Notification, MessageBox} from 'element-ui'
  import Pager from "../../../common/model/_base/Pager";
  import Tank from "../../../common/model/tank/Tank";
  import NbSelectionFilter from "../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../common/util/Utils";


  export default {
		data () {
			return {
        countDown:3,
        appsettings: new Appsettings(),
        pager:new Pager(Appsettings, 20),
        tank: new Tank(),
        FeatureType,
        user: this.$store.state.user,
        spaces: this.$store.state.spaces,
        spaceUserIdKey: "the_bridge_space_"
      }
		},
		components: {
      NbSlidePanel,
      NbForm,
      NbLoadingFrame,
      NbTankApp,
      NbLoadingButton,
      NbSelectionFilter
    },
		computed: {},
		watch: {},
		methods: {
      save(){
        let that = this;
        console.log(this.tank);
        if (!this.tank.uuid) {
          Notification.error({
            message: '请先选择文件!'
          });
          return false;
        }
        let form = {
          tank: this.tank.uuid,
          spaceRegional:this.pager.getFilter('spaceRegionalUuid').value
        };
        this.appsettings.uuid = null;
        this.appsettings.httpSave(form, function (response) {
          Notification.success({
            message: '提交成功!'
          });
          that.refSetting()
        });
      },
      del(appseting) {
        let that = this;
        MessageBox.confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
            appseting.httpDel(function () {
              Notification.success({
                message: '成功删除!'
              });
              that.refSetting();
            });
          }
        )
      },
      search(){
        this.pager.page = 0;
        this.refSetting()
      },
      refSetting () {
        let that = this;

        this.pager.setFilterValue("orderCreateTime","DESC")
        this.pager.httpFastPage(function () {
          that.appsettings.uuid = null;
          console.log(that.pager.data[0])
          that.appsettings.render(that.pager.data[0]);
          that.tank = that.appsettings.tank;
        });
      },
      createSetting(e){
       console.log(e)
        this.tank = e.tank;
        this.appsettings.uuid = null;
      }
    },
		mounted(){
		  let that = this;
      this.spaces.forEach(space=>{
        if(that.user.hasPermissionSpace(FeatureType.ADMIN,space.uuid)){
          that.pager.setFilterValue("spaceRegionalUuid",readLocalStorage(that.spaceUserIdKey + that.user.uuid))
        }
      });
      this.refSetting();

    }
	}
</script>
<style lang="less" rel="stylesheet/less">
  .appseting-create {
    padding: 31px 0 0 30px;
    .confect{
      height: 100%;
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
    }
    .posiphone{
      position: relative;
      width:300px;
      height: 650px;
      display: inline-block;
    }
    .posiphone-img{
      position: relative;
      width:280px;
      height: 560px;
      display: inline-block;
      background-color: #ffffff;
      border-radius:30px;
      box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.06);
    }
    .posandroid{
      position: relative;
      width:260px;
      height: 590px;
      display: inline-block;
    }

    .iphoneimg{
      position: absolute;
      z-index: 99;
      top: 10px;
      left: 10px;
      border-radius: 30px;
      /*border-top-right-radius:5px;*/
      /*border-top-left-radius:4px;*/
      /*border-bottom-right-radius:27px;*/
      /*border-bottom-left-radius:27px;*/
      overflow: hidden
    }
    .androidimg{
      position: absolute;
      z-index: 99;
      top: 40px;
      left: 13px;
    }
    .androidimg-img{
      position: relative;
      width:260px;
      height: 560px;
      display: inline-block;
      background-color: #ffffff;
      border-radius:30px;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.06);
    }
    .andsize{
      width: 232px;
      height: 490px;
    }
    .iphsize{
      width: 260px;
      height: 541px;
    }
    .top-triangle {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: url("../../../assets/img/splash-top-mask.png") 100% 0;
      background-size: cover;
      height: 243px;
      width: 100%;
    }
    .bottom-triangle {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: url("../../../assets/img/splash-bottom-mask.png") 0 100%;
      background-size: cover;
      height: 200px;
    }
    .count-down {
      font-size: 10px;
      color: #eeeeee;
      padding: 5px;
      border-radius: 4px;
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(200,200,200,.5);
    }
    .confect-cell {
      flex: 0 0 25%;
    }
    .photo-frame {
      width: 270px;
      overflow: hidden;
      position: relative;
      margin: 0 10px 0 0;
      .support {
        margin-top: 100%;
      }
      .img {
        cursor:pointer;
        position:absolute;
        top:0;
        right: 0;
        left: 0;
        bottom: 0;
        max-width: 270px;
        .del{
          font-size: 20px;
          width: 32px;
          height: 32px;
          color: #eeeeee;
          position:absolute;
          top:0;
          right: 0;
          background: rgba(200,200,200,.5);
        }

      }
      /*img{*/
        /*width: 283px;*/
        /*position:relative;*/
      /*}*/


    }

  }

</style>

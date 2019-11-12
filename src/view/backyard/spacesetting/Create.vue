<template>
  <div class="animated fadeIn space-setting">

    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left f24">
          <span>系统设置列表</span>
        </div>
        <!--<div class="pull-right ">-->
          <!--<select class="form-control" v-model="spaceRegional" >-->
            <!--<option v-for="(spaceRegional,index) in list" v-if="user.hasPermissionSpace(FeatureType.ADMIN,spaceRegional.uuid)" :value="spaceRegional" :key="index">{{spaceRegional.name}}</option>-->
          <!--</select>-->
        <!--</div>-->
      </div>
    </div>

    <div class="row mt20">
      <div class="col-md-12">
        <div class="segmenting-line"></div>
      </div>
    </div>

    <div class="row mt35 ml10">
      <div class="col-md-12">
        <div class="cell-subtitle"> 合同字段设置 </div>
      </div>
    </div>

    <div class="row mt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;padding-left: 8px;">
          <div class="mail-body" style="border: 0;">
            <div class="row">
              <div class="col-md-12">

                <div class="row mt10" >
                  <label class="col-md-3 control-label mt5">所属空间：</label>
                  <div class="col-md-9"></div>
                  <div class="col-md-9">
                    {{spaceSetting.spaceRegional.name}}
                  </div>
                </div>

                <div class="row mt10" >
                  <label class="col-md-3 control-label mt5">甲方：</label>
                  <div class="col-md-9"></div>
                  <div class="col-md-9">
                    {{spaceSetting.contractParty}}
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5">法人或授权人：</label>
                  <div class="col-md-9">
                    {{spaceSetting.legalPerson}}
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5">法人或授权人电话：</label>
                  <div class="col-md-9">
                    {{spaceSetting.legalPhone}}
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5">开户银行：</label>
                  <div class="col-md-9">
                    {{spaceSetting.accountBank}}
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5">银行户名：</label>
                  <div class="col-md-9">
                    {{spaceSetting.accountBankName}}
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5">开户银行账户：</label>
                  <div class="col-md-9">
                    {{spaceSetting.openAccountBank}}
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5">开票信息-甲方纳税人识别号：</label>
                  <div class="col-md-9">
                    {{spaceSetting.partNumber}}
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5">开票信息-甲方地址：</label>
                  <div class="col-md-9">
                    {{spaceSetting.partAddress}}
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5">开票信息-甲方电话：</label>
                  <div class="col-md-9">
                    {{spaceSetting.partPhone}}
                  </div>
                </div>

                <!--<div class="row mt10">-->
                  <!--<label class="col-md-3 control-label mt5">签约地点：</label>-->
                  <!--<div class="col-md-9">-->
                    <!--{{spaceSetting.signArea}}-->
                  <!--</div>-->
                <!--</div>-->

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5">联系人：</label>
                  <div class="col-md-9">
                    {{spaceSetting.financeContact}}
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5">联系电话：</label>
                  <div class="col-md-9">
                    {{spaceSetting.financeContactPhone}}
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5">地址：</label>
                  <div class="col-md-9">
                    {{spaceSetting.financeArea}}
                  </div>
                </div>

                <div class="alert alert-danger mt20" v-show="spaceSetting.errorMessage">
                  {{spaceSetting.errorMessage}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt20 ml10">
      <div class="col-md-12">
        <div class="cell-subtitle"> APP前台空间价格设置</div>
      </div>
    </div>

    <div class="row mt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;padding-left: 8px;">
          <div class="mail-body" style="border: 0;">
            <div class="row mt10">
              <label class="col-md-3 control-label mt5">移动办公桌价格(单位: 元/月)：</label>
              <div class="col-md-9">
                {{spaceSetting.stationPrice}}
              </div>
            </div>
            <div class="row mt10">
              <label class="col-md-3 control-label mt5">独立办公室价格(单位: 元/月)：</label>
              <div class="col-md-9">
                {{spaceSetting.spacePrice}}
              </div>
            </div>
            <div class="row mt10">
              <label class="col-md-3 control-label mt5">快速入驻办公桌价格(单位: 元/天)：</label>
              <div class="col-md-9">
                {{spaceSetting.onePrice}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt20 ml10">
      <div class="col-md-12">
        <div class="cell-subtitle"> 小桥联系人信息</div>
      </div>
    </div>

    <div class="row mt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;padding-left: 8px;">
          <div class="mail-body" style="border: 0;" >
              <div class="row mt10">
                <label class="col-md-3 control-label mt5">小桥联系人：</label>
                <div class="col-md-9">
                  {{spaceSetting.xiaoQiaoUser.name}}
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5">小桥联系人电话：</label>
                <div class="col-md-9">
                  {{spaceSetting.xiaoQiaoPhone}}
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>

    <div class="row mt20 ml10">
      <div class="col-md-12">
        <div class="cell-subtitle"> APP版本更新信息</div>
      </div>
    </div>

    <div class="row mt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;padding-left: 8px;">
          <div class="mail-body" style="border: 0;" >
            <div class="row mt10">
              <label class="col-md-3 control-label mt5">版本号：</label>
              <div class="col-md-9">
                {{appDownloadSetting.versionNumber}}
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5">内核版本号：</label>
              <div class="col-md-9">
                {{appDownloadSetting.kernelVersion}}
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5">Android版本文件：</label>
              <div class="col-md-9">
                <NbTank :tank="appDownloadSetting.androidFile" :edit="false"/>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5">IOS版本URL：</label>
              <div class="col-md-9">
                {{appDownloadSetting.iosUrl}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div class="row">
      <div class="col-md-12">
        <div class="pull-right">
          <button style="width: 122px;height: 46px;" class="btn f16 btn-theme" @click.stop.prevent="$router.push({path:'/by/spaceSetting/edit',query:{uuid:spaceSetting.uuid}})">
            <span>编辑系统设置</span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import NbSlidePanel from "../../../components/NbSlidePanel";
  import SpaceSetting from "../../../common/model/spacesetting/SpaceSetting";
  import SpaceRegional from "../../../common/model/space/SpaceRegional";
  import {FeatureType} from "../../../common/model/core/feature/FeatureType";
  import NbTank from "../../../components/NbTank";
  import {readLocalStorage} from "../../../common/util/Utils";

  export default {
    data () {
      return {
        spaceSetting: new SpaceSetting(),
        appDownloadSetting: new SpaceSetting(),
        spaceRegionalActive: new SpaceRegional(),
        spaceRegional: new SpaceRegional(),
        list:null,
        FeatureType,
        user: this.$store.state.user,
        spaceUserIdKey: "the_bridge_space_"

      }
    },
    components: {
      NbSlidePanel,
      NbTank
    },
    computed: {},
    watch: {
      "spaceRegional.uuid"(newVal,oldVal){
        this.change();
      }
    },
    methods: {
      change(){
        let that = this;
        // 杭州空间
        if(this.spaceRegional.uuid === 'fff031b9-c3f4-4c53-ae9f-64d0d9ee83af'){
          this.spaceSetting.uuid = "d4bc8d8d-5d40-466c-9b0a-bd3b6d5218b8";
          this.spaceSetting.httpDetail();
        }
        // 苏州空间
        if(this.spaceRegional.uuid === '10fa0dd4-a4ab-4a4e-b265-c755a2b68a6c'){
          this.spaceSetting.uuid = "db4cdcc1-32b6-494f-a50a-12a16f642a6f";
          this.spaceSetting.httpDetail();
        }
        // 大连空间
        if(this.spaceRegional.uuid === 'cbfe0f31-284f-4eff-b66c-a3e68c41cf03'){
          this.spaceSetting.uuid = "c68984c2-a3b2-45a5-b425-578d0136218a";
          this.spaceSetting.httpDetail();
        }
      }
    },
    mounted(){
      let that = this;
      this.spaceSetting.uuid = this.$route.query.uuid;
      let space = new SpaceRegional();
      if(this.spaceSetting.uuid){
        this.spaceSetting.httpDetail(function (res) {
          that.spaceRegionalActive.httpPager(function (res) {
            that.list = res.data.data.data;
            that.list.forEach(ddd=>{
              if(that.spaceSetting.spaceRegional.uuid === ddd.uuid){
                space = ddd;
              }
              that.spaceRegional.render(space)
            })
          });
        });
      }else{
        this.spaceRegionalActive.httpPager(function (res) {
          that.list = res.data.data.data;
          that.list.forEach(ddd=>{
            if(that.user.hasPermissionSpace(FeatureType.ADMIN,ddd.uuid)){
              if(readLocalStorage(that.spaceUserIdKey + that.user.uuid) != null){
                if(ddd.uuid === readLocalStorage(that.spaceUserIdKey + that.user.uuid)){
                  space = ddd;
                }
              }else{
                space = ddd;
              }
            }
            that.spaceRegional.render(space)
          })

        });
      }

      // this.spaceSetting.uuid = "d4bc8d8d-5d40-466c-9b0a-bd3b6d5218b8";
      // this.spaceSetting.httpDetail(function () {
      // });
      this.appDownloadSetting.uuid = "dfde87bb-5b9b-4497-9c26-2c8165f830df";
      this.appDownloadSetting.httpDetail();

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .space-setting{
    padding: 20px 30px 0 30px;
  }
</style>

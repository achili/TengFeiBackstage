<template>
  <div class="by-userRole-detail animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <div title="返回" class="pull-left mt5 cursor-pointer" @click.stop.prevent="$router.go(-1)">
          <span><img class="logo" width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left ">
          <span class="ml15 cell-max-title">角色详情</span>
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

    <div class="row pt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">

            <div class="row">
              <div class="col-md-3">角色名称</div>
              <div class="col-md-9">{{userRole.name}}</div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">详情</div>
              <div class="col-md-9">
                {{userRole.description}}
              </div>
            </div>

            <div class="row pt15" >
              <div class="col-md-3 mt5">简介</div>
              <div class="col-md-9">
                {{userRole.special ? "系统内置角色" : "自定义角色"}}
              </div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">创建时间</div>
              <div class="col-md-9">
                {{userRole.createTime | simpleDateTime}}
              </div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">所属空间</div>
              <div class="col-md-9">
                {{userRole.spaceRegional.name}}
              </div>
            </div>

            <div class="row" style="text-align: right;padding: 0 35px 10px 0;">
              <button title="编辑" class="btn btn-success" style="width: 122px;height: 46px;background-color: #00b5e2;border: solid 1px #e2e2e2;"
                      @click.stop.prevent="$router.push({path:'/by/user/role/edit',query:{uuid:userRole.uuid}})">
                编辑
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="row mt20 ml20">
      <div class="col-md-12">
        <div class="cell-subtitle">角色权限 </div>
      </div>
    </div>

    <div class="row" style="padding-top: 30px;">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <span class="bold" style="color: #ff9a9a;font-size: 16px;">注意</span>
            <ol class="pl15 mt25" style="font-size: 14px;color: #555555;">
              <li class="mt25">公共接口开放给所有用户，包括游客。</li>
              <li class="mt25">系统内置角色权限不可修改。</li>
              <li class="mt25">管理员只能分配自己已有的权限。</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <label>
          <select class="form-control" v-model="spaceRegional">
            <option v-for="(spaceRegional,index) in list"  :value="spaceRegional" :key="index">{{spaceRegional.name}}</option>
          </select>
        </label>
      </div>
    </div>

    <div class="row mt10" v-for="module in modules" :key="module.index" >

        <div class="row mt10">
          <div class="col-md-12 ml40">
            <span style="color: #888888;font-size: 16px;">{{module}}</span>
          </div>
        </div>

        <div class="row mt20 ml15 mr15" style="background-color: #ffffff;">
          <div class="col-md-12 mt18">
            <div style="height:80px;background-color: #ffffff;">
              <div class="" v-for="accesses in userRole.accesses" :key="accesses.index" v-if="accesses.featureType.module.name === module">
                <div class="pull-left pr20 pt20 pb5" v-if="accesses.spaceRegional.uuid === spaceRegional.uuid">

                  <div v-if="accesses.featureType.module.value !== 'ADMIN'"  >
                    <div v-if="show">
                      <NbSwitcher v-model="accesses.newActive" size="sm" :disabled="sss(accesses)" />
                      <span>
                        {{accesses.featureType.name}}
                      </span>
                    </div>
                    <div v-if="showAdmin">
                      <NbSwitcher v-model="accesses.newActive" size="sm" :disabled="accesses.featureType.module.value === 'PUBLIC' || userRole.special" />
                      <span>
                        {{accesses.featureType.name}}
                      </span>
                    </div>
                  </div>
                  <div v-else>
                    <NbSwitcher v-model="accesses.newActive" size="sm"  :disabled="disable(accesses,userRole.special)" />
                    <span>
                      {{accesses.featureType.name}}
                    </span>
                  </div>

                  <!--accesses.featureType.module.value === 'PUBLIC' || userRole.special-->

                </div>
              </div>
            </div>
          </div>
        </div>

    </div>

    <div class="row mt20" style="margin-right: 33px;">
      <NbLoadingButton  saveText="提交" :entity="userRole" :callback="savePermissions"/>
    </div>

  </div>
</template>
<style>

</style>
<script>
  import {Notification} from 'element-ui';
  import UserRole from  "../../../../common/model/user/role/UserRole"
  import NbSlidePanel from "../../../../components/NbSlidePanel.vue";
  import NbSwitcher from "../../../../components/NbSwitcher.vue";
  import NbLoadingButton from "../../../../components/NbLoadingButton";
  import SpaceRegional from "../../../../common/model/space/SpaceRegional";
  import NbExpanding from "../../../../components/NbExpanding.vue";

  export default{
    data(){
      return {
        userRole: new UserRole(),
        user: this.$store.state.user,
        modules: [],
        spaceRegionalActive: new SpaceRegional(),
        spaceRegional: new SpaceRegional(),
        list:null,
        show:false,
        showAdmin: true
      }
    },
    components: {
      NbSlidePanel,
      NbSwitcher,
      NbLoadingButton,
      NbExpanding
    },
    watch:{

    },
    methods: {
      sss(accesses){
        if((accesses.featureType.value !== 'ADMIN' || accesses.featureType.value !== 'USER_ROLE_MANAGE')){
          if(accesses.featureType.module.value !== 'PUBLIC'){
            accesses.newActive = false;
          }
          return true;
        }
      },
      disable(accesses,special){
        if(accesses.featureType.module.value === 'PUBLIC' || special){
          return true;
        }

        if(accesses.featureType.value === 'ADMIN' && accesses.newActive){
          this.showAdmin = true;
          this.show = false;
        }

        if(accesses.featureType.value === 'ADMIN' && !accesses.newActive){
          this.showAdmin = false;
          this.show = true;
        }

      },
      fetchDetail(){
        let that = this;
        this.userRole.uuid = this.$store.state.route.query.uuid;
        if (this.userRole.uuid) {
          this.userRole.httpDetail(function () {
            that.selectModules();
            that.list.forEach(ddd=>{
              if(that.userRole.spaceRegional.uuid){
                if(ddd.uuid === that.userRole.spaceRegional.uuid){
                  that.spaceRegional.render(ddd);
                }
              }
              if(!that.userRole.spaceRegional.uuid){
                  ddd.uuid = 'fff031b9-c3f4-4c53-ae9f-64d0d9ee83af';
                  that.spaceRegional.render(ddd);
              }

            })
          });
        }
      },
      savePermissions(){
        let that = this;
        this.userRole.renderAccessMap();
        this.userRole.httpPermission(function (response) {
          //console.log(that.userRole);
          that.selectModules();
          Notification.success({
            message: '修改角色权限成功！'
          });
        });
      },
      selectModules() {
        let that = this;
        this.userRole.accesses.forEach(accesse => {
          if(!that.modules.contains(accesse.featureType.module.name)) {
            that.modules.push(accesse.featureType.module.name);
          }
        });
        return that.modules;
      },
      refresh(){
        let that = this;
        this.spaceRegionalActive.httpList(function (res) {
          that.list = res.data.data.list;

        });
      }
    },
    mounted(){
      this.refresh();
      this.fetchDetail();


    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .by-userRole-detail {
    padding: 30px 100px 0 30px;
    .mail-body {
      font-size: 14px;
      color: #666666;
    }
  }
</style>


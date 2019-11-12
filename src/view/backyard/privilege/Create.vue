<template>
<div class="animated fadeIn privilege-create">
  <NbLoadingFrame :loading="privilege.detailLoading">

    <div class="row">
      <div class="col-md-12">
        <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span ><img class="mr10" width="30" height="30" src="../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left">
          <span class="title" v-show="!privilege.editMode">创建福利</span>
          <span class="title" v-show="privilege.editMode">修改福利</span>
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

    <div class="row mt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <div class="row">
              <label class="col-md-3 control-label mt5 compulsory">类型</label>
              <div class="col-md-9">
                <select class="form-control" v-model="privilege.type">
                  <option v-for="(type,index) in privilege.getTypeList()" :value="type.value" :key="index">
                    {{type.name}}
                  </option>
                </select>
              </div>
            </div>

            <div class="row mt10" >
              <label class="col-md-3 control-label mt5 compulsory">所属空间</label>
              <div class="col-md-9">
                <SpaceRegionalSelecton :spaceRegional="privilege.spaceRegional" :editMode="privilege.editMode"></SpaceRegionalSelecton>
              </div>
            </div>

            <div class="row mt10" >
              <label class="col-md-3 control-label mt5 compulsory">图片</label>
              <div class="col-md-9">
                <NbTank :tank="privilege.poster"/>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">标题</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="privilege.title">
              </div>
            </div>

            <div class="row mt10" >
              <label class="col-md-3 control-label mt5 compulsory">详情介绍</label>
              <div class="col-md-9">
                <textarea  type="text" class="form-control" v-model="privilege.description"  placeholder="文字输入"></textarea>
              </div>
            </div>

            <div class="row mt10" v-show="privilege.type === privilege.Type.INDIVIDUAL">
              <label class="col-md-3 control-label mt5 compulsory">有效期</label>
              <div class="col-md-9">
                <el-date-picker  v-model="privilege.validTime" type="datetime">
                </el-date-picker>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="row mt20" v-show="privilege.type === privilege.Type.CORPORATE">
      <div class="col-md-12">
        <div class="row ml20 mb30">
          <div class="col-md-12">
            <div class="cell-subtitle">合作伙伴 </div>
          </div>
        </div>
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">


            <div class="row"  v-show="privilege.type === privilege.Type.CORPORATE">
              <div class="col-md-12">
                <div>
                  <div type="primary" v-for="(cooperativePartner,index) in privilege.cooperativePartner" :key="index">
                    <div class="row">
                      <div class="col-md-3">图片</div>
                      <div class="col-md-9">
                        <NbTank :tank="cooperativePartner.picture" />
                      </div>
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">名称</div>
                      <div class="col-md-9">
                        <input type="text" class="form-control" v-model="cooperativePartner.name"/>
                      </div>
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">副标题</div>
                      <div class="col-md-9">
                        <input type="text" class="form-control" v-model="cooperativePartner.subtitle" placeholder="建议不要超过18个字符"/>
                      </div>
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">详情</div>
                      <div class="col-md-9">
                        <input type="text" class="form-control" v-model="cooperativePartner.ddddd" placeholder="建议不要超过35个字符"/>
                      </div>
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">联系电话</div>
                      <div class="col-md-9">
                        <input type="text" class="form-control" v-model="cooperativePartner.phone"/>
                      </div>
                    </div>
                    <div class="row mt20 mr2" align="right">
                      <button class="btn btn-danger" style="width: 130px;" role="button" @click="delCooperativePartner(cooperativePartner)">
                        删除该合作伙伴
                      </button>
                    </div>
                  </div>
                  <div align="center" class="row">
                    <button class="btn btn-info" @click="addCooperativePartner">
                      增加合作伙伴
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-danger mt20" v-show="privilege.errorMessage">
      {{privilege.errorMessage}}
    </div>

    <div class="row mr20">
      <NbLoadingButton :entity="privilege" :callback="save"/>
    </div>


  </NbLoadingFrame>
</div>
</template>

<script>

  import NbLoadingFrame from "../../../components/NbLoadingFrame";
  import NbSlidePanel from "../../../components/NbSlidePanel.vue";
  import NbTank from "../../../components/NbTank";
  import NbLoadingButton from "../../../components/NbLoadingButton";
  import Privilege from "../../../common/model/privilege/Privilege";
  import {Notification,MessageBox} from 'element-ui'
  import Tank from "../../../common/model/tank/Tank";
  import SpaceRegionalSelecton from "../../../view/backyard/space/regional/Selection";

  export default {
    data(){
      return{
        privilege: new Privilege()
      }
    },
  components:{
    NbLoadingFrame,
    NbSlidePanel,
    NbTank,
    NbLoadingButton,
    SpaceRegionalSelecton
  },
  props:{ },
  watch:{

  },
  computed:{},
  methods:{
    save(){
      let that = this;
      this.privilege.httpSave(function (response) {
        Notification.success({
          message: that.privilege.editMode ? '修改成功！' : '创建成功！'
        });
        that.$router.push("/by/privilege/list");
      });
    },
    addCooperativePartner(){
     let cooperativePartner = {picture: new Tank(),name: null, subtitle: null, phone: null, ddddd: null};
      this.privilege.addCooperativePartner(cooperativePartner);
    },
    delCooperativePartner(cooperativePartner){
      let that = this;
      MessageBox.confirm('确定删除此项吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        that.privilege.delCooperativePartners(cooperativePartner);
      }, function () {
      });
    }
  },
  mounted(){
    let that = this;
    this.privilege.uuid = this.$route.query.uuid;
    if (this.privilege.uuid) {
      this.privilege.editMode = true;
      this.privilege.httpDetail(function () {

      });
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  .privilege-create {
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

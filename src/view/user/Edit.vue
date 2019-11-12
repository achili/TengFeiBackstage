<template>
  <div class="animated fadeIn backyard-user-edit">

    <div class="row ml20">
      <div class="col-md-12">
        <div title="返回" class="pull-left mt5 cursor-pointer" @click.stop.prevent="$router.go(-1)">
          <span><img class="logo" width="30" height="30" src="../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left " style="font-size: 26px;color: #666;">
          <span class="ml15 cell-max-title">编辑基本信息</span>
        </div>
      </div>
    </div>

    <div class="row mt20">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <NbForm :httpForm="httpEdit" :successCallback="save" create-text="保存" create-icon="fa fa-save"></NbForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Notification } from 'element-ui'
  import NbLoadingButton from "../../components/NbLoadingButton";
  import NbForm from "../../components/NbForm";
  import NbSlidePanel from "../../components/NbSlidePanel";
  import User from "../../common/model/user/User";
  import Pager from "../../common/model/_base/Pager";
  import UserRole from "../../common/model/user/role/UserRole";

  export default {
    name: 'create',
    data () {
      return {
        user: new User(),
        userRoles: new Pager(UserRole,50),
        httpEdit: this.$store.state.user.getHttpEdit()
      }
    },
    components: {
      NbLoadingButton,
      NbForm,
      NbSlidePanel
    },
    methods: {
      save(response) {
        Notification.success({
          message: '修改信息成功！'
        });
        if(this.$store.state.user.uuid === this.user.uuid) {
          this.user.innerLogin(response);
        }
      }
    },
    mounted () {
      let that = this;
      this.user.uuid = this.$store.state.route.query.uuid;
      if (this.user.uuid) {
        this.user.httpDetail(function () {
          let arr = [];
          that.userRoles.httpFastPage(function () {
            that.userRoles.data.forEach(userRole => {
              arr.push({
                name: userRole.name,
                val: userRole.uuid
              })
            })
          });
          that.httpEdit.getFormItem("roleUuid").rule.list = arr;
          let brr = [];
          brr.push({
            avatar: that.user.avatar,
            name: that.user.name,
            role: that.user.role.uuid,
            email: that.user.email,
            uuid: that.user.uuid,
            description: that.user.description
          });
          that.httpEdit.backFill({user: brr[0]});
        });
      } else {
        this.user = this.$store.state.user;
        this.user.httpDetail(function () {
          let arr = [];
          that.userRoles.httpFastPage(function () {
            that.userRoles.data.forEach(userRole => {
              arr.push({
                name: userRole.name,
                val: userRole.uuid
              })
            })
          });
          that.httpEdit.getFormItem("roleUuid").rule.list = arr;
          let brr = [];
          brr.push({
            avatar: that.user.avatar,
            name: that.user.name,
            role: that.user.role.uuid,
            email: that.user.email,
            uuid: that.user.uuid,
            description: that.user.description
          });
          that.httpEdit.backFill({user: brr[0]});
        });
      }

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .backyard-user-edit {
    padding: 30px 100px 0 30px;
  }
</style>

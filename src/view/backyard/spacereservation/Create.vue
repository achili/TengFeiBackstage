<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left f24">
          <span v-show="!spaceReservation.editMode">创建会议室预订</span>
          <span v-show="spaceReservation.editMode">编辑会议室预订</span>
        </div>
      </div>
    </div>

    <NbSlidePanel slot="back">
      <span slot="heading">
        <i class="fa fa-moon-o"></i>
        基本内容
      </span>
      <div slot="body">
        <div class="row">
          <div class="col-md-12">
            <NbForm :httpForm="httpCreate" :successCallback="successCallback" ></NbForm>
          </div>
        </div>
      </div>
    </NbSlidePanel>

  </div>
</template>
<script>
  import NbSlidePanel from "../../../components/NbSlidePanel";
  import NbForm from "../../../components/NbForm";
  import SpaceReservation from "../../../common/model/spacereservation/SpaceReservation";
  import {Notification} from 'element-ui'

  export default {
    data () {
      return {
        spaceReservation: new SpaceReservation(),
        httpCreate: new SpaceReservation().getHttpCreate()
      }
    },
    components: {
      NbSlidePanel,
      NbForm
    },
    computed: {},
    watch: {},
    methods: {
      successCallback(res){
        let that = this;
        Notification.success({
          message: '提交成功!'
        });
        that.$router.push("/by/SpaceReservation/list");
      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        })
      }
    },
    mounted(){
      let that = this;
      this.spaceReservation.uuid = this.$route.query.uuid;
      if(this.$route.query.uuid) {
        this.httpCreate.editMode = true;
        this.spaceReservation.httpDetail(function () {
          that.httpCreate.backFill({spaceReservation: that.spaceReservation});
        });
      }
      this.httpCreate.backFill({spaceReservation: this.spaceReservation});
    }
  }
</script>

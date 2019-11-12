<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left f24">
          <span v-show="!bookTour.editMode">创建预约参观</span>
          <span v-show="bookTour.editMode">编辑预约参观</span>
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
  import {Notification} from 'element-ui'
  import BookTour from "../../../common/model/booktour/BookTour";


  export default {
    data () {
      return {
        bookTour: new BookTour(),
        httpCreate: new BookTour().getHttpCreate()
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
        if(!this.bookTour.editMode){
          that.$router.push("/by/book/tour/list");
        }else {
          that.$router.push({path:'/by/book/tour/detail',query:{uuid: this.$route.query.uuid}});
        }
      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        });
      }
    },
    mounted(){
      let that = this;
      this.bookTour.uuid = this.$route.query.uuid;
      if (this.bookTour.uuid) {
        this.httpCreate.editMode = true;
        this.bookTour.httpDetail(function (){
          that.httpCreate.backFill({bookTour: that.bookTour});
        });
      }
      this.httpCreate.backFill({bookTour: this.bookTour});
    }
  }
</script>

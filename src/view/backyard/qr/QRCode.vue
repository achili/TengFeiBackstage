<template>
  <div class="animated fadeIn code-list">
    <div class="row">
      <div class="col-md-12 col-sm-12">
        <div class="pull-left f24">
          <span>静态二维码</span>
        </div>
        <div class="pull-right">

        </div>
      </div>
    </div>

    <div class="row mt20">
      <div class="col-md-12 col-sm-12">
        <div class="segmenting-line"></div>
      </div>
    </div>

    <div class="row mt35 pl10">
      <div id="qrCode" class="w400 h400 bg-white"></div>
    </div>

  </div>
</template>
<script>

  import NbFilter from "../../../components/filter/NbFilter";
  import NbPager from "../../../components/NbPagerNew";
  import NbPhotoFrame from "../../../components/NbPhotoFrame";
  import QRCode from 'qrcodejs2'
  import IndexDeveloper from "../../../common/model/_index/IndexDeveloper";

  export default {

    data () {
      return {
        currentUser: this.$store.state.user,
        indexDeveloper: new IndexDeveloper()

      }
    },
    components: {
      NbFilter,
      NbPager,
      NbPhotoFrame
    },
    computed: {},
    watch: {},
    methods: {
      createQrCode(){
        let that = this;
        this.indexDeveloper.httpQRCode(this.currentUser,function (res) {
          that.qrCode = new QRCode('qrCode', {
            width: 400,
            height: 400, // 高度
            text: res.data.data.data// 二维码内容
            //render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
            //background: '#f0f',
            //foreground: '#ff0'
            //correctLevel: QRCode.CorrectLevel.H;
          });

        });
      }
    },
    mounted(){
      this.createQrCode();
    }
  }

</script>
<style lang="less" rel="stylesheet/less">
  .code-list{
    padding: 20px 30px 0 30px;

  }
</style>


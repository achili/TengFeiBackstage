<template>
  <div class="item">
    <div ref="response" class="l-captcha" data-site-key="61dcf8329789e03cc897415bb0777510" :data-callback="getResponse" data-width="300px"></div>

    <button class="btn btn-primary button full-width 1-reset mb20" @click="luosimaoRefresh">ssss</button>
    <button class="btn btn-primary button full-width 1-reset mb20" @click="getResponse">wwww</button>
  </div>
</template>

<script>
  import Captcha from "../common/model/validation/ImageCaptcha";
  import $ from "jquery"

  export default {
    data () {
      return {
        captcha:new Captcha(),
        res: "",
        luosimaoResp: ""
      }
    },
    components: {},
    computed: {
      response(){
        return $(this.$refs["response"]).children("input").val();
      }
    },
    watch: {

    },
    props: {
      callback: {
        type: Function,
        required: false,
        "default": function(){}
      }
    },
    methods: {
      refresh(){
        // let that = this;
        // this.captcha.httpCaptcha();
      },
      getResponse() {

        console.log($(this.$refs["response"]).children("input").val());

      },
      luosimaoRefresh() {
        this.luosimaoResp = "";
        LUOCAPTCHA.reset();
      }
    },
    mounted(){
      //调用外部js文件
      let c = document.createElement('script');
      c.type = 'text/javascript';
      c.async = true;
      c.src = (document.location.protocol === 'https:' ? 'https://' : 'http://') + 'captcha.luosimao.com/static/dist/captcha.js?v=201707071250';
      let s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(c, s);
      // this.refresh();
    }
  }
</script>


<style lang="less" rel="stylesheet/less">

  /*.nb-image-captcha{*/
    /*.form-control{*/
      /*width:150px !important;*/
    /*}*/
  /*}*/


</style>



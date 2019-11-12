<template>
  <div>
    <div class="mb10">{{title}}</div>
    <div id="qrCode"></div>
    <div class="mt10">
      <input disabled type="text" v-model="text" placeholder="修改这个值改变二维码">

      <button class="btn btn-primary btn-sm btn-file" @click="createQrCode()" v-show="!qrCode">
        生成二维码
      </button>
      <button class="btn btn-primary btn-sm btn-file" @click="resetQrCode()" v-show="qrCode">
        重置二维码
      </button>
    </div>
  </div>
</template>
<script >
  import QRCode from 'qrcodejs2'

  export default {
    data() {
      return {
        // text: '',
        qrCode: null
      }
    },
    props:{
      text:{
        type:String,
        required: false
      },
      title:{
        type:String,
        required: false
      }
    },
    methods: {
      createQrCode(){
        this.qrCode = new QRCode('qrCode', {
          width: 200,
          height: 200, // 高度
          text: this.text// 二维码内容
          //render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          //background: '#f0f',
          //foreground: '#ff0'
          //correctLevel: QRCode.CorrectLevel.H;
        });
      },
      resetQrCode(){
        this.qrCode.makeCode(this.text);
      }
    },
    mounted() {
    }
  }

</script>

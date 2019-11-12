<template>
  <div>

    <div class="alert alert-info">
      <h3><b>NbQRCode</b></h3>
      <p>QRCode.js是用于制作QRCode的JavaScript库。QRCode.js支持在DOM中使用HTML5 Canvas和表格标签的跨浏览器。QRCode.js没有依赖关系</p>
      <p><a href="https://www.npmjs.com/package/qrcodejs2">https://www.npmjs.com/package/qrcodejs2</a></p>

      <p><b>参数：</b></p>
      <p>width：200</p>
      <p>height：200</p>
      <p>text：输入</p>
      <p>render：canvas //设置渲染方式 （有两种方式 table和canvas，默认是canvas）</p>
      <p>correctLevel：H //纠错等级</p>
      <p>background ："#ffffff" //设置背景颜色</p>
      <p>foreground："#000000"  //设置前景颜色</p>
      <p>typeNumber：-1 //计算模式</p>


    </div>
    <NbQRCodeBox title="二维码" />

  </div>
</template>
<script>
  import NbQRCodeBox from "../../../components/NbQRCodeBox";

  export default {
       data(){
         return {
           text:''
         }
       },
      components:{
        NbQRCodeBox
      },
      computed:{},
      watch:{},
      props:{},
      methods:{

      },
      mounted(){

      }

    }
</script>

<style scoped>

</style>

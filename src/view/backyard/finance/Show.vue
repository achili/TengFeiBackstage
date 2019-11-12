<template>
  <div class="arrears-detail" @click.stop="closeOwn" >
    <div class="animated bounceInUp popup " ref="scrollContent" >

      <div class="row pt30">
        <div class="col-xs-12 " >
          <div class="col-xs-1 font-cell-min" >序号 </div>
          <div class="col-xs-3 font-cell-min" >付款信息单编号 </div>
          <div class="col-xs-2 font-cell-min" >金额</div>
          <div class="col-xs-2 font-cell-min" >所属合同 </div>
          <div class="col-xs-2 font-cell-min" >欠款天数 </div>
          <div class="col-xs-2 font-cell-min" >滞纳金</div>
        </div>
      </div>

      <div class="row mt5">
        <div class="col-xs-12" >
          <div class="f10" v-for="(financePayInfo,index) in arrearsFinancePayInfo" :key="financePayInfo.uuid">
            <div class="media">
              <div class="media-body">
                <div class="col-xs-1 " >{{index + 1}}</div>
                <div class="col-xs-3 " >{{financePayInfo.no}}</div>
                <div class="col-xs-2 " >{{financePayInfo.total}}</div>
                <div class="col-xs-2 " >{{financePayInfo.contractNo}}</div>
                <div class="col-xs-2 " >{{financePayInfo.daysArrears}}</div>
                <div class="col-xs-2 " >{{financePayInfo.lateFee}}</div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

  import PerfectScrollbar from "perfect-scrollbar"

  export default {
    data() {
      return {
        popup: true,
        ps: null,
        selectUuid: ""
      }
    },
    components: {

    },
    computed: {
      scrollContent() {
        return this.$refs["scrollContent"];
      }
    },
    props:{
      closeShow:{
        type:Function
      },
      arrearsFinancePayInfo: {
        type: Array
      },
      allCheck: {
        type: Boolean
      },
      successCallback: {
        type: Function,
        required: false
      },
      errorCallback: {
        type: Function,
        required: false
      }
    },
    methods: {
      search() {
        this.messageLetterPage.page = 0;
        this.refresh()
      },
      closeOwn(){
        this.closeShow();
      },
      refresh() {


      },
      sendAll() {

      }
    },
    mounted(){
      //完美滚动条
      this.ps = new PerfectScrollbar(this.scrollContent,{
        wheelSpeed :1 ,
        wheelPropagation :true ,
        minScrollbarLength :2,
        suppressScrollX:true
      });
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .arrears-detail {
    height: 100%;
    width: 100%;
    .popup{
      position: fixed;
      z-index: 999;
      right: 10%;
      bottom: 50px;
      width: 800px;
      height: 480px;
      background-color: #ffffff;
      box-shadow: 0 3px 7px 0
      rgba(0, 10, 54, 0.16);
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      &.animated {
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
      }
    }
  }
</style>

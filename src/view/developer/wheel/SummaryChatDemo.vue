<template>
<div>
  <div class="alert alert-info">
    <h2>引用 Echarts.</h2>
    <p>封装成适合统计汇总</p>
  </div>

  <div class="row">

    <div class="col-md-12">
      <BrokenLine></BrokenLine>
    </div>

    <div class="col-md-6">
      <PieRich></PieRich>
    </div>

    <div class="col-md-6">
      <BarGraph></BarGraph>
    </div>

  </div>

  <div>
    <button class="btn btn-primary" @click="click">请求数据</button>
  </div>

  <div class="row">
    <div class="col-md-12">
      <NbAnalysisCharts :summaryAnalysisResult="result"></NbAnalysisCharts>
    </div>
  </div>

</div>
</template>

<script>

  import BrokenLine from '../../../components/charts/BrokenLine.vue'
  import PieRich from '../../../components/charts/PieRich'
  import BarGraph from '../../../components/charts/BarGraph'
  import NbAnalysisCharts from '../../../components/charts/NbAnalysisCharts'
  import SummaryAnalysisResult from "../../../common/model/summary/analysis/SummaryAnalysisResult";
  import SummaryAnalysis from "../../../common/model/summary/analysis/SummaryAnalysis";

    export default {
      data(){
        return {
         result: new SummaryAnalysisResult(),
         summaryAnalysis: new SummaryAnalysis()
        }
      },
      components:{
        BrokenLine,
        PieRich,
        BarGraph,
        NbAnalysisCharts
      },
      props:{

      },
      computed:{},
      methods:{
        click(){
          let that = this;
          this.summaryAnalysis.httpReport(function (result) {
            that.result = result;
          })
        }
      },
      mounted(){

      }
    }
</script>

<style scoped>

</style>

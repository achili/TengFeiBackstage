<template>
  <div class="animated fadeIn questionnaire-answer">

    <div class="row">
      <div class="col-md-12">
        <div  class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.push({path:'/by/questionnaire/system/detail',query:{uuid:questionnaireAnswer.questionnaireSystem.uuid}})">
          <span><img class="logo" width="30" height="30" src="../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left ml15">
          <span  style="font-size: 26px;color: #666666;">答卷详情</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <QuestionnaireSystemView :questionnaireSystem="questionnaireAnswer.content"/>
      </div>
    </div>

  </div>

</template>
<script>
  import QuestionnaireAnswer from "../../../common/model/questionnaire/QuestionnaireAnswer";
  import QuestionnaireSystemView from "./widget/QuestionnaireSystemView";
  import QuestionnaireSystem from "../../../common/model/questionnaire/QuestionnaireSystem";

  export default {
    data () {
      return {
        questionnaireAnswer : new QuestionnaireAnswer()
      }
    },
    components: {
      QuestionnaireSystemView
    },
    methods: {},
    mounted(){
      let that = this;
      this.questionnaireAnswer.uuid = this.$route.query.uuid;

      this.questionnaireAnswer.httpDetail(function () {
        that.questionnaireAnswer.setProcedure(QuestionnaireSystem.prototype.Procedure.ANSWER_DISPLAY);
      });

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .questionnaire-answer {
    padding: 20px 120px 0 30px;
  }
</style>

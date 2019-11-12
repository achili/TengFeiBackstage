<template>
  <div class="animated fadeIn questionnaire-answer">

    <div class="row">
      <div class="col-md-12">
        <div v-show="user.uuid" class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.push({path:'/by/questionnaire/system/detail',query:{uuid:questionnaireAnswer.questionnaireSystem.uuid}})">
          <span><img class="logo" width="30" height="30" src="./../../assets/img/return.png"/></span>
        </div>
        <div v-show="!user.uuid" class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo" width="30" height="30" src="../../assets/img/return.png"/></span>
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
  import QuestionnaireAnswer from "../../common/model/questionnaire/QuestionnaireAnswer";
  import QuestionnaireSystemView from "../../view/backyard/questionnaire/widget/QuestionnaireSystemView";
  import QuestionnaireSystem from "../../common/model/questionnaire/QuestionnaireSystem";

  export default {
    data () {
      return {
        user: this.$store.state.user,
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
      if(this.questionnaireAnswer.uuid ){
        this.questionnaireAnswer.httpDetail(function () {
          that.questionnaireAnswer.setProcedure(QuestionnaireSystem.prototype.Procedure.ANSWER_DISPLAY);
        });
      }


    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .questionnaire-answer {
    width: 100%;
    padding: 20px 10px 0 10px;
  }
</style>

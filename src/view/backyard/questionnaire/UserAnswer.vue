<template>
  <div class="animated fadeIn user-answer">

    <div class="row">
      <div class="col-md-12">
        <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.push({path:'/by/questionnaire/system/detail',query:{uuid:questionnaireAnswer.questionnaireSystem.uuid}})">
          <span><img class="logo" width="30" height="30" src="../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left ml15">
          <span  style="font-size: 26px;color: #666666;">回答问卷</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <QuestionnaireSystemView :questionnaireSystem="questionnaireAnswer.content"></QuestionnaireSystemView>
      </div>
    </div>

    <div class="row mb30">
      <div class="col-xs-12 mt20 text-right">
        <button class="btn btn-info" @click="answer">
          <i class="fa fa-send"></i>
          提交表单
        </button>
      </div>
    </div>

  </div>
</template>
<script>
  import {Notification} from 'element-ui';
  import QuestionnaireSystemView from "./widget/QuestionnaireSystemView";
  import QuestionnaireAnswer from "../../../common/model/questionnaire/QuestionnaireAnswer";


  export default {
    data () {
      return {
        questionnaireAnswer: new QuestionnaireAnswer()
      }
    },
    components: {
      QuestionnaireSystemView
    },
    computed: {

    },
    methods: {
      answer(){
        let that = this;
        this.questionnaireAnswer.httpSave(function (response) {
          Notification.success({
            message: "表单提交成功！"
          });

        });
      }
    },
    mounted(){
      let that = this;
      let questionnaireSystemUuid = this.$route.query.questionnaireSystemUuid;

      if(!questionnaireSystemUuid) {
        questionnaireSystemUuid = this.$route.query.uuid;
      }
      this.questionnaireAnswer.httpReady(questionnaireSystemUuid);
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .user-answer {
    width: 100%;
    padding: 20px 10px 0 10px;
  }
</style>

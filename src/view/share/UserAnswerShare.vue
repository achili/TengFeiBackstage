<template>
  <div class="animated fadeIn user-answer">

    <div class="row">
      <div class="col-xs-12">
        <div v-show="user.uuid" class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.push({path:'/by/questionnaire/system/detail',query:{uuid:questionnaireAnswer.questionnaireSystem.uuid}})">
          <span><img class="logo" width="30" height="30" src="./../../assets/img/return.png"/></span>
        </div>
        <div v-show="!user.uuid" class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo" width="30" height="30" src="../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left ml15">
          <span  style="font-size: 26px;color: #666666;">回答问卷</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
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
  import QuestionnaireSystemView from "../../view/backyard/questionnaire/widget/QuestionnaireSystemView";
  import QuestionnaireAnswer from "../../common/model/questionnaire/QuestionnaireAnswer";
  import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../common/util/Utils";


  export default {
    data () {
      return {
        user: this.$store.state.user,
        questionnaireAnswer: new QuestionnaireAnswer(),
        questionnaireAnswerKey: "the_bridge_questionnaire_key_"

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
        let questionnaireSystemUuid = this.$route.query.questionnaireSystemUuid;
        if(!questionnaireSystemUuid) {
          questionnaireSystemUuid = this.$route.query.uuid;
        }
        this.questionnaireAnswer.httpSave(function (response) {
          Notification.success({
            message: "表单提交成功！"
          });
          saveToLocalStorage(that.questionnaireAnswerKey + questionnaireSystemUuid, that.questionnaireAnswer.uuid);
        });
      }
    },
    created(){

    },
    mounted(){
      let that = this;


      let questionnaireSystemUuid = this.$route.query.questionnaireSystemUuid;
      if(!questionnaireSystemUuid) {
        questionnaireSystemUuid = this.$route.query.uuid;
      }
      //测试的时候用于清除本地存储
      // removeLocalStorage(this.questionnaireAnswerKey + questionnaireSystemUuid);
      this.questionnaireAnswer.httpReady(questionnaireSystemUuid,readLocalStorage(this.questionnaireAnswerKey + questionnaireSystemUuid),function () {
        document.title = that.questionnaireAnswer.questionnaireSystem.title + ' | 问卷系统';
      });


    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .user-answer {
    width: 100%;
    padding: 20px 10px 0 10px;
  }
</style>

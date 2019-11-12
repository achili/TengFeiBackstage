<template>
  <div class="animated fadeIn questionnaire-detail">

    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo" width="30" height="30" src="../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left ml15">
          <span  class="cell-max-title">{{questionnaireSystem.title}}</span>
          <span :class="'f16 text-'+questionnaireSystem.getStatusStyle()">{{questionnaireSystem.getStatusName()}}</span>
          <span v-if="!questionnaireSystem.spaceRegional.uuid">所属空间：所有空间</span>
        </div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt30">
        <div style="border: 1px #e2e2e2 solid;"></div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt20">

        <!--<button class="btn btn-success" title="下载" @click="questionnaireSystem.downloadCsv()">-->
          <!--<i class="fa fa-download"></i>-->
          <!--下载-->
        <!--</button>-->

        <button v-show="!preview" class="btn btn-info" title="预览" @click="preview = true">
          <i class="fa fa-eye"></i>
          预览
        </button>

        <button v-show="preview" class="btn btn-primary" title="收起" @click="preview = false">
          <i class="fa fa-eye-slash"></i>
          收起
        </button>

        <button class="btn btn-success" title="发布" v-show="questionnaireSystem.status === 'NEW'"
                @click="questionnaireSystem.httpStatus('RUNNING')">
          <i class="fa fa-play-circle-o"></i>
          发布
        </button>

        <button class="btn btn-danger" title="停止" v-show="questionnaireSystem.status === 'RUNNING'"
                @click="questionnaireSystem.httpStatus('STOP')">
          <i class="fa fa-stop"></i>
          停止
        </button>

        <button class="btn btn-primary" title="运行" v-show="questionnaireSystem.status === 'STOP'"
                @click="questionnaireSystem.httpStatus('RUNNING')">
          <i class="fa fa-play-circle"></i>
          运行
        </button>

        <button class="btn btn-info" title="编辑" @click="confirmEdit">
          <i class="fa fa-pencil"></i>
          编辑
        </button>

        <!--<button class="btn btn-danger" href="javascript:void(0)" title="删除" @click="questionnaireSystem.confirmDel(refreshAnswers)">-->
          <!--<i class="fa fa-trash"></i>-->
          <!--删除-->
        <!--</button>-->

        <!--<button class="btn btn-primary"  v-if="questionnaireSystem.status === questionnaireSystem.Status.RUNNING"-->
                <!--@click.stop.prevent="$router.push({path:'/by/questionnaire/answer/ready',query:{ uuid: questionnaireSystem.uuid }})">-->
          <!--<i class="fa fa-pencil-square-o"></i>-->
          <!--<span>回答问卷</span>-->
        <!--</button>-->

      </div>
      <div class="col-md-12 col-sm-12 col-xs-12 mt20" v-if="questionnaireSystem.status === questionnaireSystem.Status.RUNNING">
        <!--<div>-->
          <!--作答地址：<a href="javascript:void(0)" class="cell-blue" @click.stop.prevent="$router.push({path:'/share/questionnaire/answer/ready',query:{ uuid: questionnaireSystem.uuid }})">{{answerUrls}}</a>-->
        <!--</div>-->
        <div>
          <NbQRCode  :text="answerUrls" :title="title"/>
        </div>
      </div>
    </div>

    <NbExpanding>
      <div v-show="preview">
        <QuestionnaireSystemView :questionnaireSystem="questionnaireSystem"></QuestionnaireSystemView>
      </div>
    </NbExpanding>

    <div class="row">
      <div class="col-md-12 col-sm-12  col-xs-12">
        <h2>答卷列表</h2>
      </div>

      <div v-for="(questionnaireAnswer,index) in answerPager.data" class="col-md-12 col-sm-12 col-xs-12 mt20"
           @click.stop.prevent="$router.push({path:'/by/questionnaire/answer',query:{uuid:questionnaireAnswer.uuid}})" :key="index">
        <div class="bg-white p10 mt10 cursor" style="height: 100px;line-height: 80px;">
          <span class="f16">{{index + 1}} .{{questionnaireAnswer.content.title}}</span>
          <span class="ml30"><b><NbEntityLink :entity="questionnaireAnswer.creator"></NbEntityLink></b> 回答于:{{questionnaireAnswer.createTime | simpleDateTime}}</span>
        </div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt20">
        <NbPager :pager="answerPager" :callback="refreshAnswers"></NbPager>
      </div>

    </div>
  </div>
</template>
<script>

  import {MessageBox, Notification} from 'element-ui';
  import QuestionnaireSystem from "../../../common/model/questionnaire/QuestionnaireSystem";
  import Pager from "../../../common/model/_base/Pager";
  import QuestionnaireAnswer from "../../../common/model/questionnaire/QuestionnaireAnswer";
  import NbPager from "../../../components/NbPagerNew";
  import QuestionnaireSystemView from "./widget/QuestionnaireSystemView";
  import NbExpanding from "../../../components/NbExpanding.vue";
  import NbEntityLink from "../../../components/NbEntityLink";

  import NbQRCode from "../../../components/NbQRCode";

  export default {
    data () {
      return {
        preview: false,
        questionnaireSystem: new QuestionnaireSystem(),
        answerPager: new Pager(QuestionnaireAnswer),
        title:'点击生成二维码,使用手机扫一扫打开链接，点击右上角可分享。'
      }
    },
    computed: {
      answerUrl(){
        let host = location.protocol + "//" + location.host;

        return host + "/by/questionnaire/answer/ready?uuid=" + this.questionnaireSystem.uuid;
      },
      answerUrls(){
        let host = location.protocol + "//" + location.host;

        return host + "/share/questionnaire/answer/ready?uuid=" + this.questionnaireSystem.uuid;
      }
    },
    components: {
      NbPager,
      QuestionnaireSystemView,
      NbExpanding,
      NbEntityLink,
      NbQRCode
    },
    methods: {
      refreshAnswers(){
        let that = this;
        let params = {
          pageSize: this.answerPager.pageSize,
          page: this.answerPager.page,
          questionnaireSystemUuid: this.questionnaireSystem.uuid
        };
        this.answerPager.httpPage(params);
      },

      confirmEdit(){
        let that = this;
        if (this.questionnaireSystem.status === this.questionnaireSystem.Status.NEW) {
          this.gotoEdit();
          return;
        } else if (this.questionnaireSystem.status !== this.questionnaireSystem.Status.STOP) {
          Notification.error({
            message: "只有停止状态的表单才可以进行编辑"
          });
          return;
        }

        MessageBox.confirm('编辑该表单将删除该表单下的所有答卷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
            that.questionnaireSystem.httpStatus(that.questionnaireSystem.Status.NEW, function () {
              that.gotoEdit();
            });
          }, function () {
          });
      },
      gotoEdit(){
        this.$router.push({path:'/by/questionnaire/system/edit',query:{ uuid: this.questionnaireSystem.uuid }});
      },
      fetchDetail(){
        let that = this;
        this.questionnaireSystem.uuid = this.$route.query.uuid;
        if (this.questionnaireSystem.uuid) {
          this.questionnaireSystem.httpDetail(function () {
            that.questionnaireSystem.setProcedure(that.questionnaireSystem.Procedure.SURVEY_DISPLAY);
          });
        }
      }
    },
    mounted(){
      this.answerPager.enableHistory();
      this.fetchDetail();
      this.refreshAnswers();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .questionnaire-detail {
    padding: 20px 120px 0 30px;


  }
</style>

<template>
  <div class="animated fadeIn questionnaire-create">
    <div class="row">
      <div class="col-xs-12 ">
        <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo" width="30" height="30" src="../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left ml15">
          <span  style="font-size: 26px;color: #666666;">问卷系统</span>
        </div>
        <div class="pull-right text-right">
          <NbLoadingButton :entity="questionnaireSystem" :callback="save"/>
        </div>
      </div>

    </div>

    <div class="row mt10">

      <div class="col-md-3 col-sm-3 col-xs-3" align="center">
        <div class="wenti">
          <div class="pt30">
            <h3>问题设计</h3>
          </div>
          <div class="pt20" v-for="(type,index) in QuestionnaireQuestion.prototype.getTypeList()" :key="index">
            <button  class="btn btn-white" @click="questionnaireSystem.addQuestion(type.value)"  >
              <i :class="type.icon"></i>
              {{type.name}}
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-9 col-sm-9 col-xs-9">

        <div class="question">
          <div class="content" ref="logScroll" >
              <div ref="scrollContent">
                <div >
                  <div class="row ml10 mt10 form-group">
                    <div class="col-md-3 col-sm-3 col-xs-3">
                      <label class="control-label">所属空间</label>
                    </div>
                    <div class="col-md-8 col-sm-8 col-xs-8">
                      <select v-model="questionnaireSystem.spaceRegional"  class="form-control">
                        <option>所有空间</option>
                        <option v-for="(spaceRegional,index) in list"  :value="spaceRegional" :key="index"  v-if="user.hasPermissionSpace(FeatureType.ADMIN,spaceRegional.uuid)">{{spaceRegional.name}}</option>
                      </select>
                      <!--<SpaceRegionalSelecton :spaceRegional="questionnaireSystem.spaceRegional" :editMode="questionnaireSystem.editMode" :disabled="questionnaireSystem.editMode"></SpaceRegionalSelecton>-->
                    </div>
                  </div>

                  <div class="row ml10 mt10 form-group">
                    <div class="col-md-3 col-sm-3 col-xs-3">
                      <label class="control-label">标题</label>
                    </div>
                    <div class="col-md-8 col-sm-8 col-xs-8">
                      <input type="text" class="form-control" v-model="questionnaireSystem.title">
                    </div>
                  </div>

                  <div class="row ml10 mt10 form-group">
                    <div class="col-md-3 col-sm-3 col-xs-3">
                      <label class="control-label">描述</label>
                    </div>
                    <div class="col-md-8 col-sm-8 col-xs-8">
                      <textarea v-model="questionnaireSystem.description" rows="6" class="form-control"></textarea>
                    </div>
                  </div>

                  <div class="row pl40 pt10 pr40" style="background-color: #ffffff;" v-for="(question,index) in questionnaireSystem.questions" :key="index">
                    <QuestionChoice v-if="question.type === 'SINGLE_CHOICE' || question.type === 'MULTIPLE_CHOICE'"
                                    :questionnaireSystem="questionnaireSystem" :index="index"/>
                    <QuestionSingleBlank v-if="question.type === 'SINGLE_BLANK'"
                                         :questionnaireSystem="questionnaireSystem" :index="index"/>
                    <QuestionMultipleBlank v-if="question.type === 'MULTIPLE_BLANK'"
                                           :questionnaireSystem="questionnaireSystem" :index="index"/>
                    <QuestionDynamicGroup v-if="question.type === 'DYNAMIC_GROUP'"
                                          :questionnaireSystem="questionnaireSystem" :index="index"/>
                  </div>

                </div>
            </div>
          </div>
        </div>

      </div>


      <div class="col-xs-12 m-t-md">
        <div class="alert alert-danger" v-show="questionnaireSystem.errorMessage">
          {{ questionnaireSystem.errorMessage}}
        </div>
      </div>

    </div>

  </div>
</template>

<script>

  import NbLoadingButton from "../../../components/NbLoadingButton";
  import QuestionnaireSystem from "../../../common/model/questionnaire/QuestionnaireSystem";
  import QuestionnaireQuestion from "../../../common/model/questionnaire/QuestionnaireQuestion";
  import QuestionChoice from "./widget/QuestionChoice";
  import QuestionDynamicGroup from "./widget/QuestionDynamicGroup";
  import QuestionMultipleBlank from "./widget/QuestionMultipleBlank";
  import QuestionSingleBlank from "./widget/QuestionSingleBlank";
  import PerfectScrollbar from "perfect-scrollbar";
  import { Notification } from 'element-ui'
  import SpaceRegionalSelecton from "../../../view/backyard/space/regional/Selection";
  import SpaceRegional from "../../../common/model/space/SpaceRegional";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../common/model/core/feature/FeatureType";

  export default {
    data () {
      return {
        QuestionnaireQuestion,
        questionnaireSystem: new QuestionnaireSystem(),
        spaceRegionals : new SpaceRegional(),
        list:[],
        FeatureType,
        user: this.$store.state.user
      }
    },
    computed:{
      logScroll(){
        return this.$refs["logScroll"];
      },
      scrollContent(){
        return this.$refs["scrollContent"];
      }
    },
    components:{
      NbLoadingButton,
      QuestionDynamicGroup,
      QuestionMultipleBlank,
      QuestionSingleBlank,
      QuestionChoice,
      SpaceRegionalSelecton
    },
    methods:{
      setContent(content){
        this.questionnaireSystem.description = content;
      },
      save(){
        let that = this;
        this.questionnaireSystem.httpSave(function (response) {
          Notification.success({
            message: that.questionnaireSystem.editMode ? '修改表单成功！' : '创建表单成功！'
          });
          that.$router.push({path:'/by/questionnaire/system/detail',query:{ uuid: that.questionnaireSystem.uuid }});
        });
      },
      refresh(){
        let that = this;

        this.spaceRegionals.httpList(function (res) {
          that.list = res.data.data.list;
          that.list.forEach(ddd=>{
            if(!that.questionnaireSystem.editMode){
              if(ddd.uuid === that.user.role.spaceRegional.uuid){
                that.questionnaireSystem.spaceRegional = ddd;
              }
            }

          })
        });
      }
    },
    mounted(){
      let that = this;
      //完美滚动条
      this.ps = new PerfectScrollbar(this.logScroll,{
        wheelSpeed :1 ,
        wheelPropagation :true ,
        minScrollbarLength :2
      });

      this.questionnaireSystem.uuid = this.$route.query.uuid;
      if (this.questionnaireSystem.uuid) {
        this.questionnaireSystem.editMode = true;
        this.questionnaireSystem.httpDetail(function () {
          that.questionnaireSystem.setProcedure(that.questionnaireSystem.Procedure.SURVEY_EDIT);
        });
      } else {
        this.questionnaireSystem.setProcedure(this.questionnaireSystem.Procedure.SURVEY_CREATE);
      }

      this.refresh();
    }
}
</script>
<style lang="less" rel="stylesheet/less">
  .questionnaire-create {
    padding: 20px 120px 0 30px;
    width: 100%;
    height: 100%;
   // overflow-y: hidden;
  .wenti{
    width: 100%;
    height: 580px;
    //padding-bottom: 30px;
    background-color: #ffffff;
  }
    .question{
      width: 100%;
      height: 580px;
      padding-bottom: 30px;
      background-color: #ffffff;
      overflow-x: hidden;
      .content{
        position: relative;
        width: 100%;
        height: 100%;
        overflow-x: hidden;

      }

    }


  }
</style>

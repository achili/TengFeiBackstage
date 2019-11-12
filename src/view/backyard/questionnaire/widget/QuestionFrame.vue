<template>

  <div class="panel bg-white"  :class="{'panel-default':!question.errorMessage || questionnaireSystem.procedure !== 'ANSWER_EDIT','panel-warning':question.errorMessage && questionnaireSystem.procedure === 'ANSWER_EDIT'}">

    <div class="panel-body">

      <div class="media">
        <div class="pull-left f14 bold" >
          <span class="text-danger" v-show="question.required">*</span>
        </div>
        <div class="media-body">
          <div class="f14 bold ">
            <div v-if="!question.title"><span>{{index+1}}</span>请在编辑区域输入标题...</div>
            <div v-if="question.title">
              <span>{{index+1}}</span>
              <span>{{question.title}}</span>
              <span v-if="question.type === 'SINGLE_CHOICE'">(单选)</span>
              <span v-if="question.type === 'MULTIPLE_CHOICE'">(多选)</span>
              <!--<div v-if="question.title"  v-html="index+1 + '  '+ question.title"></div>-->
            </div>

          </div>
          <div class="pt15">

            <slot name="preview">这里是预览视图</slot>

          </div>
        </div>
      </div>

      <NbExpanding>
        <div class="ph15" v-if="(questionnaireSystem.procedure === 'SURVEY_CREATE' || questionnaireSystem.procedure === 'SURVEY_EDIT') && question.editMode">
          <div class="row bg-aliceblue pt15">
            <div class="col-xs-6">

              <div class="form-group">
                <label class="control-label">问题标题</label>
                <textarea class="form-control" rows="2" v-model="question.title"
                          placeholder="请输入标题"></textarea>
              </div>

              <div class="form-group" v-if="question.type === 'SINGLE_BLANK' && question.input.type === 'TEXT'" >
                <label class="control-label">问题提示语</label>
                <input class="form-control" type="text" v-model="question.input.placeholder"
                          placeholder="请输入问题提示语" />
              </div>

            </div>
            <div class="col-xs-6">

              <div class="row pt10">
                <div class="col-xs-12">
                  <div>
                    <label>
                      <NbCheckbox v-model="question.required"/>
                      必答题
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xs-12">
              <slot name="editing">
                这里是功能编辑区域
              </slot>
            </div>
          </div>
        </div>

      </NbExpanding>

    </div>

    <PanelHeading v-if="questionnaireSystem.procedure === 'SURVEY_CREATE' || questionnaireSystem.procedure === 'SURVEY_EDIT'" :questionnaireSystem="questionnaireSystem" :index="index"/>

    <div v-if="questionnaireSystem.procedure === 'ANSWER_EDIT'" class="panel-heading" v-show="question.errorMessage">
      {{question.errorMessage}}
    </div>

  </div>

</template>

<script>

  import NbExpanding from '../../../../components/NbExpanding.vue'
  import NbCheckbox from "../../../../components/NbCheckbox";
  import PanelHeading from "./PanelHeading";
  import QuestionnaireSystem from "../../../../common/model/questionnaire/QuestionnaireSystem";

  export default {
    data(){
      return {
        val: 1
      }
    },
    props: {
      questionnaireSystem: {
        type: QuestionnaireSystem,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },
    computed: {
      question(){
        return this.questionnaireSystem.questions[this.index];
      }
    },
    components: {
      NbCheckbox,
      PanelHeading,
      NbExpanding
    },
    watch: {},
    methods: {},
    mounted(){

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .title-top {
    margin-left: -10px;
  }
</style>

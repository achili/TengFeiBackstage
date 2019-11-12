<template>
  <div class="animated fadeIn">
    <QuestionFrame :questionnaireSystem="questionnaireSystem" :index="index">

      <div class="row" slot="preview">
        <div v-for="(choice,choiceIndex) in question.choices" :class="'col-xs-'+choice.col" :key="choiceIndex">

          <div class="media pb15">
            <div class="pull-left">
              <NbRadio v-if="question.type === 'SINGLE_CHOICE'" :name="'question'+index"
                       :val="choiceIndex" v-model="question.value"/>
              <NbCheckbox v-if="question.type === 'MULTIPLE_CHOICE'" :val="choiceIndex"
                          v-model="question.values"/>
            </div>
            <div class="media-body" v-if="choice.title != null && choice.title.indexOf('请说明') != -1">
              <div class="f12">
                <div v-if="!choice.title">请在编辑区域输入选项文字...</div>
                <div class="pull-left">
                  <div v-html="choice.title"></div>
                </div>
                <div class="pull-left" v-if="question.type === 'SINGLE_CHOICE'">
                  <input type="text" class="text-other" :disabled="question.value !== choiceIndex" placeholder="在此处填写答案..." v-model="choice.other"/>
                </div>
                <div class="pull-left" v-else>
                  <input type="text" class="text-other" :disabled="!(question.values.indexOf(choiceIndex) > -1)" placeholder="在此处填写答案..." v-model="choice.other"/>
                </div>
              </div>
            </div>
            <div class="media-body" v-else>
              <div class="f12">
                <div v-if="!choice.title">请在编辑区域输入选项文字...</div>
                <div>
                  <div>
                    <span>{{choice.title}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row" slot="editing">
        <div class="col-xs-12">
          <label>选项设置</label>
          <div v-for="(choice,choiceIndex) in question.choices" class="row" :key="choiceIndex">

            <div class="col-xs-6" >
              <div class="form-group">
							<textarea class="form-control" rows="2" v-model="choice.title"
                        placeholder="请输入选项文字..."></textarea>
              </div>
            </div>
            <div class="col-xs-6 pt10">
              <ItemControl :question="question" :index="choiceIndex" :other="choice.title"/>
              <ColSelection class="pl5" v-model="choice.col"/>
            </div>

          </div>
          <div >

          </div>

        </div>
      </div>

    </QuestionFrame>
  </div>
</template>

<script>
  import NbRadio from "../../../../components/NbRadio";
  import NbCheckbox from "../../../../components/NbCheckbox";
  import ColSelection from "./ColSelection";
  import ItemControl from "./ItemControl";
  import QuestionFrame from "./QuestionFrame";
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
      NbRadio,
      NbCheckbox,
      ColSelection,
      ItemControl,
      QuestionFrame
    },
    methods: {},
    mounted(){

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .text-other {
    background-color: #FFFFFF;
    background-image: none;
    border: 0;
    border-bottom: 1px solid #e5e6e7;
    border-radius: 1px;
    color: inherit;
    display: block;
    padding: 6px 12px;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    width: 100%;
    font-size: 12px;
    font-weight: initial;
  }
</style>

<template>

  <QuestionFrame :questionnaireSystem="questionnaireSystem" :index="index">

    <div class="row" slot="preview">
      <div v-for="(input,inputIndex) in question.inputs" :class="'col-xs-'+input.col" :key="inputIndex">

        <div class="form-group">
          <RichInput :input="input" :title="input.title?input.title:'请在编辑区域输入该项标题...'"/>

        </div>

      </div>
    </div>


    <div class="row" slot="editing">
      <div class="col-xs-12">

        <label>
          文本框设置
        </label>

        <div v-for="(input,inputIndex) in question.getItems()" :key="inputIndex" class="row">

          <div class="col-xs-6">
            <div class="form-group">
              <input type="text" class="form-control" v-model="input.title" placeholder="请输入文本框标题..."/>
            </div>
            <div class="form-group" v-if="input.type === 'TEXT'">
              <span>
                默认提示:<input type="text" class="text-other" v-model="input.placeholder" placeholder="请输入默认提示..."/>
              </span>
            </div>
          </div>

          <div class="col-xs-6">
            <ItemControl :question="question" :index="inputIndex"/>
            <TypeSelection class="pl5" v-model="input.type"/>
            <RowSelection v-if="input.type === 'TEXT'" class="pl5" v-model="input.row"/>
            <ColSelection class="pl5" v-model="input.col"/>

          </div>

        </div>

      </div>


    </div>


  </QuestionFrame>

</template>

<script>

  import TypeSelection from "./TypeSelection";
  import ItemControl from "./ItemControl";
  import RowSelection from "./RowSelection";
  import ColSelection from "./ColSelection";
  import RichInput from "./RichInput";
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
      TypeSelection,
      ItemControl,
      RowSelection,
      ColSelection,
      RichInput,
      QuestionFrame
    },
    watch: {},
    methods: {},
    mounted(){

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .text-other {
    /*background-color: #FFFFFF;*/
    background-image: none;
    border: 0;
    border-bottom: 1px solid #e5e6e7;
    border-radius: 1px;
    color: inherit;
    display: block;
    padding: 6px 12px;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    width: 100%;
    font-size: 14px
  }
</style>

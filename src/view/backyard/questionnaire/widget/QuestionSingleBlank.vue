<template>

  <QuestionFrame :questionnaireSystem="questionnaireSystem" :index="index">

    <div class="row" slot="preview">
      <div :class="'col-xs-'+question.input.col">
        <RichInput :input="question.input"/>
      </div>
    </div>

    <div class="row" slot="editing">
      <div class="col-xs-12">

        <TypeSelection class="pl5" v-model="question.input.type"/>
        <RowSelection v-if="question.input.type === 'TEXT'" class="pl5" v-model="question.input.row"/>
        <ColSelection class="pl5" v-model="question.input.col"/>



      </div>
    </div>

  </QuestionFrame>

</template>

<script>
  import RowSelection from "./RowSelection";
  import ColSelection from "./ColSelection";
  import TypeSelection from "./TypeSelection";
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
      RowSelection,
      ColSelection,
      TypeSelection,
      RichInput,
      QuestionFrame
    },
    watch: {

    },
    methods: {},
    mounted(){

    }
  }
</script>

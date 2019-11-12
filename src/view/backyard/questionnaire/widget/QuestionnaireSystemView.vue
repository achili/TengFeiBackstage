<template>
  <div class="row mv20">

    <div class="col-xs-12">
      <h2 class="text-center">{{questionnaireSystem.title}}</h2>
    </div>

    <div class="col-xs-12 mt20">
      <div class="">
        <div v-html="questionnaireSystem.description"></div>
      </div>
    </div>

    <div class="col-xs-12 mt20">
      <div v-for="(question,index) in questionnaireSystem.questions" :key="index">

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
</template>

<script>

  import QuestionChoice from "./QuestionChoice";
  import QuestionSingleBlank from "./QuestionSingleBlank";
  import QuestionMultipleBlank from "./QuestionMultipleBlank";
  import QuestionDynamicGroup from "./QuestionDynamicGroup";
  import QuestionnaireSystem from "../../../../common/model/questionnaire/QuestionnaireSystem";

  export default {
    data(){
      return {}
    },
    components: {
      QuestionChoice,
      QuestionSingleBlank,
      QuestionMultipleBlank,
      QuestionDynamicGroup
    },
    props: {
      questionnaireSystem: {
        type: QuestionnaireSystem,
        required: true
      }
    },
    computed: {},
    methods: {},
    mounted(){

    }
  }
</script>

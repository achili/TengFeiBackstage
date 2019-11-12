<template>
	<span>
		<button class="btn btn-info btn-circle" @click="question.addItem(index)" >
			<i class="fa fa-plus"></i>
		</button>
		<button class="btn btn-info btn-circle"
            :disabled="question.getItems().length < 3"
            @click="question.delItem(index)">
			<i class="fa fa-minus"></i>
		</button>
		<button class="btn btn-info btn-circle" :disabled="index === 0"
            @click="question.upItem(index)">
			<i class="fa fa-arrow-up"></i>
		</button>
		<button class="btn btn-info btn-circle"
            :disabled="index === question.getItems().length -1"
            @click="question.downItem(index)">
			<i class="fa fa-arrow-down"></i>
		</button>
	</span>

</template>

<script>

  import QuestionnaireQuestion from "../../../../common/model/questionnaire/QuestionnaireQuestion";

  export default {
    data(){
      return {}
    },
    props: {
      question: {
        type: QuestionnaireQuestion,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      other:{
        type: String,
        required: false
      }

    },
    computed: {

    },
    watch: {},
    methods: {},
    mounted(){

    }
  }
</script>

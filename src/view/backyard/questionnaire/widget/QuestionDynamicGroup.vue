<template>

  <QuestionFrame :questionnaireSystem="questionnaireSystem" :index="index">

    <div class="row" slot="preview">
      <div class="col-xs-12">

        <div v-for="(inputs,inputsIndex) in question.group.inputsList" class="panel panel-default" :key="inputsIndex">
          <div class="panel-heading clearfix">
            <div class="pull-left">
							<span
                class="lh30 f15">{{question.group.title?question.group.title:"请在编辑区域输入组标题..."}}#{{inputsIndex+1}}</span>
            </div>

            <div class="pull-right">
              <button class="btn btn-warning btn-sm" :class="{'btn-outline':questionnaireSystem.procedure === 'ANSWER_EDIT' && question.group.canAdd(inputsIndex)}"
                      :disabled="questionnaireSystem.procedure !== 'ANSWER_EDIT' || !question.group.canAdd(inputsIndex)"
                      @click="question.group.addGroup(inputsIndex)">
                <i class="fa fa-plus"></i>
                添加
              </button>

              <button class="btn btn-primary btn-sm" :class="{'btn-outline':questionnaireSystem.procedure === 'ANSWER_EDIT' && question.group.canCopy(inputsIndex)}"
                      :disabled="questionnaireSystem.procedure !== 'ANSWER_EDIT' || !question.group.canCopy(inputsIndex)"
                      @click="question.group.copyGroup(inputsIndex)">
                <i class="fa fa-copy"></i>
                复制
              </button>

              <button class="btn btn-primary btn-sm" :class="{'btn-outline':questionnaireSystem.procedure === 'ANSWER_EDIT' && question.group.canUp(inputsIndex)}"
                      :disabled="questionnaireSystem.procedure !== 'ANSWER_EDIT' || !question.group.canUp(inputsIndex)"
                      @click="question.group.upGroup(inputsIndex)">
                <i class="fa fa-arrow-up"></i>
                上移
              </button>

              <button class="btn btn-primary btn-sm" :class="{'btn-outline':questionnaireSystem.procedure === 'ANSWER_EDIT' && question.group.canDown(inputsIndex)}"
                      :disabled="questionnaireSystem.procedure !== 'ANSWER_EDIT' || !question.group.canDown(inputsIndex)"
                      @click="question.group.downGroup(inputsIndex)">
                <i class="fa fa-arrow-down"></i>
                下移
              </button>

              <button class="btn btn-danger btn-sm" :class="{'btn-outline':questionnaireSystem.procedure === 'ANSWER_EDIT' && question.group.canDel(inputsIndex)}"
                      :disabled="questionnaireSystem.procedure !== 'ANSWER_EDIT' || !question.group.canDel(inputsIndex)"
                      @click="question.group.delGroup(inputsIndex)">
                <i class="fa fa-trash"></i>
                删除
              </button>

            </div>

          </div>

          <div class="panel-body">
            <div class="row">
              <div v-for="(input,inputIndex) in inputs" :class="'col-xs-'+input.col" :key="inputIndex">
                <div class="form-group">
                  <RichInput :input="input" :title="input.title?input.title:'请在编辑区域输入该项标题...'"/>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="row" slot="editing">
      <div class="col-xs-12">

        <div class="row">
          <div class="col-xs-6">
            <div class="form-group">
              <label class="control-label">组标题</label>
              <input type="text" class="form-control" v-model="question.group.title"
                     placeholder="请输入组标题"/>
            </div>
          </div>

          <div class="col-xs-6 pt25">

						<span>
							<label class="pr10">最小组数:</label>
							<label>
								<select class="form-control" v-model="question.group.min">
									<option v-for="(n,index) in 5" :value="n" :key="index">{{n}}</option>
								</select>
							</label>

							<label>最大组数:</label>
							<label>
								<select class="form-control" v-model="question.group.max">
									<option v-for="(n,index) in (question.group.min + 10)" :value="question.group.min + n" :key="index">{{question.group.min + n}}</option>
								</select>
							</label>
						</span>

          </div>
        </div>


      </div>
      <div class="col-xs-12">

        <label>
          文本框设置
        </label>

        <div v-for="(input,inputIndex) in question.getItems()" class="row" :key="inputIndex">

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

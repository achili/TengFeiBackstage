<template>
  <div class="nb-form row">

    <div class="col-md-12">

      <div class="row mt10" v-for="formItem in httpForm.form" :key="formItem.name">
        <label :for="formItem.id" class="col-md-2 control-label mt5" v-if="formItem.type !== FormItemType.HIDDEN"
               :class="formItem.isRequired? 'compulsory':'no-compulsory'">{{formItem.description}}</label>
        <div class="col-md-10 pr50">
          <NbFromItem :formItem="formItem"></NbFromItem>
        </div>
      </div>

    </div>

    <div class="col-md-12 pull-right mt30 mr35">
      <NbLoadingButton :entity="httpForm" :callback="callback"
                       :saveText="saveText" :createText="createText" :createIcon="createIcon" :saveIcon="saveIcon"></NbLoadingButton>
    </div>
  </div>
</template>

<script>
  import Base from "../common/model/_base/Base";
  import BaseEntity from "../common/model/_base/BaseEntity";
  import Tank from "../common/model/tank/Tank";
  import FormItem from "../common/model/_base/FormItem";
  import HttpForm from "../common/model/_base/HttpForm";

  import NbFromItem from "./NbFromItem";

  import NbLoadingButton from "./NbLoadingButton";
  import NbNumberInput from "./NbNumberInput";
  import NbTank from "./NbTank";

  export default {
    data() {
      return {
        FormItemType: FormItem.prototype.Type,
        baseEntity: new BaseEntity(),
        myNumber: "",
        tank: new Tank()
      }
    },
    props: {
      httpForm: {
        type: HttpForm,
        required: true
      },
      successCallback: {
        type: Function,
        required: false
      },
      errorCallback: {
        type: Function,
        required: false
      },
      createText: {
        type: String,
        required: false,
        "default": "创建"
      },
      saveText: {
        type: String,
        required: false,
        "default": "保存"
      },
      createIcon:{
        type: String,
        required: false,
        "default":"fa fa-plus"
      },
      saveIcon:{
        type: String,
        required: false,
        "default":"fa fa-save"
      }
    },
    components: {
      NbLoadingButton,
      NbNumberInput,
      NbTank,
      NbFromItem
    },
    computed: {},
    methods: {
      callback() {
        console.log("gege")
        this.httpForm.submit(this.successCallback, this.errorCallback);
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .nb-form {
    label {
      font-weight: normal;
    }
    .compulsory-none {
      &:before {
        content: "● ";
        color: rgb(255, 154, 154);
        padding-right: 20px;
        position: relative;
      }
    }
  }
</style>

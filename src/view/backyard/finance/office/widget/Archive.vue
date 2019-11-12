<template>
  <div class="row">

    <div class="col-xs-12">

      <div>
        <i class="fa fa-info-circle"></i>
        <span v-if="financeOfficePay.archive">
          解封将恢复归档前状态。
        </span>
        <span v-else>
          归档后的将不能操作，默认不出现在列表中。
        </span>
      </div>

      <div class="mt10">
        <textarea class="form-control" placeholder="备注" v-model="reviewReason"></textarea>
      </div>

      <div class="mt10">
        <NbLoadingButton v-if="financeOfficePay.archive" createText="解封"  saveText="解封" :entity="financeOfficePay"
                         :callback="archive" createIcon="fa fa-send"/>
        <NbLoadingButton v-else  createText="归档" saveText="归档" :entity="financeOfficePay"
                         :callback="archive" createIcon="fa fa-send"/>
      </div>

    </div>

  </div>
</template>

<script>
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import FinanceOfficePay from "../../../../../common/model/finance/FinanceOfficePay";
  import NbLoadingButton from  "../../../../../components/NbLoadingButton.vue";


  export default {
    data() {
      return {
        reviewReason: null,
        refresh: null
      }
    },
    props: {
      financeOfficePay: {
        type: FinanceOfficePay,
        require: true
      },
      successCallback: {
        type: Function,
        required: false
      },
      errorCallback: {
        type: Function,
        required: false
      }
    },
    components: {
      NbLoadingButton
    },
    computed: {},
    watch: {},
    methods: {
      archive() {
        let that = this;
        this.financeOfficePay.httpArchive(this.reviewReason, function (response) {
          NotificationBox.success({
            message: '归档成功！'
          });
          that.refresh = true;
          if (typeof that.successCallback === "function") {
            that.successCallback();
          }
        }, that.errorCallback);
      }

    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>

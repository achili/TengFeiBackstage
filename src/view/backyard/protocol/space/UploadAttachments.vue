<template>
  <div class="mail-box" style="border: 0;">
    <div class="mail-body ml15" style="border: 0;">
    <div  v-if="protocolSpace.status === Status.NEW ||
			protocolSpace.status === Status.PROCESSING ||
			protocolSpace.status === Status.EXCEPTION
">

        <div class="row mt10">
          <div class="col-md-2 ">其它附件：</div>
          <div class="col-md-10 ">
            <NbTanks :tanks="protocolSpace.attachments" :show="false"/>
          </div>
        </div>

        <div class="row text-right mt10">
          <NbLoadingButton :loading="protocolSpace.loading" :entity="protocolSpace" :callback="submit"/>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import NbSlidePanel from "../../../../components/NbSlidePanel";
  import NbTanks from "../../../../components/NbTanks";
  import NbLoadingButton from "../../../../components/NbLoadingButton";
  import ProtocolSpace from "../../../../common/model/protocol/space/ProtocolSpace";

  export default {

    data () {
      return {
        Status: ProtocolSpace.prototype.Status
      }
    },
    components: {
      NbSlidePanel,
      NbTanks,
      NbLoadingButton
    },
    props: {
      protocolSpace: {
        type: ProtocolSpace,
        required: true
      },
      successCallback: {
        type: Function,
        required: false
      }
    },
    computed: {},
    methods: {
      submit() {
        this.protocolSpace.httpUploadAttachments(this.successCallback);
      }
    },
    mounted(){

    }
  }
</script>

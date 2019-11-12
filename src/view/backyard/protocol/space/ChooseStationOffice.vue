<template>
  <div>
    <div class="row mt20">
      <div class="form-group clearfix">
        <div class="col-md-12 mt30">
          <label class="col-md-2 control-label" style="text-align: left;">选择房间</label>
          <div class="col-md-4">
            <select class="form-control" v-model="spaceOrder.characteristic">
              <option value="MOBILE_STATION">移动办公桌</option>
              <option value="INDEPENDENT_SPACE">独立办公室</option>
            </select>
          </div>
        </div>
        <div class="col-md-12" v-if="isOffice">
          <SpaceOfficeMultiSelection ref="spaceOfficeMultiSelection" :spaceOffices="spaceList" :spaceOrder="spaceOrder" :initFilter="{'type':'INDEPENDENT_SPACE'}"></SpaceOfficeMultiSelection>
        </div>
        <div class="col-md-12" v-else>
          <SpaceSeatMultiSelection ref="spaceSeatMultiSelection" :spaceSeats="spaceSeatList" :spaceOrder="spaceOrder" :initFilter="{'type':'MOBILE_STATION'}"></SpaceSeatMultiSelection>
        </div>
      </div>

    <!--<div class="col-md-12 text-right">-->
      <!--<button title="保存" class="btn btn-success" @click.stop.prevent="saveStation">-->
        <!--<i class="fa fa-arrow-left"></i>-->
        <!--保存-->
      <!--</button>-->
    <!--</div>-->
    </div>
  </div>
</template>


<script>
  import NbSlidePanel from "../../../../components/NbSlidePanel.vue";
  import NbExpanding from "../../../../components/NbExpanding.vue";
  import NbBtnDropdown from "../../../../components/NbBtnDropdown.vue";
  import ProtocolSpace from "../../../../common/model/protocol/space/ProtocolSpace";
  import SpaceOfficeMultiSelection from "../../../../view/backyard/space/office/widget/MultiSelection"
  import SpaceSeatMultiSelection from "../../../../view/backyard/space/seat/widget/MultiSelection"
  import SpaceOrder from "../../../../common/model/spaceOrder/SpaceOrder";
  import {Notification,MessageBox} from 'element-ui'

  export default {
    data () {
      return {
        flipped: true,
        currentReason: null,
        protocolSpace: new ProtocolSpace(),
        spaceList: [],
        spaceSeatList: [],
        isFirst: true,
        isOffice: true
      }
    },
    props: {
      spaceOrder: {
        type: SpaceOrder,
        required: true
      }
    },
    watch: {
      'spaceList' (newVal, oldVal) {
        this.spaceOrder.spaceUuids = [];
        if (newVal.length > 0) {
          newVal.forEach(space => {
            //填装ID
            this.spaceOrder.spaceUuids.push(space.uuid)
          });
        }
      },
      'spaceSeatList' (newVal, oldVal) {
        this.spaceOrder.spaceUuids = [];
        if (newVal.length > 0) {
          newVal.forEach(space => {
            //填装ID
            this.spaceOrder.spaceUuids.push(space.uuid)
          });
        }
      },
      "spaceOrder.characteristic"(newVal, oldVal) {
        if (this.spaceOrder.characteristic === "INDEPENDENT_SPACE") {
          this.isOffice = true;
          this.spaceList = [];
        } else {
          this.isOffice = false;
          this.spaceSeatList = [];
        }
      },
      'protocolSpace.type' (newVal, oldVal) {
        if (this.isFirst && this.protocolSpace.editMode) {
          this.isFirst = false;
          return
        }
        this.spaceList = [];
        this.spaceSeatList = [];
        this.spaceOrder.spaceUuids = [];
      },
      'protocolSpace.spaceSeats' (newVal, oldVal) {
        this.spaceSeatList = newVal
      },
      'protocolSpace.spaceOfficials' (newVal, oldVal) {
        this.spaceList = newVal
      }
    },
    components: {
      NbSlidePanel,
      NbExpanding,
      NbBtnDropdown,
      SpaceOfficeMultiSelection,
      SpaceSeatMultiSelection
    },
    methods: {
      saveStation() {
        this.spaceOrder.httpAddSpace(function () {
          Notification.success({
            message: '添加房间成功!'
          });
        })
      },
      refresh() {

      }
    },
    mounted () {
      console.log(this.spaceOrder.characteristic)
      if (this.spaceOrder.characteristic === "INDEPENDENT_SPACE") {
        this.isOffice = true;
        this.spaceList = [];
      } else {
        this.isOffice = false;
        this.spaceSeatList = [];
      }
      this.refresh()
    }
  }


</script>

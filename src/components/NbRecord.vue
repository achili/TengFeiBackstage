<template>
  <div class="nb-record-content">
    <div class="row">
      <div class="col-md-12">

        <div class="col-xs-12 mt20">
          <div  v-for="messageNotify in messageNotifyPager.data" :key="messageNotify.index">
            <div class="media pl30 pr30">
                <div class="row content">
                  <div class="col-md-12">
                    <div class="pull-left mr10">
                      <img src="../assets/img/dashi-logo.png" width="17" height="20" />
                    </div>
                    <EntryApplyCell v-if="messageNotify.entityType === EntityType.SPACE_APPLY"
                                    :messageNotify="messageNotify"/>
                    <FeedbackCell v-else-if="messageNotify.entityType === EntityType.FEEDBACK"
                                  :messageNotify="messageNotify"/>
                    <!--会议室付款信息单-->
                    <FinancePayInfoCell v-else-if="messageNotify.entityType === EntityType.FINANCE_OFFICE_PAY"
                                        :messageNotify="messageNotify"/>
                    <!--付款信息单-->
                    <FinancePayInfoCell v-else-if="messageNotify.entityType === EntityType.FINANCE_PAY_INFO"
                                        :messageNotify="messageNotify"/>
                    <FinancePayInfoCell v-else-if="messageNotify.entityType === EntityType.FINANCE_OTHER_PAY"
                                        :messageNotify="messageNotify"/>
                    <KeeperBusinessCell v-else-if="messageNotify.entityType === EntityType.KEEPER_BUSINESS"
                                        :messageNotify="messageNotify"/>
                    <ProjectCell v-else-if="messageNotify.entityType === EntityType.PROJECT" :messageNotify="messageNotify"/>
                    <ProtocolIncubatorCell v-else-if="messageNotify.entityType === EntityType.PROTOCOL_INCUBATOR"
                                           :messageNotify="messageNotify"/>
                    <ProtocolSpaceCell v-else-if="messageNotify.entityType === EntityType.PROTOCOL_SPACE"
                                       :messageNotify="messageNotify"/>
                    <SpaceOrderCell v-else-if="messageNotify.entityType === EntityType.SPACE_ORDER"
                                    :messageNotify="messageNotify"/>
                    <div v-else>
                      <span class="text-danger">一条未定义的消息类型，请及时排查 {{messageNotify.action}}</span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="time-line"></div>
                </div>
            </div>
          </div>
        </div>

        <div class="col-md-12 mv20">
          <NbPager :pager="messageNotifyPager" :callback="refresh"></NbPager>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import MessageNotify from "../common/model/message/notify/MessageNotify";
  import BaseEntity from  "../common/model/_base/BaseEntity"
  import Pager from "../common/model/_base/Pager";
  import NbPager from "../components/NbPager";
  import NbSlidePanel from "../components/NbSlidePanel";
  import {EntityType, EntityTypeMap, EntityTypeList} from "../common/model/core/type/EntityType";
  import EntryApplyCell from "../components/messageNotify/EntryApplyCell";
  import FeedbackCell from "../components/messageNotify/FeedbackCell";
  import FinancePayInfoCell from "../components/messageNotify/FinancePayInfoCell";
  import KeeperBusinessCell from "../components/messageNotify/KeeperBusinessCell";
  import ProjectCell from "../components/messageNotify/ProjectCell";
  import ProtocolIncubatorCell from "../components/messageNotify/ProtocolIncubatorCell";
  import ProtocolSpaceCell from "../components/messageNotify/ProtocolSpaceCell";
  import SpaceOrderCell from "../components/messageNotify/SpaceOrderCell"

  export default {
    data(){
      return{
        EntityType,
        FeatureType: this.$store.state.FeatureType,
        user: this.$store.state.user,
        messageNotifyPager: new Pager(MessageNotify,5)
      }
    },
    props:{
      entity:{
        type: BaseEntity,
        required: true
      }
    },
    components:{
      NbPager,
      NbSlidePanel,
      EntryApplyCell,
      FeedbackCell,
      FinancePayInfoCell,
      KeeperBusinessCell,
      ProjectCell,
      ProtocolIncubatorCell,
      ProtocolSpaceCell,
      SpaceOrderCell
    },
    computed:{

    },
    watch:{

    },
    methods:{
      refresh(){
        let that = this;
        this.messageNotifyPager.setFilterValue("entityId",this.entity.uuid);
        this.messageNotifyPager.setFilterValue("entityType", this.entity.getEntityType());
        this.messageNotifyPager.setFilterValue("orderCreateTime", "DESC");
        this.messageNotifyPager.httpFastPage()
      }
    },
    mounted(){}
  }
</script>

<style lang="less" rel="stylesheet/less">
  .nb-record-content{
    background-color: #ffffff;
      .time-line{
        width: 1px;
        height: 40px;
        background-color: #bfbfbf;
        margin: 0 0 10px 22px;
      }
  }
</style>

<template>
	<div>
		<div class="pull-left">
      <div class="mv5" v-if="messageNotify.content.type === 'create'">
        {{messageNotify.content.name}} 创建了租赁协议
      </div>

      <div class="mv5" v-if="messageNotify.content.type === 'edit'">
        {{messageNotify.content.name}} 修改了租赁协议
      </div>

      <div class="mv5" v-if="messageNotify.content.type === 'attachments'">
        {{messageNotify.content.name}} 上传了附件
      </div>

      <div class="mv5" v-if="messageNotify.content.type === 'status'">
        {{messageNotify.content.name}}
        将
        <span :style="'color:'+ protocolSpace.StatusMap[messageNotify.content.oldStatus].style">
				{{protocolSpace.StatusMap[messageNotify.content.oldStatus].name}}
			</span>
        修改为
        <span :style="'color:'+ protocolSpace.StatusMap[messageNotify.content.status].style">
				{{protocolSpace.StatusMap[messageNotify.content.status].name}}
			</span>
      </div>

      <div class="mv5" v-if="messageNotify.content.type === 'refund'">
        {{messageNotify.content.name}} 将合同确认为
        <span v-if="messageNotify.content.refund === 'true'">押金已退还</span>
        <span v-if="messageNotify.content.refund === 'false'">押金未退还</span>
      </div>
    </div>

		<div class="pull-right">
			<i class="fa fa-clock-o"></i>
      {{messageNotify.createTime | simpleDateMinute}}
		</div>
	</div>
</template>
<script>

  import MessageNotify from "../../common/model/message/notify/MessageNotify";
  import UserProfileLink from "./UserProfileLink.vue";
  import NotificationStatusReport from  "./StatusReport.vue";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../common/model/core/feature/FeatureType";
  import {EntityType, EntityTypeMap, EntityTypeList} from "../../common/model/core/type/EntityType";
  import {Action, ActionMap, ActionList} from "../../common/model/core/action/Action";
  import ProtocolSpace from "../../common/model/protocol/space/ProtocolSpace";

  export default{
    data(){
      return {
        FeatureType,
        EntityType,
        Action,
        protocolSpace: new ProtocolSpace(),
        StatusMap: ProtocolSpace.prototype.StatusMap
      }
    },
    watch: {},
    props: {
      messageNotify: {
        type: MessageNotify,
        required: true
      }
    },
    methods: {},
    components: {
      UserProfileLink,
      NotificationStatusReport
    },
    mounted(){

    }
  }
</script>

<template>
	<div class="order">
        <div class="pull-left">
          <div class="mv5" v-if="messageNotify.content.type === 'create'">
            {{messageNotify.content.name}} 创建了空间订单
          </div>

          <div class="mv5" v-if="messageNotify.content.type === 'sms'">
            {{messageNotify.content.name}} 发送了一次空间订单通知
          </div>

          <div class="mv5" v-if="messageNotify.content.type === 'edit'">
            {{messageNotify.content.name}} 修改了空间订单
          </div>

          <div class="mv5" v-if="messageNotify.content.type === 'space'">
            {{messageNotify.content.name}} 修改了房屋信息
          </div>

          <div class="mv5" v-if="messageNotify.content.type === 'archive'">
            {{messageNotify.content.name}} 将该空间订单归档
          </div>

          <div  class="mv5" v-if="messageNotify.content.type === 'status'">
            {{messageNotify.content.name}}
            将
            <span :style="'color:'+ spaceOrder.StatusMap[messageNotify.content.oldStatus].style">
			    	{{spaceOrder.StatusMap[messageNotify.content.oldStatus].name}}
			      </span>
            修改为
            <span :style="'color:'+ spaceOrder.StatusMap[messageNotify.content.status].style">
				      {{spaceOrder.StatusMap[messageNotify.content.status].name}}
			      </span>
          </div>

          <div class="mv5" v-if="messageNotify.content.type === 'HAVE_PAY'">
            {{messageNotify.content.name}}通过{{messageNotify.content.payType}}一笔{{messageNotify.content.receivables}}的款项，金额为:￥{{conversionNumber(messageNotify.content.amount)}}
          </div>

          <div class="mv5" v-if="messageNotify.content.type === 'REFUND'">
            {{messageNotify.content.name}}申请对{{messageNotify.content.receivables}}的退款，退款金额为:￥{{conversionNumber(messageNotify.content.amount)}}
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
	import {EntityType, EntityTypeMap, EntityTypeList} from "../../common/model/core/type/EntityType";
  import SpaceOrder from "../../common/model/spaceOrder/SpaceOrder";

	export default{
		data(){
			return {
				user: this.$store.state.user,
				EntityType,
        spaceOrder: new SpaceOrder(),
        StatusMap: SpaceOrder.prototype.StatusMap
			}
		},
		watch: {},
		props: {
			messageNotify: {
				type: MessageNotify,
				required: true
			}
		},
		methods: {
      conversionNumber(str) {
        let num = parseFloat(str);
        if(num === 'NaN') {
          return str;
        }
        return num.toFixed(2)
      }
    },
		components: {
			UserProfileLink,
			NotificationStatusReport
		},
		mounted(){

		}
	}
</script>
<style lang="less" rel="stylesheet/less">
  .order{
    max-width: 1435px;
  }
</style>

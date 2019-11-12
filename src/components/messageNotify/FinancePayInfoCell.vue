<template>
  <div class="order">
    <div class="pull-left">
      <div class="mv5" v-if="messageNotify.content.type === 'sms'">
        {{messageNotify.content.name}} 发送了一次催款通知
      </div>

      <div class="mv5" v-if="messageNotify.content.type === 'create'">
        {{messageNotify.content.name}} 创建了付款信息单
      </div>

      <div class="mv5" v-if="messageNotify.content.type === 'edit'">
        {{messageNotify.content.name}} 创建了付款信息单
      </div>

      <div class="mv5" v-if="messageNotify.content.type === 'archive'">
        {{messageNotify.content.name}} 将该付款信息单归档
      </div>

      <div class="mv5" v-if="messageNotify.content.type === 'finance'">
        {{messageNotify.content.name}} 收到一笔{{messageNotify.content.receivables}}款项￥{{conversionNumber(messageNotify.content.amount)}}
      </div>

      <div class="mv5" v-if="messageNotify.content.type === 'PAY_NOTIFY'">
        {{messageNotify.content.name}} 发送了一次付款通知
      </div>

      <div class="mv5" v-if="messageNotify.content.type === 'PAY_REMINDER'">
        {{messageNotify.content.name}} 发送了一次催款通知
      </div>

      <div class="mv5" v-if="messageNotify.content.type === 'isClearZero'">
        {{messageNotify.content.name}} 将滞纳金清零
      </div>

      <div class="mv5" v-if="messageNotify.content.type === 'HAVE_PAY'">
        {{messageNotify.content.name}}通过{{messageNotify.content.payType}}一笔{{messageNotify.content.receivables}}的款项，金额为:￥{{conversionNumber(messageNotify.content.amount)}}
      </div>

      <div class="mv5" v-if="messageNotify.content.type === 'REFUND'">
        {{messageNotify.content.name}}申请对{{messageNotify.content.receivables}}的退款，退款金额为:￥{{conversionNumber(messageNotify.content.amount)}}
      </div>

      <div class="mv5" v-if="messageNotify.content.type === 'CANCEL'">
        {{messageNotify.content.name}}取消了对{{messageNotify.content.receivables}}的申请
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
	import {Action, ActionMap, ActionList} from "../../common/model/core/action/Action";

	export default{
		data(){
			return {
				user: this.$store.state.user,
				EntityType,
				Action
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
			getBillReceipt(remark){
				if (remark) {
					return JSON.parse(remark);
				} else {
					return {
						id: 0,
						name: "未知错误！"
					}
				}
			},
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

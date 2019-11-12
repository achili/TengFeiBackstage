<template>
	<div class="row" style="color: #ffffff;font-size: 14px;text-align: center;">
		<!--<a href="javascript:void(0)" v-if="financeOfficePay.uuid" title="通知详情" @click.stop.prevent="$router.push('/by/finance/bill/receipt/detail/'+financeOfficePay.uuid)">-->
			<!--{{financeOfficePay.name}}-->
		<!--</a>-->
		<div class="col-md-3 mt5 mh5 cursor" title="邮件" v-if="notify.mailEnable">
      <div  style="background-color: limegreen;" v-if="showEmail">
        <i class="fa fa-at f18"></i>
        邮件发送成功
      </div>
			 <div v-else style="background-color: mediumblue">
				<i class="fa fa-at f18"></i>
				邮件准备发送
			 </div>
		</div>
		<div class="col-md-3 mt5 mh5 cursor" title="站内信" v-if="notify.messageEnable" >
      <div  style="background-color: limegreen;" v-if="showMessage">
        <i class="fa fa-envelope-o f18"></i>
        站内信发送成功
      </div>
      <div v-else style="background-color: mediumblue">
				<i class="fa fa-envelope-o f18"></i>
				站内信准备发送
			</div>
		</div>
		<div class="col-md-3 mt5 mh5 cursor" title="短信" v-if="notify.smsEnable" >
      <div  style="background-color: limegreen;" v-if="showSMS">
        <i class="fa fa-mobile f18"></i>
        短信发送成功
      </div>
			<div style="background-color: mediumblue" v-else >
				<i class="fa fa-mobile f18"></i>
				短信准备发送
			</div>
		</div>

	</div>

</template>

<script>

  import Notify from "../../../../common/model/finance/Notify";

  export default {
    data () {
      return {}
    },
    props: {
      notify:{
        type: Notify,
        required: true
      },
      showEmail:{
        type: Boolean,
        required: false
      },
      showMessage:{
        type: Boolean,
        required: false
      },
      showSMS:{
        type: Boolean,
        required: false
      }
    },
    computed: {},
    components: {},
    methods: {},
    mounted(){
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>

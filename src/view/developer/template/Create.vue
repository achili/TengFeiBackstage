<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-xs-12">
        <div class="pull-left f24">
          <span>创建消息模板</span>
        </div>
			</div>
		</div>

    <NbSlidePanel slot="back">
      <span slot="heading">
        <i class="fa fa-moon-o"></i>
        基本信息
      </span>
      <div slot="body">
        <div class="row">
          <div class="col-md-12">

            <NbForm :httpForm="httpCreate" :successCallback="successCallback"></NbForm>

          </div>
        </div>
      </div>
    </NbSlidePanel>

	</div>
</template>
<script>
  import NbSlidePanel from "../../../components/NbSlidePanel";
  import Template from "../../../common/model/template/Template";
  import NbForm from "../../../components/NbForm";
  import {Notification} from 'element-ui';
  import FormItem from "../../../common/model/_base/FormItem";

	export default {
		data () {
		  let httpCreate = new Template().getHttpCreate();
			return {
        template: new Template(),
        httpCreate: httpCreate,
        contentFrom: httpCreate.getFormItem('content'),
        typeFrom: httpCreate.getFormItem('type')
      }
		},
		components: {
      NbSlidePanel,
      NbForm
    },
		computed: {

    },
		watch: {
		  "typeFrom.value"(newVal) {
        if(newVal === Template.prototype.Type.MAIL) {
          this.contentFrom.type = FormItem.prototype.Type.RICH_TEXT;
        }
        if(newVal === Template.prototype.Type.PDF) {
          this.contentFrom.type = FormItem.prototype.Type.CODE_MIRROR;
        }
        if(newVal === Template.prototype.Type.SMS) {
          this.contentFrom.type = FormItem.prototype.Type.TEXT_AREA;
        }
      }
    },
		methods: {
      successCallback() {
        let that = this;
        Notification.success({
          message: that.template.editMode ? '修改成功！' : '创建成功！'
        });
        this.$router.push({path:'/developer/template/list'})
      }
    },
		mounted(){
		  let that = this;
		  if(this.$route.query.uuid) {
		    this.httpCreate.editMode = true;
		    this.template.uuid = this.$route.query.uuid;
        this.template.httpDetail(function () {
          that.httpCreate.backFill({template: that.template});
        });
      }
    }
	}
</script>

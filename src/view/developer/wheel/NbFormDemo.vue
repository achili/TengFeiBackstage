<template>
	<div>
		<div class="alert alert-info">
			<p><b>NbFrom</b></p>
      <div>NbFrom组件在不断的更新完善中，已完成的功能:</div>
      <ul>
        <li>单行文本框、多行文本框、兼容IE的数字输入框，以及文件上传功能</li>
        <li>文本输入框带有实时监测字符串，过长过短均有提示</li>
        <li>数字输入框兼容IE，并且支持手动更改数字大小及按钮改变大小</li>
        <li>文件上传在NbTank的基础上增加了文件拖拽上传功能</li>
      </ul>
      核心:
      <ul>
        <li>FormItem 对表单及输入框处理
          <ul>
            <li>接收八个参数:type(表单类型)，description(表单说明)，isRequired(是否必填)，name(提交名)，fillKey(调用backFill的选用属性)，defaultValue(默认值)，rule(规则，Obj)，beforeSubmit(提交前预处理)</li>
          </ul>
        </li>
        <li>HttpForm 对表单及文件提交处理
          <ul>
            <li>其中的constructor方法接收三个参数:type(创建修改url)，url(接口路径)，form(上传的内容、Array)</li>
          </ul>
        </li>
        <li>Tank 文件上传处理
          <ul>
            <li>
              在文件上传中对文件作出限制filter限制文件类型，maxSize限制文件最大体积，procedure上传文件处于那个阶段
            </li>
          </ul>
        </li>
      </ul>
		</div>

    <NbSlidePanel slot="back">
      <span slot="heading">
        <i class="fa fa-moon-o"></i>
        静夜思
      </span>
      <div slot="body">
        <div class="row">
          <div class="col-md-12">

            <NbForm :httpForm="httpDome" :successCallback="successCallback" :errorCallback="errorCallback"></NbForm>
          </div>
        </div>
      </div>
    </NbSlidePanel>
	</div>
</template>
<script>
  import NbForm from "../../../components/NbForm";
  import NbSlidePanel from "../../../components/NbSlidePanel";

  import Article from "../../../common/model/article/Article";
  import {Notification} from 'element-ui'

	export default{
		data(){
			return {
        article: new Article(),
        httpDome: new Article().getHttpDome()
			}
		},
		watch: {},
		methods: {
      successCallback(res) {
        Notification.success({
          message: '提交成功!'
        })
      },
      errorCallback() {
        Notification.error({
          message: '提交失败!'
        })
      }
    },
		components: {
      NbForm,
      NbSlidePanel
		},
		mounted(){
		}
	}
</script>

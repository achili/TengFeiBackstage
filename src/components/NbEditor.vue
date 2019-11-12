<template>
	<div>
		<div ref="editor" :style="style" @dragover="dragover" @dragenter="dragenter" @drop="drop" class="progrconter">
		</div>
    <div class="progress progr"  v-if="tank.procedure === tank.Procedure.UPLOADING">
      <div :style="'width: '+(tank.progress*100)+'%'" class="progress-bar progress-bar-primary">
        <span class="progrfs">{{(tank.progress * 100).toFixed(1)}}%</span>
      </div>
    </div>
    <div v-if="tank.procedure === tank.Procedure.UPLOADING">
      <div class="progrs">
        {{tank.speed | humanFileSize}}/s
      </div>
    </div>
	</div>

</template>

<script>
	import WangEditor from "../common/fork/wangeditor/WangEditor";
	import $ from "jquery";

	import PluginAlignCenter from "../common/fork/wangeditor/PluginAlignCenter";
	import PluginAlignJustify from "../common/fork/wangeditor/PluginAlignJustify";
	import PluginAlignLeft from "../common/fork/wangeditor/PluginAlignLeft";
	import PluginAlignRight from "../common/fork/wangeditor/PluginAlignRight";
	import PluginIndent from "../common/fork/wangeditor/PluginIndent";
	import PluginHr from "../common/fork/wangeditor/PluginHr";
	import PluginImage from "../common/fork/wangeditor/PluginImage";
	import PluginAttachment from "../common/fork/wangeditor/PluginAttachment";
  import PluginImportTemplate from '../common/fork/wangeditor/PluginImportTemplate'
  import PluginXiuMi from '../common/fork/wangeditor/PluginXiuMi'
  import Tank from "../common/model/tank/Tank";

	//对齐
	PluginAlignCenter(WangEditor, $);
	PluginAlignJustify(WangEditor, $);
	PluginAlignLeft(WangEditor, $);
	PluginAlignRight(WangEditor, $);

	//分割线插件
	PluginHr(WangEditor, $);
	//缩进插件
	PluginIndent(WangEditor, $);
	//图片上传插件
	PluginImage(WangEditor, $);
	//附件上传插件
	PluginAttachment(WangEditor, $);
  //导入模板插件
  PluginImportTemplate(WangEditor, $);
  //秀米编辑器插件
  PluginXiuMi(WangEditor, $);

	let Procedure = {
		"FREE": 0,
		"FETCHING_UPLOAD_TOKEN": 1,
		"UPLOADING": 2,
		"FETCHING_DOWNLOAD_TOKEN": 3,
		"DOWNLOADING": 4
	};

	export default {
		data() {
			return {
				content: null,
				editor: null,
        tank: new Tank()
			}
		},
		props: {
			value: {
				type: String,
				required: false
			},
			height: {
				type: String,
				required: false,
				"default"() {
					return "300px";
				}
      },
      isAdvanced: {
        type: Boolean,
        required: false,
        'default' () {
          return false
        }
      }
		},
		computed: {
			style(){
				return "height:" + this.height;
			}
		},
		methods: {
			insert(text){

				this.editor.command(null, 'insertHtml', text);
			},
      dragover: function (e) {
        e.stopPropagation();
        e.preventDefault();
      },
      dragenter: function (e) {
        e.stopPropagation();
        e.preventDefault();
      },
      drop: function (e) {
        e.stopPropagation();
        e.preventDefault();
        let dt = e.dataTransfer;
        this.uploadFile(dt.files[0]);
      },
      uploadFile: function (file) {
        let that = this;
        this.tank.file = file;
        this.tank.httpUpload(function (response) {
          console.error('成功！');
          let imgHtml = '<img src="' + that.tank.url + '"/>';
          that.editor.command(null, 'insertHtml', imgHtml);
          that.clear();
        }, function () {
          console.error('上传失败啦');
          that.clear()
        })
      },
      clear() {
        let that = this;
        that.tank.clear();
        that.$refs['refFile'].value = ''
      }
		},
		watch: {
			"value"(newVal, oldVal){

				if (newVal !== this.content) {
					this.content = newVal;

					this.editor.$txt.html(this.content);
				}


			}
		},
		mounted() {
			let that = this;
			this.editor = new WangEditor(this.$refs.editor);

      if (this.isAdvanced) {
        this.editor.config.menus = [
          'source',
          'bold',
          'underline',
          'italic',
          'strikethrough',
          'hr',
          'eraser',
          'forecolor',
          'bgcolor',
          'quote',
          'fontfamily',
          'fontsize',
          'head',
          'indent',
          'unorderlist',
          'orderlist',
          'nbalignleft',
          'nbaligncenter',
          'nbalignright',
          'nbalignjustify',
          'link',
          'unlink',
          'table',
          'image',
          'attachment',
          'insertcode',
          'importtemplate',
          'undo',
          'redo',
          'fullscreen',
          'xiumi'
        ]
      } else {
        this.editor.config.menus = [
          'source',
          'bold',
          'underline',
          'italic',
          'strikethrough',
          'hr',
          'eraser',
          'forecolor',
          'bgcolor',
          'quote',
          'fontfamily',
          'fontsize',
          'head',
          'indent',
          'unorderlist',
          'orderlist',
          'nbalignleft',
          'nbaligncenter',
          'nbalignright',
          'nbalignjustify',
          'link',
          'unlink',
          'table',
          'image',
          'attachment',
          'insertcode',
          'undo',
          'redo',
          'fullscreen',
          'xiumi'
        ]
      }
			// 普通的自定义菜单



			// 配置 onchange 事件
			this.editor.onchange = function () {

				that.content = that.editor.$txt.html();
				// 编辑区域内容变化时，实时打印出当前内容
				that.$emit('input', that.content);
			};

			// 关闭菜单栏fixed
			this.editor.config.menuFixed = false;

			this.editor.create();

			//二次开发全屏功能
			this.editor.fullScreenClick = function () {
				$("body").addClass("editor-fullscreen");
			}
			this.editor.fullScreenClickSelected = function () {
				$("body").removeClass("editor-fullscreen");
			}


		},
		beforeDestroy() {
			if (this.editor) {
				this.editor.destroy();
			}

		}
	}


</script>

<style lang="less">
	@import "../common/fork/wangeditor/css/wangEditor";

	.wangEditor-txt img {
		max-width: 100%;
	}

	.editor-fullscreen {
    overflow: hidden !important;
	}

	.editor-fullscreen .navbar-static-side {
    display: none !important;
	}
  .progrconter{
    position: relative;
  }
  .progr{
    height: 15px;
    width: 360px;
    position: absolute;
    bottom: -19px;
    left: 17px;
    z-index: 66;
  }
  .progrs{
    position: absolute;
    left: 385px;
    bottom: -2px;
    z-index: 66;
  }
  .progrfs{
    font-size: 8px;
  }
</style>

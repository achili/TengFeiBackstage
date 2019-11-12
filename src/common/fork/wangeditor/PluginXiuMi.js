import WEXiuMi from './WEXiuMi.vue'
import Vue from 'vue'

export default function PluginAttachment(WangEditor, $) {

	// 用 createMenu 方法创建菜单
	WangEditor.createMenu(function (check) {

		// 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
		let menuId = 'xiumi';

		// check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
		if (!check(menuId)) {
			return;
		}

		// this 指向 editor 对象自身
		let editor = this;

		// 创建 menu 对象
		let menu = new WangEditor.Menu({
			editor: editor,  // 编辑器对象
			id: menuId,  // 菜单id
			title: '秀米编辑器', // 菜单标题

			// 正常状态和选中状态下的dom对象，样式需要自定义
			$domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-xiumi-editor"></i></a>'),
			$domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-xiumi-editor"></i></a>')
		});


		let template = `
      <div><WEXiuMi :insertcallback="insertFunc" :cancelcallback="cancelFunc"/></div>
    `;


		let $panelContent = $(template);


		menu.dropPanel = new WangEditor.DropPanel(editor, menu, {
			$content: $panelContent,
			width: 1000,
			height: 600,
			onRender: function () {
				new Vue({
					el: $panelContent[0],
					data: function () {
						return {}
					},
					components: {
						'wexiumi': WEXiuMi
					},
					methods: {
						insertFunc(data){
							editor.command(null, 'insertHtml', data);
						},
						cancelFunc(){
							menu.dropPanel.hide();
						}
					},
					mounted(){

					}
				});
			}
		});


		// 增加到editor对象中
		editor.menus[menuId] = menu;
	});

}

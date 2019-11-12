<template>
	<div class="we-xiumi">
    <iframe id="xiumi"
            src="https://xiumi.us/studio/v5#/paper">
    </iframe>
	</div>

</template>

<script>

	export default {
		data(){
			return {

			}
		},
		computed: {

		},
		props: {
			//在这种模式下不能使用大写。非常奇怪
			insertcallback: {
				type: Function,
				required: true
			},
			cancelcallback: {
				type: Function,
				required: true
			}
		},

		components: {

		},
		watch: {},
		methods: {
			insertFunc(data){
				this.insertcallback(data);
			},
			cancelFunc(){
				this.cancelcallback();
			}
		},
		mounted(){
      let xiumi = document.getElementById('xiumi');
      let xiumi_url = "https://xiumi.us";
      let that = this;
      xiumi.onload = function () {
        xiumi.contentWindow.postMessage('ready', xiumi_url);
      };
      window.addEventListener('message', function (event) {
        if (event.origin == xiumi_url) {
          that.insertFunc(event.data);
          // editor.execCommand('insertHtml', event.data);
          // editor.fireEvent("catchRemoteImage");
          // dialog.close();
        }
      }, false);
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.we-xiumi {
    html, body {
      padding: 0;
      margin: 0;
    }

    #xiumi {
      position: absolute;
      width: 100%;
      height: 100%;
      border: none;
      box-sizing: border-box;
    }
	}

</style>





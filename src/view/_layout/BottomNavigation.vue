<template>
	<div class="bottom-navigation text-center f10">
		<div class="mr10 f10">
			<span v-html="preference.footerLine1"></span>
		</div>
		<div class="mr10">
			<a class="mr10 f12" v-html="preference.footerLine2" href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action;jsessionid=TH2nUO5n_rIfSzf3JPv-dXJu0QwPmy3WZ_bcyIqennDMM580SE_3!983800137"></a>
      <span class="mr10">
		 		<a  href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32059002001990" style="position: relative;">
           <img src="../../assets/img/gongxinbu.png" style="height:18px;top:-3px;position:absolute;vertical-align:baseline;" data-spm-anchor-id="a211oj.12026779/N.a2226n1.i0.3f0e3a9aBYMXnl">
          <span class="ml20">{{preference.footerLine3}}</span>
        </a>

        <a href="http://61.155.26.218/websiteMark?siteid=1031377142161604608&amp;type=1" target="_blank"><img src="http://61.155.26.218/resources/images/marker/szicbok.gif" style="height: 23px;
    margin-top: -6px;margin-left: 5px;"></a>
    </span>
    </div>


		<span>

		</span>
	</div>
</template>
<script>
  export default {
    name: 'bottom-navigation',
    data(){
      return{
        preference: this.$store.state.preference
      }
    }



  }
</script>
<style lang="less" rel="stylesheet/less">
	@import "../../assets/css/global/variables";

	.bottom-navigation{
		position: fixed;
		height: 40px;
		line-height: 20px;
		bottom: 0;
		right: 0;
		z-index: 80;
		left: @sidebar-width;
		padding: 0 20px;
		border-top: 1px solid #eee;
		//大屏幕
		@media (min-width: @screen-sm-min) {
			left: @sidebar-width;
		}
		//小屏幕
		@media (max-width: @screen-xs-max) {
			left: 0;
		}

		&.show-drawer {
			//大屏幕
			@media (min-width: @screen-sm-min) {
				left: @sidebar-width;
			}

			//小屏幕
			@media (max-width: @screen-xs-max) {
				left: 0;
			}
		}
	}
</style>

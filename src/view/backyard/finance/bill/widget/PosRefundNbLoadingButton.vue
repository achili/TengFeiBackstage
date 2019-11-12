<template>
	<span class="nb-loading-button">
		<button v-show="!entity.editMode" :class="createClass" @click="callback" :disabled="entity.loading">
      <!--<i :class="createIcon" v-show="!entity.loading"></i>-->
      <!--<i class="fa fa-spinner fa-spin" v-show="entity.loading"></i>-->
      {{createText}}
    </button>
    <button v-show="entity.editMode" :class="saveClass" @click="callback"
            :disabled="entity.loading">
      <!--<i :class="saveIcon" v-show="!entity.loading"></i>-->
      <!--<i class="fa fa-spinner fa-spin" v-show="entity.loading"></i>-->
      {{saveText}}
    </button>
	</span>

</template>
<script>

	/**
	 * 该控件是提供创建和保存时候的功能。当正在保存或者正在创建的时候呈现菊花。
	 */
	import Base from "../../../../../common/model/_base/Base";

	export default{
		data(){
			return {
			}
		},
		watch: {},
		props: {
			entity: {
				type: Base,
				required: true
			},
			callback: {
				type: Function,
				required: true
			},
      createText: {
        type: String,
        required: false,
        "default": "发起退款"
      },
      saveText: {
        type: String,
        required: false,
        "default": "保存"
      },
			createClass:{
				type: String,
				required: false,
				"default":"pull-right f16 mb10 btn btn-theme"
			},
			saveClass:{
				type: String,
				required: false,
				"default":"pull-right f16 mb10 btn btn-theme"
			},
			createIcon:{
				type: String,
				required: false,
				"default":"fa fa-plus"
			},
			saveIcon:{
				type: String,
				required: false,
				"default":"fa fa-save"
			}
		},
		methods: {

		},
		components: {},
		mounted(){

		}
	}
</script>
<style lang="less" rel="stylesheet/less">
  .nb-loading-button {
    button{
      width: 100px;
      height: 37px;
    }
  }
</style>

<template>
	<div class="panel nb-slide-panel" :class="'panel-'+type">
		<div class="panel-heading cursor" @click.stop.prevent="clickTitle">
			<span v-if="title">{{title}}</span>
			<slot name="heading"></slot>
			<span class="pull-right">
				<slot name="actions"></slot>
				<span class="ml5">
					<i class="fa fa-angle-up" v-show="show"></i>
					<i class="fa fa-angle-down" v-show="!show"></i>
				</span>
			</span>
		</div>
		<NbExpanding>
			<div class="panel-body" v-show="show">
				<slot name="body"></slot>
				<slot></slot>
			</div>
		</NbExpanding>
	</div>
</template>

<script>
	import NbExpanding from "./NbExpanding.vue";
	export default {
		data () {
			return {
				show: true
			}
		},
		components: {
			NbExpanding
		},
		props: {
			title: {
				type: String,
				required: false
			},
			type: {
				type: String,
				required: false,
				"default"() {
					return "default"
				}
			},
			initShow: {
				type: Boolean,
				required: false,
				"default"() {
					return true;
				}
			},
      onOffCallback: {
			  type: Function,
        required: false,
        "default" : function () {}
      }
		},
		methods: {
      clickTitle() {
        this.show = !this.show;
        this.onOffCallback(this.show);
      }
    },
    created() {
      this.show = this.initShow;
    },
		mounted(){

		}
	}
</script>

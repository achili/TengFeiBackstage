<template>
	<div v-show="isActive && show" class="nb-tab-panel">
		<slot/>
	</div>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				required: true
			},
			show: {
				type: Boolean,
				required: false,
				"default": true
			}
		},
		data: () => ({
			isActive: false
		}),
		computed: {}
	};
</script>

<template>
	<span>
		<a style="color: #00b5e2;" @click="preventBubbles">
			{{name}}
		</a>
	</span>
</template>
<script>
  import Base from "../common/model/_base/Base";

  /**
   * 使用时注意配上 getLink() 方法
   */
  export default{
    data(){
      return {
        name: ""
      }
    },
    watch: {},
    props: {
      entity: {
        type: Base,
        required: true
      }
    },
    methods: {
      preventBubbles (e) {
        this.$router.push(this.entity.getLinkPath(this.$store.state.route.params.by));
      }
    },
    components: {},
    mounted(){
      this.name = this.entity.getLinkName();
    }
  }
</script>

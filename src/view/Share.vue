<template>
  <div id="body">
    <router-view/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        user: this.$store.state.user
      }
    },
    computed: {
      config () {
        return this.$store.state.config
      }
    },
    watch: {

    },
    components: {
    },
    methods: {

    },
    created () {

    },
    mounted () {

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .body{

  }
</style>

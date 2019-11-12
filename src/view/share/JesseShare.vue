<template>
  <div id="backgroundC" class="jesse-share">
    <div v-if="curUser">
      <h1>{{curUser}}.<br/>I am watching you.</h1>
      <img v-bind:src= "curAvatar">
    </div>
    <div v-else-if="curEmail" class="middleCenter">
      <h1>{{curEmail}}.<br/>I am watching you.</h1>
      <img v-bind:src= "curAvatar">
    </div>
    <h2 v-else class="middleCenter">You need to be logged in to see the full content</h2>
    <p><a href="../solomon/share">Click here</a> to take a sneak peek a solomon's site</p>
  </div>
</template>

<script>

  export default {
    data (){
      return {
        loginStatus : this.$store.state.isLogin,
        curUser : this.$store.state.user.name,
        curAvatar : this.$store.state.user.getAvatarUrl(),
        curEmail : this.$store.state.user.email,
        curPhone : this.$store.state.user.phone
      }
    },
    components: {},
    methods: {},
    mounted () {
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

  .jesse-share {
    &#backgroundC {
      background-color: black;
      text-align:center;
      max-height: available;
    }
    h1 {
      color: white;
      vertical-align:middle;
      horizontal-align:middle;
      font-size: 96px;
      font-weight: bold;
    }
    p {
      color: white;
    }
    .middleCenter {
      vertical-align: middle;
      horizontal-align: middle;
    }
  }


</style>

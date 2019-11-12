<template>
  <div class="mb10">
    <a href="javascript:void(0)" @click="clickBack">
      <i class="fa fa-arrow-left f15"></i>
    </a>
    <span @click="$router.push('/dev/dev-center')" v-if="isDev" class="cursor-pointer">
      开发中心
    </span>
    <span @click="$router.push('/by/by-center')" v-if="isBy" class="cursor-pointer">
      管理中心
    </span>
    <span @click="$router.push('/usr/usr-center')" v-if="isUsr" class="cursor-pointer">
      个人中心
    </span>

    <span v-for="tag in cachedViews" :key="tag.index" @click="menuTag(tag)" class="cursor-pointer">
      <i class="fa fa-caret-right f10"></i>
      {{tag.name}}
    </span>
  </div>
</template>
<script>
  import {startWith} from "../../common/filter/str";
  import router from "../../_router";

  export default {
    data(){
      return{
        visible:false
      }
    },
    computed:{
      cachedViews (){
        return this.$store.state.breadcrumbs;
      },
      isDev() {
        return startWith(this.$store.state.route.fullPath, "/dev");
      },
      isBy() {
        return startWith(this.$store.state.route.fullPath, "/by");
      },
      isUsr() {
        return startWith(this.$store.state.route.fullPath, "/usr");
      }
    },
    watch:{
      "$router"() {}
    },
    mounted(){},
    methods: {
      menuTag(tag){
        this.$router.push(tag.path);
      },
      clickBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
<style>
  .cursor-pointer{
    cursor: pointer;
  }
</style>

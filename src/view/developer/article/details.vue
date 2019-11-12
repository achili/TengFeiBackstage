<template>
  <div>
    <NbLoadingFrame :loading="article.detailLoading">
      <div>
        <h1>{{article.title}}</h1>
      </div>
      <div>
        <div v-html="article.content"></div>
      </div>
      <div>
        创建人:{{article.creator.name}}  邮箱:{{article.creator.email}}
      </div>
    </NbLoadingFrame>
  </div>
</template>

<script>
  import Article from "../../../common/model/article/Article";
  import NbLoadingFrame from "../../../components/NbLoadingFrame";

  export default {
    data () {
      return {
        article: new Article()
      }
    },
    components: {
      NbLoadingFrame
    },
    computed: {},
    watch: {},
    methods: {},
    mounted(){
      this.article.uuid = this.$route.query.uuid;
      this.article.httpDetail();
    }
  }
</script>

<style scoped>

</style>

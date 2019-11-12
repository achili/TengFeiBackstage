<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left f24">
          <span>标签详情</span>
        </div>
      </div>
    </div>

    <div class="row mt10">
        <div class="col-lg-6 col-lg-offset-2 col-md-10 col-md-offset-1">
          <div class="mail-box-header">

            <div class="pull-right">
              <button title="编辑" class="btn btn-success"
                      @click.stop.prevent="$router.push('/dev/article/tag/edit/'+ articleTag.uuid)">
                <i class="fa fa-pencil"></i>
                编辑
              </button>
            </div>

            <div class="mail-box m-t-md">
              <div>
                <h3>名称：{{articleTag.title}}</h3>
              </div>
              <div>
                <span v-show="articleTag.description">描述：{{articleTag.description}}</span>
                <span  v-show="!articleTag.description">描述：<span style="color: #ff9a9a;">未填写！</span></span>
              </div>
            </div>

          </div>
      </div>
    </div>

  </div>
</template>
<script>

  import ArticleTag from "../../../../common/model/article/ArticleTag";

  export default {

    data () {
      return {
        articleTag : new ArticleTag()
      }
    },
    components: {},
    props:{
    },
    methods: {},
    mounted(){
      this.articleTag.uuid = this.$route.query.uuid;
      this.articleTag.httpDetail();
    }
  }
</script>

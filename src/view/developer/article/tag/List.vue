<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left f24">
          <span>标签列表</span>
        </div>
        <div class="pull-right">
          <button class="btn btn-primary" @click.stop.prevent="$router.push('/dev/article/tag/create')">
            <i class="fa fa-send"></i>
            <span>创建标签</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row mt10">
      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">

        <div v-for="articleTag in pager.data"  class="bg-white p10 br4 mt10 cursor" :key="articleTag.uuid"
             @click.stop.prevent="$router.push({path:'/dev/article/tag/detail',query:{uuid:articleTag.uuid}})" >
          <div class="media">
            <div class="pull-right action-buttons">
              <a title="编辑" @click.stop.prevent="$router.push({path:'/dev/article/tag/edit',query:{uuid:articleTag.uuid}})">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a title="删除" href="javascript:void(0)" @click.stop.prevent="articleTag.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>
            <div class="media-body">

              <div class="cell-title">
                <span>{{articleTag.title}}</span>
              </div>
              <div class="cell-description cell-description-3">
                <span v-show="articleTag.description">描述：{{articleTag.description}}</span>
                <span v-show="!articleTag.description">描述：<span style="color: #ff9a9a;">未填写！</span></span>
              </div>
              <div class="cell-content mt5">
                <span class="mr10">创建者: <NbEntityLink :entity="articleTag.creator"></NbEntityLink></span>
                <span class="mr10">创建于: {{articleTag.createTime | simpleDateTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xs-12 mt20">
        <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>
    </div>
  </div>
</template>
<script>
  import Pager from "../../../../common/model/_base/Pager";
  import NbPager from "../../../../components/NbPager";
  import NbFilter from "../../../../components/filter/NbFilter";
  import NbEntityLink from "../../../../components/NbEntityLink";
  import ArticleTag from "../../../../common/model/article/ArticleTag";

  export default {
    data () {
      return {
        pager: new Pager(ArticleTag)
      }
    },
    components: {
      NbPager,
      NbFilter,
      NbEntityLink
    },
    computed: {},
    watch: {},
    methods: {
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      }
    },
    mounted(){
      this.pager.enableHistory();
      this.refresh();
    }
  }
</script>

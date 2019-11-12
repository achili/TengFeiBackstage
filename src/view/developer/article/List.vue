<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-xs-12">
				<div class="pull-left f24">
					<span>文章列表</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push({path:'/dev/article/create',query:{}})">
						<i class="fa fa-send"></i>
						<span>发布文章</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row mt10">
      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">

        <div v-for="article in pager.data"  class="bg-white p10 br4 mt10 cursor" :key="article.uuid" @click.stop.prevent="$router.push({path:'/dev/article/detail',query:{uuid:article.uuid}})">
          <div class="media">
            <div class="pull-right action-buttons">
              <a title="编辑" href="javascript:void(0)" @click.stop.prevent="goEdit(article.uuid)">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a title="删除" href="javascript:void(0)" @click.stop.prevent="goDel(article)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>
            <div class="media-body">

              <div class="cell-title">
                <span>{{article.title}}</span>
              </div>
              <div class="cell-description cell-description-3">
                {{article.digest}}
              </div>
              <div class="cell-content mt5">
                <span class="mr10">创建者: <NbEntityLink :entity="article.creator"></NbEntityLink></span>
                <span class="mr10">创建于: {{ article.createTime | humanTime }}</span>
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
  import Pager from "../../../common/model/_base/Pager";
  import Article from "../../../common/model/article/Article";
  import NbPager from "../../../components/NbPager";
  import NbFilter from "../../../components/filter/NbFilter";
  import NbEntityLink from "../../../components/NbEntityLink";

	export default {
		data () {
			return {
        pager: new Pager(Article),
        article: new Article()
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
      },
      goEdit(e){
        this.$router.push({path:'/dev/article/create',query:{uuid:e}});
      },
      goDel(article){
        let that = this;
        article.confirmDel(function () {
          that.refresh();
        });
      }
    },
		mounted(){
      this.pager.enableHistory();
      this.refresh();
    }
	}
</script>

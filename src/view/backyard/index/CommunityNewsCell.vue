<template>
  <div class="row home-news-list-cell">

    <div class="col-xs-12">
      <div class="media">
        <div class="pull-right">
          <div class="poster-block" :style="'background-image:url('+communityNews.posterUrl+')'" ></div>
        </div>
        <div class="media-body">
          <div class="cell-title">
            <a title="资讯详情" href="javascript:void(0)" @click.stop.prevent="$router.push({path:'/by/community/news/detail',query:{uuid:communityNews.uuid}})">
              {{communityNews.title}}
            </a>
          </div>
          <div class="cell-description">
            {{communityNews.subtitle}}
          </div>
          <div class="cell-content">
            <span class="ml10">
						 <i class="fa fa-clock-o"></i> {{communityNews.createTime | humanTime}}
						</span>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>

  import CommunityNews from "../../../common/model/community/CommunityNews";

  export default {
    data () {
      return {}
    },
    components: {
    },
    props: {
      communityNews: {
        type: CommunityNews,
        required: true
      }
    },
    methods: {
      open(href){
        window.open(href);
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .home-news-list-cell {
    .media {
      padding: 20px 0;
      border-bottom: 1px solid #eeeeee;
      .poster-block {
        background-position: center;
        background-size: cover;
        width: 150px;
        height: 100px;
        cursor: pointer;
      }
      .cell-description {
        margin: 15px 0;
      }
    }
  }
</style>



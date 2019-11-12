<template>
  <div class="row home-article-list-cell">

    <div class="col-xs-12" >
      <div class="media" @click.stop.prevent="$router.push({path:'/by/community/posts/detail',query:{uuid:communityPosts.uuid}})">
        <div class="pull-left">
          <div class="poster-block" v-if="communityPosts.creator.avatarUrl" :style="'background-image:url('+communityPosts.creator.avatarUrl+')'"></div>
          <img style="border-radius:50%; overflow:hidden;width: 100px;height: 100px"  v-show="!communityPosts.creator.avatarUrl" src="../../../assets/img/avatar.png">
        </div>
        <div class="media-body">
          <div class="cell-title" >
            {{ communityPosts.creator.name }}
          </div>
          <div class="cell-description">
            {{ communityPosts.content }}
          </div>
          <div class="cell-content">
            <span class="ml10">
						 <i class="fa fa-clock-o"></i> {{ communityPosts.createTime| humanTime }}
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import CommunityPosts from "../../../common/model/community/CommunityPosts";

  export default {
    data () {
      return {}
    },
    components: {
    },
    props: {
      communityPosts: {
        type: CommunityPosts,
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
  .home-article-list-cell {
    .media {
      cursor:pointer;
      padding: 20px 0;
      border-bottom: 1px solid #eeeeee;
      .poster-block {
        background-position: center;
        background-size: cover;
        border-radius:50%;
        overflow:hidden;
        width: 100px;
        height: 100px;
        cursor: pointer;
      }
      .cell-title, .tag-span, .type-span {
        cursor: pointer;
      }
      .cell-description {
        margin: 15px 0;
      }
    }
  }
</style>



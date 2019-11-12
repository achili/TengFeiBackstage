<template>
  <div class="row home-events-list-cell">

    <div class="col-xs-12">
      <div class="media">
        <div class="pull-left">
          <div class="poster-block" :style="'background-image:url('+communityEvents.posterUrl+')'"></div>
        </div>
        <div class="media-body">
          <div class="cell-title" >
            <a title="活动详情" href="javascript:void(0)" @click.stop.prevent="$router.push({path:'/by/community/events/detail',query:{uuid:communityEvents.uuid}})">
              {{communityEvents.title}}
            </a>
          </div>
          <div class="cell-description">
            {{communityEvents.description}}
          </div>
          <div class="cell-content">
            <span class="ml10">
						 <i class="fa fa-clock-o"></i> {{ communityEvents.createTime| humanTime}}
						 <i class="fa fa-map-marker"></i> {{ communityEvents.address.address }}
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import CommunityEvents from "../../../common/model/community/CommunityEvents";

  export default {
    data () {
      return {}
    },
    components: {
    },
    props: {
      communityEvents: {
        type: CommunityEvents,
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
  .home-events-list-cell {
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
      .cell-title, .tag-span, .type-span {
        cursor: pointer;
      }
      .cell-description {
        margin: 15px 0;
      }
    }
  }
</style>



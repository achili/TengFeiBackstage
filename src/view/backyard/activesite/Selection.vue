<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeActiveSite" :initFilter="initFilter">

			<span slot="title">

				<span v-if="activeActiveSite.name && activeActiveSite.uuid">
					{{activeActiveSite.name}}
				</span>
				<span v-else>
					请选择一个活动场地...
				</span>
        <i class="fa fa-times-circle-o sort-close" v-show="activeActiveSite !== null && activeActiveSite.name !== null" @click="clear"></i>
			</span>

      <div class="mt10 p10 cursor br4 border" v-for="(activeSite,index) in pager.data" :key="index"
           @click.stop.prevent="clickItem(activeSite)"
           :class="{'bg-white':activeSite.uuid !== activeActiveSite.uuid,'bg-azure':activeSite.uuid === activeActiveSite.uuid}"
           slot="cells">
        <div>
          <span class="f15 mr30">{{activeSite.name}}</span>
          <span class="mr30">{{activeSite.createTime | simpleDateMinute}}</span>
          <span>{{activeSite.spaceRegional.name}}</span>
        </div>
      </div>

    </NbPagerSelection>


  </div>

</template>
<script>
  import NbPagerSelection from "../../../components/NbPagerSelection";
  import Pager from "../../../common/model/_base/Pager";
  import ActiveSite from "../../../common/model/activesite/ActiveSite";

  export default{
    data(){
      return {
        pager: new Pager(ActiveSite, 5)
      }
    },
    props: {
      activeActiveSite: {
        type: ActiveSite,
        required: true
      },
      initFilter: {
        type: Object,
        required: false
      }
    },
    watch: {},
    methods: {
      clickItem(activeSite){
        this.activeActiveSite.render(activeSite);
      },
      clear(){
        this.activeActiveSite.render(new ActiveSite());
      }

    },
    components: {
      NbPagerSelection
    },
    mounted(){
    }
  }
</script>

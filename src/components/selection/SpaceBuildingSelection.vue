<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeSpaceBuilding" :initFilter="initFilter">

			<span slot="title">

				<span v-if="activeSpaceBuilding.name && activeSpaceBuilding.uuid">
					{{activeSpaceBuilding.name}}
				</span>
				<span v-else>
					请选择所属大楼...
				</span>
        <i class="fa fa-times-circle-o sort-close" v-show="activeSpaceBuilding !== null && activeSpaceBuilding.name !== null" @click="clear"></i>
			</span>

      <div class="mb10 p10 cursor br4 border" v-for="(spaceBuilding,index) in pager.data" :key="index"
           @click.stop.prevent="clickItem(spaceBuilding)"
           :class="{'bg-white':spaceBuilding.uuid !== activeSpaceBuilding.uuid,'bg-azure':spaceBuilding.uuid === activeSpaceBuilding.uuid}"
           slot="cells">
        <div>
          <span class="f15">{{spaceBuilding.name}}</span>
          <span class="f15 ml5">{{spaceBuilding.spaceRegional.name}}</span>
        </div>
      </div>

    </NbPagerSelection>


  </div>

</template>
<script>
  import NbPagerSelection from "../../components/NbPagerSelection";
  import Pager from "../../common/model/_base/Pager";
  import SpaceBuilding from "../../common/model/space/SpaceBuilding";

  export default{
    data(){
      return {
        pager: new Pager(SpaceBuilding, 5)
      }
    },
    props: {
      activeSpaceBuilding: {
        type: SpaceBuilding,
        required: true
      },
      initFilter: {
        type: Object,
        required: false
      }
    },
    watch: {},
    methods: {
      clickItem(spaceBuilding){
        this.activeSpaceBuilding.render(spaceBuilding);
      },
      clear(){
        this.activeSpaceBuilding.render(new SpaceBuilding());
      }

    },
    components: {
      NbPagerSelection
    },
    mounted(){
    }
  }
</script>

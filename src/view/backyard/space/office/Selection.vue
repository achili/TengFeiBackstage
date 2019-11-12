<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeSpaceOffice" :initFilter="initFilter">

			<span slot="title">

				<span v-if="activeSpaceOffice.name && activeSpaceOffice.uuid">
					{{activeSpaceOffice.name}}
				</span>
				<span v-else>
					请选择独立办公室...
				</span>
        <i class="fa fa-times-circle-o sort-close" v-show="activeSpaceOffice !== null && activeSpaceOffice.name !== null" @click="clear"></i>
			</span>

      <div class="mb10 p10 cursor br4 border" v-for="(spaceOffice,index) in pager.data" :key="index"
           @click.stop.prevent="clickItem(spaceOffice)"
           :class="{'bg-white':spaceOffice.uuid !== activeSpaceOffice.uuid,'bg-azure':spaceOffice.uuid === activeSpaceOffice.uuid}"
           slot="cells">
        <div>
          <span class="f15">{{spaceOffice.name}}</span>
          <span v-if="spaceOffice.deleted === false" :style="'color:'+spaceOffice.getStatusStyle()">{{spaceOffice.getStatusName()}}</span>
          <span class="f14">{{spaceOffice.spaceRegional.name}}</span>
        </div>
      </div>

    </NbPagerSelection>


  </div>

</template>
<script>
  import NbPagerSelection from "../../../../components/NbPagerSelection";
  import Pager from "../../../../common/model/_base/Pager";
  import SpaceOffice from "../../../../common/model/space/SpaceOffice";

  export default{
    data(){
      return {
        pager: new Pager(SpaceOffice, 5)
      }
    },
    props: {
      activeSpaceOffice: {
        type: SpaceOffice,
        required: true
      },
      initFilter: {
        type: Object,
        required: false
      }
    },
    watch: {},
    methods: {
      clickItem(spaceOffice){
        this.activeSpaceOffice.render(spaceOffice);
      },
      clear(){
        this.activeSpaceOffice.render(new SpaceOffice());
      }

    },
    components: {
      NbPagerSelection
    },
    mounted(){
    }
  }
</script>

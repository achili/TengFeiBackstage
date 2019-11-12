<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeSpaceReservation" :initFilter="initFilter">

			<span slot="title">

				<span v-if="activeSpaceReservation.name && activeSpaceReservation.uuid">
					{{activeSpaceReservation.name}}
				</span>
				<span v-else>
					请选择会议室订单...
				</span>
        <i class="fa fa-times-circle-o sort-close" v-show="activeSpaceReservation !== null && activeSpaceReservation.name !== null" @click="clear"></i>
			</span>

      <div class="mb10 p10 cursor br4 border" v-for="(spaceReservation,index) in pager.data" :key="index"
           @click.stop.prevent="clickItem(spaceReservation)"
           :class="{'bg-white':spaceReservation.uuid !== activeSpaceReservation.uuid,'bg-azure':spaceReservation.uuid === activeSpaceReservation.uuid}"
           slot="cells">
        <div>
          <span class="f15" style="margin-right: 30px">{{spaceReservation.name}}</span>
          <span :style="'color:'+ spaceReservation.getStatusStyle()" style="margin-right: 30px">{{spaceReservation.getStatusName()}}</span>
          <span class="mr30">{{spaceReservation.creator.name}}</span>
          <span>{{spaceReservation.spaceRegional.name}}</span>
        </div>
      </div>

    </NbPagerSelection>


  </div>

</template>
<script>
  import NbPagerSelection from "../../../components/NbPagerSelection";
  import Pager from "../../../common/model/_base/Pager";
  import SpaceReservation from "../../../common/model/spacereservation/SpaceReservation";

  export default{
    data(){
      return {
        pager: new Pager(SpaceReservation,5)
      }
    },
    props: {
      activeSpaceReservation: {
        type: SpaceReservation,
        required: true
      },
      initFilter: {
        type: Object,
        required: false
      }
    },
    watch: {},
    methods: {
      clickItem(spaceReservation){
        this.activeSpaceReservation.render(spaceReservation);
      },
      clear(){
        this.activeSpaceReservation.render(new SpaceReservation());
      }

    },
    components: {
      NbPagerSelection
    },
    mounted(){

    }
  }
</script>

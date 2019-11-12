<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeConferenceRoom" :initFilter="initFilter">

			<span slot="title">

				<span v-if="activeConferenceRoom.name && activeConferenceRoom.uuid">
					{{activeConferenceRoom.name}}
				</span>
				<span v-else>
					请选择会议室...
				</span>
        <i class="fa fa-times-circle-o sort-close" v-show="activeConferenceRoom !== null && activeConferenceRoom.name !== null" @click="clear"></i>
			</span>

      <div class="mb10 p10 cursor br4 border" v-for="(conferenceRoom,index) in pager.data" :key="index"
           @click.stop.prevent="clickItem(conferenceRoom)"
           :class="{'bg-white':conferenceRoom.uuid !== activeConferenceRoom.uuid,'bg-azure':conferenceRoom.uuid === activeConferenceRoom.uuid}"
           slot="cells">
        <div>
          <span class="f15">{{conferenceRoom.name}}</span>
        </div>
      </div>

    </NbPagerSelection>


  </div>

</template>
<script>
  import NbPagerSelection from "../../components/NbPagerSelection";
  import Pager from "../../common/model/_base/Pager";
  import ConferenceRoom from "../../common/model/conferenceroom/ConferenceRoom";

  export default{
    data(){
      return {
        pager: new Pager(ConferenceRoom, 5)
      }
    },
    props: {
      activeConferenceRoom: {
        type: ConferenceRoom,
        required: true
      },
      initFilter: {
        type: Object,
        required: false
      }
    },
    watch: {},
    methods: {
      clickItem(conferenceRoom){
        this.activeConferenceRoom.render(conferenceRoom);
      },
      clear(){
        this.activeConferenceRoom.render(new ConferenceRoom());
      }

    },
    components: {
      NbPagerSelection
    },
    mounted(){
    }
  }
</script>

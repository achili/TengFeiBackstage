<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeProtocolSpace" :initFilter="initFilter">

			<span slot="title">

				<span v-if="activeProtocolSpace.accountName && activeProtocolSpace.uuid">
					{{activeProtocolSpace.accountName}}
				</span>
				<span v-else>
					请选择租赁合同...
				</span>
        <!--<i class="fa fa-times-circle-o sort-close" v-show="activeProtocolSpace !== null && activeProtocolSpace.name !== null" @click="clear"></i>-->
			</span>

      <div class="mb10 p10 cursor br4 border" v-for="(protocolSpace,index) in pager.data" :key="index"
           @click.stop.prevent="clickItem(protocolSpace)"
           :class="{'bg-white':protocolSpace.uuid !== activeProtocolSpace.uuid,'bg-azure':protocolSpace.uuid === activeProtocolSpace.uuid}"
           slot="cells">
        <div>
          <span class="f15" v-if="protocolSpace.mainType === '公司'">{{protocolSpace.companyName}}-{{protocolSpace.no}}</span>
          <span class="f15" v-else>{{protocolSpace.personName}}-{{protocolSpace.no}}</span>
          <span>起止时间：{{protocolSpace.startTime | simpleDate }}至{{protocolSpace.endTime | simpleDate }}</span>
          <span>{{protocolSpace.spaceRegional.name }}</span>
        </div>

      </div>

    </NbPagerSelection>


  </div>

</template>
<script>
  import NbPagerSelection from "../../../../components/NbPagerSelection";
  import Pager from "../../../../common/model/_base/Pager";
  import ProtocolSpace from "../../../../common/model/protocol/space/ProtocolSpace";

  export default{
    data(){
      return {
        pager: new Pager(ProtocolSpace, 5)
      }
    },
    props: {
      activeProtocolSpace: {
        type: ProtocolSpace,
        required: true
      },
      initFilter: {
        type: Object,
        required: false
      }
    },
    watch: {},
    methods: {
      clickItem(protocolSpace){
        this.activeProtocolSpace.render(protocolSpace);
      },
      clear(){
        this.activeProtocolSpace.render(new ProtocolSpace());
      }

    },
    components: {
      NbPagerSelection
    },
    mounted(){
    }
  }
</script>

<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeSpaceOrder" :initFilter="initFilter">

			<span slot="title">

				<span v-if="activeSpaceOrder.applyName && activeSpaceOrder.uuid">
					{{activeSpaceOrder.applyName}}
				</span>
				<span v-else>
					请选择一个空间申请...
				</span>
        <i class="fa fa-times-circle-o sort-close" v-show="activeSpaceOrder !== null && activeSpaceOrder.applyName !== null" @click="clear"></i>
			</span>

      <div class="mt10 p10 cursor br4 border" v-for="(spaceOrder,index) in pager.data" :key="index"
           @click.stop.prevent="clickItem(spaceOrder)"
           :class="{'bg-white':spaceOrder.uuid !== activeSpaceOrder.uuid,'bg-azure':spaceOrder.uuid === activeSpaceOrder.uuid}"
           slot="cells">
        <div>
          <span class="f15" style="margin-right: 20px">{{spaceOrder.applyName}}</span>
          <span :style="'color:'+ spaceOrder.getStatusStyle()" style="margin-right: 30px">{{spaceOrder.getStatusName()}}</span>
          <span style="margin-right: 20px" v-if="spaceOrder.characteristic === 'MOBILE_STATION'">移动办公桌</span>
          <span style="margin-right: 20px" v-if="spaceOrder.characteristic === 'INDEPENDENT_SPACE'">独立办公室</span>
          <span class="mr20">{{spaceOrder.createTime | simpleDateMinute}}</span>
          <span>{{spaceOrder.spaceRegional.name}}</span>
        </div>
      </div>

    </NbPagerSelection>


  </div>

</template>
<script>
  import NbPagerSelection from "../../../components/NbPagerSelection";
  import Pager from "../../../common/model/_base/Pager";
  import SpaceOrder from "../../../common/model/spaceOrder/SpaceOrder";
  import {simpleDateMinute} from "../../../common/filter/time"
  export default{
    data(){
      return {
        pager: new Pager(SpaceOrder, 5)
      }
    },
    props: {
      activeSpaceOrder: {
        type: SpaceOrder,
        required: true
      },
      initFilter: {
        type: Object,
        required: false
      }
    },
    watch: {},
    methods: {
      clickItem(spaceOrder){
        this.activeSpaceOrder.render(spaceOrder);
      },
      clear(){
        this.activeSpaceOrder.render(new SpaceOrder());
      }

    },
    components: {
      NbPagerSelection
    },
    mounted(){
    }
  }
</script>

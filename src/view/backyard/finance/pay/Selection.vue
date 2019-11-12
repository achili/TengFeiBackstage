<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeFinancePayInfo" :initFilter="initFilter">

			<span slot="title">

				<span v-if="activeFinancePayInfo.name && activeFinancePayInfo.uuid">
					{{activeFinancePayInfo.name}}
				</span>
				<span v-else>
					请选择付款通知书...
				</span>
        <i class="fa fa-times-circle-o sort-close" v-show="activeFinancePayInfo !== null && activeFinancePayInfo.name !== null" @click="clear"></i>
			</span>

      <div class="mb10 p10 cursor br4 border" v-for="(financePayInfo,index) in pager.data" :key="index"
           @click.stop.prevent="clickItem(financePayInfo)"
           :class="{'bg-white':financePayInfo.uuid !== activeFinancePayInfo.uuid,'bg-azure':financePayInfo.uuid === activeFinancePayInfo.uuid}"
           slot="cells">
        <div>
          <span class="f15">{{financePayInfo.name}}</span>
          <span class="f15">{{financePayInfo.spaceRegional.name}}</span>
        </div>
      </div>

    </NbPagerSelection>


  </div>

</template>
<script>
  import NbPagerSelection from "../../../../components/NbPagerSelection";
  import Pager from "../../../../common/model/_base/Pager";
  import FinancePayInfo from "../../../../common/model/finance/FinancePayInfo";

  export default{
    data(){
      return {
        pager: new Pager(FinancePayInfo, 5)
      }
    },
    props: {
      activeFinancePayInfo: {
        type: FinancePayInfo,
        required: true
      },
      initFilter: {
        type: Object,
        required: false
      }
    },
    watch: {},
    methods: {
      clickItem(financePayInfo){
        this.activeFinancePayInfo.render(financePayInfo);
      },
      clear(){
        this.activeFinancePayInfo.render(new FinancePayInfo());
      }

    },
    components: {
      NbPagerSelection
    },
    mounted(){
    }
  }
</script>

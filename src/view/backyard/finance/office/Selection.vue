<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeFinanceOfficePay" :initFilter="initFilter">

			<span slot="title">

				<span v-if="activeFinanceOfficePay.name && activeFinanceOfficePay.uuid">
					{{activeFinanceOfficePay.name}}
				</span>
				<span v-else>
					请选择会议室付款信息...
				</span>
        <!--<i class="fa fa-times-circle-o sort-close" v-show="activeFinanceOfficePay !== null && activeFinanceOfficePay.name !== null" @click="clear"></i>-->
			</span>

      <div class="mb10 p10 cursor br4 border" v-for="(financeOfficePay,index) in pager.data" :key="index"
           @click.stop.prevent="clickItem(financeOfficePay)"
           :class="{'bg-white':financeOfficePay.uuid !== activeFinanceOfficePay.uuid,'bg-azure':financeOfficePay.uuid === activeFinanceOfficePay.uuid}"
           slot="cells">
        <div>
          <span class="f15 cell-blue">{{financeOfficePay.name}}</span>
          <span class="f15">{{financeOfficePay.spaceRegional.name}}</span>
          <span class="f15 cell-danger">{{financeOfficePay.spaceReservation.conferenceRoom.name}}</span>
          <span class="f15 cell-danger">{{financeOfficePay.no}}</span>
          <span class="f15">{{financeOfficePay.spaceReservation.startTime | simpleDateMinute}}</span>
        </div>
      </div>

    </NbPagerSelection>


  </div>

</template>
<script>
  import NbPagerSelection from "../../../../components/NbPagerSelection";
  import Pager from "../../../../common/model/_base/Pager";
  import FinanceOfficePay from "../../../../common/model/finance/FinanceOfficePay";

  export default{
    data(){
      return {
        pager: new Pager(FinanceOfficePay, 5)
      }
    },
    props: {
      activeFinanceOfficePay: {
        type: FinanceOfficePay,
        required: true
      },
      initFilter: {
        type: Object,
        required: false
      }
    },
    watch: {},
    methods: {
      clickItem(financeOfficePay){
        this.activeFinanceOfficePay.render(financeOfficePay);
      },
      clear(){
        this.activeFinanceOfficePay.render(new FinanceOfficePay());
      }

    },
    components: {
      NbPagerSelection
    },
    mounted(){
    }
  }
</script>

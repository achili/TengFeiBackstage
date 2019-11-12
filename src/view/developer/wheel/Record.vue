<template>
  <div>
    <NbRecord ref="nbRecord" :entity="spaceOrder"></NbRecord>
  </div>
</template>

<script>
  import NbRecord from "../../../components/NbRecord"
  import SpaceOrder from "../../../common/model/spaceOrder/SpaceOrder";
    export default {
        name: "Record",
      data(){
          return{
            spaceOrder: new SpaceOrder()
          }
      },
      components:{
        NbRecord
      },
      methods:{
        refreshEvent(){
          this.$refs.nbRecord.refresh();
        }
      },
      mounted(){
      this.refreshEvent();
      }
    }
</script>

<style scoped>

</style>

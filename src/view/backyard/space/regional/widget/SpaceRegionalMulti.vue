<template>

  <div  @click="change">

		<span class="mr20 f14" v-for="(option,index) in list" :key="index" @click.stop.prevent="change" >
			<NbRadio :val="option.uuid" v-model="option.uuid" name="status" @click.stop.prevent="change"></NbRadio>
			<span class="f14 " style="color: #999999;">{{option.name}}</span>
		</span>

  </div>

</template>


<script>
  import Filter from '../../../../../common/model/_base/Filter'
  import NbRadio from '../../../../../components/NbRadio.vue'
  import SpaceRegional from "../../../../../common/model/space/SpaceRegional";

  export default {
    data () {
      return {
        list:null,
        spaceRegional: new SpaceRegional()
      }
    },
    props: {
      filters: {
        type: Array,
        required: false
      },
      // filter: {
      //   type: Filter,
      //   required: true,
      //   validator: function (value) {
      //
      //     if (value['type'] !== 'SELECTION') {
      //       console.error('type must be and `SELECTION` .');
      //       return false
      //     }
      //
      //     // if (!value.value) {
      //     //   value.value = []
      //     // }
      //     return true;
      //   }
      // },
      callback: {
        type: Function,
        required: false
      }
    },
    watch: {
      "option.uuid"(){
        this.change();
      }
    },
    computed: {},
    components: {
      NbRadio
    },
    methods: {
      change(){
        console.log(this.option.uuid)
        this.callback && this.callback();
      }
    },
    mounted(){
      let that = this;
      this.spaceRegional.httpList(function (res) {
        that.list = res.data.data.list;
      })
    }
  }
</script>


<style lang="less" rel="stylesheet/less">

</style>

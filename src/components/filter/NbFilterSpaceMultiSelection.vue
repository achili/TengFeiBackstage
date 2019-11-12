<template>

  <div class="pt5" v-show="filter.visible">
		<span class="mr20" v-for="(option,index) in list" :key="index">
			<NbCheckbox :val="option.value" v-model="filter.value"></NbCheckbox>
			<span :class="'label label-'+option.style">{{option.name}}</span>
		</span>

  </div>

</template>


<script>
  import Filter from '../../common/model/_base/Filter'
  import NbCheckbox from '../NbCheckbox.vue'
  import SpaceRegional from "../../common/model/space/SpaceRegional";

  export default {
    data () {
      return {
        courses: [],
        list: null,
        spaceRegional: new SpaceRegional()
      }
    },
    props: {
      filter: {
        type: Filter,
        required: true,
        validator: function (value) {

          if (value['type'] !== 'SPACE_MULTI_SELECTION') {
            console.error('type must be `SPACE_MULTI_SELECTION`.');
            return false
          }

          if (!value.value) {
            value.value = []
          }

          return true
        }
      },
      callback: {
        type: Function,
        required: false
      }
    },
    computed: {},
    components: {
      NbCheckbox
    },
    methods: {
    },
    mounted(){
      let that = this;
      this.spaceRegional.httpPager(function (res) {
        that.list = res.data.data.data;
        that.list.forEach(ddd=>{
          if(ddd.uuid === that.filter.value){
            that.all.name = ddd.name;
          }
        })

      });
    }
  }
</script>


<style lang="less" rel="stylesheet/less">

</style>


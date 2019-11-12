<template>

  <div v-show="filter.visible" @click="change">
		<span class="mr20 f14" v-for="(option,index) in filter.options" :key="index" @click.stop.prevent="change">
			<NbRadio :val="option.value" v-model="filter.value" name="status" @click.stop.prevent="change"></NbRadio>
			<span class="f14 " style="color: #999999;">{{option.name}}</span>
		</span>

  </div>

</template>


<script>
  import Filter from '../../common/model/_base/Filter'
  import NbCheckbox from '../NbCheckbox.vue'
  import NbRadio from '../NbRadio.vue'

  export default {
    data () {
      return {
        courses: []
      }
    },
    props: {
      filters: {
        type: Array,
        required: false
      },
      filter: {
        type: Filter,
        required: true,
        validator: function (value) {

          if (value['type'] !== 'SELECTION') {
            console.error('type must be and `SELECTION` .');
            return false
          }

          // if (!value.value) {
          //   value.value = []
          // }
          return true;
        }
      },
      callback: {
        type: Function,
        required: false
      }
    },
    watch: {
      "filter.value"(){
        this.change();
      }
    },
    computed: {},
    components: {
      NbCheckbox,
      NbRadio
    },
    methods: {
      change(){
        this.callback && this.callback();
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less">

</style>


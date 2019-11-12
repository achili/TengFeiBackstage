<template>
  <div class="nb-table-filter" @click.stop.prevent="change">
    <span>{{name}}</span>
    <i class="fa fa-angle-up ml5" v-if="filter.value === 'ASC'"></i>
    <i class="fa fa-angle-down ml5" v-if="filter.value === 'DESC'"></i>
    <i class="fa fa-angle-down ml5" v-if="filter.value === null"></i>
  </div>
</template>

<script>
  import Filter from '../../common/model/_base/Filter'

  export default {
    data () {
      return {

      }
    },
    components: {

    },
    props: {
      filters: {
        type: Array,
        required: false
      },
      filter: {
        type: Filter,
        required: true,
        validator: function () {
          return true;
        }
      },
      name: {
        type: String,
        required: true
      },
      callback: {
        type: Function,
        required: false
      }
    },
    watch: {},
    methods: {
      change() {
        let temp = this.filter.value;
        if(this.filters && (this.filters instanceof Array)) {
          this.filters.forEach(filter => {
            if(filter.type === 'SORT') {
              filter.value = null;
            }
          })
        }
        if(temp === 'ASC') {
          this.filter.value = 'DESC';
        } else if(temp === 'DESC') {
          this.filter.value = null;
        } else {
          this.filter.value = 'ASC';
        }
        this.callback && this.callback();
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .nb-table-filter {
    cursor:pointer;
  }
</style>

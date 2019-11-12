<template>
  <span class="nb-sort" @click.stop.prevent="change">

    <span class="sort-main">

      <span @click="change">
        <span>
          <i class="fa fa-circle-o f20" style="color: #bfbfbf;" v-show="filter.value === null"></i>
          <i class="fa fa-check-circle f20  cell-normal" v-show="filter.value === true"></i>
          <i class="fa fa-circle-o f20 cell-normal" v-show="filter.value === false"></i>
        </span>
        <span class="f14" style="color: #999999;margin-top: 12px;">{{filter.name}}</span>
      </span>

    </span>
    <span>&nbsp;</span>
  </span>
</template>

<script>
  import Filter from "../../common/model/_base/Filter";
  import $ from "jquery"
  import iCheck from "../../common/fork/icheck/icheck-vue"
  //css
  import "icheck/skins/square/green.css";
  iCheck($);

  export default {
    props: {
      filters: {
        type: Array,
        required: false
      },
      filter: {
        type: Filter,
        required: true,
        validator: function (value) {

          if (!value["name"]) {
            console.error("name is required.");
            return false;
          }

          if (value["value"]) {
            if (value["value"] !== null && value["value"] !== true && value["value"] !== false) {
              console.error("order can only be true,false or null.");
              console.error(value["value"]);
              return false;
            }
          }
          return true;
        }
      },
      computed: {
        $check(){
          return $(this.$refs.check);
        }
      },
      callback: {
        type: Function,
        required: false
      }
    },
    watch: {
      "value"(){
        this.refresh();
        }
    },
    methods: {
      change(){
        if(this.filters && (this.filters instanceof Array)) {
          this.filters.forEach(filter => {
            if(filter.type === 'CHECK') {
              filter.value = null;
            }
          })
        }
        if (this.filter.value === null) {
          this.filter.value = true;
        } else {
          this.filter.value = this.filter.value !== true;
        }

        this.callback && this.callback();
      },
      clear(){
        this.filter.value = null;

        this.callback && this.callback();
      },
      refresh(){
        let state = this.value === this.val ? "check" : "uncheck";
        this.$check.iCheck(state);
      }
    },
    mounted(){
    //   let that = this;
    //   this.$check.iCheck({
    //     checkboxClass: 'icheckbox_square-green',
    //     radioClass: 'iradio_square-green'
    //   });
    //   this.refresh();
    //   this.$check.on('ifChecked', function (event) {
    //     that.$emit('input', that.val);
    //   });
    }
  }
</script>



<style lang="less" rel="stylesheet/less">
  .nb-sort{

    .sort-main{
      position:relative;

      .sort-close {

        opacity: 0.85;
        -webkit-transition: all 0.1s;
        -o-transition: all 0.1s;
        transition: all 0.1s;
        cursor:pointer;
        position:absolute;
        top:-13px;
        right:-2px;
        font-size: 18px;
        color: #555;

        &:hover{
          text-decoration: none;
          opacity: 1;
          -moz-transform: scale(1.2);
          -webkit-transform: scale(1.2);
          -o-transform: scale(1.2);
          -ms-transform: scale(1.2);
          transform: scale(1.2);
        }
      }
    }

  }

</style>

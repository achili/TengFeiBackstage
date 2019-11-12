<template>

  <NbBtnDropdown :name="current.name" size="sm" :color="currentStyle"  v-show="filter.visible">
    <ul>
      <!--<li v-if="!show">-->
        <!--<a href="javascript:void(0)" class="f14 cell-select-color" @click="select(-1)">所有</a>-->
      <!--</li>-->
      <li v-for="(option, index) in list" :key="index" >
        <a href="javascript:void(0)"  class="f14 cell-select-color " @click="select(option)" v-if="user.hasPermissionSpace(FeatureType.ADMIN,option.uuid)">{{option.name}}</a>
      </li>
    </ul>
  </NbBtnDropdown>

</template>


<script>
  import Filter from "../../common/model/_base/Filter";
  import NbBtnDropdown from "../NbBtnDropdown.vue";
  import SpaceRegional from "../../common/model/space/SpaceRegional";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../common/model/core/feature/FeatureType";

  export default {
    data () {
      return {
        all: {
          name: "所有",
          value: null,
          style: "default"
        },
        FeatureType,
        user: this.$store.state.user,
        spaceRegional: new SpaceRegional(),
        list:null
      }
    },
    props: {
      filter: {
        type: Filter,
        required: true,
        validator: function (value) {

          if (value["type"] !== "SPACE_SELECTION" ) {
            console.error("type must be `SPACE_SELECTION`.");
            return false;
          }

          return true;
        }
      },
      callback: {
        type: Function,
        required: false
      },
      show:{
        type: Boolean,
        required: false
      }
    },
    computed: {
      current(){
        if (this.filter.active === -1) {
          return this.all;
        }
        return this.filter.options[this.filter.active];
      },
      currentStyle(){
        if (this.current.style) {
          return this.current.style;
        } else {
          return "default";
        }
      }
    },
    components: {
      NbBtnDropdown
    },
    methods: {
      select(option){
        this.filter.value = option.uuid;
        this.current.name = option.name;
        if (option === -1) {
          this.current.name = "所有";
        }
        this.callback && this.callback();

      }
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

      })
    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  .disabled{
    pointer-events: none;
    filter: alpha(opacity=50); /*IE滤镜，透明度50%*/
    -moz-opacity: 0.5; /*Firefox私有，透明度50%*/
    opacity: 0.5; /*其他，透明度50%*/
  }
</style>


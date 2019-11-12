<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12 clearfix">

        <div class="pull-left f24">
          <span>文件列表</span>
        </div>

      </div>
    </div>

    <div class="row">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12" >

        <div v-for="tank in pager.data"  class="bg-white p10 br2 mt10 cursor" :key="tank.uuid"  v-dragging="{ item: tank, list: pager.data, group: 'tank.uuid' }">
          <div class="media">
            <div class="media-body">

              <div>
                <span>{{tank.name}}</span>
              </div>
              <div>
              </div>
              <div class="mt5">
                <span class="mr10">创建于: {{tank.createTime | simpleDateTime }}</span>
                <span class="mr10">大小: {{Math.floor(tank.size / 1024)}}kB</span>
                <span v-show="!tank.privacy" class="label label-info">公有</span>
                <span v-show="tank.privacy" class="label label-warning">私有</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="col-xs-12 mt20">
        <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>

    </div>

  </div>
</template>
<script>
  import Pager from "../../../common/model/_base/Pager";
  import Tank from "../../../common/model/tank/Tank";
  import NbPager from "../../../components/NbPager";
  import NbFilter from "../../../components/filter/NbFilter";


  export default {
    data () {
      return {
        pager: new Pager(Tank)
      }
    },
    components: {
      NbPager,
      NbFilter
    },
    computed: {},
    watch: {},
    methods: {
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      }
    },
    mounted(){
      if(this.pager.getFilter("orderCreateTime")){
        this.pager.setFilterValue("orderCreateTime", "DESC");
      }
      this.pager.enableHistory();
      this.refresh();
    }
  }
</script>

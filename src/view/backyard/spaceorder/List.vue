<template>
  <div class="animated fadeIn order-list">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left">
          <span class="title">空间申请列表</span>
        </div>
        <div class="pull-right">
          <!--<span class="pull-right">-->
            <!--<button class="btn btn-info" @click.stop.prevent="$router.push({path:'/by/spaceOrder/create',query:{}})">-->
              <!--<span>添加空间申请</span>-->
            <!--</button>-->
          <!--</span>-->
          <span class="pull-right">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>
          <span class="pull-right mr12 f20">
            <NbMultiFilter :filter="pager.getFilter('status')" :filters="pager.FILTERS" :callback="refresh"/>
          </span>

        </div>
      </div>
    </div>

    <div class="row mt20">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="segmenting-line"></div>
      </div>
    </div>

    <div class="row mt35">

      <div class="col-md-12 col-sm-12 col-xs-12 table-title pl40" align="left">
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">名称</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">需求</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">
          <NbTableFilter name="创建时间" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min" align="center">电话</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">创建者</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">地点</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">类型</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">状态</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">操作</div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt15" align="left">
        <div v-for="spaceOrder in pager.data"  style="height: 90px;line-height: 90px;" class="bg-white mt10 cursor" :key="spaceOrder.uuid" :class="spaceOrder.deleted === true ? 'bg-change':''"
             @click.stop.prevent="spaceOrder.deleted||$router.push({path:'/by/spaceOrder/detail',query:{uuid:spaceOrder.uuid}})" >
          <div class="media pl25" >
            <div class="col-md-2 col-sm-2 col-xs-2  font-min-height">{{spaceOrder.creator.name}}的空间申请</div>
            <div class="col-md-2 col-sm-2 col-xs-2  font-min-height">
              <span v-if="spaceOrder.attribute.length > 0">
                <span class="mt5" v-for="(s,index) in spaceOrder.attribute" :key="index">
                <span v-for="(c,indexC) in spaceOrder.getAttributeMap()" :key="indexC">
                  <span  v-if="s === c.val">{{c.name}}</span>
                </span>
              </span>
              </span>
              <span v-else>
                <span class="f12 cell-danger">未填写！</span>
              </span>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1  font-min-height">{{spaceOrder.createTime | simpleDate }}</div>
            <div class="col-md-2 col-sm-2 col-xs-2  font-min-height" align="center">{{spaceOrder.creator.phone}}</div>
            <div class="col-md-1 col-sm-1 col-xs-1  font-min-height">{{spaceOrder.creator.name}}</div>
            <div class="col-md-1 col-sm-1 col-xs-1  font-min-height">{{spaceOrder.name}}</div>
            <div class="col-md-1 col-sm-1 col-xs-1  font-min-height">{{spaceOrder.getCharacteristicName()}}</div>
            <div class="col-md-1 col-sm-1 col-xs-1  font-min-height">
              <span :style="'color:'+spaceOrder.getStatusStyle()">{{spaceOrder.getStatusName()}}</span>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1  font-min-height">
              <span class="f14 cell-danger" v-if="spaceOrder.archive">归档</span>
              <span v-else>
                <a title="归档" href="javascript:void(0)" @click.stop.prevent="archive(spaceOrder)">
                  <i class="fa fa-lock f20 text-danger" ></i>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt20">
          <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>
    </div>
  </div>
</template>
<script>
  import Pager from "../../../common/model/_base/Pager";
  import NbPager from "../../../components/NbPagerNew";
  import NbFilter from "../../../components/filter/NbFilter";
  import NbEntityLink from "../../../components/NbEntityLink";
  import SpaceOrder from "../../../common/model/spaceOrder/SpaceOrder";
  import {humanTime} from "../../../common/filter/time"
  import NbTableFilter from "../../../components/filter/NbTableFilter";
  import NbMultiFilter from "../../../components/filter/NbMultiFilter";
  import { Message, MessageBox, Notification } from 'element-ui'
  import NbSelectionFilter from "../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../common/util/Utils";


  export default {
		data () {
			return {
        AttributeMap: SpaceOrder.prototype.AttributeMap,
        pager: new Pager(SpaceOrder),
        spaceOrder: new SpaceOrder(),
        FeatureType,
        user: this.$store.state.user,
        spaces: this.$store.state.spaces,
        spaceUserIdKey: "the_bridge_space_"

      }
		},
		components: {
      NbPager,
      NbFilter,
      NbEntityLink,
      NbTableFilter,
      NbMultiFilter,
      NbSelectionFilter
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
      },
      goEdit(e){
        this.$router.push({path:'/by/spaceOrder/create',query:{uuid:e}});
      },
      goDel(spaceOrder){
        let that = this;
        spaceOrder.confirmDel(function () {
          that.refresh();
        });
      },
      archive(spaceOrder) {
        let that = this;
        MessageBox.confirm('确定要将此项归档吗?归档后不可撤回！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {

          spaceOrder.httpArchive(function (response) {
            Notification.success({
              message: '归档成功！'
            });
            that.refresh();
          })

        }, function () {
        });
      }
    },
		mounted(){
		  let that = this;
      this.pager.setFilterValue('deleted', false);
      if(this.pager.getFilter("orderCreateTime")){
        this.pager.setFilterValue("orderCreateTime", "DESC");
      }
      // if(this.pager.getFilter("status")){
      //   this.pager.setFilterValue("status", "AUDITING");
      // }
      this.spaces.forEach(space=>{
        if(that.user.hasPermissionSpace(FeatureType.ADMIN,space.uuid)){
          that.pager.setFilterValue("spaceRegionalUuid",readLocalStorage(that.spaceUserIdKey + that.user.uuid))
        }
      });
      this.pager.enableHistory();
      this.refresh();
    }
	}
</script>
<style lang="less" rel="stylesheet/less">
  .order-list{
    padding: 20px 30px 0 30px;
    .description{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      max-height: 100px;
    }
    .table-title{
      color: #888888;
      font-size: 18px;
    }
    .input-sm{
      width: 180px;
      height: 38px;
      background-color: #ffffff;
      border-radius: 19px;
      border: solid 1px #e9e9e9;
    }
    .bg-change{
      background-color: #f6f6f6 !important;
    }
    .title{
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }
  }
</style>

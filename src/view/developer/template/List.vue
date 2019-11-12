<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12 clearfix">

        <div class="pull-left f24">
          <span>消息模板列表</span>
        </div>

        <div class="pull-right">
          <button class="btn btn-primary" @click.stop.prevent="$router.push({path:'/dev/template/create',query:{}})">
            <i class="fa fa-send"></i>
            <span>创建消息模板</span>
          </button>
        </div>

      </div>
    </div>

    <div class="row mt10">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12" >

        <div v-for="template in pager.data"  class="bg-white p10 br2 mt10 cursor" :key="template.uuid">
          <div class="media">
            <div class="media-body">
              <div class="pull-right action-buttons">
                <a title="编辑"  @click.stop.prevent="$router.push({path:'/developer/template/create',query:{uuid:template.uuid}})">
                  <i class="fa fa-pencil text-info f20"></i>
                </a>
                <a title="删除"  @click.stop.prevent="del(template)">
                  <i class="fa fa-trash text-danger f20"></i>
                </a>
              </div>

              <div>
                <span class="f15">{{template.name}}</span>
              </div>
              <div class="mt5">
                {{template.description}}
              </div>
              <div class="mt5">
                <span class="mr10">创建于: {{template.createTime | simpleDateTime }}</span>
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
  import Template from "../../../common/model/template/Template";
  import NbPager from "../../../components/NbPager";
  import NbFilter from "../../../components/filter/NbFilter";
  import {Notification,MessageBox} from 'element-ui';

  export default {
    data() {
      return {
        pager: new Pager(Template)
      }
    },
    components: {
      NbPager,
      NbFilter
    },
    computed: {},
    watch: {},
    methods: {
      del(template) {
        let that = this;
        MessageBox.confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          template.httpDel(function () {
            Notification.success({
              message: '成功删除!'
            });
            that.refresh();
            });
          }, function() {

          }
        )
      },
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      }
    },
    mounted(){
      this.pager.setFilterValue("orderCreateTime", "DESC");
      this.pager.enableHistory();
      this.refresh();
    }
  }
</script>

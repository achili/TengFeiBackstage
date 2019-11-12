<template>
  <div class="row">

    <div class="col-xs-12">

      <div class="text-center" v-show="financeStatement.loading">
        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      </div>

      <div class="finance-statement-block" v-show="!financeStatement.loading">

        <div class="row mt10">
          <div class="col-xs-12">
            <div class="pull-left">
              <span class="title-top">对账单</span>
            </div>
            <!--<div class="pull-right">-->
              <!--<select class="form-control" v-model="spaceRegionalActive">-->
                 <!--<option v-for="(spaceRegional,index) in list"  v-if="user.hasPermissionSpace(FeatureType.ADMIN,spaceRegional.uuid)"  :value="spaceRegional" :key="index">{{spaceRegional.name}}</option>-->
              <!--</select>-->
            <!--</div>-->
          </div>
        </div>

        <div class="row mt20">
          <div class="col-xs-12">
            <div style="border: 1px #e2e2e2 solid;"></div>
          </div>
        </div>

        <div style="width: 100%;overflow-x: scroll;overflow-y: hidden;position: relative;text-align: center">
          <div style="width: 3200px">
            <div class="mt10">
              <table style="width: 100%;table-layout:fixed;">
                <tr class="cell-subtitle font-cell-mid" >
                  <td style="word-wrap:break-word;" :style="{width:  widthList[th1Index]? widthList[th1Index]:'100px'}"  v-for="(th1,th1Index) in thItems1" :key="th1Index" :rowspan="th1.rowspan" :colspan="th1.colspan">{{th1.name}}</td>
                </tr>
              </table>
            </div>

            <div class="table-block mt10" style="max-height: 60vh">
              <table style="width: 100%;table-layout:fixed;">
                <tr class="cell-subhead bg-white" v-for="(item,itemIndex) in items" :key="itemIndex">
                  <td  :style="{width:  widthList[index]? widthList[index]:'100px'}" v-for="(td,tdIndex,index) in item" :key="tdIndex"><span v-html="td"></span></td>
                </tr>
              </table>
            </div>
          </div>
        </div>


      </div>

    </div>


    <div class="col-xs-12">

      <div class="row mt35 ml20">
        <div class="col-md-12">
          <div class="cell-subtitle">报表导出</div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 m-t-md">
          <div class="mail-box" style="border: 0;">
            <div class="mail-body ml15" style="border: 0;">

              <div class="row mt10">
                <label class="col-md-12 control-label"><i class="fa fa-file-excel-o"></i>导出ETL表</label>
                <div class="col-md-12">
                  <NbDateRange :startTime="startTimeETL"
                               v-on:startTimeChange="startTimeETL = arguments[0]"
                               :endTime="endTimeETL"
                               v-on:endTimeChange="endTimeETL = arguments[0]"></NbDateRange>
                </div>
                <div class="col-md-12">
                  <button class="btn-info btn-w-m" @click="downloadEtlXLS"><i class="fa fa-download"></i>导出并下载</button>
                </div>

              </div>

              <div class="row mt10">
                <label class="col-md-12 control-label"><i class="fa fa-file-excel-o"></i>导出已收账款表</label>
                <div class="col-md-12">
                  <NbDateRange :startTime="startTime"
                               v-on:startTimeChange="startTime = arguments[0]"
                               :endTime="endTime"
                               v-on:endTimeChange="endTime = arguments[0]"></NbDateRange>
                </div>
                <div class="col-md-12">
                  <button class="btn-info btn-w-m" @click="downloadPayXLS"><i class="fa fa-download"></i>导出并下载</button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>

  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import FinanceStatement from "../../../common/model/finance/statement/FinanceStatement";
  import NbDateRange from "../../../components/NbDateRange";
  import NbSelectionFilter from "../../../components/filter/NbSelectionFilter";
  import Pager from "../../../common/model/_base/Pager";
  import SpaceRegional from "../../../common/model/space/SpaceRegional";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../common/util/Utils";

  export default{
    data(){
      return {
        financeStatement: new FinanceStatement(),
        widthList: ['100px'/*日期*/,'200px'/*编号*/,'80px'/*款项类型*/,'200px'/*所属时间*/,'80px'/*资产公司*/,'150px'/*付款公司*/,'100px'/*产品类型*/,'150px'/*合同编号*/,'100px'/*履约保证金*/,'100px'/*不含税价*/,'120px'/*折扣后总会员费*/,'100px'/*增值税额*/,'100px'/*含税价*/,'80px'/*状态*/,'150px'/*应付款时间*/,'100px'/*应收金额*/,'100px'/*实收金额*/,'100px'/*待收金额*/,'100px'/*应收滞纳金*/,'120px'/*公司名称*/,'120px'/*信用代码*/,'150px'/*注册地址*/,'100px'/*联系人电话*/,'200px'/*银行账号*/,'200px'/*银行开户行*/,'100px']/*纳税人类型*/,
        items:[],
        startTime: new Date(),
        endTime: new Date(),
        startTimeETL: new Date(),
        endTimeETL: new Date(),
        spaceRegionalActive: new SpaceRegional(),
        spaceRegional: new SpaceRegional(),
        list:null,
        user: this.$store.state.user,
        FeatureType,
        spaces: this.$store.state.spaces,
        spaceUserIdKey: "the_bridge_space_"
      }
    },
    components: {
      NbDateRange,
      NbSelectionFilter
    },
    computed: {
      thItems1(){
        let arr = [];
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "日期"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "付款信息单编号"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "款项类型"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "所属时间"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "资产公司"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "付款公司"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "产品类型"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "合同编号"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "履约保证金"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "不含税价"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "折扣后总会员费"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "增值税额"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "含税价"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "状态"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "应付款时间"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "应收金额"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "实收金额"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "待收金额"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "应收滞纳金"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "公司名称"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "信用代码"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "注册地址"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "联系人电话"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "银行账号"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "银行开户行"
        });
        arr.push({
          rowspan: 1,
          colspan: 1,
          name: "纳税人类型"
        });
        return arr;
      }
    },
    watch: {
      "spaceRegionalActive.uuid"(){
        this.refresh();
      }
    },
    methods: {
      downloadEtlXLS(){
        if(!this.user.hasPermissionSpace("FINANCE_MANAGE", this.spaceRegionalActive.uuid)) {
          NotificationBox.error({
            message: '您还没有财务管理的权限!'
          })
        } else {
          window.open(this.financeStatement.downloadEtlXLSUrl(this.startTimeETL, this.endTimeETL,this.spaceRegionalActive.uuid,this.user.uuid));
        }
      },
      downloadPayXLS(){
        if(!this.user.hasPermissionSpace("FINANCE_MANAGE", this.spaceRegionalActive.uuid)) {
          NotificationBox.error({
            message: '您还没有财务管理的权限!'
          })
        } else {
          window.open(this.financeStatement.downloadPayXLSUrl(this.startTime, this.endTime,this.spaceRegionalActive.uuid,this.user.uuid));
        }
      },
      fetchDetail(){
        let that = this;
      },
      refresh(){
        let that = this;
        this.financeStatement.httpReport(this.spaceRegionalActive.uuid,function (response) {
          that.items = response
        });
      }
    },
    mounted(){
      let that = this;

      let space = new SpaceRegional();
      this.spaceRegional.httpList(function (res) {
        that.list = res.data.data.list;
        that.list.forEach(ddd=>{

          if(that.user.hasPermissionSpace(FeatureType.ADMIN,ddd.uuid)){
            if(readLocalStorage(that.spaceUserIdKey + that.user.uuid) != null){
              if(ddd.uuid === readLocalStorage(that.spaceUserIdKey + that.user.uuid)){
                space = ddd;
              }
            }else{
              space = ddd;
            }
          }
          that.spaceRegionalActive.render(space)
        })
      });

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .finance-statement-block {
    padding: 10px;
    .title {
      font-size: 18px;
      text-align: center;
    }
    .table-block {
      overflow-x: hidden;
      overflow-y: auto;
      table {
        margin-top: 10px;
        width: 100%;
        border-spacing: 0;
        th {
          text-align: center;
        }
        th, td {
          height: 55px;
          padding: 10px;
          min-width: 60px;
        }
      }
    }
    .title-top{
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      color: #666666;
    }

  }

</style>

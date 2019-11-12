<template>
    <div class="animated fadeIn appointment-visit-content">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="pull-left title">
            <span>预约参观</span>
          </div>
          <div class="pull-right">
           <a class="pull-right mr20 btn btn btn-theme" @click.stop.prevent="downloadEtlXLS">
             导出Excel表
          </a>
          </div>
          <div class="pull-right mr70">
            <div class="option-item-selects">
              <el-select v-model="addressValue" placeholder="全部" @change="addressChange">
                <el-option
                  v-for="item in addressItem"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="pull-right pr150">
            <div class="option-item-selects">
              <el-date-picker
                @change="pickerChange"
                v-model="monthValue"
                :default-value="monthValue"
                type="month"
                placeholder="选择月">
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt20">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="segmenting-line"></div>
        </div>
      </div>
      <div class="row mt35">
        <div class="col-md-12 col-sm-12 col-xs-12 events-title pl40">
          <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min"  align="center">
            <NbTableFilter name="创建日期" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
          </div>
          <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min" align="center">
            <NbTableFilter name="所属时间" :filter="pager.getFilter('startTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
          </div>
          <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min"  align="center">姓名</div>
          <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min"  align="center">电话</div>
          <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min"  align="center">邮箱</div>
          <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min" align="center">兴趣</div>
          <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min" align="center">备注</div>
          <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min" align="center">状态</div>
          <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min" align="center">操作</div>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12 mt15" >
          <div v-for="appointmentVisit in pager.data"  style="height: 90px;line-height: 90px;" class="bg-white mt10 cursor" :key="appointmentVisit.uuid" :class="appointmentVisit.deleted === true ? 'bg-change':''"  v-if="appointmentVisit.deleted !== true">
            <div class="media pl25">
              <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" align="center">{{appointmentVisit.createTime | complexHumanTime() }}</div>
              <div class="col-md-2 col-sm-2 col-xs-2 font-min-height" align="center">{{new Date(appointmentVisit.startTime) | simpleDate }}</div>
              <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" align="center">{{appointmentVisit.name}}</div>
              <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" align="center">{{appointmentVisit.phone}}</div>
              <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" align="center">{{appointmentVisit.mail}}</div>
              <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" align="center">{{appointmentVisit.characteristic}}</div>
              <div class="col-md-2 col-sm-2 col-xs-2 font-min-height" align="center">{{appointmentVisit.remarks}}</div>
              <div class="col-md-2 col-sm-2 col-xs-2 font-min-height" align="center">
                <div class="option-item-select">
                  <el-select v-model="appointmentVisit.status" placeholder="请选择" @change="statusChange(appointmentVisit)">
                    <el-option
                      v-for="item in statusItem"
                      :key="item.val"
                      :label="item.label"
                      :value="item.val">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" align="center">
                <a href="javascript:void(0)" title="删除" @click.stop.prevent="appointmentVisit.confirmDel(refresh)">
                  <img class="logo" style="min-width: 20px;height: 24px;" src="../../../../assets/img/del.png"/>
                </a>
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
  import NbPager from "../../../../components/NbPagerNew";
  import NbTableFilter from "../../../../components/filter/NbTableFilter";
  import NbSelectionFilter from "../../../../components/filter/NbSelectionFilter";
  import Pager from "../../../../common/model/_base/Pager";
  import AppointmentVisit from "../../../../common/model/appointment/visit/AppointmentVisit"
  import {readLocalStorage} from "../../../../common/util/Utils";
  import SpaceRegional from "../../../../common/model/space/SpaceRegional";
  import {simpleDateTime} from "../../../../common/filter/time";
  export default {
      data(){
          return{
            pager:new Pager(AppointmentVisit),
            appointmentVisit:new AppointmentVisit(),
            addressValue:'全部',
            user: this.$store.state.user,
            spaces: this.$store.state.spaces,
            spaceRegionalActive: new SpaceRegional(),
            statusValue:null,
            monthValue:null,
            addressItem:[
              {
                val: '全部',
                label: '全部'
              },
              {
                val: '苏州空间',
                label: '苏州空间'
              },
              {
                val: '杭州空间',
                label: '杭州空间'
              },
              {
                val: '上海·腾飞元创大厦',
                label: '上海·腾飞元创大厦'
              },
              {
                val: '上海·腾飞大厦',
                label: '上海·腾飞大厦'
              }
            ],
            statusItem:[
              {
                val: 'NOT_RECEIVE',
                label: '未接待',
                style: "danger"
              },
              {
                val: 'RECEIVE',
                label: '已接待',
                style: "success"
              }]
          }
      },
      components:{NbSelectionFilter,NbTableFilter,NbPager},
      methods:{
        addressChange(){
          let that = this;
          if(this.addressValue === '全部'){
            this.pager.setFilterValue('address',null);
          }else {
            this.pager.setFilterValue('address',that.addressValue);
          }
          this.pager.httpFastPage();
        },
        search(){
          this.pager.page = 0;
          this.refresh()
        },
        refresh(){
          this.pager.httpFastPage();
        },
        downloadEtlXLS(){
          let that = this;
          let month = simpleDateTime(new Date(that.monthValue));
          window.open(that.appointmentVisit.downloadEtlXLSUrl(that.addressValue,month));
        },
        statusChange(appointmentVisit){
          let that = this;
          appointmentVisit.httpStatusChange(appointmentVisit.status)
        },
        pickerChange(){
          let that = this;
          let month = simpleDateTime(new Date(that.monthValue));
          this.pager.setFilterValue('startMonth',month);
          this.pager.httpFastPage();
        }
      },
      mounted(){
        let that = this;
        let timeMonthValue = new Date();
        this.monthValue = timeMonthValue.getFullYear() + "-" + (timeMonthValue.getMonth() + 1);
        console.log(this.monthValue);
        if(this.pager.getFilter("orderCreateTime")){
          this.pager.setFilterValue("orderCreateTime", "DESC");
        }
        this.pager.enableHistory();
        this.refresh();
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .appointment-visit-content{
    padding: 20px 30px 0 30px;
    .title{
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      color: #666666;
    }
    .option-item-select{
      width: 100px;
    }
    .option-item-selects{
      width: 140px;
    }
  }
</style>

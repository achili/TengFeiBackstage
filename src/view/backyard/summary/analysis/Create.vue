<template>
  <div class="animated fadeIn summary-analysis-create">

    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo mr10" width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left title">
          <span v-show="!summaryAnalysis.editMode">创建高级汇总统计分析</span>
          <span v-show="summaryAnalysis.editMode">编辑高级汇总统计分析</span>
        </div>
      </div>
    </div>

    <div class="row mt30">
      <div class="col-md-12">
        <div class="segmenting-line"> </div>
      </div>
    </div>

    <div class="row mt35 ml20">
      <div class="col-md-12">
        <div class="cell-subtitle">分析选项 </div>
      </div>
    </div>

    <div class="row mt25">
      <div class="col-md-12">
        <div class="mail-box border-0" >
          <div class="mail-body border-0 ml15">

            <div class="row mt10">
              <div class="col-md-3 compulsory">表名称：</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="summaryAnalysis.title">
              </div>
            </div>

            <div class="row mt10" >
              <label class="col-md-3 control-label mt5 compulsory">所属空间</label>
              <div class="col-md-9">
                <SpaceRegionalSelecton :spaceRegional="summaryAnalysis.spaceRegional" :editMode="summaryAnalysis.editMode"></SpaceRegionalSelecton>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">主要数据对象：</div>
              <div class="col-md-9">
                <select class="form-control" v-model="summaryAnalysis.mainEntityClazz">
                  <option :value="null">
                    请选择主要数据
                  </option>
                  <option v-for="(clazz,clazzIndex) in summaryClazzPage.data" :key="clazzIndex" :value="clazz.clazz">{{clazz.description}}</option>
                </select>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">统计属性：</div>
              <div class="col-md-9">
                <select class="form-control" v-model="summaryAnalysis.fieldName">
                  <option :value="null">
                    统计数量
                  </option>
                  <option v-if="summaryAttribute.isAnalysis" v-for="(summaryAttribute,summaryAttributeIndex) in summaryAttributeList" :key="summaryAttributeIndex" :value="summaryAttribute.name">统计{{summaryAttribute.description}}</option>
                </select>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">分类属性：</div>
              <div class="col-md-9">
                <select class="form-control" v-model="summaryAnalysis.classifyAttribute">
                  <option :value="null">
                    不分类
                  </option>
                  <option v-if="summaryAttribute.isClassification" v-for="(summaryAttribute,summaryAttributeIndex) in summaryAttributeList" :key="summaryAttributeIndex" :value="summaryAttribute.name">{{summaryAttribute.description}}</option>
                </select>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">时间间隔：</div>
              <div class="col-md-9">
                <NbBtnDropdown :name="summaryAnalysis.getTimeIntervalTypeName()" size="sm"
                               :color="summaryAnalysis.getTimeIntervalTypeStyle()">
                  <ul>
                    <li v-for="(option, index) in summaryAnalysis.TimeIntervalTypeList" :key="index">
                      <a href="javascript:void(0)" @click="summaryAnalysis.timeIntervalType = option.value">{{option.name}}</a>
                    </li>
                  </ul>
                </NbBtnDropdown>
              </div>
            </div>

            <NbSlidePanel class="mt10" type="info" v-show="summaryAnalysis.timeIntervalType != summaryAnalysis.TimeIntervalType.NONE">
            <span slot="heading">
              <i class="fa fa-bell"></i>
              时间间隔相关
            </span>
              <div slot="body">
                <div class="row mt10">
                  <div class="col-md-3 compulsory">是否累加：</div>
                  <div class="col-md-9">
                    <NbBtnDropdown :name="summaryAnalysis.getCumulativeTypeName()" size="sm"
                                   :color="summaryAnalysis.getCumulativeTypeStyle()">
                      <ul>
                        <li v-for="(option, index) in summaryAnalysis.CumulativeTypeList" :key="index">
                          <a href="javascript:void(0)" @click="summaryAnalysis.cumulativeType = option.value">{{option.name}}</a>
                        </li>
                      </ul>
                    </NbBtnDropdown>
                  </div>
                </div>

                <div class="row mt10">
                  <div class="col-md-3 compulsory">时间属性：</div>
                  <div class="col-md-9">
                    <select class="form-control" v-model="summaryAnalysis.timeFieldName">
                      <option :value="null">
                        请选择间隔时间对应的属性
                      </option>
                      <option v-if="summaryAttribute.isTimeInterval" v-for="(summaryAttribute,summaryAttributeIndex) in summaryAttributeList" :key="summaryAttributeIndex" :value="summaryAttribute.name">{{summaryAttribute.description}}</option>
                    </select>
                  </div>
                </div>

                <div class="row mt10">
                  <div class="col-md-3 compulsory">日期范围：</div>
                  <div class="col-md-9">
                    <NbDateRange :startTime="summaryAnalysis.startTime"
                                 v-on:startTimeChange="summaryAnalysis.startTime = arguments[0]"
                                 :endTime="summaryAnalysis.endTime"
                                 v-on:endTimeChange="summaryAnalysis.endTime = arguments[0]"/>
                  </div>
                </div>
              </div>
            </NbSlidePanel>


          <div class="row mt10">
            <div class="col-md-12 ">
              <NbAnalysisCharts :summaryAnalysis="summaryAnalysis"></NbAnalysisCharts>
            </div>
          </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">名称：</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="summaryAnalysis.note">
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-12">
                <NbLoadingButton createText="保存" :entity="summaryAnalysis" :callback="save" createIcon="fa fa-save"/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

  import NbSlidePanel from "../../../../components/NbSlidePanel.vue";
  import NbAnalysisCharts from '../../../../components/charts/NbAnalysisCharts'
  import Attribute from  "../../../../common/model/template/Attribute"
  import SummaryAnalysis from "../../../../common/model/summary/analysis/SummaryAnalysis"
  import NbBtnDropdown from "../../../../components/NbBtnDropdown.vue";
  import NbDateRange from "../../../../components/NbDateRange.vue";
  import NbLoadingButton from "../../../../components/NbLoadingButton.vue"
  import {Notification,MessageBox} from 'element-ui'
  import Pager from "../../../../common/model/_base/Pager";
  import SpaceRegionalSelecton from "../../../../view/backyard/space/regional/Selection";

  export default {
    data(){
      return {
        summaryAnalysis: new SummaryAnalysis(),
        summaryClazzPage: new Pager(Attribute),
        choiceAttribute: null,
        summaryAttributeList: [],
        tempAttribute: new Attribute()
      }
    },
    components: {
      NbSlidePanel,
      NbAnalysisCharts,
      NbBtnDropdown,
      NbDateRange,
      NbLoadingButton,
      SpaceRegionalSelecton
    },
    computed: {},
    watch: {
      "summaryAnalysis.mainEntityClazz"() {
        this.updateAttributeList();
      }
    },
    methods: {
      updateAttributeList() {
        if(!this.summaryAnalysis.mainEntityClazz) {
          return;
        }
        let that = this;
        this.tempAttribute.httpGetCandidates(this.summaryAnalysis.mainEntityClazz, true, function (attributeList) {
          that.summaryAttributeList = attributeList
        })
      },
      save() {
        let that = this;
        this.summaryAnalysis.httpSave(function (response) {
          Notification.success({
            message: that.summaryAnalysis.editMode ? '修改成功！' : '保存成功！'
          });
          that.$router.push("/by/summary/analysis/list");
        });
      },
      refresh() {
        let that = this;
        this.summaryAnalysis.httpReport(this.summaryClazzPage.page,this.summaryClazzPage.pageSize,function (pagerMap) {
          that.summaryClazzPage = new Pager(that.summaryAnalysis.mainEntityClazz);
          that.summaryClazzPage.render(pagerMap);
          that.summaryClazzPage.initIndex();
        });
      }
    },
    mounted(){

      let that = this;
      this.summaryClazzPage.httpPage({isSummaryController: true},function () {
        let uuid = that.$route.query.uuid;
        if(uuid){
          that.summaryAnalysis.uuid = uuid;
          that.summaryAnalysis.editMode = true;
          that.summaryAnalysis.httpDetail(function (respance) {
            that.summaryClazzPage.data.forEach(attribut => {
              if(that.summaryAnalysis.mainEntityClazz === attribut){
                that.updateAttributeList();
                that.choiceAttribute = attribut;
              }
            })
          });
        }
      });

    }
  }

</script>
<style lang="less" rel="stylesheet/less">
  .summary-analysis-create {
    padding: 20px 120px 0 30px;
    .title{
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }
    p{
      font-size: 14px;
      color: #666666;
    }
  }
</style>

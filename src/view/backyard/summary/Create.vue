<template>
  <div class="animated fadeIn summary-create">

    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo mr10" width="30" height="30" src="../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left title">
          <span v-show="!summary.editMode">创建汇总统计</span>
          <span v-show="summary.editMode">编辑汇总统计</span>
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
        <div class="cell-subtitle">使用方法 </div>
      </div>
    </div>

    <div class="row mt25">
      <div class="col-md-12">
        <div class="mail-box border-0" >
          <div class="mail-body border-0 ml15">
            <p>一：选择需要查询的主要数据。</p>
            <p>主要数据对象是每一行显示的主要数据，每一行的主要数据是唯一的。比如需要查询每个合同的xxx内容，那么合同就是主要数据对象，一行代表一个合同，不同行必须是不同的合同。</p>
            <p>错误示范：查询每个租赁合同申请对应的空间订单名称，主要数据对象选择空间订单。</p>
            <p>正确示范：查询每个租赁合同申请对应的空间订单名称，主要数据对象选择租赁合同。</p>
            <p>二：添加需要查询的字段。</p>
            <p>三：点击查询按钮。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt35 ml20">
      <div class="col-md-12">
        <div class="cell-subtitle">汇总统计 </div>
      </div>
    </div>

    <div class="row mt25">
      <div class="col-md-12">
        <div class="mail-box border-0" >
          <div class="mail-body border-0 ml15">

            <div class="row">
              <label class="col-md-2 control-label mt5 compulsory">主要数据;</label>
              <div class="col-md-10">
                <select class="form-control" v-model="choiceAttribute" @change="choose">
                  <option :value="null">
                    请选择主要数据
                  </option>
                  <option v-for="(clazz,clazzIndex) in summaryClazzPage.data" :key="clazzIndex" :value="clazz">{{clazz.description}}</option>
                </select>
              </div>
            </div>

            <div class="row mt10" >
              <label class="col-md-2 control-label mt5 compulsory">所属空间</label>
              <div class="col-md-10">
                <SpaceRegionalSelecton :spaceRegional="summary.spaceRegional" :editMode="summary.editMode" @change="choose"></SpaceRegionalSelecton>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-12">
                <div class="alert alert-danger text-left mt10" v-show="summary.errorMessage">
                  {{summary.errorMessage}}
                </div>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-12">
                <div>请选择属性和所属空间,选择完毕后刷新表格预览</div>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-12">
                <AttributeCheckbox :summary="summary"></AttributeCheckbox>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-12">
                <button class="mt20 mb10 btn btn-primary" @click.stop.prevent="refresh">
                  <i class="fa fa-refresh"></i>
                  <span>刷新预览表格</span>
                </button>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-12">
                <ResultTable :summary="summary" :pager="reportPager" :refresh="refresh"></ResultTable>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-12">

                <a class="btn btn-success" target="_blank" @click="summary.exportExcelUrl(summary)">
                  <i class="fa fa-file-excel-o"></i>
                  导出为Excel
                </a>
                <!--<button class="btn btn-success"  @click="summary.exportExcelUrl(summary)">-->
                  <!--<i class="fa fa-file-excel-o"></i>-->
                  <!--导出为Excel-->
                <!--</button>-->
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">名称;</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="summary.name">
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-12">
                <NbLoadingButton createText="保存" :entity="summary" :callback="save" createIcon="fa fa-save"/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
  import Summary from  "../../../common/model/summary/Summary"
  import Attribute from  "../../../common/model/template/Attribute"
  import BaseEntity from  "../../../common/model/_base/BaseEntity"
  import {Notification} from 'element-ui';
  import {higherCamel} from "../../../common/filter/str"
  import NbSlidePanel from "../../../components/NbSlidePanel.vue";
  import ResultTable from  "./widget/resultTable/ResultTable.vue"
  import NbExpanding from "../../../components/NbExpanding.vue";
  import NbCheckbox from "../../../components/NbCheckbox";
  import AttributeCheckbox from "./widget/attributeCheckbox/AttributeCheckbox.vue"
  import NbLoadingButton from "../../../components/NbLoadingButton.vue"
  import Pager from "../../../common/model/_base/Pager";
  import models from  "../../../common/model_/models"
  import SpaceRegionalSelecton from "../../../view/backyard/space/regional/Selection";

  export default {
    data(){
      return {
        summary: new Summary(),
        choiceAttribute: null,
        summaryClazzPage: new Pager(Attribute),
        reportPager: new Pager(BaseEntity),
        attributeList: [],
        isFirst: false
      }
    },
    components: {
      NbSlidePanel,
      ResultTable,
      NbExpanding,
      NbCheckbox,
      AttributeCheckbox,
      NbLoadingButton,
      SpaceRegionalSelecton
    },
    computed: {},
    watch: {
      "choiceAttribute"() {
        this.summary.errorMessage = null;
        if(!this.choiceAttribute) {
          this.summary = new Summary();
        } else {
          this.summary.name = this.choiceAttribute.name;
          if(!this.isFirst) {
            this.summary.summaryAttributeInfo = [];
          }
          this.summary.mainEntityPackage = this.choiceAttribute.clazz;
          this.summary.mainEntityClazz = models[higherCamel(this.choiceAttribute.name)];
          this.reportPager = new Pager(this.summary.mainEntityClazz);
        }
      }
    },
    methods: {
      downloadEtlXLSUrl(){
        window.open(this.summary.downloadEtlXLSUrl(this.summary.mainEntityPackage, this.summary.summaryAttributeInfo,this.summary.spaceRegional.uuid));
      },
      choose() {


      },
      save() {
        let that = this;
        this.summary.httpSave(function () {
          Notification.success({
            message: that.summary.editMode ? '修改成功！' : '保存成功！'
          });
          that.$router.push("/by/summary/list");
        });
      },
      refresh() {
        let that = this;
        this.summary.httpReport(this.reportPager.page, this.reportPager.pageSize,this.summary.spaceRegional, function (pagerMap) {
          that.reportPager = new Pager(that.summary.mainEntityClazz);
          that.reportPager.render(pagerMap.data.data);
          that.reportPager.initIndex(that.reportPager.data);
        });
      }
    },
    mounted(){
      let that = this;
      this.summaryClazzPage.httpPage({isSummaryController: true}, function () {
        let uuid =  that.$route.query.uuid;
        if(uuid) {
          that.summary.uuid = uuid;
          that.summary.editMode = true;
          that.summary.httpDetail(function () {
            that.summaryClazzPage.data.forEach(attribut => {
              if(that.summary.mainEntityClazz === attribut.clazz) {
                that.isFirst = true;
                that.choiceAttribute = attribut;
              }
            })
          });
        }
      });
    }
  }

</script>


<!--/*先选择主数据对象(从可选数据对象中 对应着包名、动态引入的js、)-》-->
<!--*/-->
<style lang="less" rel="stylesheet/less">
  .summary-create {
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

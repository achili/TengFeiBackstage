<template>
<div class="animated fadeIn">
  <div class="row">
    <div class="col-xs-12 mb10">
      <div class="pull-left f24">
        <span>汇总统计</span>
      </div>
    </div>
  </div>

  <NbSlidePanel type="primary" title="使用方法" :initShow="false">
    <div>
      <div class="alert alert-warning">
        <p>一：选择需要查询的主要数据。</p>
        <p>主要数据对象是每一行显示的主要数据，每一行的主要数据是唯一的。比如需要查询每个合同的xxx内容，那么合同就是主要数据对象，一行代表一个合同，不同行必须是不同的合同。</p>
        <p>
          错误示范：查询每个租赁合同对应的空间订单名称，主要数据对象选择空间订单。
        </p>
        <p>
          正确示范：查询每个租赁合同对应的空间订单名称，主要数据对象选择租赁合同。
        </p>
        <p>
          二：添加需要查询的字段。
        </p>
        <p>
          三：点击查询按钮。
        </p>
      </div>
    </div>
  </NbSlidePanel>

  <NbSlidePanel type="primary" title="汇总统计">
    <div slot="body">
      <div class="row">
        <div class="mt5 compulsory">主要数据</div>
        <div class="row mt5">
          <select class="form-control" v-model="choiceAttribute" >
            <option :value="null">请选择主要数据</option>
            <option v-for="clazz in summaryClazzPage.data" :key="clazz" :value="clazz">{{clazz.description}}</option>
          </select>
        </div>
      </div>

      <div class="alert alert-danger text-left mt10" v-show="summary.errorMessage">
        {{summary.errorMessage}}
      </div>

      <div>请选择属性,选择完毕后刷新表格预览</div>

      <div>
        <AttributeCheckbox :summary="summary"></AttributeCheckbox>
      </div>

    </div>


    <button class="mt20 mb10 btn btn-primary" @click.stop.prevent="refresh">
      <i class="fa fa-refresh"></i>
      <span>刷新预览表格</span>
    </button>

    <ResultTable :summary="summary" :pager="reportPager" :refresh="refresh"></ResultTable>

    <a class="btn btn-success" target="_blank" :href="summary.exportExcelUrl()">
      <i class="fa fa-file-excel-o"></i>
      导出为Excel
    </a>

    <NbSlidePanel class="mt20" :initShow="false">

          <span slot="heading">
            <i class="fa fa-save"></i>
            保存
          </span>
      <div slot="body">

        <div class=""></div>
        <div class="row mv10">
          <div class="col-md-3 ">名称：</div>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="summary.name">
          </div>
        </div>

        <NbLoadingButton createText="保存到统计模板" :entity="summary" :callback="save" createIcon="fa fa-save"/>


      </div>
    </NbSlidePanel>
  </NbSlidePanel>



</div>
</template>

<script>

  import NbSlidePanel from "../../../../components/NbSlidePanel.vue";
  import NbLoadingButton from "../../../../components/NbLoadingButton.vue";
  import Summary from "../../../../common/model/summary/Summary";
  import Pager from "../../../../common/model/_base/Pager";
  import BaseEntity from "../../../../common/model/_base/BaseEntity";
  import Attribute from "../../../../common/model/template/Attribute";
  import AttributeCheckbox from "../widget/attributeCheckbox/AttributeCheckbox.vue"
  import ResultTable from "../widget/resultTable/ResultTable.vue"



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
      computed:{},
      components:{
        NbSlidePanel,
        NbLoadingButton,
        AttributeCheckbox,
        ResultTable
      },
      props:{},
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
      methods:{
        save() {
          let that = this;
          this.summary.httpSave(function () {
            Notification.success({
              message: '保存成功！'
            });
          });
        },
        refresh() {
          let that = this;
          this.summary.httpReport(this.reportPager.page, this.reportPager.pageSize, function (pagerMap) {
            that.reportPager = new Pager(that.summary.mainEntityClazz);
            that.reportPager.render(pagerMap);
            //that.reportPager.initIndex();
          });
        }
      },
      mounted(){
        console.log("aaa");
        let that = this;
        this.summaryClazzPage.httpPage({isSummaryController: true}, function () {
          let uuid = that.$store.state.route.query.uuid;
          if(uuid) {
            that.summary.uuid = uuid;
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

<style scoped>

</style>

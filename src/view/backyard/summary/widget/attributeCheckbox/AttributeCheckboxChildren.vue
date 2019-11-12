<template>
  <!--这是属性选择框  有递归-->
  <div class="border-radius-5 border p5">

    <button @click="propAttribute.isOpen = !propAttribute.isOpen"><i :class="propAttribute.isOpen?'fa fa-caret-square-o-down':'fa fa-caret-square-o-right'"></i>{{propAttribute.description}}</button>

    <NbExpanding>
      <div v-if="propAttribute.isOpen">
        <div class="row mt5" v-if="attributeList.length > 30">
          <div class="col-md-4 col-sm-6">
            <div class="input-group">
              <input type="text" class="form-control input-sm" placeholder="搜索"
                     v-model="search">
              <div class="input-group-btn">
                <button class="btn btn-sm btn-primary">
                  搜索
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt10 mb10">
          <div class="col-md-4 col-sm-6 mt5"  v-for="(attribute,attributeIndex) in attributeList" :key="attributeIndex" v-show="attribute.isShow" v-if="attribute.isPrimitive || attribute.packageName === 'java.util.List'">
            <NbCheckbox :val="attribute" v-model="summary.summaryAttributeInfo"></NbCheckbox>
            <label>{{attribute.simpleDescription}}</label>
          </div>
        </div>

        <div class="mt10 mb10" v-for="(attribute,attributeIndex1) in attributeList" :key="attributeIndex1" v-if="!attribute.isPrimitive && !attribute.isRepetition() && attribute.packageName !== 'java.util.List'">
          <AttributeCheckboxChildren :summary="summary" :propAttribute="attribute"></AttributeCheckboxChildren>
        </div>
      </div>
    </NbExpanding>


  </div>
</template>
<script>
  import NbCheckbox from "../../../../../components/NbCheckbox.vue";

  import NbExpanding from "../../../../../components/NbExpanding.vue";
  import Attribute from "../../../../../common/model/template/Attribute";
  import Summary from "../../../../../common/model/summary/Summary";
  import SummaryAttribute from "../../../../../common/model/summary/SummaryAtrribute";

  export default{
    //利用name，进行递归。
    name: 'AttributeCheckboxChildren',
    data(){
      return {
        attributeList: [],
        tempAttribute: new Attribute(),
        summaryAttributeList: [],
        search: null
      }
    },
    props: {
      propAttribute: {
        required: true
      },
      summary: {
        type: Summary,
        required: true
      }
    },
    computed: {},
    components: {
      NbCheckbox,
      NbExpanding
    },
    watch: {
      "propAttribute.isOpen"(newVal, oldVal) {
        if(newVal) {
          this.updateAttributeList();
        }
      },
      "summaryAttributeList"(newVal, oldVal) {
        let summaryAttribute = new SummaryAttribute();
        this.attributeList = summaryAttribute.getListByAttributeList(newVal, this.propAttribute);
      },
      "search"(newVal, oldVal) {
        let allIsShow = true;
        if(!newVal) {
          this.attributeList.forEach(attribute => {
            attribute.isShow = true
          })
        } else {
          this.attributeList.forEach(attribute => {
            attribute.isShow = attribute.simpleDescription.indexOf(newVal) !== -1;
          })
        }
      }
    },
    methods: {
      updateAttributeList() {
        let that = this;
        that.tempAttribute.httpGetCandidates(this.propAttribute.packageName, true, function (attributeList) {
          that.summaryAttributeList = attributeList
        })
      }
    },
    mounted(){
    //  let that = this;
    //  this.attribute.httpGetCandidates(this.summary.mainEntityPackage, true, function (attributeList) {
    //    let summaryAttribute = new SummaryAttribute();
    //    that.attributeList = summaryAttribute.getListByAttributeList(attributeList);
    //  })
    }
  }
</script>


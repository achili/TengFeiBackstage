<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left f24">
          <span v-show="!articleTag.editMode">创建标签</span>
          <span v-show="articleTag.editMode">编辑标签</span>
        </div>
      </div>
    </div>

    <NbSlidePanel slot="back">
      <span slot="heading">
        <i class="fa fa-moon-o"></i>
        基本内容
      </span>
      <div slot="body">
        <div class="row">
          <div class="col-md-12">
            <NbForm :httpForm="httpCreate" :successCallback="successCallback" ></NbForm>
          </div>
        </div>
      </div>
    </NbSlidePanel>

  </div>
</template>
<script>
  import NbSlidePanel from "../../../../components/NbSlidePanel";
  import NbForm from "../../../../components/NbForm";
  import ArticleTag from "../../../../common/model/article/ArticleTag";
  import {Notification} from 'element-ui'


  export default {
    data () {
      return {
        articleTag: new ArticleTag(),
        httpCreate: new ArticleTag().getHttpCreate()
      }
    },
    components: {
      NbSlidePanel,
      NbForm
    },
    computed: {},
    watch: {},
    methods: {
      successCallback(res){
        let that = this;
        Notification.success({
          message: '提交成功!'
        });
      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        })
      }
    },
    mounted(){
      let that = this;
      this.articleTag.uuid = this.$route.query.uuid;
      if (this.articleTag.uuid) {
        this.httpCreate.editMode = true;
        this.articleTag.httpDetail(function (){
          that.httpCreate.backFill({articleTag: that.articleTag});
        });
      }
      this.httpCreate.backFill({articleTag: this.articleTag});
    }
  }
</script>

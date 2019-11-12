<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-xs-12">
        <div class="pull-left f24">
          <span>发布文章</span>
        </div>
			</div>
		</div>

    <NbSlidePanel slot="back">
      <span slot="heading">
        <i class="fa fa-moon-o"></i>
        静夜思
      </span>
      <div slot="body">
        <div class="row">
          <div class="col-md-12">

            <NbForm :httpForm="httpCreate"></NbForm>
          </div>
        </div>
      </div>
    </NbSlidePanel>

	</div>
</template>
<script>
  import NbSlidePanel from "../../../components/NbSlidePanel";
  import Article from "../../../common/model/article/Article";
  import NbForm from "../../../components/NbForm";

	export default {
		data () {
			return {
        article: new Article(),
        httpCreate: new Article().getHttpCreate()
      }
		},
		components: {
      NbSlidePanel,
      NbForm
    },
		computed: {},
		watch: {},
		methods: {},
		mounted(){
		  let that = this;
		  if(this.$route.query.uuid) {
		    this.httpCreate.editMode = true;
		    this.article.uuid = this.$route.query.uuid;
        this.article.httpDetail(function () {
          that.httpCreate.backFill({article: that.article});
        });
      }
		  this.httpCreate.backFill({article: this.article});
    }
	}
</script>

<template>
	<div class="nb-pager-selection">

		<div class="title-area clearfix">
			<slot name="title"></slot>
			<button class="btn btn-default btn-sm ml15" @click="show=!show">
				<span v-if="show">
            <i class="fa fa-angle-up"></i>
				收起
          </span>
				<span v-else>
            <i class="fa fa-angle-down"></i>
				选择
        </span>

			</button>
		</div>
		<NbExpanding>
			<div v-show="show">
				<div class="content-area">
					<div class="row">

            <div class="col-xs-12">
              <!--<NbFilter :pager="pager" :callback="search"></NbFilter>-->
              <div class=" f24">
                <span class="pull-left mr12">
                  <NbMultiFilter :filter="pager.getFilter('status')" :filters="pager.FILTERS" :callback="refresh"/>
                </span>
                <span class="pull-right">
                  <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                         v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
                </span>
                <!--<span class="pull-right mr20">-->
                  <!--<NbSelectionFilter  :filter="pager.getFilter('spaceRegionalUuid')" :callback="search"/>-->
                <!--</span>-->
              </div>
            </div>

						<div class="col-xs-12 mt5">
							<slot name="cells"></slot>
						</div>


						<div class="col-xs-12 mt20">
							<NbPager :pager="pager" :callback="refresh"></NbPager>
						</div>

					</div>
				</div>
			</div>

		</NbExpanding>


	</div>
</template>


<script>
	import Pager from "../common/model/_base/Pager";
	import NbFilter from './filter/NbFilter.vue'
	import NbPager from '../components/NbPager.vue'
	import NbExpanding from '../components/NbExpanding'
  import NbMultiFilter from '../components/filter/NbMultiFilter'
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "./../common/model/core/feature/FeatureType";
  import NbSelectionFilter from '../components/filter/NbSelectionFilter'
  import {readLocalStorage} from "../common/util/Utils";

  export default {
		data () {
			return {
				show: false,
        FeatureType,
        user: this.$store.state.user,
        spaces: this.$store.state.spaces,
        spaceUserIdKey: "the_bridge_space_"

      }
		},
		props: {
			pager: {
				type: Pager,
				required: true
			},
			activeItem: {
				type: Object,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			},
			callback: {
				type: Function,
				required: false
			}

		},
		components: {
			NbFilter,
			NbPager,
			NbExpanding,
      NbMultiFilter,
      NbSelectionFilter
		},
		watch: {
			"activeItem.uuid"(newVal, oldVal){
				newVal = parseInt(newVal);
				oldVal = parseInt(oldVal);

				if (newVal !== oldVal) {
					this.show = false
				}
			}
		},
		computed: {},
		methods: {

			search(){
				this.pager.page = 0;
				this.refresh()
			},
			refresh(){
				this.pager.httpFastPage();
			}
		},
		mounted(){
		  let that = this;
			if (this.initFilter) {
				for (let key in this.initFilter) {
					this.pager.setFilterValue(key, this.initFilter[key]);
				}
			}

      let spaceUuids = [];
      // this.spaces.forEach(space=>{
      //   if(that.user.hasPermissionSpace(FeatureType.ADMIN,space.uuid)){
      //     spaceUuids.push(space.uuid);
      //   }
      // });
      spaceUuids.push(readLocalStorage(that.spaceUserIdKey + that.user.uuid));

      this.pager.setFilterValue("spaceRegionalUuids",spaceUuids);

			this.refresh();
		}
	}
</script>

<style lang="less" rel="stylesheet/less">

	.nb-pager-selection {

		.title-area {

		}
		.content-area {
			margin-top: 10px;
			padding: 10px;
			border: 1px dashed #1167a9;
		}

    .input-sm{
      width: 180px;
      height: 38px;
      background-color: #ffffff;
      border-radius: 19px;
      border: solid 1px #e9e9e9;
    }

	}

</style>

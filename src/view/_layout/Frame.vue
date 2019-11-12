<template>
	<div id="body">
		<div>
      <!--导航菜单-->
			<SideNavigation/>
      <!--面包屑-->
			<div id="page-wrapper" :class="{'show-drawer':$store.state.config.showDrawer}" @click="blankClick">
        <!--<TagsNavigation/>-->
        <router-view/>
			</div>
      <!--丁岚-->
			<TopNavigation/>
			<BottomNavigation />
		</div>
	</div>
</template>

<script>
  import SideNavigation from './SideNavigation.vue'
  import TagsNavigation from './TagsNavigation.vue'
  import TopNavigation from './TopNavigation.vue'
  import BottomNavigation from './BottomNavigation.vue'
  import enquire from 'enquire.js/dist/enquire'

  export default {
    data () {
      return {
        user: this.$store.state.user
      }
    },
    computed: {
      config () {
        return this.$store.state.config
      }
    },
    watch: {
      "$route"() {
        this.fillBreadcrumbs();
      }
    },
    components: {
      SideNavigation,
      TopNavigation,
      TagsNavigation,
      BottomNavigation
    },
    methods: {
      fillBreadcrumbs() {
        if(history.state.breadcrumbs) {
          return
        }
        if(this.$route.path === "/usr/usr-center" || this.$route.path === "/dev/dev-center" || this.$route.path === "/by/by-center") {
          this.$store.state.breadcrumbs = [];
          return
        }
        if(!this.$route.meta.name) {
          return
        }
        //如果已经存在
        let tempBreadcrumbs = this.$store.state.breadcrumbs;
        let isExist = false;
        let index = 0;
        for(let i = 0; i < tempBreadcrumbs.length; i++) {
          if(tempBreadcrumbs[i].path === this.$route.path) {
            isExist = true;
            index = i;
            break;
          }
        }
        if(isExist) {
          if(tempBreadcrumbs.length !== 1) {
            //截取。
            this.$store.state.breadcrumbs.splice(index + 1, tempBreadcrumbs.length - index - 1)
          }
        } else {
          this.$store.state.breadcrumbs.push({name: this.$route.meta.name, path: this.$route.path});
        }

        let state = history.state;
        state.breadcrumbs = this.$store.state.breadcrumbs.slice(0);
        history.replaceState(state, null, this.$route.fullPath);
      },
      blankClick () {
        if (this.config.mobile) {
          if (this.config.showDrawer) {
            this.$store.state.config.showDrawer = false
          }
        }
      },
      listenResponsiveEvent () {
        let that = this;
        enquire.register('(max-width: 768px)', {
          match: function () {
            that.$store.state.config.mobile = true;
            that.$store.state.config.showDrawer = false;
          },
          unmatch: function () {
            if(that.$store.state.user.isLogin) {
              that.$store.state.config.mobile = false;
              that.$store.state.config.showDrawer = true;
            }
          }
        })
      }
    },
    created () {

    },
    mounted () {
      let that = this;
      this.$store.state.environment = 'backyard';
      this.listenResponsiveEvent();
      onpopstate = function(e) {
        if(history.state.breadcrumbs) {
          that.$store.state.breadcrumbs = history.state.breadcrumbs;
        }

      };
      this.fillBreadcrumbs();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
	@import "../../assets/css/global/variables";

	#page-wrapper {

		position: fixed;
		left: 0;
		top: @top-navigation-height;
		right: 0;
		bottom: 40px;
		z-index: 90;
		overflow-y: auto;
		overflow-x: hidden;

		padding: 10px;

		-webkit-transition: all 0.4s;
		-moz-transition: all 0.4s;
		-o-transition: all 0.4s;
		transition: all 0.4s;

		background-color: #f5f8fa;//f3f3f4

		&.show-drawer {
			//大屏幕
			@media (min-width: @screen-sm-min) {
				left: @sidebar-width;
			}

			//小屏幕
			@media (max-width: @screen-xs-max) {
				left: 0;
			}
		}
	}

</style>

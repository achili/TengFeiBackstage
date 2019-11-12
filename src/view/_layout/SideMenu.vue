<template>
  <div class="ml20 f16">
    <li class="nav-item nav-first-level" :class="{active:menu.active}">
      <a href="javascript:void(0)" @click="menuClick(menu)">
        <!--<i v-if="menu.icon" :class="menu.icon"></i>-->
        <span class="nav-label f16">{{menu.name}}</span>
        <i v-if="menu.children && menu.children.length" class="pull-right fa"
           :class="{'fa-angle-left':!menu.active,'fa-angle-down':menu.isOpen}"></i>
      </a>

      <NbExpanding>
        <ul v-show="menu.isOpen" v-if="menu.children && menu.children.length"
            class="nav nav-second-level">
          <li class="nav-item-2" v-for="menu1 in menu.children" :key="menu1.name" :class="{active:menu1.active}">
            <a href="javascript:void(0)" @click="menuClick(menu1)">
              <!--<i v-if="menu1.icon" :class="menu1.icon"></i>-->
              <span class="f14">{{menu1.name}}</span>
              <i v-if="menu1.children && menu1.children.length" class="pull-right fa"
                 :class="{'fa-angle-left':!menu1.active,'fa-angle-down':menu1.isOpen}"></i>
            </a>

            <NbExpanding>
              <ul v-show="menu1.isOpen" v-if="menu1.children && menu1.children.length"
                  class="nav nav-second-level">
                <li class="nav-item-2" v-for="menu2 in menu1.children" :key="menu2.name" :class="{active:menu2.active}">
                  <a href="javascript:void(0)" @click="menuClick(menu2)">
                    <!--<i v-if="menu2.icon" :class="menu2.icon"></i>-->
                    <span class="f14">{{menu2.name}}</span>
                    <i v-if="menu2.children && menu2.children.length" class="pull-right fa"
                       :class="{'fa-angle-left':!menu2.active,'fa-angle-down':menu2.active}"></i>
                  </a>
                </li>
              </ul>
            </NbExpanding>
          </li>
        </ul>
      </NbExpanding>
    </li>
  </div>
</template>
<script>
	import NbExpanding from "../../components/NbExpanding.vue";
	import Menu from "../../common/model/_menu/Menu";

	export default {
		props: {
			menu: {
				type: Menu,
				required: true
			}
		},
		components: {
			NbExpanding
		},
		methods: {
			menuClick(menu){
        menu.isOpen = !menu.isOpen;
        if (!menu.children || menu.children.length === 0) {
          if (menu.router.path !== this.$store.state.route.fullPath) {
            menu.active = true;
            if(this.$store.state.config.mobile) {
              this.$store.state.config.showDrawer = false;
            }
            this.$store.state.breadcrumbs = [];
            this.$router.push(menu.router);
          }
        }
			}
		},
		mounted(){

		}
	}
</script>


<style lang="less" rel="stylesheet/less">
	.nav-item {
    .nav-item-2 {
      padding-right: 0 !important;
      padding-left: 10px !important;
    }
		i {
			width: 12px;
			text-align: center;
		}

	}
</style>

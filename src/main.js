import Vue from 'vue'
import App from './App'
import router from './_router'
import "babel-polyfill";

import store from './_store'
import VueResource from 'vue-resource'
import filters from './common/filter'
import {sync} from 'vuex-router-sync'

import 'nprogress/nprogress.css'
import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/css/font-awesome.css";
import "animate.css/animate.min.css";
import {DatePicker,Option,Select,Tabs,TabPane,TableColumn,Table} from 'element-ui';
import Vuedragging from 'awe-dnd';
import VueAMap  from 'vue-amap';

Vue.config.productionTip = false;
//为vue对象添加自定义内容，使得全局可见
Vue.store = store;
Vue.router = router;
sync(store, router);
Vue.use(VueResource);
Vue.http.options.root = store.state.host;
//注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
Vue.use(DatePicker);
Vue.use(Option);
Vue.use(Select);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Vuedragging);
Vue.use(TableColumn);
Vue.use(Table);
//高德地图
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '81298fa343888077f3dff87115c347be',
  //引入解析经纬度的组件
  plugin: ['Geocoder']
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});

//全局对象改写
Array.prototype.contains = function ( needle ) {
  for (let i in this) {
    if (this[i] === needle) return true;
  }
  return false;
};

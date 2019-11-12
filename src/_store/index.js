import Vue from 'vue'
import Vuex from 'vuex'
import User from "../common/model/user/User"

import MessageLetter from "../common/model/message/letter/MessageLetter"
import Favour from "../common/model/favour/Favour";

Vue.use(Vuex);


let host = window.location.protocol + "//" + window.location.host + "/api";
const state = {
  debug: true,
  version: '0.0.1',

  user: new User(),

  //消息的ManagerLetter
  messageLetter: new MessageLetter(),
  //缓存的attribute键值对
  attributeMap: {},

  host: host,
  //面包屑
  breadcrumbs: [],
  preference: {
    footerLine1: "©Copyright 2018 CapitaLand Pte Ltd All Rights Reserved",
    footerLine2: "苏ICP备13046708号-1",//沪ICP备15050352号-2 苏ICP备13046708号
    footerLine3:"苏公网安备 32059002001990号"
  },
  config: {
    mobile: false,
    showDrawer: false
  },
  cachedViews:[],
  //系统的偏好设置
  favour: new Favour(),
  spaces:[
    {
      // 大连
      uuid:"cbfe0f31-284f-4eff-b66c-a3e68c41cf03"
    },
    {
      // 苏州
      uuid: "10fa0dd4-a4ab-4a4e-b265-c755a2b68a6c"
    },
    {
      // 杭州
      uuid: "fff031b9-c3f4-4c53-ae9f-64d0d9ee83af"
    }

  ],
  spaceUuid:null
};

state.user.renderFromLocalStorage();
state.messageLetter.renderFromLocalStorage();

if (state.user.isLogin) {
  state.config.showDrawer = true;
}

export default new Vuex.Store({
  state
})

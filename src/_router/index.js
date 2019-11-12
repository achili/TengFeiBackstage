import Vue from 'vue'
import Router from 'vue-router'
import store from '../_store'
import NProgress from 'nprogress'

import ByFrameView from '../view/_layout/Frame.vue'
import NotFoundView from '../view/404/404.vue'

import Share from '../view/Share'
import NewsShare from '../view/share/NewsShare.vue'
import PolicyShare from '../view/share/PolicyShare.vue'
import ActivityShare from '../view/share/ActivityShare.vue'
import InviteShare from '../view/share/InviteShare'
import JesseShare from '../view/share/JesseShare'
import SolomonShare from '../view/share/SolomonShare'
import UserAnswerShare from '../view/share/UserAnswerShare'
import AnswerShare from '../view/share/AnswerShare'


import byIndex from './backyard/_center'
import devIndex from './developer/_center'
import usrIndex from './user/_center'
import article from './developer/article'
import template from './developer/template'
import wheel from './developer/wheel'
import setting from './user/setting'
import {startWith} from "../common/filter/str";
import tank from './developer/tank'
import appsettings from './backyard/appsettings';
import summary from "./backyard/summary";
import communityEventsRouter from "./backyard/communityEventsRouter";
import communityNewsRouter from "./backyard/communityNewsRouter";
import communityPostsRouter from "./backyard/communityPostsRouter";
import conferenceRoomRouter from "./backyard/conferenceRoomRouter";
import activeSite from "./backyard/activeSiteRouter";
import siteReservation from "./backyard/siteReservation";
import user from "./backyard/user";
import privilegeRouter from "./backyard/privilegeRouter";
import bookTourRouter from "./backyard/bookTourRouter";
import spaceReservation from "./backyard/spaceReservation"
import questionnaire from "./backyard/questionnaire";
import spaceOrder from "./backyard/spaceOrder"
import inviteVisitorRouter from "./backyard/inviteVisitorRouter";
import spaceSettingRouter from "./backyard/spaceSettingRouter"
import spaceBuildingRouter from "./backyard/spaceBuildingRouter";
import protocolSpaceRouter from "./backyard/protocolSpaceRouter";
import spaceOfficeRouter from "./backyard/spaceOfficeRouter";
import spaceSeatRouter from "./backyard/spaceSeatRouter";
import financePayInfoRouter from "./backyard/financePayInfoRouter";
import financeOfficePayRouter from "./backyard/financeOfficePayRouter";
import financeBillReceiptRouter from "./backyard/financeBillReceiptRouter";
import financeHedgingPayRouter from "./backyard/financeHedgingPayRouter";
import spaceRegional from "./backyard/spaceRegional";
import qrcode from "./backyard/qrcode";
import appointmentVisitRouter from "./backyard/appointmentVisitRouter"

Vue.use(Router);
const router = new Router({
  mode: 'history',
  linkActiveClass: 'is-link-active',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/share',
      component: Share,
      children: [
        {
          path: 'community/news/detail',
          component: NewsShare,
          meta: {ignoreAuth: true}
        },
        {
          path: 'community/policy/detail',
          component: PolicyShare,
          meta: {ignoreAuth: true}
        },
        {
          path: 'community/events/detail',
          component: ActivityShare,
          meta: {ignoreAuth: true}
        },
        {
          path: 'invite/visitor/detail',
          component: InviteShare,
          meta: {ignoreAuth: true}
        },
        {
          path: 'jesse/share',
          component: JesseShare,
          meta: {ignoreAuth: true}
        },
        {
          path: 'solomon/share',
          component: SolomonShare,
          meta: {ignoreAuth: true}
        },
        {
          path: 'questionnaire/answer/ready',
          component: UserAnswerShare,
          meta: {ignoreAuth: true}
        },
        {
          path: 'questionnaire/answer',
          component: AnswerShare,
          meta: {ignoreAuth: true}
        }
      ],
      meta: {ignoreAuth: true}
    },
    {
      path: '/:by',
      component: ByFrameView,
      children: [
        ...byIndex,
        ...devIndex,
        ...usrIndex,
        ...article,
        ...wheel,
        ...template,
        ...tank,
        ...setting,
        ...summary,
        ...appsettings,
        ...communityEventsRouter,
        ...communityNewsRouter,
        ...communityPostsRouter,
        ...conferenceRoomRouter,
        ...communityPostsRouter,
        ...siteReservation,
        ...activeSite,
        ...user,
        ...privilegeRouter,
        ...bookTourRouter,
        ...spaceReservation,
        ...questionnaire,
        ...spaceOrder,
        ...inviteVisitorRouter,
        ...spaceSettingRouter,
        ...spaceBuildingRouter,
        ...spaceOfficeRouter,
        ...protocolSpaceRouter,
        ...spaceSeatRouter,
        ...financePayInfoRouter,
        ...financeOfficePayRouter,
        ...financeBillReceiptRouter,
        ...financeHedgingPayRouter,
        ...spaceRegional,
        ...qrcode,
        ...appointmentVisitRouter
      ]
    },
    {
      path: '/',
      redirect: '/by/by-center'
    },
    {
      path: '*',
      component: NotFoundView,
      meta: {ignoreAuth: true}
    }
  ]
});

router.beforeEach((to, from, next) => {
  //进度条开始
  NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = '凯德集团|Bridge+ MANAGE';
  }
  if (!store.state.user.isLogin) {

    if(to.meta.ignoreAuth) {
      next()
    } else {
      next({
        path: '/usr/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
});

router.afterEach(transition => {
  //进度条结束
  NProgress.done();
});


export default router

<template>
<div class="animated fadeIn news-list">

  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="pull-left f18 pl60" style="display: flex;">
        <NbCheckbox v-model="allCheck"></NbCheckbox>
        <div class="ml10">全部</div>
      </div>
      <div class="pull-right">
          <span class="pull-right">
              <input type="text" style="margin-top: -8px;margin-bottom: 20px;" class="form-control input-sm" name="search" placeholder="搜索"
                     v-model="lastMessagePager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>
      </div>
    </div>
  </div>

  <div class="row">
    <!--这里显示所有的未读消息用户-->
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div style="color:white;" v-for="allUser in lastMessagePager.data" :key="allUser.index" @click="confirmEnroll(allUser)">
        <div v-if="allUser.senderUuid !== currentUser.uuid" class="message-block bg-white mt10 cursor br4">
          <div class="pull-left">
            <NbCheckbox v-model="allUser.checked"></NbCheckbox>
          </div>
          <div style="font-size: 16px;">
            <div class="user-name col-md-2 col-sm-2 col-xs-2" v-if="allUser.name"><nobr>{{allUser.name}}</nobr></div>
            <div class="user-name col-md-2 col-sm-2 col-xs-2" v-else><nobr>用户名</nobr></div>
            <div class="user-unread-content col-md-6 col-sm-6 col-xs-6 description">{{allUser.content}}</div>
            <div v-if="allUser.read === false" class="user-unread-word col-md-1 col-sm-1 col-xs-1"><nobr>未读</nobr></div>
            <div v-else class="user-unread col-md-1 col-sm-1 col-xs-1"><nobr>已读</nobr></div>
            <div v-if="allUser.read === false" class="text-right user-unread-time col-md-2 col-sm-2 col-xs-2 description">{{allUser.createTime | complexHumanTime()}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12 col-sm-12 col-xs-12 mt10">
      <NbPager :pager="lastMessagePager" :callback="refresh"></NbPager>
    </div>

    <div class="popup-box" v-if="enrollShow">
      <Chart :closeEnroll="closeAllPopup" :arrayUser="arrayUser" :successCallback="successCallback" :errorCallback="errorCallback"></Chart>
    </div>

  </div>

</div>
</template>

<script>
  import Pager from "../../../../../common/model/_base/Pager";
  import User from  "../../../../../common/model/user/User"
  import NbCheckbox from "../../../../../components/NbCheckbox.vue";
  import NbPhotoFrame from "../../../../../components/NbPhotoFrame";
  import NbPager from '../../../../../components/NbPagerNew.vue'
  import { Notification, MessageBox } from 'element-ui';
  import MessageLetter from "../../../../../common/model/message/letter/MessageLetter";
  import NbLoadingButton from "../../../../../components/NbLoadingButton";
  import PerfectScrollbar from "perfect-scrollbar"
  import $ from "jquery";
  import {str2Date, complexHumanTime} from '../../../../../common/filter/time'
  import Chart from "./Chart";
  import LastMessage from "../../../../../common/model/message/letter/LastMessage";

  export default {
    data () {
      return {
        currentUser: this.$store.state.user,
        userPager: new Pager(User, 8),
        receiver: new User(),
        messageLetter: new MessageLetter(),
        allCheck: false,
        tempUuid: null,
        ps: null,
        ps2: null,
        showEmoji: true,
        EXPS: [],
        userMessageLetter:[],
        enrollShow:false,
        arrayUser: [],
        lastMessagePager: new Pager(LastMessage)
      }
    },
    props: {

    },
    components: {
      NbCheckbox,
      NbPhotoFrame,
      NbPager,
      NbLoadingButton,
      Chart
    },
    computed: {
      // logScroll() {
      //   return this.$refs["logScroll"];
      // },
      // scrollContent() {
      //   return this.$refs["scrollContent"];
      // },
      // scrollContent2() {
      //   return this.$refs["scrollContent2"];
      // }
    },
    watch: {
      "allCheck"(newVal, oldVal) {
        let that = this;
        for (let i = 0; i < this.lastMessagePager.data.length; i++) {
          let allUser = this.lastMessagePager.data[i];
          allUser.checked = newVal;
          console.log(newVal)
        }
      }
    },
    methods: {
      successCallback(res){
        this.allCheck = false;
      },
      errorCallback(){
        console.log("fsald")
      },
      closeAllPopup(){
        this.enrollShow = false;
        this.allCheck = false;
        let that = this;
        for (let i = 0; i < this.lastMessagePager.data.length; i++) {
          let allUser = that.lastMessagePager.data[i];
          allUser.checked = false;
        }
        this.refresh();
      },
      confirmEnroll(user){
        let that = this;
        let receiverUuidList = [];
        if (user.senderUuid && !user.read) {
          this.messageLetter.httpRead(user.senderUuid);
        }
        if (this.allCheck) {
          for (let i = 0; i < that.lastMessagePager.data.length; i++) {
            let allUser = that.lastMessagePager.data[i];
            if (allUser.checked && allUser.senderUuid !== this.currentUser.uuid) {
              receiverUuidList.push(allUser.senderUuid);
            }
          }
        } else {
          for (let i = 0; i < that.lastMessagePager.data.length; i++) {
            let allUser = that.lastMessagePager.data[i];
            if (allUser.checked) {
              receiverUuidList.push(allUser.senderUuid);
            }
          }
        }
        if (receiverUuidList.length > 0) {
          this.arrayUser = receiverUuidList;
          this.enrollShow = true;
        } else {
          Notification.error({
            message: '请先选择用户！'
          });
        }
      },
      search() {
        this.refresh()
      },
      refresh() {
        let that = this;
        this.lastMessagePager.httpFastPage(function (response) {
          that.lastMessagePager.render(response.data.data.unread);
          // that.lastMessageData.forEach(unReadUser => {
          //   if (unReadUser.createTime) {
          //     unReadUser.createTime = str2Date(unReadUser.createTime);
          //   }
          // });
        });
      },
      userSelect(allUser) {
        let that = this;
        if (allUser.senderUuid) {
          this.arrayUser.push(allUser.senderUuid);
          this.messageLetter.httpRead(allUser.senderUuid);
        }
      }
    },
    mounted(){
      this.refresh();
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  .news-list{
    padding: 5px 120px 0 40px;
    .input-sm{
      width: 180px;
      height: 38px;
      background-color: #ffffff;
      border-radius: 19px;
      border: solid 1px #e9e9e9;
    }
    .message-block {
      padding: 40px 30px 60px 60px;
    }
    .user-unread-content {
      color: #666666;
    }
    .user-unread-word {
      color: #ff9a9a;
    }
    .user-unread{
      color: #84e599;
    }
    .user-unread-time {
      color: #a1a1a1;
    }
    .user-name {
      color: #00b5e2;
    }
    .description{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      max-height: 100px;
    }
  }
</style>

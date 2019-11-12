<template>
  <div class="main">
    <div class="main-inner">
      <div class="panel">
        <div class="message-box-header">
          <div class="header-block">
            <div class="header-picture">
              <NbPhotoFrame :picture="currentUser.getAvatarUrl(50,50)" :proportion="100" :width="50"></NbPhotoFrame>
            </div>
            <div class="header-name">
              {{currentUser.name}}
            </div>
            <div class="pull-right" style="font-size: 14px;">
              全选
              <NbCheckbox v-model="allCheck"></NbCheckbox>
            </div>
          </div>

          <div class="search-user">
            <div class="input-group">
              <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                     v-model="userPager.getFilter('keyword').value" @keyup.enter="search">
              <div class="input-group-btn">
                <button type="submit" class="btn btn-sm btn-primary" @click="search" style="background-color: green;border-color: green;">
                  搜索
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xs-12 search-block">
          <div class="search-content" ref="scrollContent2">
            <!--这里显示所有的未读消息用户-->
            <div v-for="allUser in unReadMessageUsers" :key="allUser.index" style="color: #ffffff">
              <div v-if="allUser.senderUuid !== currentUser.uuid && allUser.senderUuid !== 'd2cc5a79-9d3a-48e5-96db-13a7e631368c'" class="bg-white p10 mt10 cursor br4" @click="userSelect(allUser)">
                <div class="media" style="position: relative;">
                  <div class="pull-left">
                    <div style="position: relative;width: 55px;" v-if="!allUser.avatar.url">
                      <NbPhotoFrame :picture="require('../../../../../assets/img/handsome.jpg')" :proportion="100" :width="50"></NbPhotoFrame>
                      <i v-if="allUser.content" class="fa fa-circle" style="color: red;position: absolute;right: 0;top: 0;"></i>
                    </div>
                    <div style="position: relative;width: 55px;" v-else>
                      <!--<img class="img-rounded img-md" :src="allUser.poster.getUrlBySize(50,50)">-->
                      <NbPhotoFrame :picture="allUser.avatar.url" :proportion="100" :width="50"></NbPhotoFrame>
                      <i v-if="allUser.content" class="fa fa-circle" style="color: red;position: absolute;right: 0;top: 0;"></i>
                    </div>
                  </div>

                  <div class="media-body">
                    <div class="cell-title" style="color: #333333;font-size: 14px;">
                      <span v-if="allUser.name">{{allUser.name}}</span>
                      <span v-else>用户名</span>
                      <span class="pull-right">{{allUser.createTime | date("hh:mm")}}</span>
                    </div>
                    <div class="cell-title-content" style="color: #888888;position: absolute;bottom: 0;font-size: 14px;    overflow: hidden;
                      text-overflow: ellipsis;
                      -webkit-line-clamp: 1;
                      display: -webkit-box;
                      -webkit-box-orient: vertical;">
                      <span>{{allUser.content}}</span>
                    </div>
                    <div class="pull-right">
                      <NbCheckbox v-model="allUser.checked"></NbCheckbox>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <!--这里显示其余所有用户-->
            <div v-for="allUser in userPager.data" v-if="checkRepeat(allUser)" :key="allUser.index" style="color:white;">
              <div v-if="allUser.uuid !== currentUser.uuid && allUser.uuid !== 'd2cc5a79-9d3a-48e5-96db-13a7e631368c'" class="bg-white p10 mt10 cursor br4" @click="userSelect(allUser)">
                <div class="media" style="position: relative;">
                  <div class="pull-left">
                    <div style="position: relative;width: 55px;" v-if="!allUser.avatar.url">
                      <NbPhotoFrame :picture="require('../../../../../assets/img/handsome.jpg')" :proportion="100" :width="50"></NbPhotoFrame>
                      <i v-if="allUser.content" class="fa fa-circle" style="color: red;position: absolute;right: 0;top: 0;"></i>
                    </div>
                    <div style="position: relative;width: 55px;" v-else>
                      <!--<img class="img-rounded img-md" :src="allUser.poster.getUrlBySize(50,50)">-->
                      <NbPhotoFrame :picture="allUser.avatar.url" :proportion="100" :width="50"></NbPhotoFrame>
                    </div>
                  </div>

                  <div class="media-body">
                    <div class="cell-title" style="color: #333333;font-size: 14px;">
                      <span v-if="allUser.name">{{allUser.name}}</span>
                      <span v-else>用户名</span>
                      <span class="pull-right">{{allUser.createTime | date("hh:mm")}}</span>
                    </div>
                    <div class="cell-title" style="color: #888888;position: absolute;bottom: 0;font-size: 14px;overflow: hidden;
                      text-overflow: ellipsis;
                      -webkit-line-clamp: 1;
                      display: -webkit-box;
                      -webkit-box-orient: vertical;">
                      <span>{{allUser.content}}</span>
                    </div>
                    <div class="pull-right">
                      <NbCheckbox v-model="allUser.checked"></NbCheckbox>

                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="contentView">
        <div class="chat-box">

          <!--这里填聊天信息，包括已读未读的状态转换-->

          <div v-if="allCheck" style="height: calc(100% - 50px);">
            <div class="chat-box-name">
              <div class="chat-box-name-word">
                群发信息
              </div>
            </div>
            <div class="scroll-wrapper box_bd" style="height: calc(100% - 170px);">
              <div class="content-box"></div>
            </div>
            <div class="chat-footer">
              <div class="chat-footer-textarea">
              <textarea class="form-control chat-footer-textarea-cell" rows="8" v-model="messageLetter.content" @keyup.enter="sendAll"
                        style="resize: none;border-top: 1px solid #FF851B;"></textarea>
                <div class="chat-footer-button">
                  <NbLoadingButton createText="发送" :entity="messageLetter"
                                   :callback="sendAll" createIcon="fa fa-send"/>
                </div>
              </div>

            </div>
          </div>

          <div v-else style="height: calc(100% - 50px);">

            <div class="chat-box-name">
              <div class="chat-box-name-word" v-if="receiver.name">
                {{receiver.name}}
              </div>
              <div class="chat-box-name-word" v-else>用户名</div>
            </div>
            <div class="scroll-wrapper box_bd" ref="logScroll" style="height: calc(100% - 170px);">
              <div class="content-box" ref="scrollContent">
                <div v-for="messageLetter in messageLetterPage.data" :key="messageLetter.uuid">
                  <!--自己发给别人的信息放右边-->
                  <div v-if="messageLetter.receiver.uuid === receiver.uuid && messageLetter.sender.uuid === currentUser.uuid" style="margin: 20px;text-align: right;">
                    <div>
                      <div style="display: inline-block;color: black;
                   font-size: 16px;">
                        <div>
                          {{currentUser.name}}
                        </div>
                        <div style="background-color: #FFFFFF;max-width: 300px;padding: 10px;">
                          {{messageLetter.content}}
                        </div>
                      </div>

                      <div v-if="!currentUser.avatarUrl" style="display: inline-block;margin-right: 10px;">
                        <NbPhotoFrame :picture="require('../../../../../assets/img/handsome.jpg')" :proportion="100" :width="50"></NbPhotoFrame>
                      </div>
                      <div v-else style="display: inline-block;margin-right: 10px;">
                        <NbPhotoFrame :picture="currentUser.getAvatarUrl(50,50)" :proportion="100" :width="50"></NbPhotoFrame>
                        <!--<img class="img-md" :src="currentUser.avatarUrl">-->
                      </div>
                    </div>
                  </div>

                  <!--别人发给自己的信息放左边-->
                  <div v-if="messageLetter.receiver.uuid === currentUser.uuid && messageLetter.sender.uuid === receiver.uuid" style="margin: 20px;">
                    <div>
                      <div v-if="!receiver.avatarUrl" style="display: inline-block;margin-right: 10px;">
                        <NbPhotoFrame :picture="require('../../../../../assets/img/handsome.jpg')" :proportion="100" :width="50"></NbPhotoFrame>
                      </div>
                      <div v-else style="display: inline-block;margin-right: 10px;">
                        <!--<img class="img-md" :src="receiver.avatarUrl">-->
                        <NbPhotoFrame :picture="receiver.avatarUrl" :proportion="100" :width="50"></NbPhotoFrame>
                      </div>

                      <div style="display: inline-block;color: black;
                   font-size: 16px;">
                        <div>
                          {{messageLetter.sender.name}}
                        </div>
                        <div style="background-color: #FFFFFF;max-width: 300px;padding: 10px;">
                          {{messageLetter.content}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="chat-footer">
              <div class="chat-footer-textarea">
              <textarea class="form-control chat-footer-textarea-cell" rows="8" v-model="messageLetter.content" @keyup.enter="send"
                        style="resize: none;border-top: 1px solid #FF851B;"></textarea>
                <div class="chat-footer-button">
                  <NbLoadingButton createText="发送" :entity="messageLetter"
                                   :callback="sendAll" createIcon="fa fa-send"/>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Pager from "../../../../../common/model/_base/Pager";
  import User from  "../../../../../common/model/user/User"
  import NbCheckbox from "../../../../../components/NbCheckbox.vue";
  import NbPhotoFrame from "../../../../../components/NbPhotoFrame";
  import NbPager from '../../../../../components/NbPager.vue'
  import { Notification, MessageBox } from 'element-ui';
  import MessageLetter from "../../../../../common/model/message/letter/MessageLetter";
  import NbLoadingButton from "../../../../../components/NbLoadingButton";
  import PerfectScrollbar from "perfect-scrollbar"
  import $ from "jquery";
  import {str2Date} from '../../../../../common/filter/time'

  export default {
    data () {
      return {
        currentUser: this.$store.state.user,
        userPager: new Pager(User, 50),
        receiver: new User(),
        messageLetter: new MessageLetter(),
        messageLetterPage: new Pager(MessageLetter),
        unReadMessageUsers: [],
        allCheck: false,
        tempUuid: null,
        ps: null,
        ps2: null,
        showEmoji: true,
        EXPS: []
      }
    },
    props: {

    },
    components: {
      NbCheckbox,
      NbPhotoFrame,
      NbPager,
      NbLoadingButton
    },
    computed: {
      logScroll() {
        return this.$refs["logScroll"];
      },
      scrollContent() {
        return this.$refs["scrollContent"];
      },
      scrollContent2() {
        return this.$refs["scrollContent2"];
      }
    },
    watch: {
      "allCheck"() {
        let that = this;
        for (let i = 0; i < this.unReadMessageUsers.length; i++) {
          let allUser = that.unReadMessageUsers[i];
          allUser.checked = this.allCheck;
        }
        for (let i = 0; i < this.userPager.data.length; i++) {
          let allUser = that.userPager.data[i];
          allUser.checked = this.allCheck;
        }
      }
    },
    methods: {
      search() {
        this.messageLetterPage.page = 0;
        this.refresh()
      },
      checkRepeat(allUser) {
        for(let i = 0; i < this.unReadMessageUsers.length; i++ ){

          if (this.unReadMessageUsers[i].senderUuid === allUser.uuid) {
            return false;
          }
        }
        return true;
      },
      refreshMessageLetterPage() {
        // 设置发送者 和 接收者都为自己
        this.messageLetterPage.setFilterValue("sender", this.currentUser.uuid);
        this.messageLetterPage.setFilterValue("receiver", this.currentUser.uuid);
        this.messageLetterPage.httpFastPage();
      },
      sendAll() {
        let that = this;
        let receiverUuidList = [];

        if (this.allCheck) {
          for (let i = 0; i < this.unReadMessageUsers.length; i++) {
            let allUser = that.unReadMessageUsers[i];
            if (allUser.checked && allUser.senderUuid !== this.currentUser.uuid) {
              receiverUuidList.push(allUser.senderUuid);
            }
          }
          for (let i = 0; i < this.userPager.data.length; i++) {
            let allUser = that.userPager.data[i];
            if (allUser.checked && allUser.uuid !== this.currentUser.uuid) {
              receiverUuidList.push(allUser.uuid);
            }
          }
        } else {
          for (let i = 0; i < this.unReadMessageUsers.length; i++) {
            let allUser = that.unReadMessageUsers[i];
            if (allUser.checked) {
              receiverUuidList.push(allUser.senderUuid);
            }
          }
          for (let i = 0; i < this.userPager.data.length; i++) {
            let allUser = this.userPager.data[i];
            if (allUser.checked) {
              receiverUuidList.push(allUser.uuid);
            }
          }
        }
        //判断当前是全选还是多选还是单选模式
        if (receiverUuidList.length > 0) {
          this.messageLetter.httpSendAll(receiverUuidList.toString(), function (response) {
            Notification.success({
              message: '发送成功！'
            });
            that.messageLetterPage.setFilterValue("orderCreateTime", "ASC");
            that.messageLetter.content = "";
            that.messageLetterPage.httpFastPage(function () {
              that.ps2 = new PerfectScrollbar(".content-box", {
                wheelSpeed : 2,
                wheelPropagation : true,
                minScrollbarLength : 20
              });
              $(that.scrollContent).animate({
                scrollTop: 4000
              }, 10);
            });
          });
        } else {
          this.messageLetter.httpSave(this.receiver.uuid, function (response) {
            Notification.success({
              message: '发送成功！'
            });
            that.messageLetter.render(new MessageLetter());
            //将滚动栏保持在最底部，一直显示最新消息
            $(that.scrollContent).animate({
              scrollTop: 4000
            }, 10);
            that.messageLetter.data = response.data.data;
            that.refreshMessageLetterPage();
          });
        }


      },
      refresh() {
        let that = this;

        this.userPager.setFilterValue("orderRead", "DESC");
        this.userPager.httpFastPage();
        // 每20秒消息自动刷新一次
        // setInterval(function () {
        //   that.messageLetterPage.setFilterValue("orderCreateTime", "ASC");
        //   that.messageLetterPage.httpFastPage(function () {
        //     $(that.scrollContent).animate({
        //       scrollTop: 4000
        //     }, 10);
        //   });
        // }, 20000);
        // this.messageLetter.httpUnRead(function (response) {
        //   that.unReadMessageUsers = response.data.data.unread;
        //   that.unReadMessageUsers.forEach(unReadUser => {
        //     unReadUser.createTime = str2Date(unReadUser.createTime);
        //   });
        // });
      },
      userSelect(allUser) {
        let that = this;
        this.allCheck = false;
        $(that.scrollContent).animate({
          scrollTop: 0
        }, 0);

        if (allUser.uuid) {
          this.receiver.name = allUser.name;
          this.receiver.uuid = allUser.uuid;
          this.receiver.avatarUrl = allUser.avatarUrl;
          this.tempUuid = allUser.uuid;
        } else {
          this.receiver.name = allUser.name;
          this.receiver.uuid = allUser.senderUuid;
          this.receiver.avatarUrl = allUser.avatar.url;
          this.tempUuid = allUser.senderUuid;
        }
        this.messageLetter.httpRead(this.tempUuid);

        this.messageLetterPage.setFilterValue("orderCreateTime", "ASC");
        this.messageLetterPage.httpFastPage(function () {
          $(that.scrollContent).animate({
            scrollTop: 4000
          }, 10);
        });
      }
    },
    mounted(){
      let that = this;
      this.ps = new PerfectScrollbar(".search-content", {
        wheelSpeed : 2,
        wheelPropagation : true,
        minScrollbarLength : 20
      });
      this.ps2 = new PerfectScrollbar(".content-box", {
        wheelSpeed : 2,
        wheelPropagation : true,
        minScrollbarLength : 20
      });
      this.ps2.update();
      this.refresh();

    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  .main {
    height: 100%;
    padding-top: 30px;

    .main-inner {
      max-width: 1000px;
      min-width: 800px;
      height: 100%;
      margin: 0 auto;
      border-radius: 3px;
      overflow: hidden;

      .panel {
        position: relative;
        width: 280px;
        height: 100%;
        float: left;
        background: #2e3238;

        .message-box-header {
          position: absolute;
          z-index: 999;
          background-color: #2e3238;

          .header-block {
            padding: 26px;
            position: relative;
            vertical-align: middle;
            word-wrap: break-word;
            word-break: break-all;
            font-size: 20px;
            color: #FAFAFB;
            line-height: 1.6px;
            .header-picture {
              display: inline-block;
              margin-right: 10px;
            }
            .header-name {
              display: inline-block;
              vertical-align: text-top;
            }
          }
          .search-user {
            margin: 0 10px;
            .input-group {
              .input-sm {
                background-color: #26292e;
                color: #fff;
                border: 0;
                border-radius: 2px;
              }
            }
          }
        }
        .search-block {
          padding-top: 130px;
          height: 100%;
          .search-content {
            width: 264px;
            padding: 0 20px 0 0;
            position: relative;
            height: 100%;
          }
        }
      }

      .contentView {
        height: 100%;
        overflow: hidden;
        border-radius: 3px;
        .chat-box {
          position: relative;
          background-color: #eee;
          height: 100%;
          overflow: hidden;
          .chat-box-name {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            line-height: 30px;
            text-align: center;
            .chat-box-name-word {
              position: relative;
              padding: 10px 0;
              margin: 0 20px;
              z-index: 1024;
              background-color: #eee;
              color: #7e80ff;
              border-bottom: 1px solid #ccc;
              font-size: 16px;
              letter-spacing: 10px;
              text-shadow:0 0 8px #fff, 0 0 42px #f72, 0 0 72px #f84,0 0 150px #fa5;
            }
          }
          .scroll-wrapper {
            position: relative;
            .content-box {
              margin-top: 50px;
              position: relative;
              overflow: scroll;
              height: 100%;
            }
          }
          .chat-footer {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100%;
            .chat-footer-textarea {
              position: relative;
              .form-control:focus {
                border: 0;
              }
              .chat-footer-button {
                position: absolute;
                right: 0;
                bottom: 0;
              }
            }
          }
        }
      }
    }
  }

</style>

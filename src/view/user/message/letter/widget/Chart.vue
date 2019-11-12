<template>
  <div class="activity-detail-enroll">
    <div class="popup animated bounceInUp" v-show="popup">
      <div class="content" ref="scrollContent">
        <div v-for="messageLetter in messageLetterPage.data" :key="messageLetter.uuid">
          <!--自己发给别人的信息放右边-->
          <div v-if="messageLetter.receiver.uuid === selectUuid && messageLetter.sender.uuid === currentUser.uuid" style="margin: 20px;text-align: right;">
            <div>
              <div style="display: inline-block;color: black;padding-right: 10px;
                     font-size: 16px;">
                <div style="max-width: 300px;padding: 20px 0 3px 0;font-size: 16px;color: #666666;">
                  {{messageLetter.content}}
                </div>
                <div style="font-size: 14px;color: #a4a4a4;">
                  {{messageLetter.createTime | complexHumanTime()}}
                </div>
              </div>

              <!--<div v-if="!currentUser.avatarUrl" style="display: inline-block;margin-right: 10px;">-->
              <!--<NbPhotoFrame :picture="require('../../../../../assets/img/handsome.jpg')" :proportion="100" :width="40"></NbPhotoFrame>-->
              <!--</div>-->
              <!--<div v-else style="display: inline-block;margin-right: 10px;">-->
              <!--<NbPhotoFrame :picture="messageLetter.sender.getAvatarUrl(50,50)" :proportion="100" :width="40"></NbPhotoFrame>-->
              <!--&lt;!&ndash;<img class="img-md" :src="currentUser.avatarUrl">&ndash;&gt;-->
              <!--</div>-->
            </div>
          </div>

          <!--别人发给自己的信息放左边-->
          <div v-if="messageLetter.receiver.uuid === currentUser.uuid && messageLetter.sender.uuid === selectUuid" style="margin: 20px;">
            <div>
              <div v-if="!messageLetter.sender.avatarUrl" style="display: inline-block;margin-right: 10px;">
                <NbPhotoFrame :picture="require('../../../../../assets/img/handsome.jpg')" :proportion="100" :width="40"></NbPhotoFrame>
              </div>
              <div v-else style="display: inline-block;margin-right: 10px;">
                <!--<img class="img-md" :src="messageLetter.sender.avatarUrl">-->
                <NbPhotoFrame :picture="messageLetter.sender.avatarUrl" :proportion="100" :width="40"></NbPhotoFrame>
              </div>

              <div style="display: inline-block;">
                <div style="max-width: 300px;padding: 20px 0 3px 0;font-size: 16px;color: #555555;">
                  {{messageLetter.content}}
                </div>
                <div style="font-size: 14px;color: #a4a4a4;">
                  {{messageLetter.createTime | complexHumanTime()}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="bottom-right cursor" @click.stop="sendAll">
          发送 <i class="fa fa-paper-plane-o" style="opacity: 0.7;padding-left: 10px;"></i>
          </div>
        <div>
          <textarea @keyup.enter="sendAll" class="form-control pull-right mr5" rows="2" v-model="messageLetter.content"
          ></textarea>
        </div>
        <div class="bottom-left cursor" @click.stop="closeOwn" >取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Pager from "../../../../../common/model/_base/Pager";
  import MessageLetter from "../../../../../common/model/message/letter/MessageLetter";
  import NbPhotoFrame from "../../../../../components/NbPhotoFrame";
  import { Notification } from 'element-ui'
  import $ from "jquery";
  import User from "../../../../../common/model/user/User";
  import { complexHumanTime } from '../../../../../common/filter/time';
  import PerfectScrollbar from "perfect-scrollbar"

  export default {
    data() {
      return {
        popup: true,
        messageLetterPage: new Pager(MessageLetter, 50),
        messageLetter: new MessageLetter(),
        currentUser: this.$store.state.user,
        ps: null,
        selectUuid: ""
      }
    },
    components: {
      NbPhotoFrame
    },
    computed: {
      scrollContent() {
        return this.$refs["scrollContent"];
      }
    },
    props:{
      closeEnroll:{
        type:Function
      },
      arrayUser: {
        type: Array
      },
      allCheck: {
        type: Boolean
      },
      successCallback: {
        type: Function,
        required: false
      },
      errorCallback: {
        type: Function,
        required: false
      }
    },
    methods: {
      search() {
        this.messageLetterPage.page = 0;
        this.refresh()
      },
      closeOwn(){
        this.closeEnroll();
        this.popup = true;
      },
      refresh() {
        let that = this;
        console.log(this.allCheck);
        console.log(this.arrayUser)
        if (this.arrayUser.length === 1) {
          this.selectUuid = this.arrayUser[0];
          this.messageLetterPage.setFilterValue("orderCreateTime", "ASC");
          this.messageLetterPage.setFilterValue("aboutSender", this.selectUuid);
          this.messageLetterPage.setFilterValue("aboutReceiver", this.currentUser.uuid);
          this.messageLetterPage.httpFastPage(function () {
            $(that.scrollContent).animate({
              scrollTop: 4000
            }, 10);
          });
        }

      },
      sendAll() {
        let that = this;
        if (!this.messageLetter.content) {
          Notification.error({
            message: '内容不能为空！'
          });
          return;
        }
        let receiverUuidList = [];

        if (this.arrayUser.length > 1) {
          for (let i = 0; i < this.arrayUser.length; i++) {
            let allUser = that.arrayUser[i];
            if (allUser !== this.currentUser.uuid) {
              receiverUuidList.push(allUser);
            }
          }
        } else {
          for (let i = 0; i < this.arrayUser.length; i++) {
            let allUser = that.arrayUser[i];
            receiverUuidList.push(allUser);
          }
        }
        //判断当前是多选还是单选模式
        if (receiverUuidList.length > 1) {
          this.messageLetter.httpSendAll(receiverUuidList.toString(), function (response) {
            Notification.success({
              message: '发送成功！'
            });
            that.successCallback();
            that.refresh();
          }, that.errorCallback());
        } else {
          this.messageLetter.httpSave(receiverUuidList[0], function (response) {
            Notification.success({
              message: '发送成功！'
            });
            that.successCallback();
            that.messageLetter.content = "";
            that.messageLetter.render(new MessageLetter());
            that.refresh();
            //将滚动栏保持在最底部，一直显示最新消息
            $(that.scrollContent).animate({
              scrollTop: 4000
            }, 10);
            that.messageLetter.data = response.data.data;
          }, that.errorCallback());
        }
      }
    },
    mounted(){
      // this.box = this.$refs.scrollContent;
      // this.box.addEventListener('scroll', () => {
      //   console.log(this.$refs.scrollContent.scrollTop)
      // }, false)
      this.ps = new PerfectScrollbar(".content", {
        wheelSpeed : 2,
        wheelPropagation : false,
        minScrollbarLength : 20
      });
      this.ps.update();
      this.refresh();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .activity-detail-enroll {
    height: 100%;
    width: 100%;
    .popup{
      position: fixed;
      z-index: 999;
      right: 10%;
      bottom: 50px;
      width: 600px;
      height: 480px;
      background-color: #ffffff;
      box-shadow: 0 3px 7px 0
      rgba(0, 10, 54, 0.16);
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      &.animated {
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
      }
      .title{
        font-size: 20px;
        color: gray;
        line-height: 75px;
      }
      .content{
        position: relative;
        height: calc(100% - 70px);
        overflow-y: scroll;
      }
      .bottom{
        padding-left: 28px;
        padding-right: 28px;
        text-align: center;
        .bottom-left{
          //border-radius: 8px;
          width: 126px;
          height: 40px;
          line-height: 40px;
          float: left;
          color: #999999;
          background-color: #f5f8fa;
          border: solid 1px #e2e2e2;
        }
        .bottom-right{
          background-color: #00b5e2;
          border: solid 1px #e2e2e2;
          color: #ffffff;
          line-height: 40px;
          width: 104px;
          height: 39px;
          float: right;
        }
        .form-control{
          width: 300px;
          resize: none;
        }
      }
    }
  }
</style>

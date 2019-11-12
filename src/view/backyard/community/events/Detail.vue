<template>
  <div class="by-events-detail animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <div class="pull-left f24">
          <div title="返回" class="cursor-pointer" @click.stop.prevent="$router.go(-1)">
            <span><img class="logo" width="30" height="30" src="../../../../assets/img/return.png"/></span>
            <span class="ml10 cell-max-title">活动详情</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row pt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <div class="row">
              <div class="col-md-12">
                <span class="f18 cell-title-color">{{communityEvents.creator.name}}</span>
              </div>
            </div>
            <div class="row mt5">
               <div class="col-md-12">
                 <span class="f14 cell-title-color">描述：{{communityEvents.description}}</span>
               </div>
            </div>
            <div class="row mt5">
              <div class="col-md-12 f14 cell-title-color">
                <div>时间：<span>{{communityEvents.timeStart | dateWeekday }}{{communityEvents.timeStart | date('，MM月dd日，yyyy年') }}</span></div>
                <div><span class="pl40"> {{communityEvents.timeEnd | date('EEE，MM月dd日，yyyy年')  }}</span></div>
              </div>
            </div>
            <div class="row mt5" >
              <div class="col-md-12">
                  <span class="f14 cell-title-color">地址：{{communityEvents.address.address}}</span>
              </div>
            </div>
            <div class="row mt5">
              <div class="col-md-12">
                <span class="f14 cell-title-color">所属空间：{{communityEvents.spaceRegional.name}}</span>
              </div>
            </div>
            <div class="row mt20">
              <div class="col-md-12">
                <img class="img-rounded" width="122" height="122" v-if="communityEvents.poster && communityEvents.poster.url" :src="communityEvents.poster.getUrlBySize(122,122)">
              </div>
            </div>
            <div class="row mt20">
              <div class="col-md-12">
                {{communityEvents.createTime | date('MM月dd日, ')  }}{{communityEvents.createTime | dateWeekday  }}
              </div>
            </div>
            <div class="row" >
              <div class="pull-right pt35 pr35 pb10">
                <button title="编辑" class="btn btn-theme " style="width: 122px;height: 46px;"
                        @click.stop.prevent="$router.push({path:'/by/community/events/edit',query:{uuid:communityEvents.uuid}})">
                  编辑
                </button>
              </div>
            </div>
          </div>
      </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body" style="border: 0;">

            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="pull-left">
                  <span class="mr20 ml16" ><NbCheckbox v-model="allCheck"/></span>
                  <span>全选</span>
                </div>
                <div class="pull-right">
                  <div class="pr20">
                    <button class="btn btn-sm btn-theme f14" style="width: 122px;height: 46px;" @click="sendEmail(enroll)">
                      发送邮件</button>
                    <button class="btn btn-sm btn-theme f14" style="width: 122px;height: 46px;" @click="sendSMS(enroll)">
                      短信通知</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12 pt30"  v-for="(enroll,index) in communityEvents.enrolls" :key="index" >
                  <div class="col-md-2 col-sm-2 col-xs-2 description">
                    <span class="mr20"><NbCheckbox v-model="enroll.checked"/></span>
                    <span>{{enroll.creator.name}}</span>
                  </div>
                  <div class="col-md-2 col-sm-2 col-xs-2 description">
                    <span>电话:{{enroll.creator.phone}}</span>
                  </div>
                  <div class="col-md-4 col-sm-2 col-xs-2 description">
                    <span>邮箱:{{enroll.creator.email}}</span>
                  </div>
                  <div class="col-md-2 col-sm-2 col-xs-2 description">
                    <span class="pull-right">{{enroll.createTime | simpleDateMinute}}</span>
                  </div>
                  <div class="col-md-2 col-sm-2 col-xs-2 description">
                      <div align="center">
                        <span v-if="enroll.status === 'REVIEW'">
                          <a title="审核通过"  @click.stop.prevent="reviewPass(enroll)" v-show="enroll.status === 'REVIEW'" >
                            <i class="fa fa-check-circle  f20"></i>
                          </a>
                          <a title="审核失败"  @click.stop.prevent="reviewReject(enroll)" v-show="enroll.status === 'REVIEW'">
                            <i class="fa fa-times-circle cell-danger f20"></i>
                          </a>
                        </span>
                        <span v-if="enroll.status === 'REVIEW_PASS'" class="f14 cell-normal" >审核通过</span>
                        <span v-if="enroll.status === 'REVIEW_REJECT'" class="f14 cell-danger" >审核未通过</span>
                      </div>
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
  import {Notification} from 'element-ui';
  import CommunityEvents from "../../../../common/model/community/CommunityEvents";
  import NbMap from "../../../../components/map/NbMap";
  import NbCheckbox from "../../../../components/NbCheckbox";
  import Enroll from "../../../../common/model/community/enroll/Enroll";

  export default {
    data () {
      return {
        showReason: false,
        reason: null,
        allCheck: false,
        enroll : new Enroll(),
        StatusMap: Enroll.prototype.StatusMap,
        communityEvents: new CommunityEvents()
      }
    },
    components: {
      NbMap,
      NbCheckbox
    },
    props:{

    },
    computed:{

    },
    watch:{
      "allCheck"(){
        for (let i = 0; i < this.communityEvents.enrolls.length; i++) {
          let enroll = this.communityEvents.enrolls[i];
          enroll.checked = this.allCheck;
        }
      }
    },
    methods: {
      review(enroll){
        enroll.httpStatus(enroll.Status.REVIEW,this.reason,function () {
          enroll.status = enroll.Status.REVIEW;
          Notification.success({
            message: '修改状态成功！'
          });
        })
      },
      reviewPass(enroll){
        enroll.httpStatus(enroll.Status.REVIEW_PASS,this.reason,function () {
          enroll.status = enroll.Status.REVIEW_PASS;
          Notification.success({
            message: '修改状态成功！'
          });
        })
      },
      reviewReject(enroll){
        enroll.httpStatus(enroll.Status.REVIEW_REJECT,this.reason,function () {
          enroll.status = enroll.Status.REVIEW_REJECT;
          Notification.success({
            message: '修改状态成功！'
          });
        })
      },
      sendReason(){
        this.showReason = true;
      },
      addUsers(communityEvents){
          communityEvents.httpEnroll(function () {
            Notification.success({
              message: '报名成功！'
            });
          });
      },
      sendEmail(enroll){
        let that = this;
        let uuIds = this.getCheckedUuIds();
        if (!uuIds) {
          return;
        }
        enroll.httpEmail(uuIds,function () {
          Notification.success({
            message: '发送邮件成功！'
          });
        });
      },
      sendSMS(enroll){
        let that = this;
        let uuIds = this.getCheckedUuIds();
        if (!uuIds) {
          return;
        }
        enroll.httpSMS(uuIds,function () {
          Notification.success({
            message: '发送短信成功！'
          });
        });
      },
      getCheckedUuIds(){
        let uuIds = [];
        let that = this;
        for (let i = 0; i < this.communityEvents.enrolls.length; i++) {
          let messageLetter = this.communityEvents.enrolls[i];
          if (messageLetter.checked) {
            uuIds.push(messageLetter.uuid);
          }
        }
        if (!uuIds.length) {
          Notification.error({
            message: '请选择消息！'
          });
          return null;
        }
        return uuIds;
      }
    },
    mounted(){
      let that = this;
      this.communityEvents.uuid = this.$route.query.uuid;
      if (this.communityEvents.uuid) {
        this.communityEvents.httpDetail(function (response) {
        });
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .by-events-detail {
    padding: 20px 120px 0 30px;
    .mail-body {
      font-size: 14px;
      color: #9c9c9c;
      img {
        max-width: 100%;
      }
      .description{
        max-height: 40px;
        overflow: hidden;
      }
    }
  }
</style>

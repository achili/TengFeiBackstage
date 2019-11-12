<template>
  <div class="animated fadeIn message-system-letter">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left">
          <span class="title">系统通知列表</span>
        </div>
      </div>
    </div>

    <div class="row mt10 ">

      <div class="col-md-12 col-sm-12  col-xs-12 invite-list">

        <div class="row mt5">
          <div class="col-md-12 col-sm-12  col-xs-12" align="left">
            <div v-for="message in pager.data"  class="bg-white p10 br4 mt18 cursor" style="height: 100px;" :key="message.uuid" @click="readMessage" >
              <div class="media pl10" >
                <div class="media-body">
                  <div class="col-md-2 col-sm-2 col-xs-2 message-system-letter-cell-title box-orient">{{message.sender.name}}</div>
                  <div class="col-md-6 col-sm-6 col-xs-6 message-system-letter-cell-title box-orient" :title="message.content">{{message.content}}</div>
                  <div class="col-md-2 col-sm-2 col-xs-2 message-system-letter-cell-title box-orient text-center" >
                    <span  class="f16 cell-normal" v-if="message.read">已读</span>
                    <span  class="f16 cell-danger" v-if="!message.read">未读</span>
                  </div>
                  <div class="col-xs-2 message-system-letter-cell-title box-orient"  >{{message.createTime | simpleDateTime}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="col-xs-12 mt20">
        <div >
          <NbPager :pager="pager" :callback="refresh"></NbPager>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NbFilter from "../../../../components/filter/NbFilter";
  import NbPager from "../../../../components/NbPagerNew";
  import {MessageBox, Notification} from 'element-ui'
  import MessageLetter from "../../../../common/model/message/letter/MessageLetter";
  import Pager from "../../../../common/model/_base/Pager";

  export default{
    data(){
      return {
        messageLetter: new MessageLetter(),
        pager: new Pager(MessageLetter, 8),
        ready: null
      }
    },
    components: {
      NbFilter,
      NbPager
    },
    computed: {},
    watch: {},
    methods: {
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
       // this.ready = this.message.read;
      },
      readMessage() {
        let that = this;
        this.messageLetter.httpRead("d2cc5a79-9d3a-48e5-96db-13a7e631368c", function () {
          that.refresh();
        });
      }
    },
    mounted(){
      this.pager.enableHistory();
      this.pager.setFilterValue("orderCreateTime", "DESC");
      this.pager.setFilterValue("sender", "d2cc5a79-9d3a-48e5-96db-13a7e631368c");
      // this.pager.setFilterValue("read", "false");
      this.pager.setFilterValue("receiver", this.$store.state.user.uuid);
      this.refresh();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

  .message-system-letter {
    font-size: 16px;
    color: #555555;
    padding: 20px 100px 0 30px;
    .title{
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }
    .message-system-letter-unRead {
      background-color: gainsboro;
    }
    .message-system-letter-cell-title {
      font-size: 16px;
      margin-top: 30px;

      color: #666666;

      line-height: 20px;
      max-height: 40px;
      overflow: hidden;

    }

  }

</style>

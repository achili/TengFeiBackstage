<template>
  <div class="animated fadeIn" style="position: absolute;right: 0;left: 0;bottom: 0;top: 0;overflow-y: hidden;">
    <!--<div class="mt30">-->
      <!--<div>-->
        <!--<div class="f30" style="text-align: center;color: #ff6730;">-->
          <!--<span>联系小桥</span>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

    <div style="height: 100%;width: 100%;overflow-y: scroll;padding-top: 30px;padding-bottom: 10px;">
      <div>
        <!--<ListUserCell :user="user" :pager="pager"/>-->
        <NewsCell :user="user" :pager="pager"/>
      </div>
    </div>


  </div>
</template>
<script>
  import ListUserCell from "./widget/ListUserCell";
  import NbPager from '../../../../components/NbPager.vue'
  import NbBtnDropDown from '../../../../components/NbBtnDropdown'
  import NbCheckbox from '../../../../components/NbCheckbox.vue'
  import Pager from "../../../../common/model/_base/Pager";
  import MessageLetter from  "../../../../common/model/message/letter/MessageLetter"
  import {Notification} from 'element-ui';
  import User from "../../../../common/model/user/User";
  import NewsCell from "./widget/News";


  export default {
    data () {
      return {
        pager: new Pager(MessageLetter),
        messageLetter: new MessageLetter(),
        user: new User()
      }
    },
    components: {
      NbPager,
      ListUserCell,
      NbCheckbox,
      NbBtnDropDown,
      NewsCell
    },
    computed: {

    },
    watch: {
      "user.uuid"(newVal, oldVal) {
        let that = this;
        console.log(this.user.name);
      }
    },
    methods: {
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        let that = this;

      }
    },
    mounted(){

    }
  }
</script>


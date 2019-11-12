<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left f24">
          <span v-show="!spaceOrder.editMode">创建空间预约</span>
          <span v-show="spaceOrder.editMode">编辑空间预约</span>
        </div>
      </div>
    </div>

    <NbSlidePanel slot="back">
      <span slot="heading">
        <i class="fa fa-moon-o"></i>
        基本内容
      </span>
      <div slot="body">
        <div>
          <div class="row mt20">
            <label class="col-md-3 control-label compulsory">所属空间</label>
            <div class="col-md-9">
              <SpaceRegionalSelecton :spaceRegional="spaceOrder.spaceRegional" :editMode="spaceOrder.editMode" :disabled="true"></SpaceRegionalSelecton>
            </div>
          </div>
          <div class="row mt10">
            <label class="col-md-3 control-label compulsory">人员</label>
            <div class="col-md-9">
              <Selection class="mr5" :activeUser="user"/>
            </div>
          </div>
          <div class="row mt10">
            <label class="col-md-3 control-label mt5 compulsory">空间地点:</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="spaceOrder.name">
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-3 control-label mt5 compulsory">空间类型</label>
            <div class="col-md-9">
              <select class="form-control" v-model="spaceOrder.characteristic">
                <option value="MOBILE_STATION">移动办公桌</option>
                <option value="INDEPENDENT_SPACE">独立办公室</option>
              </select>
            </div>
          </div>

          <!--<div class="row mt10">-->
            <!--<label class="col-md-3 control-label mt5 compulsory">工位数量:</label>-->
            <!--<div class="col-md-9">-->
              <!--<input type="text" class="form-control" v-model="spaceOrder.number">-->
            <!--</div>-->
          <!--</div>-->

          <div class="row mt10">
            <label class="col-md-3 control-label mt5 compulsory">入住日期:</label>
            <div class="col-md-9">
              <el-date-picker
                v-model="spaceOrder.startTime"
                type="date"
                :picker-options="pickerOptions0"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </div>

          <div class="row mt10" v-if="spaceOrder.characteristic === 'MOBILE_STATION'">
            <label class="col-md-3 control-label mt5 compulsory">属性：</label>
            <div class="col-md-9" >
            <span class="mr30" v-for="(item,index) in AttributeMap" :key="index">
              <NbCheckbox  v-model="spaceOrder.attribute" :val="item.val" />
              <span class="f16 "> {{item.name}} </span>
            </span>
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-3 control-label mt5">中介机构:</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="spaceOrder.agency">
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-3 control-label mt5">佣金(单位: 元):</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="spaceOrder.commission">
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="row mt10">
                <label class="col-md-3 control-label mt5">备注：</label>
                <div class="col-md-9">
                  <textarea type="text" rows="4" class="form-control" v-model="spaceOrder.remarks"  placeholder="备注"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xs-12 mv10 text-right">
            <div class="alert alert-danger text-center" v-show="spaceOrder.errorMessage">
              {{spaceOrder.errorMessage}}
            </div>
            <NbLoadingButton :entity="spaceOrder" :callback="save"/>
          </div>
        </div>
      </div>
    </NbSlidePanel>

  </div>
</template>
<script>
  import NbSlidePanel from "../../../components/NbSlidePanel";
  import NbForm from "../../../components/NbForm";
  import {Notification} from 'element-ui'
  import {simpleDateTime} from '../../../common/filter/time'
  import SpaceOrder from "../../../common/model/spaceOrder/SpaceOrder";
  import User from "../../../common/model/user/User";
  import Selection from "../../../view/backyard/user/Selection";
  import NbLoadingButton from "../../../components/NbLoadingButton";
  import NbCheckbox from "../../../components/NbCheckbox";
  import SpaceRegionalSelecton from "../../../view/backyard/space/regional/Selection";

  export default {
    data () {
      return {
        AttributeMap: SpaceOrder.prototype.AttributeMap,
        spaceOrder: new SpaceOrder(),
        user: new User(),
        pickerOptions0: {
          disabledDate(time) {
            // 选择今天以及今天之后的日期
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      }
    },
    components: {
      NbSlidePanel,
      NbForm,
      Selection,
      NbLoadingButton,
      NbCheckbox,
      SpaceRegionalSelecton
    },
    computed: {},
    watch: {

    },
    methods: {
      save() {
        let that = this;
        let form = {
          applyUser: this.user.uuid,
          name: this.spaceOrder.name,
          characteristic: this.spaceOrder.characteristic,
          number:this.spaceOrder.number,
          startTime:simpleDateTime(this.spaceOrder.startTime),
          attribute:JSON.stringify(this.spaceOrder.attribute),
          agency:this.spaceOrder.agency,
          commission:this.spaceOrder.commission,
          remarks:this.spaceOrder.remarks,
          spaceRegional:this.spaceOrder.spaceRegional.uuid
        };

        if (this.spaceOrder.uuid) {
          form.uuid = this.spaceOrder.uuid;
        }

        this.spaceOrder.httpSave(form , function (response) {
          Notification.success({
            message: that.spaceOrder.editMode ? '修改空间申请成功！' : '创建空间申请成功！'
          });
          that.$router.push({path:'/by/spaceOrder/detail',query:{ uuid: that.spaceOrder.uuid }});
        });
      },
      successCallback(res){
        let that = this;
        Notification.success({
          message: '提交成功!'
        });
        that.$router.push("/by/spaceOrder/list");
      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        })
      }
    },
    mounted(){
      let that = this;
      this.spaceOrder.uuid = this.$route.query.uuid;
      if(this.spaceOrder.uuid) {
        // this.spaceOrder.editMode = false;
        this.spaceOrder.httpDetail(function () {
          that.user = that.spaceOrder.creator;
        });
      }
    }
  }
</script>

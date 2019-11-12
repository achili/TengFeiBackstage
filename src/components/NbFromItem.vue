<template>
  <div class="nb-form-item">
    <div class="nb-input" v-if="formItem.type === FormItemType.INPUT">
      <input :id="formItem.id" type="text" class="form-control" v-model="formItem.value"  @blur="blur"
             @focus="emptyMsg" :placeholder="formItem.rule.placeholder">
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div class="nb-text_area" v-if="formItem.type === FormItemType.TEXT_AREA">
      <textarea :id="formItem.id" type="text" class="form-control" v-model="formItem.value"  @blur="blur"
                @focus="emptyMsg" :placeholder="formItem.rule.placeholder"></textarea>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div class="nb-text_area" v-if="formItem.type === FormItemType.RICH_TEXT">
      <NbEditor v-model="formItem.value" :height="formItem.rule.height"></NbEditor>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>
    <div class="nb-input" v-if="formItem.type === FormItemType.NUMBER">
      <NbNumberInput v-model="formItem.value" :allowedNegative="formItem.rule.allowedNegative"
                     :allowedDecimal="formItem.rule.allowedDecimal" :placeholder="formItem.rule.placeholder"
                     :blurCallback="blur" @focus="emptyMsg"></NbNumberInput>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.TANK">
      <NbTank :tank="formItem.value"></NbTank>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.TANK_APP">
      <NbTankApp :tank="formItem.value"></NbTankApp>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.TANKS">
      <NbTanks :tanks="formItem.value" :maxNum="formItem.rule.max" :templateTank="formItem.rule.templateTank"/>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.DATE">
      <el-date-picker :id="formItem.id" v-model="formItem.value" type="datetime"
                      :placeholder="formItem.rule.placeholder">
      </el-date-picker>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.MAP_ADDRESS">
      <input :id="formItem.id" type="text" class="form-control" v-model="formItem.value.address">
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
      <NbMap :height="formItem.rule.height" :width="formItem.rule.width" :position="formItem.value"></NbMap>
    </div>

    <div v-if="formItem.type === FormItemType.CHECKBOX">
      <div v-for="checkItem in formItem.rule.list" :key="checkItem.val">
        <NbCheckbox :val="checkItem.val" v-model="formItem.value" :inputId="checkItem.val"></NbCheckbox>
        <label :for="checkItem.val">{{checkItem.name}}</label>
      </div>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.SELECT">
      <el-select v-model="formItem.value" placeholder="请选择" class="nb-select" :disabled="formItem.rule.disabled">
        <el-option
          v-for="checkItem in formItem.rule.list"
          :key="checkItem.val"
          :label="checkItem.name"
          :value="checkItem.val">
        </el-option>
      </el-select>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.SPACE_BUILDING_SELECTION">
      <SpaceBuildingSelection :activeSpaceBuilding="formItem.value" ></SpaceBuildingSelection>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.SPACE_RESERVATION_SELECTION">
      <SpaceReservationSelection :activeSpaceReservation="formItem.value" ></SpaceReservationSelection>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>
    <div v-if="formItem.type === FormItemType.CONFERENCE_ROOM_SELECTION">
      <ConferenceRoomSelection :activeConferenceRoom="formItem.value" ></ConferenceRoomSelection>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.CODE_MIRROR">
      <NbCodeMirror v-model="formItem.value"></NbCodeMirror>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.SELECT_SPACE">
      <label>
        <select class="form-control" v-model="formItem.value" :disabled="formItem.rule.disabled">
          <option v-for="(checkItem,index) in list"  :value="checkItem" :key="index" v-if="user.hasPermissionSpace(FeatureType.ADMIN,checkItem.uuid)">{{checkItem.name}}</option>
        </select>
      </label>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

  </div>
</template>

<script>
  import FormItem from "../common/model/_base/FormItem";
  import NbNumberInput from "./NbNumberInput";
  import NbEditor from "./NbEditor";
  import NbTank from "./NbTank";
  import NbTanks from "./NbTanks";
  import NbDateRange from "./NbDateRange";
  import NbMap from "./map/NbMap";
  import NbCheckbox from "./NbCheckbox"
  import NbSelect from "./NbSelect"
  import SpaceBuildingSelection from "./selection/SpaceBuildingSelection";
  import SpaceReservationSelection from "../view/backyard/spacereservation/Selection.vue";
  import ConferenceRoomSelection from "../view/backyard/conferenceroom/Selection";
  import NbCodeMirror from "./NbCodeMirror"
  import NbTankApp from "./NbTankApp";
  import SpaceRegional from "../common/model/space/SpaceRegional";
  import SpaceRegionalSelect from "../view/backyard/space/regional/Selection.vue";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "./../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../common/util/Utils";


  export default {
    data() {
      return {
        list:null,
        spaceRegional:new SpaceRegional(),
        FormItemType: FormItem.prototype.Type,
        susse:"",
        FeatureType,
        user: this.$store.state.user,
        defaultMsg: '这里是UE测试',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        spaces: this.$store.state.spaces,
        spaceUserIdKey:"the_bridge_space_"
      }
    },
    props: {
      formItem: {
        type: FormItem,
        required: true
      }
    },
    components: {
      NbTank,
      NbNumberInput,
      NbEditor,
      NbTanks,
      NbDateRange,
      NbMap,
      NbCheckbox,
      NbSelect,
      SpaceBuildingSelection,
      SpaceReservationSelection,
      ConferenceRoomSelection,
      NbCodeMirror,
      NbTankApp,
      SpaceRegionalSelect
    },
    computed: {},
    watch:{
      'formItem.value'(newVal,oldVal) {
        this.formItem.watch(newVal, oldVal);
      },
      'formItem.value.uuid'(newVal,oldVal) {
        this.formItem.watch(newVal, oldVal);
      }
    },
    methods: {
      blur(){
        this.formItem.validate();
      },
      emptyMsg() {
        this.formItem.errorMsg = null;
      }
    },
    mounted() {
      let that = this;
      this.spaceRegional.httpList(function (res) {
        that.list = res.data.data.list;
        if(that.formItem.type === that.FormItemType.SELECT_SPACE){
          that.list.forEach(ddd=>{
              if(readLocalStorage(that.spaceUserIdKey + that.user.uuid) !== null){
                if(ddd.uuid === readLocalStorage(that.spaceUserIdKey + that.user.uuid)){
                  that.formItem.value = ddd;
                }
              }else if(readLocalStorage(that.spaceUserIdKey + that.user.uuid) === null){
                if(ddd.uuid === that.user.role.spaceRegional.uuid){
                  that.formItem.value = ddd;
                }
              }else{
                if(ddd.uuid === that.$store.state.spaceUuid){
                  that.formItem.value = ddd;
                }
              }
          })
        }

      });

    }
  }
</script>

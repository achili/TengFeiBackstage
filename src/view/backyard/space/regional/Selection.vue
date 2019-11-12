<template>
  <div >
    <label>
      <select class="form-control" v-model="spaceRegionalActive" :disabled="disabled" @change="change">
        <option v-for="(spaceRegional,index) in list"  :value="spaceRegional" :key="index"  v-if="user.hasPermissionSpace(FeatureType.ADMIN,spaceRegional.uuid)">{{spaceRegional.name}}</option>
      </select>
    </label>

  </div>

</template>
<script>
  import NbPagerSelection from "../../../../components/NbPagerSelection";
  import SpaceRegional from "../../../../common/model/space/SpaceRegional";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../common/model/core/feature/FeatureType";
  import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../../../common/util/Utils";

  export default{
    data(){
      return {
        spaceRegionalActive: new SpaceRegional(),
        spaceRegionals: new SpaceRegional(),
        list:[],
        FeatureType,
        user: this.$store.state.user,
        spaceUserIdKey: "the_bridge_space_"

      }
    },
    props: {
      spaceRegional: {
        type: SpaceRegional,
        required: true
      },
      initFilter: {
        type: Object,
        required: false
      },
      editMode:{
        type: Boolean,
        required: true
      },
      disabled:{
        type: Boolean,
        required: false
      },
      refreshPage:{
        type: Boolean,
        required: false
      }
    },
    watch: {
      "spaceRegional.uuid"(newVal,oldVal){
        if(this.editMode){
          if(oldVal === null){
            this.spaceRegionalActive.render(this.spaceRegional);
          }
        }
      },
      "spaceRegionalActive.uuid"(newVal,oldVal) {
        if(oldVal !== null){
          this.localStorage();
        }else{
          this.readStorage();
        }
        this.clickItem(this.spaceRegionalActive);

      }

    },
    methods: {
      readStorage(){
        if(readLocalStorage(this.spaceUserIdKey + this.user.uuid) != null){
          this.$store.state.spaceUuid = readLocalStorage(this.spaceUserIdKey + this.user.uuid);
        }
      },
      localStorage(){
        this.$store.state.spaceUuid = this.spaceRegionalActive.uuid;
        saveToLocalStorage(this.spaceUserIdKey + this.user.uuid, this.$store.state.spaceUuid);
      },
      clickItem(spaceRegionalActive){
        this.spaceRegional.render(spaceRegionalActive);
      },
      refresh(){
        let that = this;

        this.spaceRegionals.httpList(function (res) {
          that.list = res.data.data.list;
          that.list.forEach(ddd=>{
            if(!that.editMode){
              if(readLocalStorage(that.spaceUserIdKey + that.user.uuid) == null){
                if(ddd.uuid === that.user.role.spaceRegional.uuid){
                  that.spaceRegionalActive = ddd;
                }
              }else{
                if(ddd.uuid === readLocalStorage(that.spaceUserIdKey + that.user.uuid)){
                  that.spaceRegionalActive = ddd;
                }
              }

            }

          })
        });
      },
      change(){
        if(this.refreshPage){
          this.$router.go(0);
        }
      }

    },
    components: {
      NbPagerSelection
    },
    mounted(){
      let that = this;
      this.refresh();
      // removeLocalStorage(this.spaceUserIdKey + this.user.uuid)
    }
  }
</script>

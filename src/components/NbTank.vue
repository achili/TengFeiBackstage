<template>
  <div class="nb-tank-block">
    <NbExpanding>
      <div v-show="edit && tank.procedure === tank.Procedure.FREE && !tank.exist()">
        <div>
          <span class="btn btn-info f16 btn-sm btn-file">
            <slot name="button">
              <!--<i class="fa fa-folder-open-o"></i>-->
              <span>选择文件</span>
            </slot>
            <input ref="refFile" type="file" name="avatar" @change.prevent.stop="fileChanged"/>
          </span>
          <span>({{tank.getUploadType()}},{{tank.maxSize | humanFileSize}}以内)</span>
        </div>
        <div class="mt5 f12" style="color: #ff9a9a;" v-if="!tank.errorMessage && tank.uploadHint">
          <i class="fa fa-info-circle"></i> {{tank.uploadHint}}
        </div>
        <div class="mt5 " v-if="tank.errorMessage">
          <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{tank.errorMessage}}</span>
        </div>
      </div>
    </NbExpanding>


    <NbExpanding>
      <div v-show="tank.procedure === tank.Procedure.FETCHING_UPLOAD_TOKEN">
        <i class="fa fa-spinner fa-spin fa-fw"></i> 准备上传中...
      </div>
    </NbExpanding>

    <NbExpanding>
      <div class="huge-block clearfix"
           v-if="tank.procedure === tank.Procedure.UPLOADING">
        <div class="media">
          <div class="pull-right download" >
            <i class="btn-action f16 fa fa-trash text-danger" @click.stop.prevent="del()"></i>
          </div>
          <div class="media-body">{{tank.file.name}}</div>
        </div>
        <div class="progress" :class="{'progress-striped active' : tank.procedure === tank.Procedure.UPLOADING}">
          <div :style="'width: '+(tank.progress*100)+'%'" class="progress-bar progress-bar-primary">
            <span>已上传 {{(tank.progress * 100).toFixed(1)}}%</span>
          </div>
        </div>
        <div>
          已上传:{{ (tank.file.size * tank.progress).toFixed(0) | humanFileSize }}/{{ tank.file.size | humanFileSize}}
          速度:{{tank.speed | humanFileSize}}/s

        </div>
      </div>
    </NbExpanding>

    <NbExpanding>
      <div class="tiny-block"
           v-if="tank.exist()">
        <!--:style="'width:'+previewWidth+'px'"-->
        <div class="bg-white  border" style="width: 122px;"
             v-show="preview && tank.publicImgUrl()">
          <img class="img wp100"  width="122" height="122" :src="tank.publicImgUrl()"/>
        </div>
        <div  style="width: 122px;height: 122px;" v-show="tank.fileIcon() && !tank.publicImgUrl()">
          <div style="text-align: center;padding-top: 52px;" >
            <i class="f20" v-show="tank.fileIcon() && !tank.publicImgUrl()" :class="[tank.fileIcon()]"></i>
          </div>
        </div>
        <span class="download ">
           <img style="width: 20px;height: 20px;" src="../assets/img/download.png"  @click.stop.prevent="tank.download()"/>
            <!--<i class="btn-action f20 fa fa-arrow-circle-down text-success" @click.stop.prevent="tank.download()"></i>-->
        </span >
        <span class="del" v-if="edit">
          <img  style="width: 20px;height: 20px;" src="../assets/img/cut.png"  @click.stop.prevent="del()"/>
          <!--<i class="btn-action f20 fa fa-times-circle text-danger" @click.stop.prevent="del()"></i>-->
        </span>
        <span class="f14 black pull-left cursor hover-underline download" @click.stop.prevent="tank.download()"> </span>
        <div>
          <span>
            {{tank.name}}
            {{tank.size | humanFileSize}}
          </span>
        </div>
      </div>
    </NbExpanding>

  </div>
</template>

<script>
  import Tank from '../common/model/tank/Tank'
  import {MessageBox, Notification} from 'element-ui'
  import NbExpanding from './NbExpanding.vue'

  export default {
    data() {
      return {}
    },
    props: {
      //上传的照片是否需要预览
      preview: {
        type: Boolean,
        required: false,
        'default': true
      },
      previewWidth: {
        type: Number,
        required: false,
        'default': 200
      },
      //当前是否是编辑状态（编辑状态可以上传，非编辑状态只能下载）
      edit: {
        type: Boolean,
        required: false,
        'default': true
      },
      tank: {
        type: Tank,
        required: true
      },
      uploadSuccessCallback: {
        type: Function,
        required: false
      }

    },
    components: {
      NbExpanding
    },
    computed: {},
    methods: {
      fileChanged() {
        let that = this

        let value = that.$refs['refFile'].value
        if (!value) {
          return
        }

        this.tank.file = this.$refs['refFile'].files[0]

        this.tank.httpUpload(function (response) {

          if (typeof that.uploadSuccessCallback === 'function') {
            that.uploadSuccessCallback(that.tank)
          }

        }, function () {
          console.error('上传失败啦')

          that.clear()
        })
      },
      del() {
        let that = this
        MessageBox.confirm('是否删除此文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
            that.clear()
          },
          function () {
          }
        )
      },
      clear() {
        let that = this
        that.tank.clear()
        that.$refs['refFile'].value = ''
      }
    },
    mounted() {


    }
  }
</script>


<style lang="less" rel="stylesheet/less">

  .nb-tank-block {

    .huge-block {
      background-color: white;
      border-radius: 5px;
      padding: 10px;
      border: 1px solid #eeeeee;

      .progress {
        margin-bottom: 10px;
      }

      .media {
        margin-bottom: 5px;
        .media-body {
          cursor: pointer;
          color: #555;
          font-size: 15px;
          font-weight: bold;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    .tiny-block{
      .img{
        position: relative;
      }
      .download{
        margin: -115px 0 0 5px;
        position: absolute;
      }
      .del{
        margin: -115px 0 0 95px;
        position: absolute;
      }
    }

  }


</style>

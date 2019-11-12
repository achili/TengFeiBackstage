<template>
  <div class="nb-tanks-block">


    <div class="tank-block" v-for="(tank,tankIndex) in tanks" :key="tank.uuid">
      <NbExpanding>
        <div v-show="tank.procedure === tank.Procedure.FETCHING_UPLOAD_TOKEN">
          <i class="fa fa-spinner fa-spin fa-fw"></i> 准备上传中...
        </div>
      </NbExpanding>


      <NbExpanding>
        <div class="huge-block clearfix"
             v-if="tank.procedure === tank.Procedure.UPLOADING">
          <div class="media">
            <div class="pull-right">
              <i class="btn-action f16 fa fa-trash text-danger" @click.stop.prevent="del(tank,tankIndex)"></i>
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
          <div style="width: 122px;" class="bg-white border" v-show="tank.publicImgUrl()">
            <img class="wp100" width="122" height="122" :src="tank.publicImgUrl()"/>
          </div>
          <div style="width: 122px;height: 122px;" class="bg-white border" v-show="tank.fileIcon() && !tank.publicImgUrl()">
            <div style="text-align: center;padding-top: 52px;" >
              <i class="f20" v-show="tank.fileIcon() && !tank.publicImgUrl()" :class="[tank.fileIcon()]"></i>
            </div>
          </div>
          <span class="download" title="下载">
            <img class="logo" style="width: 20px;height: 20px;" src="../assets/img/download.png"  @click.stop.prevent="tank.download()"/>
            <!--<i class="btn-action f20 fa fa-arrow-circle-down text-success" @click.stop.prevent="tank.download()"></i>-->
          </span>
          <span class="del" v-if="edit" title="删除">
            <span v-if="show">
              <img class="logo" style="width: 20px;height: 20px;" src="../assets/img/cut.png"  @click.stop.prevent="del(tank,tankIndex)"/>
            </span>
            <!--<i class="btn-action f20 fa fa-times-circle text-danger" @click.stop.prevent="del(tank,tankIndex)"></i>-->
          </span>
          <span class="f30 black cursor hover-underline" @click.stop.prevent="tank.download()"></span>
          <div>
            <span>
              {{tank.name}}
					    {{tank.size | humanFileSize}}
				    </span>
          </div>
        </div>
      </NbExpanding>

    </div>

    <div
      v-show="tanks.length < maxNum && edit && templateTank.procedure === templateTank.Procedure.FREE && !templateTank.exist()">
      <div>
				<span class="btn btn-info btn-sm btn-file f16">
					<slot name="button" >
						<!--<i class="fa fa-folder-open-o"></i>-->
						<span>选择文件</span>
					</slot>
					<input ref="refFile" type="file" name="avatar" @change.prevent.stop="fileChanged" multiple/>
				</span>
        <span>({{templateTank.getUploadType()}},{{templateTank.maxSize | humanFileSize}}以内)</span>
      </div>
      <div class="mt5 italic" v-if="!templateTank.errorMessage && templateTank.uploadHint">
        <i class="fa fa-info-circle"></i> {{templateTank.uploadHint}}
      </div>
      <div class="mt5 " v-if="templateTank.errorMessage">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{templateTank.errorMessage}}</span>
      </div>
    </div>


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
      tanks: {
        type: Array,
        required: true,
        'default': []
      },
      edit: {
        type: Boolean,
        required: false,
        'default': true
      },
      maxNum: {
        type: Number,
        required: false,
        'default': 9
      },
      templateTank: {
        type: Tank,
        required: false,
        'default': function () {
          //默认模板是所有文件均可上传，私有，最大10M
          return new Tank('*', false, 1024 * 1024 * 5)
        },
        validator: function (tank) {
          return tank.validateFilter()
        }
      },
      success: {
        type: Function,
        required: false
      },
      remove: {
        type: Function,
        required: false
      },
      show:{
        type: Boolean,
        required: false,
        'default': true
      }
    },
    components: {
      NbExpanding
    },
    computed: {},
    methods: {
      fileChanged() {
        let that = this

        let fileDom = this.$refs['refFile']

        if (!fileDom.files) {
          console.error("没有定义文件选择控件 refFile")
          return
        }
        let selectedLength = fileDom.files.length;
        if (selectedLength <= 0) {
          that.templateTank.errorMessage = "没有选择文件"
          return
        }

        if (selectedLength + that.tanks.length > that.maxNum) {
          that.templateTank.errorMessage = "文件数量超出了限制：" + that.maxNum
          return
        }

        //提前验证，有错误及时显示
        for (let i = 0; i < selectedLength; i++) {

          let tank = new Tank('*', true)
          tank.render(this.templateTank)

          tank.file = fileDom.files[i]

          //提前验证，有错误及时显示
          if (!tank.validate()) {
            this.templateTank.errorMessage = tank.errorMessage
            console.error(tank.errorMessage)
            return
          } else {
            this.templateTank.errorMessage = null
          }

        }

        //没有错误了再集中进行上传处理。
        for (let i = 0; i < selectedLength; i++) {

          let tank = new Tank('*', true)
          tank.render(this.templateTank)

          tank.file = fileDom.files[i]

          this.tanks.push(tank)

          tank.httpUpload(function () {
            if (that.success) {
              that.success(tank)
            }
          }, function () {
            console.error('上传失败啦')

            //一次检查哪些失败了，失败了的移除掉。
            for (let i = 0; i < that.tanks.length; i++) {
              let itemTank = that.tanks[i]

              if (itemTank.errorMessage) {
                that.templateTank.errorMessage = itemTank.errorMessage
                that.tanks.splice(i, 1)
              }

            }

          })

        }


        fileDom.value = ''

      },

      del(tank, tankIndex) {
        let that = this
        MessageBox.confirm('是否删除此文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
            tank.clear()
            if (that.remove) {
              that.remove(tank)
            }
            that.tanks.splice(tankIndex, 1)
          },
          function () {
          }
        )
      }
    },
    mounted() {

    }
  }
</script>


<style lang="less" rel="stylesheet/less">

  .nb-tanks-block {

    .tank-block {

      transition-duration: 0.3s;
      margin: 5px 0;

      .huge-block {
        background-color: white;
        border-radius: 5px;
        border: 1px solid #eeeeee;
        padding: 10px;

        .progress {
          margin-bottom: 10px;
        }
      }

      .tiny-block{
        img{
          position: relative;
        }
        .download{
          margin: -120px 0 0  5px;
          position: absolute;
        }
        .del{
          margin: -120px 0 0  95px;
          position: absolute;
        }
      }
    }

  }


</style>

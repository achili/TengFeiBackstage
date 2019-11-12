<template>
  <div class="broken-line">
      <div ref="main" class="main"> </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import IndexDeveloper from "../../common/model/_index/IndexDeveloper";
  import SpaceRegional from "../../common/model/space/SpaceRegional";

  export default {
    data() {
      return {
        option: {
          title: {
            text: '情况统计',
            top: 30,
            left:30,
            textStyle: {
              fontSize: '18',
              fontWeight: 'normal'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            bottom: 50,
            right: '16%',
            orient: 'vertical',
            itemGap: 30,
            textStyle: {
              fontSize: '16',
              fontWeight: 'normal'
            },
            data: ['空闲', '占用', '预分配']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['85px', '100px'],
              center: ['35%', '58%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '18',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335, name: '空闲',itemStyle: {color: '#61d4ff'}},
                {value: 310, name: '占用',itemStyle: {color: '#cfc7ff'}},
                {value: 1548, name: '预分配',itemStyle: {color: '#ffdc6f'}}
              ]
            }
          ]
        }
      }
    },
    props:{
      indexDeveloper:{
        type:IndexDeveloper,
        required: true
      },
      type:{
        type:String,
        required:true
      },
      spaceRegional:{
        type:SpaceRegional,
        required: true
      }
    },
    computed: {
      main(){
        return this.$refs["main"];
      }
    },
    watch:{
      "spaceRegional.uuid"(){
        this.refresh();
      }
    },
    methods: {
      init(indexDeveloper) {
        let that = this;
        this.legendArr = this.myChart.getOption().series;
        this.legendArr.forEach((data) => {
          if(that.type === 'spaceOffice'){
            that.option.title.text = '独立办公室使用情况'
            data.name = '独立办公室';
            data.data = [
              {value: indexDeveloper.freeOfficeCount, name: '空闲',itemStyle: {color: '#61d4ff'}},
              {value: indexDeveloper.occupyOfficeCount, name: '占用',itemStyle: {color: '#cfc7ff'}},
              {value: indexDeveloper.preOfficeCount, name: '预分配',itemStyle: {color: '#ffdc6f'}}
            ]
          }else{
            data.name = '移动办公桌';
            data.data = [
              {value: that.indexDeveloper.freeStationCount, name: '空闲',itemStyle: {color: '#61d4ff'}},
              {value: that.indexDeveloper.occupyStationCount, name: '占用',itemStyle: {color: '#cfc7ff'}},
              {value: that.indexDeveloper.preStationCount, name: '预分配',itemStyle: {color: '#ffdc6f'}}
            ]
          }
          data.selected = true;
        })
        window.addEventListener('resize', function() {
          this.myChart.resize()
        }.bind(this))
      },
      refresh(){
        let that = this;
        this.indexDeveloper.httpManage(this.spaceRegional.uuid,function () {
          //初始化echarts实例
          that.myChart = echarts.init(that.main, 'light');
          that.option.series.forEach((data) => {
            if(that.type === 'spaceOffice'){
              that.option.title.text = '独立办公室使用情况'
              data.name = '独立办公室';
              data.data = [
                {value: that.indexDeveloper.freeOfficeCount, name: '空闲',itemStyle: {color: '#61d4ff'}},
                {value: that.indexDeveloper.occupyOfficeCount, name: '占用',itemStyle: {color: '#cfc7ff'}},
                {value: that.indexDeveloper.preOfficeCount, name: '预分配',itemStyle: {color: '#ffdc6f'}}
              ]
            }else{
              that.option.title.text = '移动办公桌使用情况'
              data.name = '移动办公桌';
              data.data = [
                {value: that.indexDeveloper.freeStationCount, name: '空闲',itemStyle: {color: '#61d4ff'}},
                {value: that.indexDeveloper.occupyStationCount, name: '占用',itemStyle: {color: '#cfc7ff'}},
                {value: that.indexDeveloper.preStationCount, name: '预分配',itemStyle: {color: '#ffdc6f'}}
              ]
            }
            data.selected = true;
          })
          that.myChart.setOption(that.option);
          that.init(that.indexDeveloper)
        });
      }
    },
    components: {},
    mounted() {
      let that = this;
      this.refresh()




    }
  }

</script>

<style lang="less">
  .broken-line {
   // background-position: center;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    display: flex;
    .main {
      background-color: #ffffff;
      flex: 1;
      height: 325px;
    }

  }
</style>

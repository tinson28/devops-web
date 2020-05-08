<template>
  <div class="app-container">
    <div class="el-page-header">
      <!-- <div class="el-page-header__left"><i class="el-icon-back"></i>
      <div class="el-page-header__title">返回</div></div>-->
      <div class="el-page-header__content">仪表盘</div>
    </div>
    <!-- <el-alert :closable="false" title="首页" type="success">
      <router-view />
    </el-alert>-->
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card style="background:#409EFF;color:#FFFFFF;" shadow="always">
          <div class="inner">
            <h3>{{device_count}}</h3>
            <p>设备资产</p>
          </div>
          <div class="icon">
            <i class="fa el-icon-thirdserver1"></i>
          </div>
          <a class="small-box-footer" @click="toDevices">
            查看所有
            <i class="el-icon-right"></i>
          </a>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="background:#67C23A;color:#FFFFFF;" shadow="hover">
          <div class="inner">
            <h3>{{user_count}}</h3>
            <p>用户管理</p>
          </div>
          <div class="icon">
            <i class="fa el-icon-thirduser"></i>
          </div>
          <a class="small-box-footer" @click="toUsers">
            查看所有
            <i class="el-icon-right"></i>
          </a>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="background:#E6A23C;color:#FFFFFF;" shadow="never">
          <div class="inner">
            <h3>{{project_count}}</h3>
            <p>项目总数</p>
          </div>
          <div class="icon">
            <i class="fa el-icon-thirdgithub"></i>
          </div>
          <a class="small-box-footer" @click="toProjects">
            查看所有
            <i class="el-icon-right"></i>
          </a>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="12">
        <!-- <canvas id="container" ></canvas> -->
       
        <el-card>
          <!-- <div id="asset_category"></div> -->
          <v-chart  class="my-chart" :options="mypie" theme="light"/>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <!-- <div id="asset_category"></div> -->
          <v-chart  class="my-chart" :options="asset_category" theme="light"/>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="12"> -->
    <!-- <el-col :span="12"> -->
        <!-- <el-card> -->
          <!-- <div id="asset_category"></div> -->
          <!-- <v-chart  class="my-chart" :options="mypie" theme="light"/> -->
        <!-- </el-card> -->
    <!-- </el-col> -->
    <!-- <el-col :span="12"> -->

    <!-- </el-col> -->
    <!-- </el-row> --> 
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import { parseTime } from "@/utils/index";
import { getDeviceStatistics } from "@/api/device";
import { getUserStatistics } from "@/api/user";
import { getProjectStatistics } from "@/api/project";
// import { Pie } from "@antv/g2plot";
// import echart from "echarts";
import ECharts from "vue-echarts"

import "echarts/lib/chart/pie"
// import "echarts/lib/chart/bar"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/title"
import "echarts/lib/component/legend"


export default {
  mixins: [initData],
  components:{
    "v-chart":ECharts
  },
  // props: {
  //   in_data: {
  //     type: Object,
  //     required: true
  //   }
  // },
  // props: {
  //   sup_this: {
  //     type: Object,
  //     required: true
  //   }
  // },
  data() {
    return {
      device_count: 0,
      project_count: 0,
      user_count: 0,
      vm_count_by_provider: [
        // {
        //   type: "分类一",
        //   value: 27
        // },
        // {
        //   type: "分类二",
        //   value: 25
        // },
        // {
        //   type: "分类三",
        //   value: 18
        // },
        // {
        //   type: "分类四",
        //   value: 15
        // },
        // {
        //   type: "分类五",
        //   value: 10
        // },
        // {
        //   type: "其它",
        //   value: 5
        // }
      ],
      asset_category:{
        title: {
          text: "资产分类",
          subtext: "以服务商名称分组",
          left: 25,
          top: 20,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // orient: "vertical",
          right: 10,
          bottom: 10,
          left: 'center',
          data: [],
        },
        series: [
          {
            name: "服务商",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      mypie:{
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          left: 25,
          top: 20,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // orient: "vertical",
          right: 10,
          bottom: 10,
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }

    };
  },
  // watch:{
  //     series_data:{
  //       handler(newVal,oldVal){

  //       }
  //     }
  // },
  created() {
    getDeviceStatistics("total_count").then(res => {
      this.device_count = res.count;
    });
    getUserStatistics("total_count").then(res => {
      this.user_count = res.count;
    });
    getProjectStatistics("total_count").then(res => {
      this.project_count = res.count;
    });
    getDeviceStatistics("vm_count_by_provider").then(res => {
      this.vm_count_by_provider = res
      // this.chartDraw(this.vm_count_by_provider)
    });
  },
  mounted() {
    // this.$nextTick(() => {
    getDeviceStatistics("vm_count_by_provider").then(res => {
      this.asset_category.series[0].data=res
      // this.options.legend.data.push(res)
      let __that=this
      res.forEach(item=>{
        // __that.legend_data.push(item.name)
        __that.asset_category.legend.data.push(item.name)
      })
    });
    // })
  },
  methods: {
    parseTime,
    checkPermission,
    toProjects() {
      this.$router.push({
        path: "/deploy/projects"
      });
    },
    toDevices() {
      this.$router.push({
        path: "/cmdb/asset/devices"
      });
    },
    toUsers() {
      this.$router.push({
        path: "/system/users"
      });
    },
    chartDraw(data) {
      console.log(data);
      const piePlot = new Pie("canvas", {
        forceFit: true,
        title: {
          visible: true,
          text: "资产分类"
        },
        description: {
          visible: true,
          text: "以服务商名称分组"
        },
        radius: 0.8,
        data,
        angleField: "value",
        colorField: "name",
        color: [
          "#2593fc",
          "#38c060",
          "#27c1c1",
          "#705dc8",
          "#3b4771",
          "#f9cb34"
        ],
        label: {
          visible: true,
          type: "spider"
        }
      });
      piePlot.render();
    }
  }
};
</script>

<style >
.el-card__body {
  border-radius: 2px;
  position: relative;
  display: block;
  /* margin-bottom: 20px; */
  /* box-shadow: 0 1px 1px rgba(0,0,0,0.1); */
  padding: 0px;
}
.el-card__body > .inner {
  padding: 10px;
}
.el-card__body .icon {
  width: auto;
  -webkit-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
  position: absolute;
  top: 0px;
  right: 10px;
  z-index: 0;
  font-size: 90px;
  color: rgba(0, 0, 0, 0.15);
}
.fa {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-card__body h3 {
  font-size: 38px;
  font-weight: bold;
  margin: 0 0 10px 0;
  white-space: nowrap;
  padding: 0;
}
.el-card__body p {
  font-size: 15px;
  margin: 0 0 10px;
}
.el-card__body > .small-box-footer {
  position: relative;
  text-align: center;
  padding: 3px 0;
  color: #fff;
  color: rgba(255, 255, 255, 0.8);
  display: block;
  z-index: 10;
  background: rgba(0, 0, 0, 0.1);
  text-decoration: none;
  font-size: 14px;
}
/* .my-chart {
  width: 570px;
  height: 400px;
} */
</style>
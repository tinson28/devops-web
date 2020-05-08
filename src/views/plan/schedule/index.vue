<template>
  <div class="app-container">
    <!-- <eHeader :sup_this="sup_this" :query="query"/> -->
    <el-row :gutter="28">
      <el-col :span="span">
        <div class="tab-container">
        <el-tabs v-model="activeName"  type="card" @tab-click="handleClick">
            <el-tab-pane label="crontab_schedule" name="1">
                <Crontab ref="crontab_table" :sup_this="sup_this" :active_name="1"/>
            </el-tab-pane>
            <el-tab-pane label="interval_schedule" name="2">
                <Interval ref="interval_table" :sup_this="sup_this" :active_name="2"/>
            </el-tab-pane>
        </el-tabs>
        </div>
        <!--表格渲染-->
       
      </el-col>
    </el-row>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import Crontab  from './module/crontab_table'
import Interval from './module/interval_table'
import { parseTime } from '@/utils/index'
// import eHeader from './module/header'
export default {
  components: { Crontab,Interval },
  mixins: [initData],
  data() {
    return {
      row_data: null,
      span: 24,
      activeName: '1',
      dialog: false,
      loading: false,
      sup_this: this,
      query:{},
    }
  },
  created() {
    // this.$nextTick(() => {
    //   this.init()
    // })
    // this.getHost()
  },
  methods: {
    handleClick(){
        console.log(this.activeName)
    }
  }
}
</script>

<style>
  .el-card__header {
    font-size: 14px;
  }
</style>

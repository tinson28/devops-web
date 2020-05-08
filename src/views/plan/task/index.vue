<template>
  <div class="app-container">
    <eHeader :query="query" :sup_this="sup_this"/>
    <el-row :gutter="28">
      <el-col :span="span" >
        <!--表格渲染-->
        <el-table v-loading="loading" ref="tables" :data="data" highlight-current-row size="small" border style="width: 100%;" >
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <div>{{ scope.$index + 1 }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="任务名称"/>
          <el-table-column prop="task" label="任务函数"/>
          <el-table-column  label="过期时间">
            <template slot-scope="scope">
                <i class="el-icon-time" v-show="scope.row.expires"></i>
                <span>{{parseTime(scope.row.expires)}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="schedule">
            <template slot-scope="scope">
                <span v-show="scope.row.crontab">
                  crontab/
                  {{scope.row.crontab_detail}} 
                </span>
                <span v-show="scope.row.interval">
                  interval/
                  {{scope.row.interval_detail}} 
                </span>
            </template>
          </el-table-column>
          <el-table-column  label="任务状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.enabled?'success':'danger'">{{scope.row.enabled?'启用':'禁用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="任务描述"/>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <edit v-if="checkPermission(['admin','task_all','task_edit'])" :data="scope.row" :sup_this="sup_this"/>
              <el-popover
                v-if="checkPermission(['admin','task_all','task_delete'])"
                :ref="scope.row.id"
                placement="top"
                width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                  <el-button :loading="Loading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" size="mini">删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination
          :total="total"
          style="margin-top: 8px;"
          layout="total, prev, pager, next, sizes"
          @size-change="sizeChange"
          @current-change="pageChange"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { delTask, saveTask, retrieveTask,getScheduleList,getCeleryInfo } from '@/api/schedule'
import { parseTime } from '@/utils/index'
// import { getDeviceList } from '@/api/device'
import eHeader from './module/header'
import edit from './module/edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      row_data: null,
      span: 24,
      show: false,
      Loading: false,
      sup_this: this,
      crontabs:[],
      intervals:[],
      celery_queues:[],
      celery_tasks:[],
      schedules:[
          {
            label:'crontab',
            value:'crontab',
            children:[]
          },
          {
            label:'interval',
            value:'interval',
            children:[]
          }
      ]
    }
  },
  created() {
    const __that=this
    getScheduleList('crontab').then(res=>{
        res.forEach(function(item,index){
            __that.crontabs.push({id:item.id,name:item.minute+"   "+item.hour+"   "+item.day_of_month+
            "   "+ item.month_of_year+"   "+ item.day_of_week})
            __that.schedules[0].children.push({value:item.id,label:item.minute+"   "+item.hour+"   "+item.day_of_month+
            "   "+ item.month_of_year+"   "+ item.day_of_week})
        })
        // this.crontabs=res
    })
    getScheduleList('interval').then(res=>{
        res.forEach(function(item,index){
            let unit='秒'
            if(item.period=='days'){
                unit='天'
            }else if(item.period=='hours'){
                unit='小时'
            }else if(item.period=='minutes'){
                unit='分钟'
            }else if(item.period=='seconds'){
                unit='秒'
            }else if(item.period=='microseconds'){
                unit='微秒'
            }
            __that.intervals.push({id:item.id,name:"间隔 "+item.every+"  "+unit})
            __that.schedules[1].children.push({value:item.id,label:"间隔 "+item.every+"  "+unit})
        })
    })
    getCeleryInfo('queue').then(res=>{
        this.celery_queues=res
    })
    getCeleryInfo('task').then(res=>{
        this.celery_tasks=res
    })
    this.$nextTick(() => {
      this.init_data()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    init_data() {
      this.init()
    },
    beforeInit() {
      this.url = 'api/periodic_task/'
      const sort = 'id'
      const query = this.query
      const value = query.value
      this.params = { page: this.page, size: this.size, ordering: sort }
      if (value) { this.params['search'] = value }
      return true
    },
    subDelete(id) {
      this.Loading = true
      delTask(id).then(res => {
        this.Loading = false
        this.$refs[id].doClose()
        this.cancel()
        this.init()
        this.$message({
          showClose: true,
          type: 'success',
          message: '删除成功!',
          duration: 2500
        })
      }).catch(err => {
        this.Loading = false
        this.$refs[id].doClose()
        console.log(err)
      })
    },
    cancel() {
      this.span = 24
      this.show = false
      this.table_show = true
    },
    getHost() {
      getDeviceList('Linux').then(res => {
        const _this = this
        res.forEach(function(data, index) {
          const host = { key: data.id, label: data.ip }
          _this.transfer_data.push(host)
        })
      })
    },
    update(id) {
      // 刷新选中行数据
      retrieve(id).then(res => {
        for (let i = 0; i < this.data.length; i++) {
          if (res.id === this.data[i].id) {
            this.data[i] = res
            break
          }
        }
      })
    },
    filterMethod(query, item) {
      return item.label.indexOf(query) > -1
    }
  }
}
</script>

<style>
  .el-card__header {
    font-size: 14px;
  }
</style>

<template>
  <div class="app-container">
    <eHeader :query="query" :dicts="dicts"/>
    <el-row :gutter="28">
      <el-col :span="span1" >
        <!--表格渲染-->
        <el-table v-loading="loading" ref="tables" :data="data" highlight-current-row size="small" border style="width: 100%;"
                  @select="handleSelectionChange" @select-all="selectAll">
          <el-table-column type="selection" width="55" align="center" >
          </el-table-column>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <div>{{ scope.$index + 1 }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称"/>
          <el-table-column  prop="provider" label="云产商"/>
          <!-- <el-table-column  prop="region" label="区域"/> -->
          <el-table-column  prop="is_enable" label="状态">
            <template slot-scope="scope">
                <el-tooltip :content="scope.row.is_enable? '切换到禁用状态':'切换到启用状态'" placement="top">
                <el-switch
                  v-model="scope.row.is_enable"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeSwitch($event,scope.row,scope.$index)">
                </el-switch>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <edit v-if="checkPermission(['admin','cloudconfig_all','cloudconfig_edit'])" :dicts="dicts" :data="scope.row" :sup_this="sup_this"/>
              <el-popover
                v-if="checkPermission(['admin','cloudconfig_all','cloudconfig_edit'])"
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
import { del, retrieve } from '@/api/cloudconfig'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
import { getKey } from '@/api/dict'
import { edit  as changeStatus } from '@/api/cloudconfig'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      row_data: null,
      span1: 24,
      show: false,
      table_show: true,
      Loading: false,
      sup_this: this,
      service_provider:'',
      dicts: [],
      cloudIds:[]
    }
  },
  created() {
    this.$nextTick(() => {
      this.init_data()
      this.getAllProvider()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    init_data() {
      this.init()
    },
    beforeInit() {
      this.url = 'api/cloudconfig/'
      const sort = 'id'
      const query = this.query
      const value = query.value
      this.params = { page: this.page, size: this.size, ordering: sort }
      if (value) { this.params['search'] = value }
      return true
    },
    subDelete(id) {
      this.Loading = true
      del(id).then(res => {
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
    hostSave(id) {
      this.loading = true
      save(this.row_data.id, { hosts: this.serverIds }).then(res => {
        this.$message({
          showClose: true,
          type: 'success',
          message: '保存成功!',
          duration: 2500
        })
        this.loading = false
        this.update(this.row_data.id)
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    cancel() {
      this.show = false
      this.table_show = true
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
    },
    // handleSelectionChange(rows,row) {
    //   this.multipleSelection = rows
    //   let cloudIds=this.serverIds
    //   console.log(cloudIds)
    //   if(this.multipleSelection.length && this.multipleSelection.indexOf(row)<0){
    //     console.log(cloudIds.indexOf(row.id))
    //     hostIds.splice(cloudIds.indexOf(row.id),1)
    //     console.log(cloudIds)
    //   }
    //   this.multipleSelection.forEach(function (item) {
    //     if (cloudIds.indexOf(item.id)<0){
    //       cloudIds.push(item.id)
    //     }
    //   })
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    selectAll(val){
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    getAllProvider() {
      if (Array.isArray(this.dicts) && this.dicts.length === 0) {
        getKey('SERVICE_PROVIDER').then(res => {
          console.log(res)
          this.dicts = res[0].SERVICE_PROVIDER
        })
      }
    },
    changeSwitch(data,row,index){
        console.log(row)
        changeStatus(row.id,row).then(res=>{
          this.$message({
          showClose: true,
          type: 'success',
          message: '修改成功!',
          duration: 2500
          })
        }).catch(err => {
          this.$message({
          showClose: true,
          type: 'error',
          message: '修改失败!',
          duration: 2500
          })
        console.log(err)
        })
    }
  }
}
</script>

<style>
  .el-card__header {
    font-size: 14px;
  }
</style>

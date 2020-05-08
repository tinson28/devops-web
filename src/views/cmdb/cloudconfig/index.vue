<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <el-row :gutter="28">
      <el-col :span="span1" >
        <!--表格渲染-->
        <el-table v-loading="loading" ref="tables" :data="data" highlight-current-row size="small" border style="width: 100%;" @current-change="handleCurrentChange">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <div>{{ scope.$index + 1 }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称"/>
          <el-table-column  prop="provider" label="云产商"/>
          <!-- <el-table-column  prop="region" label="区域"/> -->
          <el-table-column  prop="is_enable" label="状态"/>
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
      service_provider:''

    }
  },
  created() {
    this.$nextTick(() => {
      this.init_data()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    init_data() {
      this.init()
      this.getHost()
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
      this.span1 = 24
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
    getAllProvider() {
      if (Array.isArray(this.business_list) && this.business_list.length === 0) {
        getKey('SERVICE_PROVIDER').then(res => {
          this.service_provider = res[0].SERVICE_PROVIDER
        })
      }
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

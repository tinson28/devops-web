<template>
  <div class="app-container">
    <eHeader :dicts="dicts" :query="query"/>
    <!--表格渲染-->
    <tree-table v-loading="loading" :data="data" :expand-all="true" :columns="columns" border size="small">
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-if="checkPermission(['admin','dict_all','dict_edit'])" :dicts="dicts" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-if="checkPermission(['admin','dict_all','dict_delete'])"
            :ref="scope.row.id"
            placement="top"
            width="200">
            <p>确定删除吗,如果存在下级节点则节点上升，此操作不能撤销！</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </tree-table>
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import treeTable from '@/components/TreeTable'
import initData from '@/mixins/initData'
import { del } from '@/api/dict'
import { getDictTree } from '@/api/dict'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
export default {
  components: { eHeader, edit, treeTable },
  mixins: [initData],
  data() {
    return {
      columns: [
        {
          text: 'Key',
          value: 'key'
        },
        {
          text: 'Value',
          value: 'value'
        },
        {
          text: '描述',
          value: 'desc'
        }
      ],
      delLoading: false, sup_this: this, dicts: []
    }
  },
  created() {
    this.getDicts()
    this.$nextTick(() => {
      this.init(
        this.size = 10
      )
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/dicts/'
      const sort = 'id'
      const query = this.query
      const value = query.value
      this.params = { page: this.page, size: this.size, ordering: sort }
      if (value) { this.params['search'] = value }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$message({
          showClose: true,
          type: 'success',
          message: '删除成功!',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err)
      })
    },
    getDicts() {
      getDictTree().then(res => {
        this.dicts = res.detail
      })
    }
  }
}
</script>

<style scoped>

</style>

 <template>
 <div>
 <eHeader :sup_this="sup_this" :query="query"/>
 <el-table v-loading="loading" ref="cron_tables" :data="data" highlight-current-row size="small" border style="width: 100%;" >
          <el-table-column prop="minute" label="分"/>
          <el-table-column prop="hour" label="时"/>
          <el-table-column prop="day_of_month" label="日"/>
          <el-table-column prop="month_of_year" label="月"/>
          <el-table-column prop="day_of_week" label="周"/>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <edit v-if="checkPermission(['admin','schedule_all','schedule_edit'])" :data="scope.row" :sup_this="sup_this"/>
              <el-popover
                v-if="checkPermission(['admin','schedule_all','schedule_delete'])"
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
</div>
</template>


<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { parseTime } from '@/utils/index'
import eHeader from './header'
import edit from './edit'
import {delCrontab} from '@/api/schedule'
export default {
  name: 'Crontab',
  components: {edit,eHeader },
  mixins: [initData],
  props: {
    active_name: {
      type: Number,
      required: true
    },
    // active_name:{
    //     type: String,
    //     required: true
    // }
  },
  data() {
    return {
      row_data: null,
      span: 24,
      show: false,
      table_show: true,
      transfer_name: ['可关联', '已关联'],
      transfer_data: [],
      serverIds: [],
      Loading: false,
      sup_this: this
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/crontab_schedule/'
      const sort = 'id'
      const query = this.query
      const value = query.value
      this.params = { page: this.page, size: this.size, ordering: sort }
      if (value) { this.params['search'] = value }
      return true
    },
    subDelete(id) {
      this.Loading = true
      delCrontab(id).then(res => {
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
      this.span = 24
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
    }
  }
}
</script>

<style>
  .el-card__header {
    font-size: 14px;
  }
</style>

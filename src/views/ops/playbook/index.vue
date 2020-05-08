<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <el-row :gutter="28">
      <el-col :span="span">
        <!--表格渲染-->
        <el-table v-loading="loading" ref="tables" :data="data" highlight-current-row size="small" border style="width: 100%;" >
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <div>{{ scope.$index + 1 }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="playbook_name" label="剧本名称"/>
          <el-table-column v-if="table_show" prop="playbook_desc" label="剧本描述"/>
          <el-table-column v-if="table_show" label="创建时间">
            <template slot-scope="scope">
                <i class="el-icon-time" v-show="scope.row.playbook_time"></i>
                <span>{{parseTime(scope.row.playbook_time)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!--<relate v-if="checkPermission(['admin','cmdb_all','cmdb_edit'])" :data="scope.row" :sup_this="sup_this"/>-->
              <edit v-if="checkPermission(['admin','playbook_all','playbook_edit'])" :data="scope.row" :sup_this="sup_this"/>
              <el-popover
                v-if="checkPermission(['admin','playbook_all','playbook_edit'])"
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
              <!--<el-button type="primary" size="mini" v-if="checkPermission(['admin','playbook_all'])" :data="scope.row" :sup_this="sup_this">执行</el-button>-->
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
      <div style="height: 10px"></div>
      <el-col :span="24">
        <!--<el-card>-->
          <!--<div slot="header" class="clearfix">-->
            <!--<span>执行结果</span>-->
          <!--</div>-->
          <!--&lt;!&ndash;<template v-for="item in ans_result">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-card class="box-card ansible-box" style="margin:5px">&ndash;&gt;-->
              <!--&lt;!&ndash;<div slot="header"  class="clearfix" >&ndash;&gt;-->
                <!--&lt;!&ndash;<span>{{item.header}}</span>&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;<el-button type="success" size="mini" style="padding: 3px 0" >success</el-button>&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;<el-button :type="item.statusType" size="mini" style="padding: 3px 0">{{item.status}}</el-button>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-button :type="item.rcType" size="mini" style="padding: 3px 0">{{item.rc}}</el-button>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-button style="float: right; padding: 3px 0" icon="el-icon-close" type="warning" size="mini">关闭</el-button>&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--&lt;!&ndash;&lt;!&ndash;<div  :key="item.header" class="text item">&ndash;&gt;&ndash;&gt;-->
              <!--&lt;!&ndash;&lt;!&ndash;<span class="line-html" v-html="item.body"/>&ndash;&gt;&ndash;&gt;-->
              <!--&lt;!&ndash;&lt;!&ndash;</div>&ndash;&gt;&ndash;&gt;-->
              <!--&lt;!&ndash;<div  class="console">&ndash;&gt;-->
                <!--&lt;!&ndash;<div :key="item.header">&ndash;&gt;-->
                  <!--&lt;!&ndash;<span class="line-html" v-html="item.body"/>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-card>&ndash;&gt;-->
            <!--&lt;!&ndash;<div style="height: 10px"></div>&ndash;&gt;-->
          <!--&lt;!&ndash;</template>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-card class="box-card" id="ansible-box">&ndash;&gt;-->
          <!--&lt;!&ndash;<div slot="header"  class="clearfix" >&ndash;&gt;-->
          <!--&lt;!&ndash;<span>卡片名称</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-button style="float: right; padding: 3px 0" icon="el-icon-close" type="warning" size="mini">关闭</el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;<div v-for="o in 4" :key="o" class="text item">&ndash;&gt;-->
          <!--&lt;!&ndash;{{'列表内容 ' + o }}&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-card>&ndash;&gt;-->

          <!--<el-tooltip content="返回上一页" class="closepage item" effect="dark" placement="left">-->
            <!--<el-button type="info" size="mini" circle @click="closeTag"><svg-icon icon-class="return"/></el-button>-->
          <!--</el-tooltip>-->
          <!--<el-tooltip content="清空控制台输出" class="clean item" effect="dark" placement="left">-->
            <!--<el-button type="info" size="mini" circle @click="clean"><svg-icon icon-class="clean"/></el-button>-->
          <!--</el-tooltip>-->
          <!--<el-tooltip :content="content" class="lock item" effect="dark" placement="left">-->
            <!--<el-button type="info" size="mini" circle @click="doLock"><svg-icon :icon-class="ico"/></el-button>-->
          <!--</el-tooltip>-->
          <!--<div id="console" :style="'height:'+ height" class="console">-->
          <!--<div v-for="item in ans_res" :key="item.id">-->
          <!--<span class="line-html" v-html="item"/>-->
          <!--</div>-->
          <!--</div>-->
        <!--</el-card>-->
        <console :show="true"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import checkPermission from '@/utils/permission'
  import initData from '@/mixins/initData'
  import { del, save, retrieve } from '@/api/playbook'
  import { parseTime } from '@/utils/index'
  import { getDeviceList } from '@/api/device'
  import eHeader from './module/header'
  import edit from './module/edit'
  import console from '@/views/remote/ansible/module/console'
  export default {
    components: { eHeader, edit, console },
    mixins: [initData],
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
        sup_this: this,
        ans_res:[]
      }
    },
    created() {
      this.$nextTick(() => {
        this.init()
      })
      this.getHost()
    },
    methods: {
      parseTime,
      checkPermission,
      handleCurrentChange(val) {
        this.row_data = val
        if (this.row_data) {
          this.serverIds = this.row_data.hosts
          this.span = 12
          this.show = true
          this.table_show = false
        }
      },
      beforeInit() {
        this.url = 'api/playbook/'
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

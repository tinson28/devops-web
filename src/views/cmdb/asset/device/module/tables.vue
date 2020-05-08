<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" title="关联资产" width="800px" @opened="initSelection">
  <div class="app-container">
    <eHeader :query="query" ref="header" :whole-update="false" :whole-relate="true" :in_data="in_data" :sup_this="sup_this" />
    <!--表格渲染-->
    <el-table v-loading="loading" ref="r_table" :data="data" size="small" border style="width: 100%;"
              @select="handleSelectionChange">

      <el-table-column type="selection" width="55" align="center" >
      </el-table-column>
      <!--<el-table-column label="序号" width="60" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<div>{{ scope.$index + 1 }}</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="vm_name" label="主机名" />
      <el-table-column  label="IP地址" >
        <template slot-scope="scope">
          <span>{{scope.row.private_ip}}(私有)</span><br>
          <span v-show="scope.row.public_ip">{{ scope.row.public_ip }}(公有)</span>
          <span v-show="scope.row.eip">{{ scope.row.eip }}(弹性)</span>
        </template>
      </el-table-column>
      <el-table-column label="服务商" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.provider}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="设备标签">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.labels" :key="item.id" size="small"
                  style="display: inline-block;margin: 0px 2px;">{{ item.name }}
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column prop="os_version" width="200" label="系统版本"/>
      <!-- <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 'online'" style="color:#00CC00">在线</span>
          <span v-else style="color:red">下线</span>
        </template>
      </el-table-column> -->
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status.toLocaleLowerCase().trim() == 'running' || scope.row.status.toLocaleLowerCase().trim() == 'succeeded'" style="color:#00CC00">在线</span>
          <span v-else style="color:red">下线</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
      :current-page.sync="currentPage" />
  </div>
  </el-dialog>
</template>

<script>
  import checkPermission from '@/utils/permission'
  import initData from '@/mixins/initData'
  import {del} from '@/api/device'
  import {parseTime} from '@/utils/index'
  import eHeader from './header'
  import store from '@/store'

  export default {
    components: {eHeader},
    mixins: [initData],
    props: {
      in_data: {
        type: Object,
        required: true
      },
      // sup_this: {
      //   type: Object,
      //   required: false
      // }
    },
    data() {
      return {
        delLoading: false, sup_this: this, allSelect: false, loading: false, dialog: false, serverIds: [],currentPage:1
      }
    },
    created() {
      this.$nextTick(() => {
        console.log('created')
        this.init()
      })
    },
    mounted(){
      console.log('mounted')
      let __that=this.serverIds
      this.in_data.hosts.forEach(function (item) {
        __that.push(item)
      })
    },
    methods: {
      parseTime,
      checkPermission,
      beforeInit() {
        this.url = 'api/devices/'
        const sort = 'id'
        const query = this.query
        const value = query.value
        const status = query.status
        const groups = query.groups
        const labels = query.labels
        const businesses = query.businesses
        const device_type = query.device_type
        const os_type = query.os_type
        const cloud_id = query.cloud_id
        this.params = {page: this.page, size: this.size, ordering: sort}
        if (status !== '' && status !== null) {
          this.params['status'] = status
        }
        if (groups !== '' && groups !== null) {
          this.params['groups'] = groups
        }
        if (labels !== '' && labels !== null) {
          this.params['labels'] = labels
        }
        if (businesses !== '' && businesses !== null) {
          this.params['businesses'] = businesses
        }
        if (os_type !== '' && os_type !== null) {
          this.params['os_type'] = os_type
        }
        if (device_type !== '' && device_type !== null) {
          this.params['device_type'] = device_type
        }
        if(cloud_id !== '' && cloud_id !== null ){
          this.params['cloud_id'] = cloud_id
        }
        if (value) {
          this.params['search'] = value
        }
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
      // 全选
      toggleSelection(rows) {
        console.log('全选')
        if (rows) {
          rows.forEach(row => {
            this.$refs.r_table.toggleRowSelection(row, !this.allSelect)
          })
          this.allSelect = !this.allSelect
        }
      },
      handleSelectionChange(rows,row) {
        this.multipleSelection = rows
        let hostIds=this.serverIds
        console.log(hostIds)
        if(this.multipleSelection.length && this.multipleSelection.indexOf(row)<0){
          console.log(hostIds.indexOf(row.id))
          hostIds.splice(hostIds.indexOf(row.id),1)
          console.log(hostIds)
        }
        this.multipleSelection.forEach(function (item) {
          if (hostIds.indexOf(item.id)<0){
            hostIds.push(item.id)
          }
        })
      },
      initSelection() {
        console.log('初始化选中')
        console.log(this.serverIds)
        const __that=this.serverIds
        if (__that) {
          console.log(this.data)
          this.data.forEach(row => {
            if (__that.indexOf(row.id)>=0){
              console.log('有值')
              this.$refs.r_table.toggleRowSelection(row,true)
            } else {
              this.$refs.r_table.toggleRowSelection(row,false)
            }
          })
        }
      },
      // 批量删除
      doSelectionDel() {
        const resultArr = []
        this.multipleSelection.forEach(function (data, index) {
          const result = del(data.id).catch(err => {
            console.log(err)
          })
          resultArr.push(result)
        })
        Promise.all(resultArr).then((resultArr) => {
          this.init()
        })
      },
      // 详情
      toDetail(id) {
        this.$router.push({
          path: 'devices/detail',
          query: {id: id}
        })
      },
      sshConnect(rowid) {
        console.log(store.getters)
        console.log(rowid)
        let routeData = this.$router.resolve({
          path: '/webssh',
          // query: params,
          query: {uid: store.getters.id, sid: rowid, token: store.getters.token}
        });
        window.open(routeData.href, '_blank');
      }
    }
  }
</script>


<style scoped>

</style>

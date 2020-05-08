<template>
  <!--<el-dialog :append-to-body="true" :visible.sync="dialog" title="关联资产" width="800px" @opened="initSelection">-->
  <div>
    <!--<eHeader :query="query" ref="header" :whole-update="false" :whole-relate="true" :in_data="in_data"/>-->
    <!--表格渲染-->
    <el-table v-loading="sup_this.loading" ref="r_table" :data="sup_this.data" size="small"  style="width: 100%;"
              @select="handleSelectionChange" :sup_this="this" @sort-change="changeTableSort">

      <el-table-column type="selection" width="42" align="center" >
      </el-table-column>
      <!--<el-table-column label="序号" width="50" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<div>{{ scope.$index + 1 }}</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column  label="主机名">
        <template slot-scope="scope">
          <span>{{scope.row.sys_hostname}}</span>
          <!--<i class="el-icon-centos"></i>-->
          <el-popover  trigger="hover" placement="top-start">
            <span >{{scope.row.os_version}}</span>
            <span slot="reference" class="name-wrapper">
            <!--<svg class="icon" aria-hidden="true">-->
              <!--<use xlink:href="#icon-centos"></use>-->
            <!--</svg>-->
              <img v-show="scope.row.os_version.toLowerCase().indexOf('ubuntu')>=0" src="../../../../../assets/font-icon/ubuntu.svg" width="15px">
            <img v-show="scope.row.os_version.toLowerCase().indexOf('window')>=0" src="../../../../../assets/font-icon/windows.svg" width="13px">
            <img v-show="scope.row.os_version.toLowerCase().indexOf('linux')>=0" src="../../../../../assets/font-icon/linux.svg" width="13px">
            <img v-show="scope.row.os_version.toLowerCase().indexOf('centos')>=0" src="../../../../../assets/font-icon/centos.svg" width="15px">
            </span>
          </el-popover>
          <!--<i class="el-icon-linux"></i>-->
        </template>
      </el-table-column>
      <el-table-column  label="IP地址" >
        <template slot-scope="scope">
          <span>{{scope.row.private_ip}}(私有)</span><br>
          <span v-show="scope.row.public_ip">{{ scope.row.public_ip }}(公有)</span>
          <span v-show="scope.row.eip">{{ scope.row.eip }}(弹性)</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="业务类型" width="120">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag v-for="item in scope.row.businesses" :key="item.id" size="small"-->
                  <!--style="display: inline-block;margin: 0px 2px;">{{ item.name }}-->
          <!--</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="设备标签">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag v-for="item in scope.row.labels" :key="item.id" size="small"-->
                  <!--style="display: inline-block;margin: 0px 2px;">{{ item.name }}-->
          <!--</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="区域/账号" prop="zone_id">
        <template slot-scope="scope">
          <span>{{scope.row.zone_id}}</span>
          <br>
          <span>{{scope.row.cloud_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期"  prop="buy_date" :sortable="'custom'">
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.buy_date)}}</span>
        </template>
      </el-table-column>
      <!--所有服务器显示列-->
      <el-table-column v-if="sup_this.activeName==='all'" label="服务商" >
        <template slot-scope="scope">
          <span v-if="scope.row.provider == 'aliyun'" >阿里云</span>
          <span v-if="scope.row.provider == 'aws'" >亚马逊</span>
          <span v-if="scope.row.provider == 'azure'" >Azure</span>
          <span v-if="scope.row.provider == 'gcp'" >谷歌云</span>
          <span v-if="scope.row.provider == 'qcloud'" >腾讯云</span>
        </template>
      </el-table-column>

      <!--阿里云显示列-->
      <el-table-column v-if="sup_this.activeName==='aliyun'"  label="vpc/vswitch" width="210px">
        <template slot-scope="scope">
          <span v-show="scope.row.vpc_id">VPC:{{scope.row.vpc_id}}</span><br>
          <span v-show="scope.row.vswitch_id">Vswitch:{{ scope.row.vswitch_id }}</span>
        </template>
      </el-table-column>

      <!--azure显示列-->
      <el-table-column v-if="sup_this.activeName==='azure'"  label="资源组" >
        <template slot-scope="scope">
          <span>{{scope.row.resource_group}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="sup_this.activeName==='azure'"  label="vnet/subnet" >
        <template slot-scope="scope">
          <span v-show="scope.row.virtual_network">vnet:{{scope.row.virtual_network}}</span><br>
          <span v-show="scope.row.subnet">subnet:{{ scope.row.subnet }}</span>
        </template>
      </el-table-column>

      <!--aws显示列-->
      <el-table-column v-if="sup_this.activeName==='aws'"  label="vpc/subnet" width="210px">
        <template slot-scope="scope">
          <span v-show="scope.row.vpc_id">VPC:{{scope.row.vpc_id}}</span><br>
          <span v-show="scope.row.subnet">Vswitch:{{ scope.row.subnet }}</span>
        </template>
      </el-table-column>

      <el-table-column label="配置">
        <template slot-scope="scope">
          <span>{{scope.row.cpu}} vcpu {{scope.row.memory/1024}} GB</span><br>
          <span>{{scope.row.vm_size}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.status.toLocaleLowerCase().trim() == 'running' || scope.row.status.toLocaleLowerCase().trim() == 'succeeded'" style="color:#00CC00">在线</span>
          <span v-else style="color:red">下线</span>
        </template>
      </el-table-column>
      <el-table-column prop="leader" label="负责人" width="70">
      </el-table-column>
      <el-table-column label="操作" width="195px" align="center">
      <template slot-scope="scope">
      <el-button v-if="checkPermission(['admin','device_all','device_list'])" size="mini" type="primary"
      @click="toDetail(scope.row.id)">详情
      </el-button>
      <el-popover
      v-if="checkPermission(['admin','device_all','device_delete'])"
      :ref="scope.row.id"
      placement="top"
      width="180">
      <p>确定删除本条数据吗？</p>
      <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
      <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定
      </el-button>
      </div>
      <el-button slot="reference" type="danger" size="mini">删除</el-button>
      </el-popover>
      <el-button v-if="scope.row.os_version.toLowerCase().indexOf('window')>=0" slot="reference" type="success" size="mini" @click="rdpConnect(scope.row.id)">rdp</el-button>
      <el-button v-else="scope.row.os_version.toLowerCase().indexOf('window')<0" slot="reference" type="success" size="mini" @click="sshConnect(scope.row.id)">ssh</el-button>
      </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="sup_this.total"
      style="margin-top: 8px;"
      :current-page="sup_this.page"
      layout="total, prev, pager, next, sizes"
      @size-change="sup_this.sizeChange"
      @current-change="sup_this.pageChange"/>
  </div>
  <!--</el-dialog>-->
</template>

<script>
  import checkPermission from '@/utils/permission'
  import initData from '@/mixins/initData'
  import {del} from '@/api/device'
  import {parseTime} from '@/utils/index'
  import eHeader from './header'
  import store from '@/store'
  // import ubtuntu from '@/assets/font-icon/ubuntu.svg'

  export default {
    components: {eHeader},
    mixins: [initData],
    props: {
      sup_this: {
        type: Object,
        required: true
      },
      // in_data: {
      //   type: Object,
      //   required: true
      // }
    },
    data() {
      return {
        delLoading: false, allSelect: false, 
        // loading: false, 
        dialog: false, serverIds: [], provider:'aliyun'
      }
    },
    // created() {
    //   this.$nextTick(() => {
    //     console.log('created')
    //     this.init()
    //   })
    // },
    // mounted(){
    //   console.log('mounted')
    //   let __that=this.serverIds
    //   this.in_data.hosts.forEach(function (item) {
    //     __that.push(item)
    //   })
    // },
    methods: {
      parseTime,
      checkPermission,
      // beforeInit() {
      //   this.url = 'api/devices/'
      //   const sort = 'id'
      //   const query = this.query
      //   const value = query.value
      //   const status = query.status
      //   const groups = query.groups
      //   const labels = query.labels
      //   const businesses = query.businesses
      //   const device_type = query.device_type
      //   const os_type = query.os_type
      //   this.params = {page: this.page, size: this.size, ordering: sort}
      //   if (status !== '' && status !== null) {
      //     this.params['status'] = status
      //   }
      //   if (groups !== '' && groups !== null) {
      //     this.params['groups'] = groups
      //   }
      //   if (labels !== '' && labels !== null) {
      //     this.params['labels'] = labels
      //   }
      //   if (businesses !== '' && businesses !== null) {
      //     this.params['businesses'] = businesses
      //   }
      //   if (os_type !== '' && os_type !== null) {
      //     this.params['os_type'] = os_type
      //   }
      //   if (device_type !== '' && device_type !== null) {
      //     this.params['device_type'] = device_type
      //   }
      //   if (value) {
      //     this.params['search'] = value
      //   }
      //   return true
      // },
      changeTableSort(column){
        console.log(column)
        console.log(column.prop)
        const __this=this.sup_this
        if(column.order){
          const order=column.order=='descending'?'-':''
          __this.query.sort=order+column.prop
          console.log(__this.params)
          __this.init()
        }else{
          __this.query.sort='id'
          __this.init()
        }
        
      },
      subDelete(id) {
        this.delLoading = true
        del(id).then(res => {
          this.delLoading = false
          this.$refs[id].doClose()
          this.sup_this.init()
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
        const __that=this.serverIds
        if (__that) {
          this.data.forEach(row => {
            if (__that.indexOf(row.id)>=0){
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
        let routeData = this.$router.resolve({
          path: '/webssh',
          // query: params,
          query: {uid: store.getters.id, sid: rowid}
        });
        window.open(routeData.href, '_blank');
      },
      rdpConnect(rowid) {
        let routeData = this.$router.resolve({
          path: '/rdp',
          query: {uid: store.getters.id, sid: rowid}
        });
        window.open(routeData.href, '_blank');
      },
    }
  }
</script>


<style>
  .icon {
    width: 1.3em;
    height: 1.3em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>


<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.value" clearable placeholder="输入IP/主机名/instance_id搜索" style="width: 260px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button-group>
        <el-button v-if="checkPermission(['admin','device_all','device_delete'])" class="filter-item" size="mini" type="primary" @click="getPtoggleSelect">全选</el-button>
        <el-button v-if="wholeUpdate && checkPermission(['admin','device_all','device_delete'])" class="filter-item" size="mini" type="danger" @click="deleteSelect">删除</el-button>
        <el-button v-if="wholeUpdate" class="filter-item" size="mini" type="primary" @click="refresh">刷新</el-button>
      </el-button-group>
    </div>
    <div style="display: inline-block;margin: 0px 8px;float: right">
      <el-button-group v-if="wholeUpdate && checkPermission(['admin','device_all'])" >
        <el-button
          :loading="updateLoading"
          class="filter-item"
          size="mini"
          type="warning"
          icon="el-icon-plus" @click="updateHosts">全部更新</el-button>
      </el-button-group>
      <el-button-group v-if="wholeRelate && checkPermission(['admin','device_all'])" >
        <el-button
          :loading="updateLoading"
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus" @click="relateHosts">全部关联</el-button>
      </el-button-group>
    </div>
    <br>
    <!-- <el-select v-model="query.groups" clearable placeholder="设备组" class="filter-item" style="width: 192px" @change="toQuery">
      <el-option v-for="item in group_list" :key="item.id" :label="item.name" :value="item.id"/>
    </el-select>
    <el-select v-model="query.businesses" clearable placeholder="业务类型" class="filter-item" style="width: 192px" @change="toQuery">
      <el-option v-for="item in business_list" :key="item.id" :label="item.name" :value="item.id"/>
    </el-select>
    <el-select v-model="query.labels" clearable placeholder="标签" class="filter-item" style="width: 192px" @change="toQuery">
      <el-option v-for="item in label_list" :key="item.id" :label="item.name" :value="item.id"/>
    </el-select> -->
    <el-select v-model="query.cloud_id" clearable placeholder="云账号" class="filter-item" style="width: 192px" @change="toQuery">
      <el-option v-for="item in cloud_accounts" :key="item.id" :label="item.name" :value="item.id"/>
    </el-select>
    <el-select v-model="query.device_type" clearable placeholder="设备类型" class="filter-item" style="width: 192px" @change="toQuery">
      <el-option v-for="item in device_types" :key="item.key" :label="item.value" :value="item.key"/>
    </el-select>
    <el-select v-model="query.os_type" clearable placeholder="操作系统" class="filter-item" style="width: 192px" @change="toQuery">
      <el-option v-for="item in os_types" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
    <el-select v-model="query.status" clearable placeholder="状态" class="filter-item" style="width: 100px" @change="toQuery">
      <el-option v-for="item in status_list" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import { getBusinesses } from '@/api/business'
import { getGroups } from '@/api/group'
import { getLabels } from '@/api/label'
import { getKey } from '@/api/dict'
import { save } from '@/api/inventory'
import { getCloudConfigs,PullExcu } from '@/api/cloudconfig'
// 查询条件
export default {
  props: {
    query: {
      type: Object,
      required: true
    },
    wholeUpdate: {
      type: Boolean,
      required: true
    },
    wholeRelate: {
      type: Boolean,
      required: false
    },
    in_data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      delLoading: false,
      updateLoading: false,
      status_list: [{ value: 'running', label: '在线' }, { value: 'stopped', label: '下线' }],
      group_list: [],
      label_list: [],
      business_list: [],
      cloud_accounts: [],
      device_types: [],
      selected_host_list: [],
      os_types: [{ value: 'Linux', label: 'Linux系统' }, { value: 'Windows', label: 'Windows系统' }, { value: 'Other', label: '其他系统' }]
    }
  },
  created() {
    this.$nextTick(() => {
      this.getAllBusiness()
      this.getAllGroup()
      this.getAllLable()
      this.getAllDeviceType()
      this.getALLCloudAccount()
    })
  },
  methods: {
    checkPermission,
    toQuery() { 
      if (this.wholeRelate){
        const __this= this.sup_this
        __this.page=1
        __this.currentPage=1
        __this.init().then(function () {
          __this.initSelection()
        })
      }else{
        this.$parent.page=1
        this.$parent.currentPage=1
        this.$parent.init()
      }

    },
    to() {
      const _this = this.$refs.form
      _this.dialog = true
    },
    getPtoggleSelect() {
      console.log(this.$parent.$parent.data)
    },
    deleteSelect() {
      if (this.$parent.multipleSelection) {
        const count = this.$parent.multipleSelection.length
        this.$confirm('此操作将删除' + count + '条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$parent.doSelectionDel()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '请先选择数据'
        })
      }
    },
    refresh() {
      this.$parent.init()
    },
    getAllGroup() {
      if (Array.isArray(this.group_list) && this.group_list.length === 0) {
        getGroups().then(res => {
          this.group_list = res.results
        })
      }
    },
    getAllLable() {
      if (Array.isArray(this.label_list) && this.label_list.length === 0) {
        getLabels().then(res => {
          this.label_list = res.results
        })
      }
    },
    getALLCloudAccount(){
      if (Array.isArray(this.cloud_accounts) && this.cloud_accounts.length === 0) {
        getCloudConfigs().then(res => {
          this.cloud_accounts = res.results
        })
      }
    },
    getAllBusiness() {
      if (Array.isArray(this.business_list) && this.business_list.length === 0) {
        getBusinesses().then(res => {
          this.business_list = res.results
        })
      }
    },
    getAllDeviceType() {
      if (Array.isArray(this.business_list) && this.business_list.length === 0) {
        getKey('DEVICE_TYPE').then(res => {
          this.device_types = res[0].DEVICE_TYPE
        })
      }
    },
    // 数据转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'Succeed') {
          return v[j] ? '成功' : '失败'
        } else {
          return v[j]
        }
      }))
    },
    updateHosts(){
      const __this=this
      PullExcu({ 'excu': 'pull'}).then(res => {
        if (res.code === 200) {
          __this.$message({
            showClose: true,
            type: 'success',
            message: res.detail,
            duration: 3000
          })
        } else {
          __this.$message({
            showClose: true,
            type: 'error',
            message: res.detail,
            duration: 3000
          })
        }
        __this.pullLoading = false
        })
    },
    relateHosts(){
      this.loading = true
      save(this.in_data.id, { hosts: this.sup_this.serverIds }).then(res => {
        this.$message({
          showClose: true,
          type: 'success',
          message: '保存成功!',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.dialog=false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    }
  }
}
</script>

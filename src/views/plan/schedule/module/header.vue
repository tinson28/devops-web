<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.value" clearable placeholder="输入名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-if="checkPermission(['admin','schedule_all','schedule_create'])"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="sup_this.active_name==1?$refs.cform.dialog = true:$refs.iform.dialog = true">新增</el-button>
      <cForm ref="cform" :is-add="true" :sup_this="sup_this"/>
      <iForm ref="iform" :is-add="true" :sup_this="sup_this"/>
    </div>
    <!-- 导出 -->
    <!-- <el-button v-if="checkPermission(['admin'])" :loading="downloadLoading" size="mini" class="filter-item" type="primary" icon="el-icon-download" @click="download">导出</el-button> -->
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import { parseTime } from '@/utils/index'
import cForm from './crontab_form'
import iForm from './interval_form'
// 查询条件
export default {
  components: { cForm,iForm },
  props: {
    sup_this: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      downloadLoading: false,
      query:[]
    }
  },
  methods: {
    checkPermission,
    toQuery() {
      this.$parent.page = 1
      this.$parent.init()
    },
  }
}
</script>

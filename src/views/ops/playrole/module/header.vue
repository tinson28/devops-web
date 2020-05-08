<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.value" clearable placeholder="输入名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-if="checkPermission(['admin','group_all','group_create'])"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true"/>
      <el-button  size="mini" class="filter-item" type="primary" icon="el-icon-upload" @click="isShowDlg=true">上传</el-button>
      <!-- 导出 -->
      <el-button v-if="checkPermission(['admin'])" :loading="downloadLoading" size="mini" class="filter-item" type="primary" icon="el-icon-download" @click="download">导出</el-button>
    </div>

    <!--<el-upload style="display: inline-block;"-->
      <!--class="upload-demo"-->
      <!--action="https://jsonplaceholder.typicode.com/posts/"-->
      <!--:on-exceed="handleExceed"-->
      <!--:file-list="fileList">-->
      <!--<el-button size="small" type="primary">点击上传</el-button>-->
      <!--&lt;!&ndash;<div slot="tip" class="el-upload__tip">只能上传zip文件，且不超过500kb</div>&ndash;&gt;-->
    <!--</el-upload>-->
    <el-dialog  class="dialog" title="上传playrole"  :visible.sync="isShowDlg" width="600px">
      <el-form  ref="roleForm" :model="roleForm" size="small" >
        <el-form-item label="role描述" >
          <el-input placeholder="请输入role描述" v-model="roleForm.role_name" rows="5" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="role上传">
          <el-upload
            ref="upload"
            action="string"
            :http-request="upload"
          :file-list="roleForm.fileList">
            <!--<el-input placeholder="请输入子节点名称" ></el-input>-->
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传zip文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item class="btns__adjust">
          <el-button size="medium" type="primary" @click="sure">确定</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import { parseTime } from '@/utils/index'
import eForm from './form'
import {uploadFile} from '@/api/role'
// 查询条件
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      downloadLoading: false,
      isShowDlg:false,
      roleForm:{role_name:'',fileList:[]},

    }
  },
  methods: {
    checkPermission,
    toQuery() {
      this.$parent.page = 1
      this.$parent.init()
    },
    submitUpload(){
      // this.isShowDlg=true
      this.$refs.upload.submit()
    },
    sure(){
      this.resetForm()
      this.$parent.init()

    },
    cancel(){

    },
    upload(item){
      const formData=new FormData()
      formData.append('file',item.file)
      formData.append('role_desc',this.roleForm.role_name)
      uploadFile(formData).then(res=>{
        // this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '修改成功!',
          duration: 2500
        })
        this.loading = false
        // this.$parent.$parent.cancel()
        // this.parent.init()
      })
    },
    resetForm() {
      this.isShowDlg=false
      this.$refs['roleForm'].resetFields()
      // this.form = { name: '', alias: '', desc: '' }
    },
    download() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', '主机组名称', '主机组变量', '主机组描述','创建时间']
        const filterVal = ['id', 'ans_group_name', 'ans_group_vars', 'ans_group_memo','ans_group_datetime']
        const data = this.formatJson(filterVal, this.$parent.data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

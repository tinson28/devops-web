<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增标签' : '编辑标签'" width="480px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" style="width: 330px;"/>
      </el-form-item>
      <!-- <el-form-item label="区域">
        <el-input v-model="form.region" style="width: 330px;" />
      </el-form-item> -->
      <el-select v-model="form.provider" clearable placeholder="云产商" class="filter-item" style="width: 192px" @change="toQuery">
        <el-option v-for="item in group_list" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <el-form-item v-if="form.provider==='aliyun'" label="AccessID">
        <el-input v-model="form.access_id" style="width: 330px;" />
      </el-form-item>
      <el-form-item v-if="form.provider==='aliyun'" label="AccessKey">
        <el-input v-model="form.access_key" style="width: 330px;" show-password />
      </el-form-item>
      <el-form-item label="desc">
        <el-input v-model="form.desc" style="width: 330px;" rows="5" type="textarea"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/cloudconfig'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: { name: '',region:'',access_id:'',access_key:'', desc: '' },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '添加成功!',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.cancel()
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    doEdit() {
      edit(this.form.id, this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '修改成功!',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.cancel()
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { name: '',region:'',access_id:'',access_key:'', desc: '' }
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增角色' : '编辑角色'" width="480px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="95px">
      <el-form-item label="角色名称" prop="role_name">
        <el-input v-model="form.role_name" style="width: 330px;"/>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="form.role_desc" style="width: 330px;" rows="5" type="textarea"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/ansiblerole'
import { isvalidChinaese } from '@/utils/validate'
import store from '@/store'
// var validChinaese = (rule, value, callback) => {
//   if (!value) {
//     callback(new Error('请输入项目英文名称'))
//   } else if (!isvalidChinaese(value)) {
//     callback(new Error('不能输入中文'))
//   } else {
//     callback()
//   }
// }
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
      form: { role_name: '',role_desc:'',role_user:store.getters.id},
      rules: {
        role_name: [
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
      // this.form = { name: '', alias: '', desc: '' }
    }
  }
}
</script>

<style scoped>

</style>

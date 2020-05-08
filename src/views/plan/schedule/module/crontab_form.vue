<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增crontab' : '编辑crontab'" width="480px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="95px">
      <el-form-item label="分" prop="minute">
        <el-input v-model="form.minute" style="width: 330px;"/>
      </el-form-item>
      <el-form-item label="时" prop="hour">
        <el-input v-model="form.hour" style="width: 330px;"/>
      </el-form-item>
      <el-form-item label="日" prop="day_of_month">
        <el-input v-model="form.day_of_month" style="width: 330px;" />
      </el-form-item>
      <el-form-item label="月" prop="month_of_year">
        <el-input v-model="form.month_of_year" style="width: 330px;" />
      </el-form-item>
      <el-form-item label="周" prop="day_of_week">
        <el-input v-model="form.day_of_week" style="width: 330px;" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addCrontab, editCrontab } from '@/api/schedule'
import { isvalidChinaese } from '@/utils/validate'

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
      form: { mininute: '',hour:'',day_of_week:'',day_of_month:'',month_of_year:''},
      rules: {
        ans_group_name: [
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
      addCrontab(this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '添加成功!',
          duration: 2500
        })
        this.loading = false
        this.sup_this.cancel()
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    doEdit() {
      editCrontab(this.form.id, this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '修改成功!',
          duration: 2500
        })
        this.loading = false
        this.sup_this.cancel()
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { name: '', alias: '', desc: '' }
    }
  }
}
</script>

<style scoped>

</style>

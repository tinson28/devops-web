<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增interval' : '编辑interval'" width="480px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="95px">
      <el-form-item label="间隔" prop="every">
        <el-input v-model="form.every" style="width: 330px;"/>
      </el-form-item>
      <!-- <el-form-item label="类型" prop="period"> -->
        <!-- <el-input v-model="form.period" style="width: 330px;"/> -->
        <el-form-item label="类型">
      <el-select v-model="form.period" clearable class="filter-item" placeholder="类型">
        <el-option label="时" value="hours"></el-option>
        <el-option label="分" value="minutes"></el-option>
        <el-option label="秒" value="seconds"></el-option>
      </el-select>
      </el-form-item>
      <!-- </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addInterval, editInterval } from '@/api/schedule'
import { isvalidChinaese } from '@/utils/validate'
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
      form: { every: '',period:''},
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
      addInterval(this.form).then(res => {
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
      editInterval(this.form.id, this.form).then(res => {
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
      this.form = { every: '',period:'' }
    }
  }
}
</script>

<style scoped>

</style>

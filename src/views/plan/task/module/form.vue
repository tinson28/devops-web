<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增任务' : '编辑任务'" width="600px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="150px">
      <el-form-item label="任务名称">
        <el-input v-model="form.name" style="width: 360px;"/>
      </el-form-item>
      <el-form-item label="任务函数">
        <!-- <el-input v-model="form.task" style="width: 360px;"/> -->
       <el-select v-model="form.task" clearable placeholder="选择任务函数" class="filter-item" style="width: 360px">
        <el-option v-for="item in sup_this.celery_tasks"  :key="item" :label="item" :value="item"/>
      </el-select>
      </el-form-item>
      <el-form-item label="参数(列表格式)">
        <el-input v-model="form.args" style="width: 360px;"/>
      </el-form-item>
      <el-form-item label="参数(字典格式)">
        <el-input v-model="form.kwargs" style="width: 360px;"/>
      </el-form-item>
      <el-form-item label="队列" >
        <!-- <el-input v-model="form.queue" style="width: 360px;"/> -->
        <el-select v-model="form.queue" clearable placeholder="选择队列" class="filter-item" style="width: 360px">
        <el-option v-for="item in sup_this.celery_queues"  :key="item" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="过期时间">
        <!-- <el-input v-model="form.expires" style="width: 360px;"/> -->
        <el-date-picker v-model="form.expires" type="datetime" placeholder="选择日期时间">
    </el-date-picker>
      </el-form-item>
      <el-form-item label="任务状态">
        <!-- <el-input v-model="form.enabled" style="width: 360px;"/> -->
        <el-radio-group v-model="form.enabled">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="调度计划">
        <el-cascader style="width: 360px"
        v-model="schedule"
        :options="sup_this.schedules"
        :props="{ checkStrictly: false }" 
        clearable @change="handleChange"></el-cascader>
      </el-form-item>
      <!-- <el-form-item label="crontab调度">
        <el-select v-model="form.crontab" clearable placeholder="选择crontab" class="filter-item" style="width: 360px">
        <el-option v-for="item in sup_this.crontabs"  :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>       
      </el-form-item>
      <el-form-item label="interval调度">
        <el-select v-model="form.interval" clearable placeholder="选择interval" class="filter-item" style="width: 360px">
        <el-option v-for="item in sup_this.intervals"  :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>   
      </el-form-item> -->
      <el-form-item label="描述">
        <el-input v-model="form.description" style="width: 360px;" rows="5" type="textarea"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addTask, editTask ,delTask, saveTask, retrieveTask} from '@/api/schedule'
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
      schedule:[],
      form: { name: '', description: '',task:'',expires:'',enabled:'',args:'',kwargs:'',queue:'',crontab:'',interval:'' },
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
    handleChange(value){
      console.log(value)
      if(value[0]=='crontab'){
        this.form.crontab=value[1]
        this.form.interval=''
      }else if(value[0]=='interval'){
        this.form.interval=value[1]
        this.form.crontab=''
      }
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
      addTask(this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '添加成功!',
          duration: 2500
        })
        this.loading = false
        // this.$parent.$parent.cancel()
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    doEdit() {
      console.log(this.form)
      editTask(this.form.id, this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '修改成功!',
          duration: 2500
        })
        this.loading = false
        // this.$parent.$parent.cancel()
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { name: '', description: '',task:'',expires:'',enabled:'',args:'',kwargs:'',queue:'',crontab:'',interval:'' }
    }
  }
}
</script>

<style scoped>

</style>

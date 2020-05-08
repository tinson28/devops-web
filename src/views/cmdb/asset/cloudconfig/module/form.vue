<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增配置' : '编辑配置'" width="560px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="110px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" style="width: 330px;"/>
      </el-form-item>
      <!-- <el-form-item label="区域">
        <el-input v-model="form.region" style="width: 330px;" />
      </el-form-item> -->
      <el-form-item label="云产商">
      <el-select v-model="form.provider" clearable placeholder="选择云产商" class="filter-item" style="width: 192px">
        <el-option v-for="item in dicts" v-if="item.key!='all'" :key="item.key" :label="item.value" :value="item.key"/>
      </el-select>
      </el-form-item>
      <el-form-item v-if="form.provider==='aliyun' || form.provider==='' || form.provider==='aws'" label="AccessID">
        <el-input v-model="form.access_id" style="width: 330px;" />
      </el-form-item>
      <el-form-item v-if="form.provider==='aliyun' || form.provider==='' || form.provider==='aws'" label="AccessKey" >
        <el-input v-model="form.access_key" style="width: 330px;" show-password/>
      </el-form-item>
      <el-form-item v-if="form.provider==='azure'" label="ClientID">
        <el-input v-model="form.client_id" style="width: 330px;" />
      </el-form-item>
      <el-form-item v-if="form.provider==='azure'" label="Secret">
        <el-input v-model="form.secret" style="width: 330px;" show-password />
      </el-form-item>
      <el-form-item v-if="form.provider==='azure'" label="Tenant">
        <el-input v-model="form.tenant" style="width: 330px;" />
      </el-form-item>
      <el-form-item v-if="form.provider==='azure'" label="SubcriptionID">
        <el-input v-model="form.subscription_id" style="width: 330px;" />
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
import {getKey} from "@/api/dict";

export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    },
    dicts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false,service_provider:[],
      form: { name: '',region:'',access_id:'',access_key:'', desc: '' ,provider:'',client_id:'',tenant:'',secret:'', subscription_id: '', is_enable:true},
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
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { name: '',region:'',access_id:'',access_key:'', desc: '',is_enable:true }
    },
  }
}
</script>

<style scoped>

</style>

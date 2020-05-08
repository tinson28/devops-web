<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="title" width="720px">
    <el-form ref="form" :model="form" :rules="rules" size="small"  >
      <el-form-item label="主机组"  v-if="title=='执行'">
        <el-select v-model="form.group_ids" ref="select" multiple placeholder="请选择">
          <el-option
            v-for="item in inventory_list"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="剧本名称" v-if="title!='执行'">
        <el-input v-model="form.playbook_name" style="width:100%;" />
      </el-form-item>
      <el-form-item label="剧本描述" v-if="title!='执行'">
        <el-input v-model="form.playbook_desc" style="width:100%;" rows="5" type="textarea"/>
      </el-form-item>
      <el-form-item label="剧本内容" >
        <editor v-model="form.playbook_content" @init="editorInit" lang="yaml"  theme="github" height="400"></editor>
        <!--<el-input v-model="form.playbook_content" style="width: 330px;"/>-->
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit" v-if="title!='执行'">确认</el-button>
      <el-button :loading="loading" type="primary" @click="doExec" v-if="title=='执行'" >执行</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/playbook'
import { isvalidChinaese } from '@/utils/validate'
import editor from "vue2-ace-editor"
import store from '@/store'
import {PlaybookRun} from '@/api/ansible'
import {list} from '@/api/inventory'
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
    },
    title:{
      type: String,
      default: '',
    }
  },
  data() {
    return {
      loading: false, dialog: false,inventory_list:[],groups:[],
      form: { playbook_id: '',playbook_name: '',playbook_desc:'',playbook_content:'',playbook_user:store.getters.id ,group_ids:[] },
      options:{/*vue2-ace-editor编辑器配置自动补全等*/
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true/*自动补全*/
      },
      rules: {
        playbook_name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    editor
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.title=='新增') {
            this.doAdd()
          } else if(this.title=='编辑') {
            this.doEdit()
          }else{
            this.doExec()
          }
        } else {
          return false
        }
      })
    },
    doAdd() {
      console.log(this.form)
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
      console.log(this.form)
      edit(this.form.playbook_id, this.form).then(res => {
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
    doExec(){
      console.log(this.form.group_ids)
      console.log(this.form.playbook_id)
      // this.$emit()
      const post = {group_ids:this.form.group_ids,playbook_id:this.form.playbook_id}
      PlaybookRun(post)
      this.resetForm()
    },
    resetForm() {
      this.dialog = false
      // this.$refs.select.clear()
      // this.$refs.form.resetFields()
      // this.form.group_ids=[]
      // this.inventory_list=[]
      // this.form = { playbook_name: '', playbook_desc: '', playbook_content: '' }
    },
    editorInit(editor) {
      require("brace/theme/github")
      require("brace/ext/language_tools")
      require("brace/snippets/text.js")
      require("brace/mode/yaml")
      require("brace/snippets/yaml.js")
      require("brace/snippets/html.js")
      // require("brace/mode/html")
      // require("brace/mode/python")
      editor.setFontSize(13)
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        wrap: "free"
      })
    }
  }
}
</script>

<style scoped>

</style>

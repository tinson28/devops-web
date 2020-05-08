<template>
  <el-dialog :append-to-body="true" :visible.sync="execDialog" :title="isAdd ? '新增剧本' : '编辑剧本'" width="720px">
    <el-form ref="form" :model="form" :rules="rules" size="small"  >
      <el-form-item label="剧本名称" >
        <el-input v-model="form.playbook_name" style="width:100%;" />
      </el-form-item>
      <el-form-item label="剧本描述">
        <el-input v-model="form.playbook_desc" style="width:100%;" rows="5" type="textarea"/>
      </el-form-item>
      <el-form-item label="剧本内容" >
        <editor v-model="form.playbook_content" @init="editorInit" lang="yaml"  theme="github" height="500"></editor>
        <!--<el-input v-model="form.playbook_content" style="width: 330px;"/>-->
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doExec">执行</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { add, edit } from '@/api/playbook'
  import { isvalidChinaese } from '@/utils/validate'
  import editor from "vue2-ace-editor"
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
        form: { playbook_name: '',playbook_desc:'',playbook_content:'',playbook_user:store.getters.id },
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
        // console.log('编辑弹窗')
        // const __this=this
        edit(this.form.id, this.form).then(res => {
          this.resetForm()
          this.$message({
            showClose: true,
            type: 'success',
            message: '修改成功!',
            duration: 2500
          })
          this.loading = false
          // this.$parent.$parent.cancel()
          // console.log('刷新父页面')
          this.sup_this.init()
        }).catch(err => {
          this.loading = false
          console.log(err)
        })
      },
      resetForm() {
        this.dialog = false
        this.$refs['form'].resetFields()
        this.form = { playbook_name: '', playbook_desc: '', playbook_content: '' }
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

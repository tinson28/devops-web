<template>
  <div>
    <el-button size="mini" type="success" @click="toEdit">编辑</el-button>
    <el-button size="mini" type="primary" @click="toExec" >执行</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false" :title="title"/>
  </div>
</template>
<script>
import eForm from './form'
import store from '@/store'
import {list} from '@/api/inventory'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      title:''
    }
  },
  methods: {
    to(title) {
      const _this = this.$refs.form
      this.title=title
      if (title=='执行'){
        _this.inventory_list=[]
        if (Array.isArray(_this.inventory_list) && _this.inventory_list.length == 0) {
          list().then(res => {
            res.results.forEach(function(data, index) {
              const group = { value: data.id, label: data.ans_group_name }
              _this.inventory_list.push(group)
            })
          })
        }
      }
      _this.form = { playbook_id: this.data.id, playbook_name: this.data.playbook_name, playbook_desc: this.data.playbook_desc, playbook_time: this.data.playbook_time,playbook_content:this.data.playbook_content,playbook_user:store.getters.id,group_ids:[]}
      _this.dialog = true
    },
    toEdit(){
      this.to('编辑')
    },
    toExec(){
      // store.commit('SET_MESSAGE',{playbook_name:this.data.playbook_name,message:'正在执行中......'})
      this.to('执行')
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>

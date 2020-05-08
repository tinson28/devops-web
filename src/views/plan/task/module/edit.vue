<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
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
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = { id: this.data.id, name: this.data.name, description: this.data.description,task:this.data.task,
                      queue: this.data.queue,crontab: this.data.crontab,interval:this.data.interval,
                      expires: this.data.expires,enabled: this.data.enabled}
      
      if(this.data.crontab){
        _this.schedule=["crontab",this.data.crontab]
      }else if(this.data.interval){
        _this.schedule=["interval",this.data.interval]
      }
      _this.dialog = true
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

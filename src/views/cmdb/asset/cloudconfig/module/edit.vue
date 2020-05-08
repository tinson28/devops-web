<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false" :dicts="dicts"/>
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
    },
    dicts: {
      type: Array,
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
      _this.form = { id:this.data.id,name:this.data.name,region:this.data.region,access_id:this.data.access_id,
        access_key:this.data.access_key, desc:this.data.desc ,provider:this.data.provider,is_enable: this.data.is_enable,
      client_id:this.data.client_id,tenant:this.data.tenant,secret:this.data.secret,subscription_id:this.data.subscription_id}
      console.log(_this.form)
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

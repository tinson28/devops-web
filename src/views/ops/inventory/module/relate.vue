<template>
  <div>
    <el-button size="mini" type="primary" @click="to">关联资产</el-button>
    <tables ref="asset_tables" :sup_this="sup_this" :in_data="data"/>
  </div>
</template>
<script>
import eForm from './form'
import tables from '@/views/cmdb/asset/device/module/tables'
export default {
  components: { tables },
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
      const _this = this.$refs.asset_tables
      // _this.form = { id: this.data.id, ans_group_name: this.data.ans_group_name, ans_group_vars: this.data.ans_group_vars, ans_group_memo: this.data.ans_group_memo }
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

<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <cForm ref="cform" :sup_this="sup_this" :is-add="false"/>
    <iForm ref="iform" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import cForm from './crontab_form'
import iForm from './interval_form'
export default {
  components: { cForm,iForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    },
    // active_name:{
    //     type: String,
    //     required: true
    // }
  },
  data() {
    return {
    }
  },
  methods: {
    to() {
      if(this.sup_this.active_name=='1'){
          this.$refs.cform.dialog=true
          this.$refs.cform.form={id:this.data.id,minute:this.data.minute,hour:this.data.hour,
          day_of_month:this.data.day_of_month,month_of_year:this.data.month_of_year,day_of_week:this.data.day_of_week}
      }else if (this.sup_this.active_name=='2'){
          this.$refs.iform.dialog=true
          this.$refs.iform.form={id:this.data.id,every:this.data.every,period:this.data.period}
      }
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

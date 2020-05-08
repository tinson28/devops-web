<template>
  <div class="app-container">
    <console v-if="show" :query="query"/>
  </div>
</template>

<script>
  // import checkPermission from '@/utils/permission'
  // import initData from '@/mixins/initData'
  // import { del, save, retrieve } from '@/api/playbook'
  // import { parseTime } from '@/utils/index'
  // import { getDeviceList } from '@/api/device'
  // import eHeader from './module/header'
  import console from './module/console'
  // import Console from "../../webssh/Console";
  export default {
    components: {console },
    // mixins: [initData],
    data() {
      return {
        row_data: null,
        span: 24,
        show: false,
        serverIds: [],
        Loading: false,
        sup_this: this,
        ans_res:[]
      }
    }
  }
</script>

<style>
  .el-card__header {
    font-size: 14px;
  }
</style>

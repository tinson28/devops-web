<template>

  <el-card>
    <div slot="header" class="clearfix">
      <span>执行结果</span>
    </div>
    <div id="console" :style="'height:'+ height" class="console">
      <div v-for="item in data" :key="item.id">
        <span class="line-html" v-html="item"/>
      </div>
    </div>
    <el-tooltip content="返回上一页" class="closepage item" effect="dark" placement="left">
      <el-button type="info" size="mini" circle @click="closeTag"><svg-icon icon-class="return"/></el-button>
    </el-tooltip>
    <el-tooltip content="清空控制台输出" class="clean item" effect="dark" placement="left">
      <el-button type="info" size="mini" circle @click="clean"><svg-icon icon-class="clean"/></el-button>
    </el-tooltip>
    <el-tooltip :content="content" class="lock item" effect="dark" placement="left">
      <el-button type="info" size="mini" circle @click="doLock"><svg-icon :icon-class="ico"/></el-button>
    </el-tooltip>
  </el-card>

</template>

<script>
  import Vue from 'vue'
  import checkPermission from '@/utils/permission'
  import { AnsibleRun } from '@/api/ansible'
  import store from '@/store'
  import initData from '@/mixins/initData'
  import { getToken } from '@/utils/auth'
  import VueNativeSock from 'vue-native-websocket'
  export default {
    //components: { eHeader, edit },
    mixins: [initData],
    data() {
      return {
        row_data: null,
        span: 24,
        show: false,
        is_permissions: false,
        table_show: true,
        Loading: false,
        sup_this: this,
        ico: 'unlock', unlock: true, content: '锁定滚动条',
        height: document.documentElement.clientHeight - 480 + 'px;',
        width: document.documentElement.clientWidth - 225 + 'px;',
        startloading: false,
        stoploading: false,
        // tailloading: false,
        servers: '',
        server_ids: '',
        hosts: [],
        data: [],
        message:store.getters.busmsg
      }
    },
    watch: {
      msg:{
        handler(val, oldVal) {
          this.$nextTick(() => {
            this.data.push('正在执行中......')

          })
        }
      },
      data: {
        handler(val, oldVal) {
          this.$nextTick(() => {
            if (this.unlock) {
              var div = document.getElementById('console')
              div.scrollTop = div.scrollHeight
            }
          })
        }
      }
    },
    created() {
      this.init()
    },
    mounted: function() {
      this.initWebSocket()
      this.start()
    },
    methods: {
      // parseTime,
      // checkPermission,
      init() {
        const that = this
        window.onresize = function temp() {
          that.height = document.documentElement.clientHeight - 94.5 + 'px;'
        }
      },
      prepareExec(playbook_name){
        this.data.push('任务'+playbook_name+'正在执行中......')
      },
      initWebSocket() {
        const wsuri = process.env.WS_SCHEMA+'://' + process.env.BASE_API.replace(/http:\/\//, '').replace(/https:\/\//, '') + '/websocket/console?token=' + getToken()
        console.log(wsuri)
        Vue.use(VueNativeSock, wsuri, {
          // format: 'json',
          connectManually: true,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 3000
        })
        this.vm = new Vue()
        this.vm.$connect()
        console.log('---连接Websocket----')
      },
      closeTag() {
        this.$confirm('是否关闭页面并返回上一页?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.vm.$disconnect()
          this.$router.go(-1)
          this.$store.dispatch('delView', this.$store.state.tagsView.visitedViews.slice(-1)[0])
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
      },
      start() {
        this.$socket.onopen = (data) => {
          if (data.target.readyState === 1) {
            console.log('--------正在读取数据!--------')
            this.$socket.onmessage = (data) => {
              // console.log(data)
              // const color_data = this.getColor(data.data)
              // this.data.push(color_data)
              this.data.push(data.data)
              console.log(this.data)
            }
            // 开始读取
          }
        }
      },
      startRun(){
        this.startloading = true
        const form = {
          exec: 'mod_run',
          hostIds: this.hosts,
          module: this.cmdForm.module,
          args: this.cmdForm.args
        }
        AnsibleRun(form).then(res => {
          this.startloading = false
        }).catch(err => {
          this.startloading = false
          console.log(err)
        })
      },
      getColor(text) {
        const info = text.match(/INFO/i)
        const warn = text.match(/WARN/i)
        const warning = text.match(/WARNING/i)
        const debug = text.match(/DEBUG/i)
        const host = text.match(/\[(.*?)@(.*?)\]/)
        const error = text.match(/ERROR/i)
        const sequence = text.match(/(.*?[\u4e00-\u9fa5])\[(.*?\d)\]------/)
        if (sequence) {
          this.sequence = parseInt(sequence[2])
        }
        if (info) {
          return text.replace(/INFO/i, '<span style="color: #7FFF00;">' + info + '</span>')
        } else if (warning) {
          return text.replace(/WARNING/i, '<span style="color: #FFFF00;">' + warning + '</span>')
        } else if (warn) {
          return text.replace(/WARN/i, '<span style="color: #FFFF00;">' + warn + '</span>')
        } else if (debug) {
          return text.replace(/DEBUG/i, '<span style="color: #0000ff;">' + debug + '</span>')
        } else if (host) {
          return text.replace(/\[(.*?)@(.*?)\]/, '<span style="color: #FFA54F;">' + host[0] + '</span>')
        } else if (error) {
          return text.replace(/ERROR/i, '<span style="color: #FF0000;">' + error + '</span>')
        } else {
          return text
        }
      },
      clean() {
        this.ans_result=[]
        this.data = []
        this.$message({
          showClose: true,
          type: 'success',
          message: '清空控制台输出成功！',
          duration: 3500
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName){
      },
      doLock() {
        if (this.unlock) {
          this.content = '解除锁定'
          this.ico = 'lock'
        } else {
          this.content = '锁定滚动条'
          this.ico = 'unlock'
        }
        this.unlock = !this.unlock
      }
    }
  }
</script>


<style>
  button,input,textarea {
    outline: 0
  }
  .loadclass {
    height: 25px;
  }
  .line-html {
    line-height: 1.85
  }
  .el-card__body {
    padding: 5px;
  }
  .container {
    width: 100%;
    margin: 5px
  }
  .console {
    /*font-family: "Interstate", "Hind", -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;*/
    /*overflow-y: scroll;*/
    /*background: #494949;*/
    /*color: #f7f7f7;*/
    /*padding: 10px;*/
    /*font-size: 14px;*/
    /*border-radius: 3px 1px 3px 3px;*/
    margin: 0;
    padding: 5px;
    list-style: none;
    background: #141414;
    color: #45D40C;
    font: 0.8em 'Andale Mono', Consolas, 'Courier New';
    /*font-family: Inconsolata, monospace;*/
    font-weight: bold;
    line-height: 1.6em;
    overflow-y: scroll;
    -webkit-border-bottom-right-radius: 3px;
    -webkit-border-bottom-left-radius: 3px;
    -moz-border-radius-bottomright: 3px;
    -moz-border-radius-bottomleft: 3px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-radius: 3px 1px 3px 3px;
    max-height: 500px;
    overflow-x: scroll;
  }
  .lock {
    position: fixed;
    right: 45px;
    bottom: 2%;
    z-index: 100000;
  }
  .closepage {
    margin: 80px;
    position: fixed;
    right: -35px;
    bottom: 0%;
  }
  .clean {
    margin: 40px;
    position: fixed;
    right: 5px;
    bottom: 1%;
    z-index: 100000;
  }
</style>

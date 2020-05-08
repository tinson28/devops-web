<template>
  <!--<el-row>-->
    <!--<el-col :span="12"><div class="console" >1111 </div></el-col>-->
    <!--<el-col :span="12">2222</el-col>-->
  <!--</el-row>-->
  <!--<el-col :span="24" class="main">-->
  <!--<aside style="z-index: 10000000;width:200px" wrap-class="scrollbar-wrapper" >-->
    <!--<el-menu :default-openeds="['1', '3']">-->
      <!--<el-submenu index="1">-->
        <!--<template slot="title"><i class="el-icon-message"></i>导航一</template>-->
        <!--<el-menu-item-group>-->
          <!--<template slot="title">分组一</template>-->
          <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
          <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
        <!--</el-menu-item-group>-->
        <!--<el-menu-item-group title="分组2">-->
          <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
        <!--</el-menu-item-group>-->
        <!--<el-submenu index="1-4">-->
          <!--<template slot="title">选项4</template>-->
          <!--<el-menu-item index="1-4-1">选项4-1</el-menu-item>-->
        <!--</el-submenu>-->
      <!--</el-submenu>-->
    <!--</el-menu>-->
  <!--</aside>-->
  <!--<section class="content-container">-->
    <!--<div id="terminal" class="console" style="height:100% " ></div>-->
  <!--</section>-->
  <!--&lt;!&ndash;<el-container>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-aside style="height: 100%">&ndash;&gt;-->

    <!--&lt;!&ndash;</el-aside>&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash;<el-container>&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;&lt;!&ndash;<el-header>这是抬头</el-header>&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;&lt;!&ndash;<el-main style="height: 100%">&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;&lt;!&ndash;<div id="terminal" class="console" style="height:1000px ; width:100%" ></div>&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;&lt;!&ndash;</el-main>&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash;</el-container>&ndash;&gt;&ndash;&gt;-->
  <!--&lt;!&ndash;</el-container>&ndash;&gt;-->
  <!--</el-col>-->
  <!--<el-container >-->
    <!--<el-header>-->
      <!--<el-form  ref="roleForm" :model="roleForm" size="small" >-->
  <div style="background-color: #e3f2fd">
      <el-row :gutter="12">
        <el-col :span="8">
          <div style="padding:5px;height: 32px"><span style="margin-left: 30px">当前登录服务器为:{{username}}@{{server}}:{{port}} </span></div>
        </el-col>
        <el-col :span="3">
            <el-upload
                    ref="upload"
                    action="string"
                    :http-request="upload"
                    :file-list="roleForm.fileList">
              <!--<el-input placeholder="请输入子节点名称" ></el-input>-->
              <el-button  size="small" type="primary">上传文件</el-button>
              <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="upload">上传到服务器</el-button>-->
              <!--<el-button size="small" type="primary">点击上传</el-button>-->
              <!--<div slot="tip" class="el-upload__tip">只能上传zip文件，且不超过500kb</div>-->
            </el-upload>
        </el-col>
        <el-col :span="13">
          <el-input v-model="downloadPath" size="small" style="width: 70%;margin-left: 2px" placeholder="请输入需要下载的文件路径"></el-input>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="downloadFile">下载文件</el-button>
          <!--<el-form :inline="true">-->
            <!--<el-form-item >-->
              <!--<el-input  size="small"  label="请输入需要下载的文件路径"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item >-->
              <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">下载</el-button>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
        </el-col>
      </el-row>
        <!--<el-form-item label="role上传">-->

          <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</el-header>-->
    <el-row>
      <div ref="my_terminal" id="terminal" class="console" style="height:100%;width:100%;margin: 0px" ></div>
    </el-row>
  <!--</el-container>-->
  </div>
</template>
<script>
import Terminal from './Xterm'
import * as fit from 'xterm/lib/addons/fit/fit'
import store from '@/store'
import {getToken} from '@/utils/auth'
import {uploadFile,downloadFile} from '@/api/sftp'
import {getConnectionsBy} from '@/api/connection'
export default {
  name: 'Console',
  props: {
    terminal: {
      type: Object,
      default: function () {
      }
    }
  },
  data() {
    return {
      term: null,
      terminalSocket: null,
      roleForm:{role_name:'',fileList:[]},
      downloadPath:'',username:'',server:'',port:''
    }
  },
  mounted() {
    getConnectionsBy(this.$route.query.sid).then(res=>{
      console.log(res.results[0])
      const ret=res.results[0]
      this.username=ret.username
      this.server=ret.private_ip
      this.port=ret.port
    })
    console.log('pid : ' + this.terminal.pid + ' is on ready')
    const terminalContainer = document.getElementById('terminal')
    let height = document.body.clientHeight
    let width = document.body.clientWidth
    let test_height=this.$refs.my_terminal.offsetHeight
    console.log('get test_height')
    console.log(test_height)
    let rows = this.get_box_size().rows/17;//18是字体高度,根据需要自己修改
    let cols = this.get_box_size().cols/9;
    this.term = new Terminal({
      rows: parseInt(rows),
      cols: parseInt(cols),
    })
    this.term.open(terminalContainer,true)
    // this.term.fit()
    // open websocket
    let token=getToken()
    this.terminalSocket = new WebSocket(
            process.env.WS_SCHEMA+'://'+process.env.BACKEN_HOST+'/websocket/ssh?token='+token+'&sid='+this.$route.query.sid+'&uid='+this.$route.query.uid
    +'&height='+this.get_box_size().rows+'&width='+this.get_box_size().cols)
    this.terminalSocket.onopen = this.runRealTerminal
    this.terminalSocket.onclose = this.closeRealTerminal
    this.terminalSocket.onerror = this.errorRealTerminal
    this.term.attach(this.terminalSocket)
    this.term._initialized = true
    console.log('mounted is going on')
    console.log(this.get_box_size().rows)
    console.log(this.get_box_size().cols)
  },
  methods: {
    runRealTerminal() {
      console.log('webSocket is finished')
    },
    errorRealTerminal() {
      console.log('error')
    },
    closeRealTerminal() {
      this.term.write("\n   连接超时，请检查账户密码或者主机状态！")
      console.log('close')
    },
    upload(item){
      const formData=new FormData()
      formData.append('upload_file',item.file)
      // formData.append('role_desc',this.roleForm.role_name)
      console.log(this.$route.query)
      formData.append('sid',this.$route.query.sid)
      uploadFile(formData).then(res=>{
        // this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '上传成功!',
          duration: 2000
        })
        this.loading = false
        // this.$parent.$parent.cancel()
        // this.parent.init()
      })
    },
    downloadFile(){
      let download_file=this.downloadPath
      if(download_file.length!==0){
        // location.href='/api/ops/sftp/download/?download_file='+download_file
        // base_api=process.env.BASE_API
        window.open(process.env.BASE_API+'/api/sftp/download/?download_file='+download_file+'&sid='+this.$route.query.sid)
        // downloadFile(this.$route.query.sid,download_file)
      }else{
        this.$message({
          showClose: true,
          type: 'error',
          message: '文件名不能为空!',
          duration: 2000
        })
      }
    },
    get_box_size() {
      let init_width = 92;
      let init_height = 22;

      let windows_width = document.body.clientWidth
      let windows_height = document.body.clientHeight

      // return {
      //   cols: Math.floor(windows_width / init_width),
      //   rows: Math.floor(windows_height / init_height),
      // }
      return {
        cols: windows_width,
        rows: windows_height-58,
      }
    },

  },

  beforeDestroy() {
    this.terminalSocket.close()
    this.term.destroy()
  }
}
</script>


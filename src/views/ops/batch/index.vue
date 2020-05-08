<template>
  <!-- <div :style="'width:' + width" class="container"  > -->
    <div class="app-container">
    <el-row :gutter="12">
      <!-- <el-col :span="6">
        <el-card v-if="checkPermission(['admin','device_list'])" class="box-card">
          <div slot="header" class="clearfix">
            <span>资产列表</span> -->
            <!--<el-button :loading="Loading" icon="el-icon-check" size="mini" type="success" style="float: right; padding: 4px 8px" @click="toSave">保存</el-button>-->
          <!-- </div>
          <el-tree
            ref="deviceTree"
            :data="device_list"
            :default-checked-keys="deviceIds"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            highlight-current
            @check="changeNode">
          </el-tree>
        </el-card>
      </el-col> -->
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>执行参数</span>
          </div>
          <el-form :model="cmdForm"  ref="cmdForm" label-width="100px" size="mini" :inline="true" >
            <el-row>
              <el-form-item label="执行主机组">
              <el-select v-model="selected_inventories" multiple  placeholder="主机组" class="filter-item" style="width: 192px" @change="selectChange">
                <el-option v-for="item in inventories" :key="item.id" :label="item.ans_group_name" :value="item.id"/>
              </el-select>
              </el-form-item>
            </el-row>
            <el-row>
            <el-form-item label="执行主机">
              <el-tag
                v-for="tag in hostTags"
                :key="tag.id"
                >
                {{tag.name}}
              </el-tag>
            </el-form-item>
            </el-row>
            <el-row>
            <el-form-item label="管理工具">
              <el-select v-model="cmdForm.tool" placeholder="请选择管理工具" >
                <el-option label="ansible" value="ansible"></el-option>
                <el-option label="saltstack" value="saltstack"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="功能模块">
              <el-select v-model="cmdForm.module" placeholder="功能模块" @change="ansModuleSelectChange">
                <el-option label="shell" value="shell"></el-option>
                <el-option label="command" value="command"></el-option>
                <el-option label="setup" value="setup"></el-option>
                <el-option label="copy" value="copy"></el-option>
                <el-option label="file" value="file"></el-option>
                <el-option label="yum" value="yum"></el-option>
                <el-option label="service" value="service"></el-option>
                <el-option label="ping" value="ping"></el-option>
              </el-select>
            </el-form-item>
            </el-row>
            <el-row>
            <el-form-item label="模块参数" >
              <el-input v-model="cmdForm.args" placeholder="请输入执行的命令" style="width:500px"  ></el-input>
              
            </el-form-item>
            <el-alert
              :title="tips_title"
              type="info"
              v-show="tips_show"
              @close="close_tips">
              <template slot='title'>
              <!-- <div>新标题1</div>
              <div>新标题2</div> -->
              <div v-html="tips_description"></div>
              </template>
            </el-alert>
            </el-row>
            <el-row>
              
            </el-row>
            <el-row>
          <el-form-item>
            <el-button style="margin-left: 80px" type="primary" :loading="startloading" @click="startRun">立即执行</el-button>
            <el-button plain @click="resetForm('cmdForm')">重置</el-button>
          </el-form-item>
            </el-row>
          </el-form>

        </el-card>
        <div style="height: 10px"></div>
        <el-card>
          <div slot="header" class="clearfix">
            <span>执行结果</span>
          </div>
          <!-- <template v-for="item in ans_result"> -->
          <!-- <template> -->
            <!-- <el-card class="box-card ansible-box" style="margin:5px"> -->
              <!-- <div slot="header"  class="clearfix" >
                <span>{{item.header}}</span>
                <el-button :type="item.statusType" size="mini" style="padding: 3px 0">{{item.status}}</el-button>
                <el-button :type="item.rcType" size="mini" style="padding: 3px 0">{{item.rc}}</el-button>
                <el-button style="float: right; padding: 3px 0" icon="el-icon-close" type="warning" size="mini">关闭</el-button>
              </div> -->
              <!--<div  :key="item.header" class="text item">-->
                <!--<span class="line-html" v-html="item.body"/>-->
              <!--</div>-->
              <!-- <div  class="console"> -->
                <!-- <div :key="item.header"> -->
                  <!-- <span class="line-html" v-html="item.body"/> -->
                <!-- </div> -->
              <!-- </div> -->
            <!-- </el-card> -->
            <div id="console"  class="console">
              <!-- <div v-for="item in data" :key="item.id">
                <span class="line-html" v-html="item"/>
              </div> -->
              <pre  style="background-color: #0c0c0c" v-html="ans_result"></pre>
            </div>
            <!-- <pre  style="background-color: #0c0c0c" v-html="ans_result"></pre> -->
            <!-- <div style="height: 10px"></div> -->
          <!-- </template> -->
          <!--<el-card class="box-card" id="ansible-box">-->
            <!--<div slot="header"  class="clearfix" >-->
              <!--<span>卡片名称</span>-->
              <!--<el-button style="float: right; padding: 3px 0" icon="el-icon-close" type="warning" size="mini">关闭</el-button>-->
            <!--</div>-->
            <!--<div v-for="o in 4" :key="o" class="text item">-->
              <!--{{'列表内容 ' + o }}-->
            <!--</div>-->
          <!--</el-card>-->

            <el-tooltip content="返回上一页" class="closepage item" effect="dark" placement="left">
              <el-button type="info" size="mini" circle @click="closeTag"><svg-icon icon-class="return"/></el-button>
            </el-tooltip>
            <el-tooltip content="清空控制台输出" class="clean item" effect="dark" placement="left">
              <el-button type="info" size="mini" circle @click="clean"><svg-icon icon-class="clean"/></el-button>
            </el-tooltip>
            <el-tooltip :content="content" class="lock item" effect="dark" placement="left">
              <el-button type="info" size="mini" circle @click="doLock"><svg-icon :icon-class="ico"/></el-button>
            </el-tooltip>
            <!--<div id="console" :style="'height:'+ height" class="console">-->
              <!--<div v-for="item in data" :key="item.id">-->
                <!--<span class="line-html" v-html="item"/>-->
              <!--</div>-->
            <!--</div>-->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import checkPermission from '@/utils/permission'
  import { AnsibleRun } from '@/api/ansible'
  // import { getDeviceTree } from '@/api/menu'
  import { getPermissionTree } from '@/api/permission'
  import initData from '@/mixins/initData'
  import { parseTime } from '@/utils/index'
  import eHeader from './module/header'
  import edit from './module/edit'
  import { getToken } from '@/utils/auth'
  import VueNativeSock from 'vue-native-websocket'
  import { list,get_inventory_hosts }  from '@/api/inventory'
  export default {
    components: { eHeader, edit },
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
        permission_list: [],
        device_list: [],
        permissionIds: [], deviceIds: [],selected_inventories:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        tips_show: false,
        tips_title: '提示信息',
        tips_description: '',
        hostTags: [],
        inventories: [],
        selected_inventories:[],
        groupTags:[],
        cmdForm: {
          args: '',
          module: '',
          type: [],
          resource: '',
          desc: '',
          tool: ''
        },
        // ans_result:[],
        ans_result:'',
        ico: 'unlock', unlock: true, content: '锁定滚动条',
        height: document.documentElement.clientHeight - 480 + 'px;',
        width: document.documentElement.clientWidth - 225 + 'px;',
        startloading: false,
        stoploading: false,
        tailloading: false,
        servers: '',
        server_ids: '',
        hosts: [],
        data: [],
        rules: {
          server_ids: [
            { required: true, message: '请选择服务器', trigger: 'blur' }
          ]
        }
      }
    },
    // watch: {
    //   data: {
    //     handler(val, oldVal) {
    //       this.$nextTick(() => {
    //         if (this.unlock) {
    //           var div = document.getElementById('console')
    //           div.scrollTop = div.scrollHeight
    //         }
    //       })
    //     }
    //   }
    // },
    created() {
      this.init()
      // this.getMenus()
      this.getInventories()
    },
    mounted: function() {
      this.initWebSocket()
      this.start()
    },
    methods: {
      parseTime,
      checkPermission,
      init() {
        const that = this
        window.onresize = function temp() {
          that.height = document.documentElement.clientHeight - 94.5 + 'px;'
        }
      },
      handleCloseTag(tag) {
        this.hostTags.splice(this.hostTags.indexOf(tag), 1);
      },
      initWebSocket() {
        console.log('test')
        const wsuri = process.env.WS_SCHEMA + '://' + process.env.BASE_API.replace(/http:\/\//, '').replace(/https:\/\//, '') + '/websocket/console?token=' + getToken()
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
      close_tips(){
        this.tips_show=false
      },
      ansModuleSelectChange(){
        this.tips_show=true
        switch(this.cmdForm.module){
          case 'shell':
            this.tips_title='shell模块帮助信息：'
            this.tips_description='请直接输入命令，如uptime'
            break
          case 'command':
            this.tips_title='command模块帮助信息：'
            this.tips_description='请直接输入命令，如uptime'
            break
          case 'copy':
            this.tips_title='command模块帮助信息：'
            this.tips_description="<p>An ad-hoc task can harness the power of Ansible and SCP to transfer many files to multiple machines in parallel. To transfer a file directly to all servers in the [atlanta] group:</p><div class=\"highlight-bash notranslate\"><div class=\"highlight\"><pre><span></span>$ ansible atlanta -m copy -a <span class=\"s2\">\"src=/etc/hosts dest=/tmp/hosts\"</span></pre>"
            break
          case 'file':
            this.tips_description='<p>The <span class="std std-ref">file</span> module allows changing ownership and permissions on files. These'+
'same options can be passed directly to the <code class="docutils literal notranslate"><span class="pre">copy</span></code> module as well:</p>'+
'<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m file -a <span class="s2">"dest=/srv/foo/a.txt mode=600"</span>'+
'$ ansible webservers -m file -a "dest=/srv/foo/b.txt mode=600 owner=mdehaan group=mdehaan"'+
'</pre></div></div>'+
'<p>The <code class="docutils literal notranslate">file</code> module can also create directories, similar to <code class="docutils literal notranslate"><span class="pre">mkdir</span> <span class="pre">-p</span></code>:</p>'+
'<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m file -a <span class="s2">"dest=/path/to/c mode=755 owner=mdehaan group=mdehaan state=directory"</span>'+
'</pre></div>'+
'</div><p>As well as delete directories (recursively) and delete files:</p>'+
'<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m file -a <span class="s2">"dest=/path/to/c state=absent"</span>'+
'</pre></div></div></div>'
            break
          case 'ping':
            this.tips_description='无需输入如何模块参数'
            break
          case 'setup':
            this.tips_description='无需输入如何模块参数'
            break
          case 'service':
            this.tips_description='<p>Ensure a service is started on all webservers:</p>'+
'<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m service -a <span class="s2">"name=httpd state=started"</span>'+
'</pre></div></div><p>Alternatively, restart a service on all webservers:</p>'+
'<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m service -a <span class="s2">"name=httpd state=restarted"</span>'+
'</pre></div></div><p>Ensure a service is stopped:</p>'+
'<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m service -a <span class="s2">"name=httpd state=stopped"</span></pre></div></div>'
            break
          case 'yum':
            this.tips_description='<p>You might also use an ad-hoc task to install, update, or remove packages on managed nodes using a package management module like yum. To ensure a package is installed without updating it:</p><div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m yum -a <span class="s2">"name=acme state=present"</span>'+
'</pre></div></div><p>To ensure a specific version of a package is installed:</p>'+
'<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m yum -a <span class="s2">"name=acme-1.5 state=present"</span>'+
'</pre></div></div><p>To ensure a package is at the latest version:</p>'+
'<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m yum -a <span class="s2">"name=acme state=latest"</span>'+
'</pre></div></div><p>To ensure a package is not installed:</p>'+
'<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m yum -a <span class="s2">"name=acme state=absent"</span>'+
'</pre></div></div><p>Ansible has modules for managing packages under many platforms. If there is no module for your package manager, you can install packages using the command module or create a module for your package manager.</p>'
            break
          }
      },
      selectChange(){
        console.log('打印selected_inventories')
        console.log(this.selected_inventories[1])
        let __inventories = this.selected_inventories
        let __this=this
        if(__inventories.length){
          __this.hosts=[]
          __this.hostTags=[]
          __inventories.forEach(function(v){
            get_inventory_hosts(v).then(res =>{
              console.log(res)
              let __vm=res.hosts
              console.log(__vm)
              __vm.forEach(function(data, index) {
                __this.hosts.push(data.id)
                __this.hostTags.push({id:data.id, name:data.ip})
              })
            })
          })
          console.log(__this.hostTags)

        }else{
          __this.hostTags=[]
          console.log(__this.hostTags)
        }
      },
      changeNode(){
        this.hostTags=[]
        this.hosts=[]
        const checkedNodes=this.$refs.deviceTree.getCheckedNodes()
        // console.log(checkedNodes)
        // console.log(this.device_list)
        // const deviceList=this.device_list
        let hostTagsList=this.hostTags
        let hostIds=this.hosts
        checkedNodes.forEach(function (n) {
          if(!n.children && ( n.pid || n.pid==0 )){
            const tag={'name':n.name,'id':n.id}
            hostIds.push(n.id)
            hostTagsList.push(tag)
          }
          else{
            // console.log(n)
          }
        })
      },
      getMenus() {
        if (Array.isArray(this.device_list) && this.device_list.length === 0) {
          getDeviceTree().then(res => {
            this.device_list = res.detail
          })
        }
      },
      getInventories(){
        list().then(res=>{
          this.inventories=res.results
        })
      },
      update(id) {
        // 刷新选中行数据
        retrieve(id).then(res => {
          for (let i = 0; i < this.data.length; i++) {
            if (res.id === this.data[i].id) {
              this.data[i] = res
              break
            }
          }
        })
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
              this.ans_result=this.ans_result+data.data
              // const color_data = this.getColor(data.data)
              // this.data.push(color_data)
              // this.data.push(data.data)
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
        // const filter_reg = new RegExp(this.log_data.filter, '')
        // const filter = this.log_data.filter.match(filter_reg)
        const pre=text.match(/<pre>[\s\S]*?<\/pre>/gi)
        // const info = text.match(/INFO/i)
        // const warn = text.match(/WARN/i)
        // const debug = text.match(/DEBUG/i)
        // const host = text.match(/\[(.*?)@(.*?)\]/)
        // const error = text.match(/ERROR/i)
        // console.log(pre)
        let result=this.ans_result
        pre.forEach(function (p) {
          // console.log('开始打印')
          let tmp=p.replace('<pre>','').replace('</pre>','').replace(/<code[\s\S]*?>/gi,'').replace('</code>','')
          const preFormat=tmp.split(/\n/gi)
          // console.log(result)
          var dict=new Object()
          preFormat.forEach(function (ele,idx) {
            if(idx==0){
              // console.log('这是第一行')
              if(ele.indexOf("success")>=0){
                dict.status='success'
                dict.statusType='success'
              }else{
                dict.status='failed'
                dict.statusType='danger'
              }
              if (ele.indexOf("rc=0")>=0){
                dict.rc='rc=0'
                dict.rcType='primary'
              }else{
                dict.rc='rc=1'
                dict.rcType='warning'
              }
              dict.header=ele
            }
          })
          dict.body=p.replace(dict.header,'').replace('\n','')
          console.log(dict.body)
          // console.log(dict.body.search(/\n/gi))
          result.push(dict)
          // console.log(p)
        })
        // if(pre){
        //   console.log(pre)
        // }
        // if (info) {
        //   return text.replace(/INFO/i, '<span style="color: #7FFF00;">' + info + '</span>')
        // } else if (warn) {
        //   return text.replace(/WARN/i, '<span style="color: #FFFF00;">' + warn + '</span>')
        // } else if (debug) {
        //   return text.replace(/DEBUG/i, '<span style="color: #0000ff;">' + debug + '</span>')
        // } else if (host) {
        //   return text.replace(/\[(.*?)@(.*?)\]/, '<span style="color: #FFA54F;">' + host[0] + '</span>')
        // } else if (error) {
        //   return text.replace(/ERROR/i, '<span style="color: #FF0000;">' + error + '</span>')
        // } else if (filter) {
        //   return text.replace(filter_reg, '<span style="color: #FF0000;">' + filter + '</span>')
        // } else {
        //   return text
        // }
        return text
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

<!--<style>-->
  <!--.el-card__header {-->
    <!--font-size: 14px;-->
  <!--}-->
<!--</style>-->
<style>
  .ansible-box .el-card__header {
    background: #6c6c6c;
    font-size: 14px;
    height: 39px;
    padding-top: 9px;
    color:white;
  }
  .ansible-box .el-card__body {
    background: #ebf0f3;
    padding:0px;
  }


</style>

<style scoped>
  button,
  input,
  textarea {
    outline: 0;
  }
  .line-html {
    line-height: 1.85
  }
  .container .buttons .closes,
  .container .buttons .maximize,
  .container .buttons .minimize {
    padding: 0;
    margin: 0;
    margin-right: 6px;
    width: 12px;
    height: 12px;
    border: 1px solid transparent;
    border-radius: 6px;
  }
  .container {
    width: 100%;
    margin: 5px;
    /*font-size: 12px;*/
  }

  #ansible-box div.el-card__header {
    background: #6c6c6c;
  }

  .container .console {
    /*font-family: "Interstate", "Hind", -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;*/
    /*overflow-y: scroll;*/
    /*background: #494949;*/
    /*color: #f7f7f7;*/
    /*padding: 10px;*/
    /*font-size: 14px;*/
    /*border-radius: 3px 1px 3px 3px;*/
    /*font-weight: bold;*/
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
    /*min-height:300px;*/
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
  pre {
    padding: 9px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    margin:0px;
    /* font-family: "Menlo", "Monaco", "Consolas", "Courier New", monospace; */
  }
  /* pre code {
    padding: 0;
    font-size: 13px;
    font-family: "Menlo", "Monaco", "Consolas", "Courier New", monospace;
    background-color: transparent;
    border-radius: 0;
    font-weight: 200;
} */
  .el-tag + .el-tag {
    margin-left: 10px;
  }
</style>

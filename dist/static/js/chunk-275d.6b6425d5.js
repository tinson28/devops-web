(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-275d","chunk-11c7","chunk-3dd4","chunk-6d3e"],{"+B5g":function(e,t,s){"use strict";var n=s("uq6u");s.n(n).a},"3ADX":function(e,t,s){"use strict";var n=s("o0o1"),i=s.n(n),a=s("yXPU"),o=s.n(a),r=s("t3Un");function l(e,t){return Object(r.a)({url:e,method:"get",params:t})}t.a={data:function(){return{loading:!0,data:[],page:1,size:10,total:0,url:"",params:{},query:{},time:170}},methods:{init:function(){var e=o()(i.a.mark(function e(){var t=this;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.beforeInit();case 2:if(e.sent){e.next=4;break}return e.abrupt("return");case 4:return e.abrupt("return",new Promise(function(e,s){t.loading=!0,l(t.url,t.params).then(function(s){t.total=s.count,t.data=s.results,setTimeout(function(){t.loading=!1},t.time),e(s)}).catch(function(e){t.loading=!1,s(e)})}));case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),beforeInit:function(){return!0},pageChange:function(e){var t=this;console.log(e),t.page=e,t.$refs.transfer?(console.log("1"),t.cancel(),t.init()):t.$refs.r_table?(console.log("2"),t.init().then(function(){t.initSelection()})):(console.log("3"),console.log(t.page),t.init())},sizeChange:function(e){var t=this;t.page=1,t.size=e,t.$refs.transfer?(console.log("1"),t.cancel(),t.init()):t.$refs.r_table?(console.log("2"),t.init().then(function(){t.initSelection()})):(console.log("3"),t.init())}}}},"41Be":function(e,t,s){"use strict";s.d(t,"a",function(){return i});var n=s("Q2AE");function i(e){if(e&&e instanceof Array&&e.length>0){var t=e;return!!(n.a.getters&&n.a.getters.roles).some(function(e){return t.includes(e)})}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1}},"86NN":function(e,t,s){"use strict";s.d(t,"d",function(){return i}),s.d(t,"c",function(){return a}),s.d(t,"a",function(){return o}),s.d(t,"b",function(){return r}),s.d(t,"e",function(){return l});var n=s("t3Un");function i(){return Object(n.a)({url:"api/inventory/",method:"get"})}function a(e){return Object(n.a)({url:"api/inventory/"+e+"/get_inventory_hosts/",method:"get"})}function o(e){return Object(n.a)({url:"api/inventory/",method:"post",data:e})}function r(e,t){return Object(n.a)({url:"api/inventory/"+e+"/",method:"put",data:t})}function l(e,t){return Object(n.a)({url:"api/inventory/"+e+"/",method:"patch",data:t})}},CPpc:function(e,t,s){"use strict";s.r(t);var n=s("zF5t"),i={props:{isAdd:{type:Boolean,required:!0},sup_this:{type:Object,default:null}},data:function(){return{loading:!1,dialog:!1,form:{name:"",desc:""},rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]}}},methods:{cancel:function(){this.resetForm()},doSubmit:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return!1;e.loading=!0,e.isAdd?e.doAdd():e.doEdit()})},doAdd:function(){var e=this;Object(n.a)(this.form).then(function(t){e.resetForm(),e.$message({showClose:!0,type:"success",message:"添加成功!",duration:2500}),e.loading=!1,e.$parent.$parent.init()}).catch(function(t){e.loading=!1,console.log(t)})},doEdit:function(){var e=this;Object(n.c)(this.form.id,this.form).then(function(t){e.resetForm(),e.$message({showClose:!0,type:"success",message:"修改成功!",duration:2500}),e.loading=!1,e.sup_this.init()}).catch(function(t){e.loading=!1,console.log(t)})},resetForm:function(){this.dialog=!1,this.$refs.form.resetFields(),this.form={name:"",desc:""}}}},a=s("KHd+"),o=Object(a.a)(i,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-dialog",{attrs:{"append-to-body":!0,visible:e.dialog,title:e.isAdd?"新增角色":"编辑角色",width:"500px"},on:{"update:visible":function(t){e.dialog=t}}},[s("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,size:"small","label-width":"66px"}},[s("el-form-item",{attrs:{label:"名称",prop:"name"}},[s("el-input",{staticStyle:{width:"370px"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"描述"}},[s("el-input",{staticStyle:{width:"370px"},attrs:{rows:"5",type:"textarea"},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"text"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),s("el-button",{attrs:{loading:e.loading,type:"primary"},on:{click:e.doSubmit}},[e._v("确认")])],1)],1)},[],!1,null,"a9c51b52",null);t.default=o.exports},"D+s9":function(e,t,s){"use strict";s.d(t,"d",function(){return i}),s.d(t,"a",function(){return a}),s.d(t,"b",function(){return o}),s.d(t,"c",function(){return r});var n=s("t3Un");function i(){return Object(n.a)({url:"api/permission/tree/",method:"get"})}function a(e){return Object(n.a)({url:"api/permissions/",method:"post",data:e})}function o(e){return Object(n.a)({url:"api/permissions/"+e+"/",method:"delete"})}function r(e,t){return Object(n.a)({url:"api/permissions/"+e+"/",method:"put",data:t})}},Hycs:function(e,t,s){"use strict";s.d(t,"d",function(){return i}),s.d(t,"a",function(){return a}),s.d(t,"b",function(){return o}),s.d(t,"c",function(){return r});var n=s("t3Un");function i(){return Object(n.a)({url:"api/menu/tree/",method:"get"})}function a(e){return Object(n.a)({url:"api/menus/",method:"post",data:e})}function o(e){return Object(n.a)({url:"api/menus/"+e+"/",method:"delete"})}function r(e,t){return Object(n.a)({url:"api/menus/"+e+"/",method:"put",data:t})}},NO56:function(e,t,s){},WVFL:function(e,t,s){"use strict";s.r(t);var n=s("CPpc"),i=s("Hycs"),a=s("D+s9"),o={components:{eForm:n.default},props:{data:{type:Object,required:!0},sup_this:{type:Object,required:!0}},data:function(){return{permissions:[],menus:[]}},methods:{to:function(){var e=this;Object(i.d)().then(function(t){e.menus=t.detail}),Object(a.d)().then(function(t){e.permissions=t.detail});var t=this.$refs.form;t.permissionIds=[],t.menuIds=[],t.form={id:this.data.id,name:this.data.name,desc:this.data.desc,permissions:[],menus:[]},this.data.permissions.forEach(function(e,s){t.permissionIds.push(e.id)}),this.data.menus.forEach(function(e,s){t.menuIds.push(e.id)}),t.dialog=!0}}},r=(s("l6mh"),s("KHd+")),l=Object(r.a)(o,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("el-button",{attrs:{disabled:1===this.data.id,size:"mini",type:"success"},on:{click:this.to}},[this._v("编辑")]),this._v(" "),t("eForm",{ref:"form",attrs:{permissions:this.permissions,menus:this.menus,sup_this:this.sup_this,"is-add":!1}})],1)},[],!1,null,"62cf0fa9",null);t.default=l.exports},bkiL:function(e,t,s){"use strict";s.d(t,"a",function(){return i}),s.d(t,"b",function(){return a});var n=s("t3Un");function i(e){return Object(n.a)({url:"api/ops/ansible/",method:"post",data:e})}function a(e){return Object(n.a)({url:"api/ops/run/playbook/",method:"post",data:e})}},drEJ:function(e,t,s){"use strict";s.r(t);var n=s("lSNA"),i=s.n(n),a=s("oCYn"),o=s("41Be"),r=s("bkiL"),l=(s("D+s9"),s("3ADX")),c=s("7Qib"),u=s("uiIL"),d=s("WVFL"),p=s("X4fA"),h=s("tAjd"),m=s.n(h),f=s("86NN"),v={components:{eHeader:u.default,edit:d.default},mixins:[l.a],data:function(){var e;return e={row_data:null,span:24,show:!1,is_permissions:!1,table_show:!0,Loading:!1,sup_this:this,permission_list:[],device_list:[],permissionIds:[],deviceIds:[],selected_inventories:[],defaultProps:{children:"children",label:"name"},tips_show:!1,tips_title:"提示信息",tips_description:"",hostTags:[],inventories:[]},i()(e,"selected_inventories",[]),i()(e,"groupTags",[]),i()(e,"cmdForm",{args:"",module:"",type:[],resource:"",desc:"",tool:""}),i()(e,"ans_result",""),i()(e,"ico","unlock"),i()(e,"unlock",!0),i()(e,"content","锁定滚动条"),i()(e,"height",document.documentElement.clientHeight-480+"px;"),i()(e,"width",document.documentElement.clientWidth-225+"px;"),i()(e,"startloading",!1),i()(e,"stoploading",!1),i()(e,"tailloading",!1),i()(e,"servers",""),i()(e,"server_ids",""),i()(e,"hosts",[]),i()(e,"data",[]),i()(e,"rules",{server_ids:[{required:!0,message:"请选择服务器",trigger:"blur"}]}),e},created:function(){this.init(),this.getInventories()},mounted:function(){this.initWebSocket(),this.start()},methods:{parseTime:c.b,checkPermission:o.a,init:function(){var e=this;window.onresize=function(){e.height=document.documentElement.clientHeight-94.5+"px;"}},handleCloseTag:function(e){this.hostTags.splice(this.hostTags.indexOf(e),1)},initWebSocket:function(){console.log("test");var e="ws://"+"http://undefined:8000".replace(/http:\/\//,"").replace(/https:\/\//,"")+"/websocket/console?token="+Object(p.a)();console.log(e),a.default.use(m.a,e,{connectManually:!0,reconnection:!0,reconnectionAttempts:5,reconnectionDelay:3e3}),this.vm=new a.default,this.vm.$connect(),console.log("---连接Websocket----")},close_tips:function(){this.tips_show=!1},ansModuleSelectChange:function(){switch(this.tips_show=!0,this.cmdForm.module){case"shell":this.tips_title="shell模块帮助信息：",this.tips_description="请直接输入命令，如uptime";break;case"command":this.tips_title="command模块帮助信息：",this.tips_description="请直接输入命令，如uptime";break;case"copy":this.tips_title="command模块帮助信息：",this.tips_description='<p>An ad-hoc task can harness the power of Ansible and SCP to transfer many files to multiple machines in parallel. To transfer a file directly to all servers in the [atlanta] group:</p><div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible atlanta -m copy -a <span class="s2">"src=/etc/hosts dest=/tmp/hosts"</span></pre>';break;case"file":this.tips_description='<p>The <span class="std std-ref">file</span> module allows changing ownership and permissions on files. Thesesame options can be passed directly to the <code class="docutils literal notranslate"><span class="pre">copy</span></code> module as well:</p><div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m file -a <span class="s2">"dest=/srv/foo/a.txt mode=600"</span>$ ansible webservers -m file -a "dest=/srv/foo/b.txt mode=600 owner=mdehaan group=mdehaan"</pre></div></div><p>The <code class="docutils literal notranslate">file</code> module can also create directories, similar to <code class="docutils literal notranslate"><span class="pre">mkdir</span> <span class="pre">-p</span></code>:</p><div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m file -a <span class="s2">"dest=/path/to/c mode=755 owner=mdehaan group=mdehaan state=directory"</span></pre></div></div><p>As well as delete directories (recursively) and delete files:</p><div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m file -a <span class="s2">"dest=/path/to/c state=absent"</span></pre></div></div></div>';break;case"ping":case"setup":this.tips_description="无需输入如何模块参数";break;case"service":this.tips_description='<p>Ensure a service is started on all webservers:</p><div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m service -a <span class="s2">"name=httpd state=started"</span></pre></div></div><p>Alternatively, restart a service on all webservers:</p><div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m service -a <span class="s2">"name=httpd state=restarted"</span></pre></div></div><p>Ensure a service is stopped:</p><div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m service -a <span class="s2">"name=httpd state=stopped"</span></pre></div></div>';break;case"yum":this.tips_description='<p>You might also use an ad-hoc task to install, update, or remove packages on managed nodes using a package management module like yum. To ensure a package is installed without updating it:</p><div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m yum -a <span class="s2">"name=acme state=present"</span></pre></div></div><p>To ensure a specific version of a package is installed:</p><div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m yum -a <span class="s2">"name=acme-1.5 state=present"</span></pre></div></div><p>To ensure a package is at the latest version:</p><div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m yum -a <span class="s2">"name=acme state=latest"</span></pre></div></div><p>To ensure a package is not installed:</p><div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ ansible webservers -m yum -a <span class="s2">"name=acme state=absent"</span></pre></div></div><p>Ansible has modules for managing packages under many platforms. If there is no module for your package manager, you can install packages using the command module or create a module for your package manager.</p>'}},selectChange:function(){console.log("打印selected_inventories"),console.log(this.selected_inventories[1]);var e=this.selected_inventories,t=this;e.length?(t.hosts=[],t.hostTags=[],e.forEach(function(e){Object(f.c)(e).then(function(e){console.log(e);var s=e.hosts;console.log(s),s.forEach(function(e,s){t.hosts.push(e.id),t.hostTags.push({id:e.id,name:e.ip})})})}),console.log(t.hostTags)):(t.hostTags=[],console.log(t.hostTags))},changeNode:function(){this.hostTags=[],this.hosts=[];var e=this.$refs.deviceTree.getCheckedNodes(),t=this.hostTags,s=this.hosts;e.forEach(function(e){if(!e.children&&(e.pid||0==e.pid)){var n={name:e.name,id:e.id};s.push(e.id),t.push(n)}})},getMenus:function(){var e=this;Array.isArray(this.device_list)&&0===this.device_list.length&&getDeviceTree().then(function(t){e.device_list=t.detail})},getInventories:function(){var e=this;Object(f.d)().then(function(t){e.inventories=t.results})},update:function(e){var t=this;retrieve(e).then(function(e){for(var s=0;s<t.data.length;s++)if(e.id===t.data[s].id){t.data[s]=e;break}})},closeTag:function(){var e=this;this.$confirm("是否关闭页面并返回上一页?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.vm.$disconnect(),e.$router.go(-1),e.$store.dispatch("delView",e.$store.state.tagsView.visitedViews.slice(-1)[0])}).catch(function(){e.$message({type:"info",message:"取消操作"})})},start:function(){var e=this;this.$socket.onopen=function(t){1===t.target.readyState&&(console.log("--------正在读取数据!--------"),e.$socket.onmessage=function(t){e.ans_result=e.ans_result+t.data})}},startRun:function(){var e=this;this.startloading=!0;var t={exec:"mod_run",hostIds:this.hosts,module:this.cmdForm.module,args:this.cmdForm.args};Object(r.a)(t).then(function(t){e.startloading=!1}).catch(function(t){e.startloading=!1,console.log(t)})},getColor:function(e){var t=e.match(/<pre>[\s\S]*?<\/pre>/gi),s=this.ans_result;return t.forEach(function(e){var t=e.replace("<pre>","").replace("</pre>","").replace(/<code[\s\S]*?>/gi,"").replace("</code>","").split(/\n/gi),n=new Object;t.forEach(function(e,t){0==t&&(e.indexOf("success")>=0?(n.status="success",n.statusType="success"):(n.status="failed",n.statusType="danger"),e.indexOf("rc=0")>=0?(n.rc="rc=0",n.rcType="primary"):(n.rc="rc=1",n.rcType="warning"),n.header=e)}),n.body=e.replace(n.header,"").replace("\n",""),console.log(n.body),s.push(n)}),e},clean:function(){this.ans_result=[],this.data=[],this.$message({showClose:!0,type:"success",message:"清空控制台输出成功！",duration:3500})},resetForm:function(e){this.$refs[e].resetFields()},submitForm:function(e){},doLock:function(){this.unlock?(this.content="解除锁定",this.ico="lock"):(this.content="锁定滚动条",this.ico="unlock"),this.unlock=!this.unlock}}},g=(s("sZjw"),s("+B5g"),s("KHd+")),b=Object(g.a)(v,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"app-container"},[s("el-row",{attrs:{gutter:12}},[s("el-col",{attrs:{span:24}},[s("el-card",[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",[e._v("执行参数")])]),e._v(" "),s("el-form",{ref:"cmdForm",attrs:{model:e.cmdForm,"label-width":"100px",size:"mini",inline:!0}},[s("el-row",[s("el-form-item",{attrs:{label:"执行主机组"}},[s("el-select",{staticClass:"filter-item",staticStyle:{width:"192px"},attrs:{multiple:"",placeholder:"主机组"},on:{change:e.selectChange},model:{value:e.selected_inventories,callback:function(t){e.selected_inventories=t},expression:"selected_inventories"}},e._l(e.inventories,function(e){return s("el-option",{key:e.id,attrs:{label:e.ans_group_name,value:e.id}})}),1)],1)],1),e._v(" "),s("el-row",[s("el-form-item",{attrs:{label:"执行主机"}},e._l(e.hostTags,function(t){return s("el-tag",{key:t.id},[e._v("\n              "+e._s(t.name)+"\n            ")])}),1)],1),e._v(" "),s("el-row",[s("el-form-item",{attrs:{label:"管理工具"}},[s("el-select",{attrs:{placeholder:"请选择管理工具"},model:{value:e.cmdForm.tool,callback:function(t){e.$set(e.cmdForm,"tool",t)},expression:"cmdForm.tool"}},[s("el-option",{attrs:{label:"ansible",value:"ansible"}}),e._v(" "),s("el-option",{attrs:{label:"saltstack",value:"saltstack"}})],1)],1),e._v(" "),s("el-form-item",{attrs:{label:"功能模块"}},[s("el-select",{attrs:{placeholder:"功能模块"},on:{change:e.ansModuleSelectChange},model:{value:e.cmdForm.module,callback:function(t){e.$set(e.cmdForm,"module",t)},expression:"cmdForm.module"}},[s("el-option",{attrs:{label:"shell",value:"shell"}}),e._v(" "),s("el-option",{attrs:{label:"command",value:"command"}}),e._v(" "),s("el-option",{attrs:{label:"setup",value:"setup"}}),e._v(" "),s("el-option",{attrs:{label:"copy",value:"copy"}}),e._v(" "),s("el-option",{attrs:{label:"file",value:"file"}}),e._v(" "),s("el-option",{attrs:{label:"yum",value:"yum"}}),e._v(" "),s("el-option",{attrs:{label:"service",value:"service"}}),e._v(" "),s("el-option",{attrs:{label:"ping",value:"ping"}})],1)],1)],1),e._v(" "),s("el-row",[s("el-form-item",{attrs:{label:"模块参数"}},[s("el-input",{staticStyle:{width:"500px"},attrs:{placeholder:"请输入执行的命令"},model:{value:e.cmdForm.args,callback:function(t){e.$set(e.cmdForm,"args",t)},expression:"cmdForm.args"}})],1),e._v(" "),s("el-alert",{directives:[{name:"show",rawName:"v-show",value:e.tips_show,expression:"tips_show"}],attrs:{title:e.tips_title,type:"info"},on:{close:e.close_tips}},[s("template",{slot:"title"},[s("div",{domProps:{innerHTML:e._s(e.tips_description)}})])],2)],1),e._v(" "),s("el-row"),e._v(" "),s("el-row",[s("el-form-item",[s("el-button",{staticStyle:{"margin-left":"80px"},attrs:{type:"primary",loading:e.startloading},on:{click:e.startRun}},[e._v("立即执行")]),e._v(" "),s("el-button",{attrs:{plain:""},on:{click:function(t){return e.resetForm("cmdForm")}}},[e._v("重置")])],1)],1)],1)],1),e._v(" "),s("div",{staticStyle:{height:"10px"}}),e._v(" "),s("el-card",[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",[e._v("执行结果")])]),e._v(" "),s("div",{staticClass:"console",attrs:{id:"console"}},[s("pre",{staticStyle:{"background-color":"#0c0c0c"},domProps:{innerHTML:e._s(e.ans_result)}})]),e._v(" "),s("el-tooltip",{staticClass:"closepage item",attrs:{content:"返回上一页",effect:"dark",placement:"left"}},[s("el-button",{attrs:{type:"info",size:"mini",circle:""},on:{click:e.closeTag}},[s("svg-icon",{attrs:{"icon-class":"return"}})],1)],1),e._v(" "),s("el-tooltip",{staticClass:"clean item",attrs:{content:"清空控制台输出",effect:"dark",placement:"left"}},[s("el-button",{attrs:{type:"info",size:"mini",circle:""},on:{click:e.clean}},[s("svg-icon",{attrs:{"icon-class":"clean"}})],1)],1),e._v(" "),s("el-tooltip",{staticClass:"lock item",attrs:{content:e.content,effect:"dark",placement:"left"}},[s("el-button",{attrs:{type:"info",size:"mini",circle:""},on:{click:e.doLock}},[s("svg-icon",{attrs:{"icon-class":e.ico}})],1)],1)],1)],1)],1)],1)},[],!1,null,"137e5acc",null);t.default=b.exports},l6mh:function(e,t,s){"use strict";var n=s("widd");s.n(n).a},sZjw:function(e,t,s){"use strict";var n=s("NO56");s.n(n).a},uiIL:function(e,t,s){"use strict";s.r(t);var n=s("41Be"),i=s("7Qib"),a={components:{eForm:s("CPpc").default},props:{query:{type:Object,required:!0}},data:function(){return{downloadLoading:!1}},methods:{checkPermission:n.a,toQuery:function(){this.$parent.page=1,this.$parent.init()},download:function(){var e=this;this.downloadLoading=!0,Promise.all([s.e("chunk-7d1e"),s.e("chunk-5afe")]).then(s.bind(null,"S/jZ")).then(function(t){var s=e.formatJson(["id","name","desc"],e.$parent.data);t.export_json_to_excel({header:["ID","名称","描述"],data:s,filename:"table-list"}),e.downloadLoading=!1})},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"createTime"===e?Object(i.b)(t[e]):t[e]})})}}},o=s("KHd+"),r=Object(o.a)(a,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"head-container"},[s("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"输入名称搜索"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.toQuery(t)}},model:{value:e.query.value,callback:function(t){e.$set(e.query,"value",t)},expression:"query.value"}}),e._v(" "),s("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-search"},on:{click:e.toQuery}},[e._v("搜索")]),e._v(" "),s("div",{staticStyle:{display:"inline-block",margin:"0px 2px"}},[e.checkPermission(["admin","role_all","role_create"])?s("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:function(t){e.$refs.form.dialog=!0}}},[e._v("新增")]):e._e(),e._v(" "),s("eForm",{ref:"form",attrs:{"is-add":!0}})],1),e._v(" "),e.checkPermission(["admin"])?s("el-button",{staticClass:"filter-item",attrs:{loading:e.downloadLoading,size:"mini",type:"primary",icon:"el-icon-download"},on:{click:e.download}},[e._v("导出")]):e._e()],1)},[],!1,null,null,null);t.default=r.exports},uq6u:function(e,t,s){},widd:function(e,t,s){},zF5t:function(e,t,s){"use strict";s.d(t,"d",function(){return i}),s.d(t,"a",function(){return a}),s.d(t,"b",function(){return o}),s.d(t,"c",function(){return r}),s.d(t,"e",function(){return l}),s.d(t,"f",function(){return c}),s.d(t,"g",function(){return u});var n=s("t3Un");function i(){return Object(n.a)({url:"api/roles/",method:"get"})}function a(e){return Object(n.a)({url:"api/roles/",method:"post",data:e})}function o(e){return Object(n.a)({url:"api/roles/"+e+"/",method:"delete"})}function r(e,t){return Object(n.a)({url:"api/roles/"+e+"/",method:"put",data:t})}function l(e){return Object(n.a)({url:"api/roles/"+e+"/",method:"get"})}function c(e,t){return Object(n.a)({url:"api/roles/"+e+"/",method:"patch",data:t})}function u(e){return Object(n.a)({url:"api/ansiblerole/upload/",method:"POST",data:e})}}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0566"],{"/veO":function(e,t,n){"use strict";n.d(t,"c",function(){return i}),n.d(t,"e",function(){return a}),n.d(t,"d",function(){return o}),n.d(t,"b",function(){return r}),n.d(t,"a",function(){return l});var s=n("t3Un");function i(e){return Object(s.a)({url:"api/scan/devices/"+e+"/",method:"delete"})}function a(e){return Object(s.a)({url:"api/scan/devices/"+e+"/",method:"get"})}function o(){return Object(s.a)({url:"api/scan/setting/",method:"get"})}function r(e){return Object(s.a)({url:"api/scan/setting/",method:"post",data:e})}function l(e){return Object(s.a)({url:"api/scan/excu/",method:"post",data:e})}},"3ADX":function(e,t,n){"use strict";var s=n("o0o1"),i=n.n(s),a=n("yXPU"),o=n.n(a),r=n("t3Un");function l(e,t){return Object(r.a)({url:e,method:"get",params:t})}t.a={data:function(){return{loading:!0,data:[],page:1,size:10,total:0,url:"",params:{},query:{},time:170}},methods:{init:function(){var e=o()(i.a.mark(function e(){var t=this;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.beforeInit();case 2:if(e.sent){e.next=4;break}return e.abrupt("return");case 4:return e.abrupt("return",new Promise(function(e,n){t.loading=!0,l(t.url,t.params).then(function(n){t.total=n.count,t.data=n.results,setTimeout(function(){t.loading=!1},t.time),e(n)}).catch(function(e){t.loading=!1,n(e)})}));case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),beforeInit:function(){return!0},pageChange:function(e){var t=this;console.log(e),t.page=e,t.$refs.transfer?(console.log("1"),t.cancel(),t.init()):t.$refs.r_table?(console.log("2"),t.init().then(function(){t.initSelection()})):(console.log("3"),console.log(t.page),t.init())},sizeChange:function(e){var t=this;t.page=1,t.size=e,t.$refs.transfer?(console.log("1"),t.cancel(),t.init()):t.$refs.r_table?(console.log("2"),t.init().then(function(){t.initSelection()})):(console.log("3"),t.init())}}}},"41Be":function(e,t,n){"use strict";n.d(t,"a",function(){return i});var s=n("Q2AE");function i(e){if(e&&e instanceof Array&&e.length>0){var t=e;return!!(s.a.getters&&s.a.getters.roles).some(function(e){return t.includes(e)})}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1}},fBsd:function(e,t,n){"use strict";n.r(t);var s=n("/veO"),i=(n("VCwm"),{data:function(){return{loading:!1,dialog:!1,types:[{value:"password",label:"密码认证"},{value:"key_filename",label:"密钥认证"}],form:{net_address:"",auth_type:"",ssh_username:"",ssh_password:"",ssh_port:"",ssh_private_key:"",commands:{}}}},methods:{cancel:function(){this.resetForm()},doSubmit:function(){var e=this;this.$refs.form.validate(function(t){t&&e.doSave()})},doSave:function(){var e=this;Object(s.b)(this.form).then(function(t){e.resetForm(),e.$message({showClose:!0,type:"success",message:"保存成功!",duration:2500}),e.loading=!1,console.log(e),e.$parent.getSettings()}).catch(function(t){e.loading=!1,console.log(t)})},resetForm:function(){this.dialog=!1,this.$refs.form.resetFields(),this.form={net_address:"",auth_type:"",ssh_username:"",ssh_password:"",ssh_port:"",ssh_private_key:"",commands:{}}}}}),a=n("KHd+"),o=Object(a.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{attrs:{"append-to-body":!0,visible:e.dialog,title:"扫描设置",width:"600px"},on:{"update:visible":function(t){e.dialog=t}}},[n("el-form",{ref:"form",attrs:{model:e.form,size:"small","label-width":"80px"}},[n("el-form-item",{attrs:{label:"扫描网段",prop:"net_address"}},[n("el-input",{staticStyle:{width:"460px"},model:{value:e.form.net_address,callback:function(t){e.$set(e.form,"net_address",t)},expression:"form.net_address"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"认证方式",prop:"auth_type"}},[n("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择认证类型"},model:{value:e.form.auth_type,callback:function(t){e.$set(e.form,"auth_type",t)},expression:"form.auth_type"}},e._l(e.types,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),n("el-form-item",{attrs:{label:"登陆用户",prop:"ssh_username"}},[n("el-input",{staticStyle:{width:"200px"},model:{value:e.form.ssh_username,callback:function(t){e.$set(e.form,"ssh_username",t)},expression:"form.ssh_username"}})],1),e._v(" "),"password"==e.form.auth_type?n("el-form-item",{attrs:{label:"登陆密码",prop:"ssh_password"}},[n("el-input",{staticStyle:{width:"200px"},model:{value:e.form.ssh_password,callback:function(t){e.$set(e.form,"ssh_password",t)},expression:"form.ssh_password"}})],1):e._e(),e._v(" "),"key_filename"==e.form.auth_type?n("el-form-item",{attrs:{label:"密钥路径",prop:"ssh_private_key"}},[n("el-input",{staticStyle:{width:"460px"},model:{value:e.form.ssh_private_key,callback:function(t){e.$set(e.form,"ssh_private_key",t)},expression:"form.ssh_private_key"}})],1):e._e(),e._v(" "),n("el-form-item",{attrs:{label:"SSH端口",prop:"ssh_port"}},[n("el-input",{staticStyle:{width:"200px"},model:{value:e.form.ssh_port,callback:function(t){e.$set(e.form,"ssh_port",t)},expression:"form.ssh_port"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"text"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),n("el-button",{attrs:{loading:e.loading,type:"primary"},on:{click:e.doSubmit}},[e._v("确认")])],1)],1)},[],!1,null,"625e8ffd",null);t.default=o.exports},iWqs:function(e,t,n){"use strict";n.r(t);var s=n("41Be"),i=n("/veO"),a={components:{eForm:n("fBsd").default},props:{query:{type:Object,required:!0}},data:function(){return{delLoading:!1,inboundLoading:!1,scanLoading:!1,statusOptions:[{key:"Succeed",display_name:"成功"},{key:"Failed",display_name:"失败"}],settings:{net_address:"",auth_type:"",ssh_username:"",ssh_password:"",ssh_port:"",ssh_private_key:"",commands:""},status:""}},mounted:function(){this.getSettings()},methods:{checkPermission:s.a,toQuery:function(){this.$parent.page=1,this.$parent.init()},to:function(){var e=this.$refs.form;e.form={net_address:String(this.settings.net_address),auth_type:this.settings.auth_type,ssh_username:this.settings.ssh_username,ssh_password:this.settings.ssh_password,ssh_port:this.settings.ssh_port,ssh_private_key:this.settings.ssh_private_key,commands:this.settings.commands},e.dialog=!0},getSettings:function(){var e=this;this.$nextTick(function(){Object(i.d)().then(function(t){e.settings=t.hosts})})},excuScan:function(){var e=this;this.scanLoading=!0,this.$nextTick(function(){Object(i.a)({excu:"scan"}).then(function(t){200===t.code?e.$message({showClose:!0,type:"success",message:t.detail,duration:3e3}):e.$message({showClose:!0,type:"error",message:t.detail,duration:3e3}),e.scanLoading=!1})})},excuInbound:function(){var e=this;this.$confirm("是否将扫描成功的设备入库?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.inboundLoading=!0,Object(i.a)({excu:"inbound"}).then(function(t){200===t.code?e.$message({showClose:!0,type:"success",message:t.detail,duration:3e3}):e.$message({showClose:!0,type:"error",message:t.detail,duration:3e3}),e.inboundLoading=!1,e.$parent.init()})}).catch(function(){e.$message({type:"info",message:"取消操作"})})},getPtoggleSelect:function(){this.$parent.toggleSelection(this.$parent.data)},deleteSelect:function(){var e=this;if(this.$parent.multipleSelection){var t=this.$parent.multipleSelection.length;this.$confirm("此操作将删除"+t+"条数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$parent.doSelectionDel(),e.$message({type:"success",message:"删除成功!"})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})}else this.$message({type:"info",message:"请先选择数据"})},refresh:function(){this.$parent.init()},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"Succeed"===e?t[e]?"成功":"失败":t[e]})})}}},o=n("KHd+"),r=Object(o.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"head-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"输入主机名/IP/域名搜索"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.toQuery(t)}},model:{value:e.query.value,callback:function(t){e.$set(e.query,"value",t)},expression:"query.value"}}),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"90px"},attrs:{clearable:"",placeholder:"状态"},on:{change:e.toQuery},model:{value:e.query.status,callback:function(t){e.$set(e.query,"status",t)},expression:"query.status"}},e._l(e.statusOptions,function(e){return n("el-option",{key:e.key,attrs:{label:e.display_name,value:e.key}})}),1),e._v(" "),n("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-search"},on:{click:e.toQuery}},[e._v("搜索")]),e._v(" "),n("div",{staticStyle:{display:"inline-block",margin:"0px 2px"}},[e.checkPermission(["admin","scan_all"])?n("el-button-group",[n("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary"},on:{click:e.getPtoggleSelect}},[e._v("全选")]),e._v(" "),n("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"danger"},on:{click:e.deleteSelect}},[e._v("删除")]),e._v(" "),n("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary"},on:{click:e.refresh}},[e._v("刷新")])],1):e._e()],1),e._v(" "),n("div",{staticStyle:{display:"inline-block",margin:"0px 0px",float:"right"}},[e.checkPermission(["admin","scan_all"])?n("el-button-group",[n("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:e.to}},[e._v("扫描设置")]),e._v(" "),n("el-button",{staticClass:"filter-item",attrs:{loading:e.inboundLoading,size:"mini",type:"success",icon:"el-icon-plus"},on:{click:e.excuInbound}},[e._v("全部入库")]),e._v(" "),n("el-button",{staticClass:"filter-item",attrs:{loading:e.scanLoading,size:"mini",type:"warning",icon:"el-icon-plus"},on:{click:e.excuScan}},[e._v("执行扫描")])],1):e._e(),e._v(" "),n("eForm",{ref:"form"})],1)],1)},[],!1,null,null,null);t.default=r.exports},vXf3:function(e,t,n){"use strict";n.r(t);var s=n("41Be"),i=n("3ADX"),a=n("/veO"),o=n("7Qib"),r={components:{eHeader:n("iWqs").default},mixins:[i.a],data:function(){return{delLoading:!1,sup_this:this,allSelect:!1}},created:function(){var e=this;this.$nextTick(function(){e.init()})},methods:{parseTime:o.b,checkPermission:s.a,beforeInit:function(){this.url="api/scan/devices/";var e=this.query,t=e.value,n=e.status;return this.params={page:this.page,size:this.size,ordering:"id"},""!==n&&null!==n&&(this.params.status=n),t&&(this.params.search=t),!0},subDelete:function(e){var t=this;this.delLoading=!0,Object(a.c)(e).then(function(n){t.delLoading=!1,t.$refs[e].doClose(),t.init(),t.$message({showClose:!0,type:"success",message:"删除成功!",duration:2500})}).catch(function(n){t.delLoading=!1,t.$refs[e].doClose(),console.log(n)})},toDetail:function(e){this.$router.push({path:"scan/detail",query:{id:e}})},toggleSelection:function(e){var t=this;e&&(e.forEach(function(e){t.$refs.table.toggleRowSelection(e,!t.allSelect)}),this.allSelect=!this.allSelect)},handleSelectionChange:function(e){this.multipleSelection=e},doSelectionDel:function(){var e=this,t=[];this.multipleSelection.forEach(function(e,n){var s=Object(a.c)(e.id).catch(function(e){console.log(e)});t.push(s)}),Promise.all(t).then(function(t){e.init()})}}},l=n("KHd+"),c=Object(l.a)(r,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("eHeader",{attrs:{query:e.query}}),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"table",staticStyle:{width:"100%"},attrs:{data:e.data,size:"small",border:""},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"序号",width:"60",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",[e._v(e._s(t.$index+1))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"sys_hostname",label:"主机名",width:"150"}}),e._v(" "),n("el-table-column",{attrs:{prop:"hostname",label:"IP/域名",width:"120"}}),e._v(" "),n("el-table-column",{attrs:{prop:"auth_type",label:"认证类型",width:"100"}}),e._v(" "),n("el-table-column",{attrs:{prop:"os_version",label:"系统版本"}}),e._v(" "),n("el-table-column",{attrs:{label:"状态",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return["Succeed"==t.row.status?n("span",{staticStyle:{color:"#00CC00"}},[e._v("成功")]):n("span",{staticStyle:{color:"red"}},[e._v("失败")])]}}])}),e._v(" "),e.checkPermission(["admin","scan_all"])?n("el-table-column",{attrs:{label:"操作",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return e.toDetail(t.row.id)}}},[e._v("详情")]),e._v(" "),n("router-view"),e._v(" "),n("el-popover",{ref:t.row.id,attrs:{placement:"top",width:"180"}},[n("p",[e._v("确定删除本条数据吗？")]),e._v(" "),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(n){e.$refs[t.row.id].doClose()}}},[e._v("取消")]),e._v(" "),n("el-button",{attrs:{loading:e.delLoading,type:"primary",size:"mini"},on:{click:function(n){return e.subDelete(t.row.id)}}},[e._v("确定")])],1),e._v(" "),n("el-button",{attrs:{slot:"reference",type:"danger",size:"mini"},slot:"reference"},[e._v("删除")])],1)]}}],null,!1,1845247943)}):e._e()],1),e._v(" "),n("el-pagination",{staticStyle:{"margin-top":"8px"},attrs:{total:e.total,layout:"total, prev, pager, next, sizes"},on:{"size-change":e.sizeChange,"current-change":e.pageChange}})],1)},[],!1,null,"5d37f8a7",null);t.default=c.exports}}]);
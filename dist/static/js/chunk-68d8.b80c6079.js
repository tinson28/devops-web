(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-68d8"],{"41Be":function(t,e,o){"use strict";o.d(e,"a",function(){return i});var s=o("Q2AE");function i(t){if(t&&t instanceof Array&&t.length>0){var e=t;return!!(s.a.getters&&s.a.getters.roles).some(function(t){return e.includes(t)})}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1}},"Ha+1":function(t,e,o){},JNL0:function(t,e,o){"use strict";o.d(e,"a",function(){return i}),o.d(e,"f",function(){return n}),o.d(e,"c",function(){return a}),o.d(e,"d",function(){return r}),o.d(e,"b",function(){return l}),o.d(e,"e",function(){return c});var s=o("t3Un");function i(t){return Object(s.a)({url:"api/projects/",method:"post",data:t})}function n(t){return Object(s.a)({url:"api/projects/"+t+"/",method:"get"})}function a(t){return Object(s.a)({url:"api/projects/"+t+"/",method:"delete"})}function r(t,e){return Object(s.a)({url:"api/projects/"+t+"/",method:"put",data:e})}function l(t){return Object(s.a)({url:"api/project/copy/",method:"post",data:t})}function c(t,e){return Object(s.a)({url:"api/projects/statistics/?type="+t,method:"post",data:e})}},Yfch:function(t,e,o){"use strict";function s(t){return/^1[3|4|5|7|8][0-9]\d{8}$/.test(t)}function i(t){return/^[a-zA-Z0-9_]+$/g.test(t)}o.d(e,"b",function(){return s}),o.d(e,"a",function(){return i})},eZ7y:function(t,e,o){"use strict";var s=o("Ha+1");o.n(s).a},qpgI:function(t,e,o){"use strict";o.d(e,"c",function(){return i}),o.d(e,"e",function(){return n}),o.d(e,"a",function(){return a}),o.d(e,"b",function(){return r}),o.d(e,"d",function(){return l});var s=o("t3Un");function i(t){return t?Object(s.a)({url:"api/device/list/?os_type="+t,method:"get"}):Object(s.a)({url:"api/device/list/",method:"get"})}function n(t){return Object(s.a)({url:"api/devices/"+t+"/",method:"get"})}function a(t){return Object(s.a)({url:"api/devices/"+t+"/",method:"delete"})}function r(t,e){return Object(s.a)({url:"api/devices/"+t+"/",method:"put",data:e})}function l(t,e){return Object(s.a)({url:"api/devices/statistics/?type="+t,method:"post",data:e})}},twU4:function(t,e,o){"use strict";o.d(e,"d",function(){return i}),o.d(e,"a",function(){return n}),o.d(e,"b",function(){return a}),o.d(e,"c",function(){return r}),o.d(e,"e",function(){return l});var s=o("t3Un");function i(){return Object(s.a)({url:"api/dict/tree/",method:"get"})}function n(t){return Object(s.a)({url:"api/dicts/",method:"post",data:t})}function a(t){return Object(s.a)({url:"api/dicts/"+t+"/",method:"delete"})}function r(t,e){return Object(s.a)({url:"api/dicts/"+t+"/",method:"put",data:e})}function l(){for(var t=arguments.length,e=new Array(t),o=0;o<t;o++)e[o]=arguments[o];return Object(s.a)({url:"api/dicts/?&key="+e,method:"get"})}},yGhc:function(t,e,o){"use strict";o.r(e);var s=o("41Be"),i=o("j5TT"),n=(o("p77/"),o("enqM"),o("9rZZ"),o("m3Q/"),o("AvDn"),{name:"Sticky",props:{stickyTop:{type:Number,default:0},zIndex:{type:Number,default:1},className:{type:String,default:""}},data:function(){return{active:!1,position:"",width:void 0,height:void 0,isSticky:!1}},mounted:function(){this.height=this.$el.getBoundingClientRect().height,window.addEventListener("scroll",this.handleScroll),window.addEventListener("resize",this.handleReize)},activated:function(){this.handleScroll()},destroyed:function(){window.removeEventListener("scroll",this.handleScroll),window.removeEventListener("resize",this.handleReize)},methods:{sticky:function(){this.active||(this.position="fixed",this.active=!0,this.width=this.width+"px",this.isSticky=!0)},handleReset:function(){this.active&&this.reset()},reset:function(){this.position="",this.width="auto",this.active=!1,this.isSticky=!1},handleScroll:function(){var t=this.$el.getBoundingClientRect().width;this.width=t||"auto",this.$el.getBoundingClientRect().top<this.stickyTop?this.sticky():this.handleReset()},handleReize:function(){this.isSticky&&(this.width=this.$el.getBoundingClientRect().width+"px")}}}),a=o("KHd+"),r=Object(a.a)(n,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{style:{height:t.height+"px",zIndex:t.zIndex}},[o("div",{class:t.className,style:{top:t.stickyTop+"px",zIndex:t.zIndex,position:t.position,width:t.width,height:t.height+"px"}},[t._t("default",[o("div",[t._v("sticky")])])],2)])},[],!1,null,null,null).exports,l=o("twU4"),c=o("qpgI"),p=o("JNL0"),d=o("Yfch"),u=function(t,e,o){e?Object(d.a)(e)?o():o(new Error("不能输入中文")):o(new Error("请输入项目英文名称"))},f={components:{codemirror:i.codemirror,Sticky:r},data:function(){return{is_Readonly:!0,cmOptions:{tabSize:4,styleActiveLine:!0,lineNumbers:!0,line:!0,mode:"text/x-sh",lineWrapping:!0,theme:"monokai",readOnly:!0},transfer_name:["可选服务器","目标服务器"],transfer_data:[],loading:!1,button:"edit",form:{name:"",environment:"",excludes:"",is_include:"false",is_link:"true",target_root:"",target_releases:"",task_envs:"",prev_deploy:"",post_deploy:"",prev_release:"",post_release:"",server_ids:"",version_num:10,repo_url:"",repo_mode:""},serverIds:[],env_types:[],repo_modes:[],rules:{name:[{required:!0,message:"请输入项目名称",trigger:"blur"}],alias:[{required:!0,trigger:"blur",validator:u}],environment:[{required:!0,message:"请选择环境",trigger:"blur"}],repo_mode:[{required:!0,message:"请选择模式",trigger:"blur"}],repo_url:[{required:!0,message:"请输入repo url",trigger:"blur"}]}}},created:function(){var t=this;Object(l.e)("ENVIRONMENT_TYPE","REPO_TYPE").then(function(e){t.env_types=e[0].ENVIRONMENT_TYPE.filter(function(t){return"all"!==t.key}),t.repo_modes=e[1].REPO_TYPE}),this.getHost(),"/deploy/projects/detail"===this.$route.path?this.$nextTick(function(){t.init()}):(this.button="save",this.is_Readonly=!1,this.cmOptions.readOnly=!1)},methods:{checkPermission:s.a,init:function(){var t=this;Object(p.f)(this.$route.query.id).then(function(e){e.is_include=e.is_include.toString(),e.is_link=e.is_link.toString(),t.form=e,t.serverIds=t.form.server_ids.split(",")})},filterMethod:function(t,e){return e.label.indexOf(t)>-1},closeTag:function(){this.$store.dispatch("delView",this.$store.state.tagsView.visitedViews.slice(-1)[0]),this.$router.go(-1)},cancel:function(){this.button="edit",this.is_Readonly=!0,this.cmOptions.readOnly=!0},edit:function(){this.button="save",this.is_Readonly=!1,this.cmOptions.readOnly=!1},doSubmit:function(){var t=this;this.$refs.form.validate(function(e){e&&(t.loading=!0,t.form.server_ids=t.serverIds.filter(function(t){return t}).toString(),"/deploy/projects/detail"===t.$route.path?Object(p.d)(t.form.id,t.form).then(function(e){t.resetForm(),t.$message({showClose:!0,type:"success",message:"修改成功!",duration:2500}),t.loading=!1,t.cmOptions.readOnly=!0,t.button="edit",t.init()}).catch(function(e){t.loading=!1,console.log(e.response.data.detail)}):Object(p.a)(t.form).then(function(e){t.resetForm(),t.$message({showClose:!0,type:"success",message:"添加成功!",duration:2500}),t.loading=!1,t.closeTag()}).catch(function(e){t.loading=!1,console.log(e.response.data.detail)}))})},resetForm:function(){this.$refs.form.resetFields(),this.form={name:"",environment:"",excludes:"",is_include:"false",is_link:"true",target_root:"",target_releases:"",task_envs:"",prev_deploy:"",post_deploy:"",prev_release:"",post_release:"",server_ids:"",version_num:10,repo_url:"",repo_mode:""}},getHost:function(){var t=this;Object(c.c)("Linux").then(function(e){var o=t;e.forEach(function(t,e){t.id=t.id.toString();var s={key:t.id,label:t.ip};o.transfer_data.push(s)})})}}},m=(o("eZ7y"),Object(a.a)(f,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"formpage"},[o("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-position":"top",size:"small"}},[o("sticky",[o("el-form-item",[o("div",{staticStyle:{display:"inline-block",margin:"0px 0px",float:"right"}},[t.checkPermission(["admin","project_all","project_edit"])&&"edit"==t.button&&"/deploy/projects/detail"===t.$route.path?o("el-button",{attrs:{type:"primary"},on:{click:t.edit}},[t._v("编辑")]):t._e(),t._v(" "),t.checkPermission(["admin","project_all","project_edit"])&&"save"==t.button&&"/deploy/projects/detail"===t.$route.path?o("el-button",{attrs:{type:"success"},on:{click:t.doSubmit}},[t._v("保存")]):t._e(),t._v(" "),t.checkPermission(["admin","project_all","project_edit"])&&"save"==t.button&&"/deploy/projects/detail"===t.$route.path?o("el-button",{attrs:{type:"warning"},on:{click:t.cancel}},[t._v("取消")]):t._e(),t._v(" "),t.checkPermission(["admin","project_all","project_edit"])&&"edit"==t.button&&"/deploy/projects/detail"===t.$route.path?o("el-button",{on:{click:t.closeTag}},[t._v("返回")]):t._e(),t._v(" "),t.checkPermission(["admin","project_all","project_create"])&&"save"==t.button&&"/deploy/projects/create"===t.$route.path?o("el-button",{attrs:{type:"success"},on:{click:t.doSubmit}},[t._v("保存")]):t._e(),t._v(" "),t.checkPermission(["admin","project_all","project_create"])&&"save"==t.button&&"/deploy/projects/create"===t.$route.path?o("el-button",{on:{click:t.closeTag}},[t._v("返回")]):t._e()],1)])],1),t._v(" "),o("p",{staticClass:"warn-content"},[t._v("基础配置")]),t._v(" "),o("el-card",{staticClass:"box-card"},[o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"项目名称",prop:"name"}},[o("el-input",{staticStyle:{width:"300px"},attrs:{readonly:t.is_Readonly},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"项目别名",prop:"alias"}},[o("el-input",{staticStyle:{width:"300px"},attrs:{readonly:t.is_Readonly},model:{value:t.form.alias,callback:function(e){t.$set(t.form,"alias",e)},expression:"form.alias"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"环境",prop:"environment"}},[o("el-select",{staticStyle:{width:"300px"},attrs:{disabled:t.is_Readonly,placeholder:"请选择认证类型"},model:{value:t.form.environment,callback:function(e){t.$set(t.form,"environment",e)},expression:"form.environment"}},t._l(t.env_types,function(t){return o("el-option",{key:t.key,attrs:{label:t.value,value:t.key}})}),1)],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"Git Repo",prop:"repo_url"}},[o("el-input",{staticStyle:{width:"300px"},attrs:{readonly:t.is_Readonly},model:{value:t.form.repo_url,callback:function(e){t.$set(t.form,"repo_url",e)},expression:"form.repo_url"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"分支/tag",prop:"repo_mode"}},[o("el-select",{staticStyle:{width:"300px"},attrs:{disabled:t.is_Readonly,placeholder:"请选择认证类型"},model:{value:t.form.repo_mode,callback:function(e){t.$set(t.form,"repo_mode",e)},expression:"form.repo_mode"}},t._l(t.repo_modes,function(t){return o("el-option",{key:t.key,attrs:{label:t.value,value:t.key}})}),1)],1)],1)],1)],1),t._v(" "),o("p",{staticClass:"warn-content"},[t._v("服务器配置")]),t._v(" "),o("el-card",{staticClass:"box-card"},[o("el-form-item",[o("el-transfer",{attrs:{"filter-method":t.filterMethod,data:t.transfer_data,titles:t.transfer_name,filterable:"","filter-placeholder":"请输入IP地址"},model:{value:t.serverIds,callback:function(e){t.serverIds=e},expression:"serverIds"}})],1),t._v(" "),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[o("span",[t._v("目标服务器的webroot路径"),o("br"),t._v("例：tomcat webapps")])]),t._v(" "),o("span",{staticClass:"x-info"},[t._v("WEBROOT路径"),o("i",{staticClass:"el-icon-info"})])]),t._v(" "),o("el-input",{staticStyle:{width:"300px"},attrs:{readonly:t.is_Readonly},model:{value:t.form.target_root,callback:function(e){t.$set(t.form,"target_root",e)},expression:"form.target_root"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[o("span",[t._v("目标服务器存放应用版本的路径（版本仓库）")])]),t._v(" "),o("span",{staticClass:"x-info"},[t._v("RELEASE路径"),o("i",{staticClass:"el-icon-info"})])]),t._v(" "),o("el-input",{staticStyle:{width:"300px"},attrs:{readonly:t.is_Readonly},model:{value:t.form.target_releases,callback:function(e){t.$set(t.form,"target_releases",e)},expression:"form.target_releases"}})],1)],1)],1),t._v(" "),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[o("span",[t._v("需要保存的版本数量")])]),t._v(" "),o("span",{staticClass:"x-info"},[t._v("仓库版本保留数"),o("i",{staticClass:"el-icon-info"})])]),t._v(" "),o("el-input",{staticStyle:{width:"200px"},attrs:{readonly:t.is_Readonly},model:{value:t.form.version_num,callback:function(e){t.$set(t.form,"version_num",e)},expression:"form.version_num"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[o("span",[t._v("是否采用软连接方式发布"),o("br"),t._v("注:软链接方式发布更快,但不支持某些场景的中间件")])]),t._v(" "),o("span",{staticClass:"x-info"},[t._v("是否软链接"),o("i",{staticClass:"el-icon-info"})])]),t._v(" "),o("el-radio",{attrs:{label:"false"},model:{value:t.form.is_link,callback:function(e){t.$set(t.form,"is_link",e)},expression:"form.is_link"}},[t._v("否")]),t._v(" "),o("el-radio",{attrs:{label:"true"},model:{value:t.form.is_link,callback:function(e){t.$set(t.form,"is_link",e)},expression:"form.is_link"}},[t._v("是")])],1)],1)],1)],1),t._v(" "),o("p",{staticClass:"warn-content"},[t._v("任务配置")]),t._v(" "),o("el-card",{staticClass:"box-card"},[o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[o("span",[t._v("自动打包并传输到目标服务器"),o("br"),t._v("例：编译后的需要发布的文件")])]),t._v(" "),o("span",{staticClass:"x-info"},[t._v("排除的文件"),o("i",{staticClass:"el-icon-info"})])]),t._v(" "),o("el-radio",{attrs:{label:"false"},model:{value:t.form.is_include,callback:function(e){t.$set(t.form,"is_include",e)},expression:"form.is_include"}},[t._v("排除")]),t._v(" "),o("el-radio",{attrs:{label:"true"},model:{value:t.form.is_include,callback:function(e){t.$set(t.form,"is_include",e)},expression:"form.is_include"}},[t._v("包含")]),t._v(" "),o("codemirror",{staticClass:"x-code",attrs:{options:t.cmOptions},model:{value:t.form.excludes,callback:function(e){t.$set(t.form,"excludes",e)},expression:"form.excludes"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[t._v("目标路径：$WEB_ROOT"),o("br"),t._v("代码路径：$CODE_ROOT"),o("br"),t._v("项目别名：$ALIAS"),o("br"),t._v("执行时间：$START_TIME"),o("br"),o("span",{staticStyle:{color:"#ff9955"}},[t._v("其他变量可自定义")])]),t._v(" "),o("span",{staticClass:"x-info"},[t._v("全局变量"),o("i",{staticClass:"el-icon-info"})])]),t._v(" "),o("codemirror",{staticClass:"x-code",attrs:{options:t.cmOptions},model:{value:t.form.task_envs,callback:function(e){t.$set(t.form,"task_envs",e)},expression:"form.task_envs"}})],1)],1)],1),t._v(" "),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[o("span",[t._v("checkout前执行的任务"),o("br"),t._v("例：删除上次编译版本残留文件")])]),t._v(" "),o("span",{staticClass:"x-info"},[t._v("Checkout前置任务"),o("i",{staticClass:"el-icon-info"})])]),t._v(" "),o("codemirror",{staticClass:"x-code",attrs:{options:t.cmOptions},model:{value:t.form.prev_deploy,callback:function(e){t.$set(t.form,"prev_deploy",e)},expression:"form.prev_deploy"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[o("span",[t._v("checkout后执行的任务"),o("br"),t._v("例如：版本编译")])]),t._v(" "),o("span",{staticClass:"x-info"},[t._v("Checkout后置任务"),o("i",{staticClass:"el-icon-info"})])]),t._v(" "),o("codemirror",{staticClass:"x-code",attrs:{options:t.cmOptions},model:{value:t.form.post_deploy,callback:function(e){t.$set(t.form,"post_deploy",e)},expression:"form.post_deploy"}})],1)],1)],1),t._v(" "),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[o("span",[t._v("部署前执行的任务"),o("br"),t._v("例：停止应用")])]),t._v(" "),o("span",{staticClass:"x-info"},[t._v("Deploy前置任务"),o("i",{staticClass:"el-icon-info"})])]),t._v(" "),o("codemirror",{staticClass:"x-code",attrs:{options:t.cmOptions},model:{value:t.form.prev_release,callback:function(e){t.$set(t.form,"prev_release",e)},expression:"form.prev_release"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[o("span",[t._v("部署后执行的任务"),o("br"),t._v("例：启动应用")])]),t._v(" "),o("span",{staticClass:"x-info"},[t._v("Deploy后置任务"),o("i",{staticClass:"el-icon-info"})])]),t._v(" "),o("codemirror",{staticClass:"x-code",attrs:{options:t.cmOptions},model:{value:t.form.post_release,callback:function(e){t.$set(t.form,"post_release",e)},expression:"form.post_release"}})],1)],1)],1)],1),t._v(" "),o("p",{staticClass:"warn-content"},[t._v("工具配置")]),t._v(" "),o("el-card",{staticClass:"box-card"},[o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[o("span",[t._v("应用启动的脚本路径"),o("br"),t._v("例：tomcat启动脚本")])]),t._v(" "),o("span",{staticClass:"x-info"},[t._v("启动脚本路径"),o("i",{staticClass:"el-icon-info"})])]),t._v(" "),o("el-input",{staticStyle:{width:"300px"},attrs:{readonly:t.is_Readonly},model:{value:t.form.app_start,callback:function(e){t.$set(t.form,"app_start",e)},expression:"form.app_start"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[o("span",[t._v("应用停止的脚本路径"),o("br"),t._v("例：tomcat停止脚本")])]),t._v(" "),o("span",{staticClass:"x-info"},[t._v("停止脚本路径"),o("i",{staticClass:"el-icon-info"})])]),t._v(" "),o("el-input",{staticStyle:{width:"300px"},attrs:{readonly:t.is_Readonly},model:{value:t.form.app_stop,callback:function(e){t.$set(t.form,"app_stop",e)},expression:"form.app_stop"}})],1)],1)],1),t._v(" "),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[o("span",[t._v("应用日志存放的目录")])]),t._v(" "),o("span",{staticClass:"x-info"},[t._v("日志存放目录"),o("i",{staticClass:"el-icon-info"})])]),t._v(" "),o("el-input",{staticStyle:{width:"300px"},attrs:{readonly:t.is_Readonly},model:{value:t.form.app_log_path,callback:function(e){t.$set(t.form,"app_log_path",e)},expression:"form.app_log_path"}})],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[o("span",[t._v("需要实时查看的日志路径")])]),t._v(" "),o("span",{staticClass:"x-info"},[t._v("实时日志路径"),o("i",{staticClass:"el-icon-info"})])]),t._v(" "),o("el-input",{staticStyle:{width:"300px"},attrs:{readonly:t.is_Readonly},model:{value:t.form.app_log_file,callback:function(e){t.$set(t.form,"app_log_file",e)},expression:"form.app_log_file"}})],1)],1)],1)],1)],1)],1)},[],!1,null,"38ef3b05",null));e.default=m.exports}}]);
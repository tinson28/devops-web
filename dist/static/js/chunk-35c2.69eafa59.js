(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-35c2","chunk-75d7","chunk-7a34","chunk-6d4d"],{"3ADX":function(t,e,n){"use strict";var r=n("o0o1"),i=n.n(r),o=n("yXPU"),a=n.n(o),s=n("t3Un");function c(t,e){return Object(s.a)({url:t,method:"get",params:e})}e.a={data:function(){return{loading:!0,data:[],page:1,size:10,total:0,url:"",params:{},query:{},time:170}},methods:{init:function(){var t=a()(i.a.mark(function t(){var e=this;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.beforeInit();case 2:if(t.sent){t.next=4;break}return t.abrupt("return");case 4:return t.abrupt("return",new Promise(function(t,n){e.loading=!0,c(e.url,e.params).then(function(n){e.total=n.count,e.data=n.results,setTimeout(function(){e.loading=!1},e.time),t(n)}).catch(function(t){e.loading=!1,n(t)})}));case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),beforeInit:function(){return!0},pageChange:function(t){var e=this;console.log(t),e.page=t,e.$refs.transfer?(console.log("1"),e.cancel(),e.init()):e.$refs.r_table?(console.log("2"),e.init().then(function(){e.initSelection()})):(console.log("3"),console.log(e.page),e.init())},sizeChange:function(t){var e=this;e.page=1,e.size=t,e.$refs.transfer?(console.log("1"),e.cancel(),e.init()):e.$refs.r_table?(console.log("2"),e.init().then(function(){e.initSelection()})):(console.log("3"),e.init())}}}},"41Be":function(t,e,n){"use strict";n.d(e,"a",function(){return i});var r=n("Q2AE");function i(t){if(t&&t instanceof Array&&t.length>0){var e=t;return!!(r.a.getters&&r.a.getters.roles).some(function(t){return e.includes(t)})}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1}},Btdx:function(t,e,n){"use strict";var r=n("YNmh");n.n(r).a},"D+s9":function(t,e,n){"use strict";n.d(e,"d",function(){return i}),n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a}),n.d(e,"c",function(){return s});var r=n("t3Un");function i(){return Object(r.a)({url:"api/permission/tree/",method:"get"})}function o(t){return Object(r.a)({url:"api/permissions/",method:"post",data:t})}function a(t){return Object(r.a)({url:"api/permissions/"+t+"/",method:"delete"})}function s(t,e){return Object(r.a)({url:"api/permissions/"+t+"/",method:"put",data:e})}},Hycs:function(t,e,n){"use strict";n.d(e,"d",function(){return i}),n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a}),n.d(e,"c",function(){return s});var r=n("t3Un");function i(){return Object(r.a)({url:"api/menu/tree/",method:"get"})}function o(t){return Object(r.a)({url:"api/menus/",method:"post",data:t})}function a(t){return Object(r.a)({url:"api/menus/"+t+"/",method:"delete"})}function s(t,e){return Object(r.a)({url:"api/menus/"+t+"/",method:"put",data:e})}},YNmh:function(t,e,n){},ZYv3:function(t,e,n){"use strict";var r=n("rwy4");n.n(r).a},cOtO:function(t,e,n){"use strict";n.r(e);var r=n("41Be"),i=n("zF5t"),o=n("Hycs"),a=n("D+s9"),s=n("3ADX"),c=n("7Qib"),u=n("jBcd"),l=n("q9oO"),d={components:{eHeader:u.default,edit:l.default},mixins:[s.a],data:function(){return{row_data:null,span:24,show:!1,is_permissions:!1,table_show:!0,Loading:!1,sup_this:this,permission_list:[],menu_list:[],permissionIds:[],menuIds:[],defaultProps:{children:"children",label:"label"}}},created:function(){var t=this;this.$nextTick(function(){t.init(),t.getPermissions(),t.getMenus()})},methods:{parseTime:c.b,checkPermission:r.a,beforeInit:function(){this.url="api/roles/";var t=this.query.value;return this.params={page:this.page,size:this.size,ordering:"id"},t&&(this.params.search=t),!0},handleCurrentChange:function(t){1!==t.id?(this.show&&(this.$refs.permission.setCheckedKeys([]),this.$refs.menu.setCheckedKeys([])),this.span=8,this.table_show=!1,this.show=!0,this.row_data=t,this.row_data&&(this.permissionIds=this.row_data.permissions,this.menuIds=this.row_data.menus)):this.$message({showClose:!0,type:"error",message:"默认管理员不可修改!",duration:2500})},subDelete:function(t){var e=this;this.Loading=!0,Object(i.b)(t).then(function(n){e.Loading=!1,e.$refs[t].doClose(),e.init(),e.$message({showClose:!0,type:"success",message:"删除成功!",duration:2500})}).catch(function(n){e.Loading=!1,e.$refs[t].doClose(),console.log(n)})},toSave:function(t){var e=this;this.Loading=!0;var n={menus:this.$refs.menu.getCheckedKeys()};this.is_permissions&&(n={permissions:this.$refs.permission.getCheckedKeys()}),Object(i.f)(this.row_data.id,n).then(function(t){e.$message({showClose:!0,type:"success",message:"保存成功!",duration:2500}),e.Loading=!1,e.update(e.row_data.id)}).catch(function(t){e.Loading=!1,console.log(t)})},update:function(t){var e=this;Object(i.e)(t).then(function(t){for(var n=0;n<e.data.length;n++)if(t.id===e.data[n].id){e.data[n]=t;break}})},getMenus:function(){var t=this;Array.isArray(this.menu_list)&&0===this.menu_list.length&&Object(o.d)().then(function(e){t.menu_list=e.detail})},getPermissions:function(){var t=this;Array.isArray(this.permission_list)&&0===this.permission_list.length&&Object(a.d)().then(function(e){t.permission_list=e.detail})}}},h=(n("ZYv3"),n("KHd+")),f=Object(h.a)(d,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("eHeader",{attrs:{query:t.query}}),t._v(" "),n("el-row",{attrs:{gutter:28}},[n("el-col",{attrs:{span:t.span}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.data,size:"small",border:""},on:{"current-change":t.handleCurrentChange}},[n("el-table-column",{attrs:{label:"序号",width:"60",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"name",label:"名称"}}),t._v(" "),t.table_show?n("el-table-column",{attrs:{prop:"desc",label:"描述"}}):t._e(),t._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.checkPermission(["admin","role_all","role_edit"])?n("edit",{attrs:{data:e.row,sup_this:t.sup_this}}):t._e(),t._v(" "),t.checkPermission(["admin","role_all","role_delete"])?n("el-popover",{ref:e.row.id,attrs:{placement:"top",width:"180"}},[n("p",[t._v("确定删除本条数据吗？")]),t._v(" "),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(n){t.$refs[e.row.id].doClose()}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{loading:t.Loading,type:"primary",size:"mini"},on:{click:function(n){return t.subDelete(e.row.id)}}},[t._v("确定")])],1),t._v(" "),n("el-button",{attrs:{slot:"reference",disabled:1===e.row.id,type:"danger",size:"mini"},slot:"reference"},[t._v("删除")])],1):t._e()]}}])})],1),t._v(" "),n("el-pagination",{staticStyle:{"margin-top":"8px"},attrs:{total:t.total,layout:"total, prev, pager, next, sizes"},on:{"size-change":t.sizeChange,"current-change":t.pageChange}})],1),t._v(" "),n("el-col",{attrs:{span:8}},[t.show&&t.checkPermission(["admin","role_all","role_edit"])?n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[t._v("菜单分配-"+t._s(t.row_data.name))]),t._v(" "),n("el-button",{staticStyle:{float:"right",padding:"4px 8px"},attrs:{loading:t.Loading,icon:"el-icon-check",size:"mini",type:"success"},on:{click:t.toSave}},[t._v("保存")])],1),t._v(" "),n("el-tree",{ref:"menu",attrs:{data:t.menu_list,"default-checked-keys":t.menuIds,"show-checkbox":"",accordion:"","node-key":"id","highlight-current":""}})],1):t._e()],1),t._v(" "),n("el-col",{attrs:{span:8}},[t.show&&t.checkPermission(["admin","role_all","role_edit"])?n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[t._v("权限分配-"+t._s(t.row_data.name))]),t._v(" "),n("el-button",{staticStyle:{float:"right",padding:"4px 8px"},attrs:{loading:t.Loading,icon:"el-icon-check",size:"mini",type:"success"},on:{click:function(e){t.is_permissions=!0,t.toSave()}}},[t._v("保存")])],1),t._v(" "),n("el-tree",{ref:"permission",attrs:{data:t.permission_list,"default-checked-keys":t.permissionIds,"show-checkbox":"",accordion:"","node-key":"id","highlight-current":""}})],1):t._e()],1)],1)],1)},[],!1,null,null,null);e.default=f.exports},dS7j:function(t,e,n){"use strict";n.r(e);var r=n("zF5t"),i={props:{isAdd:{type:Boolean,required:!0},sup_this:{type:Object,default:null}},data:function(){return{loading:!1,dialog:!1,form:{name:"",desc:""},rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]}}},methods:{cancel:function(){this.resetForm()},doSubmit:function(){var t=this;this.$refs.form.validate(function(e){if(!e)return!1;t.loading=!0,t.isAdd?t.doAdd():t.doEdit()})},doAdd:function(){var t=this;Object(r.a)(this.form).then(function(e){t.resetForm(),t.$message({showClose:!0,type:"success",message:"添加成功!",duration:2500}),t.loading=!1,t.$parent.$parent.init()}).catch(function(e){t.loading=!1,console.log(e)})},doEdit:function(){var t=this;Object(r.c)(this.form.id,this.form).then(function(e){t.resetForm(),t.$message({showClose:!0,type:"success",message:"修改成功!",duration:2500}),t.loading=!1,t.sup_this.init()}).catch(function(e){t.loading=!1,console.log(e)})},resetForm:function(){this.dialog=!1,this.$refs.form.resetFields(),this.form={name:"",desc:""}}}},o=n("KHd+"),a=Object(o.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{"append-to-body":!0,visible:t.dialog,title:t.isAdd?"新增角色":"编辑角色",width:"500px"},on:{"update:visible":function(e){t.dialog=e}}},[n("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,size:"small","label-width":"66px"}},[n("el-form-item",{attrs:{label:"名称",prop:"name"}},[n("el-input",{staticStyle:{width:"370px"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"描述"}},[n("el-input",{staticStyle:{width:"370px"},attrs:{rows:"5",type:"textarea"},model:{value:t.form.desc,callback:function(e){t.$set(t.form,"desc",e)},expression:"form.desc"}})],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"text"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{loading:t.loading,type:"primary"},on:{click:t.doSubmit}},[t._v("确认")])],1)],1)},[],!1,null,"06acbdd0",null);e.default=a.exports},jBcd:function(t,e,n){"use strict";n.r(e);var r=n("41Be"),i=n("7Qib"),o={components:{eForm:n("dS7j").default},props:{query:{type:Object,required:!0}},data:function(){return{downloadLoading:!1}},methods:{checkPermission:r.a,toQuery:function(){this.$parent.page=1,this.$parent.init()},download:function(){var t=this;this.downloadLoading=!0,Promise.all([n.e("chunk-7d1e"),n.e("chunk-5afe")]).then(n.bind(null,"S/jZ")).then(function(e){var n=t.formatJson(["id","name","desc"],t.$parent.data);e.export_json_to_excel({header:["ID","名称","描述"],data:n,filename:"table-list"}),t.downloadLoading=!1})},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return"createTime"===t?Object(i.b)(e[t]):e[t]})})}}},a=n("KHd+"),s=Object(a.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"head-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"输入名称搜索"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.toQuery(e)}},model:{value:t.query.value,callback:function(e){t.$set(t.query,"value",e)},expression:"query.value"}}),t._v(" "),n("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-search"},on:{click:t.toQuery}},[t._v("搜索")]),t._v(" "),n("div",{staticStyle:{display:"inline-block",margin:"0px 2px"}},[t.checkPermission(["admin","role_all","role_create"])?n("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:function(e){t.$refs.form.dialog=!0}}},[t._v("新增")]):t._e(),t._v(" "),n("eForm",{ref:"form",attrs:{"is-add":!0}})],1),t._v(" "),t.checkPermission(["admin"])?n("el-button",{staticClass:"filter-item",attrs:{loading:t.downloadLoading,size:"mini",type:"primary",icon:"el-icon-download"},on:{click:t.download}},[t._v("导出")]):t._e()],1)},[],!1,null,null,null);e.default=s.exports},ls82:function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,n,r){var i=e&&e.prototype instanceof m?e:m,o=Object.create(i.prototype),a=new $(r||[]);return o._invoke=function(t,e,n){var r=l;return function(i,o){if(r===h)throw new Error("Generator is already running");if(r===f){if("throw"===i)throw o;return E()}for(n.method=i,n.arg=o;;){var a=n.delegate;if(a){var s=O(a,n);if(s){if(s===p)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=f,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=h;var c=u(t,e,n);if("normal"===c.type){if(r=n.done?f:d,c.arg===p)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=f,n.method="throw",n.arg=c.arg)}}}(t,n,a),o}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var l="suspendedStart",d="suspendedYield",h="executing",f="completed",p={};function m(){}function g(){}function v(){}var y={};y[o]=function(){return this};var b=Object.getPrototypeOf,_=b&&b(b(C([])));_&&_!==n&&r.call(_,o)&&(y=_);var w=v.prototype=m.prototype=Object.create(y);function x(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function k(t){var e;this._invoke=function(n,i){function o(){return new Promise(function(e,o){!function e(n,i,o,a){var s=u(t[n],t,i);if("throw"!==s.type){var c=s.arg,l=c.value;return l&&"object"==typeof l&&r.call(l,"__await")?Promise.resolve(l.__await).then(function(t){e("next",t,o,a)},function(t){e("throw",t,o,a)}):Promise.resolve(l).then(function(t){c.value=t,o(c)},function(t){return e("throw",t,o,a)})}a(s.arg)}(n,i,e,o)})}return e=e?e.then(o,o):o()}}function O(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,O(t,n),"throw"===n.method))return p;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var i=u(r,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,p;var o=i.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,p):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,p)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function $(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function C(t){if(t){var n=t[o];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var i=-1,a=function n(){for(;++i<t.length;)if(r.call(t,i))return n.value=t[i],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}return{next:E}}function E(){return{value:e,done:!0}}return g.prototype=w.constructor=v,v.constructor=g,v[s]=g.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(k.prototype),k.prototype[a]=function(){return this},t.AsyncIterator=k,t.async=function(e,n,r,i){var o=new k(c(e,n,r,i));return t.isGeneratorFunction(n)?o:o.next().then(function(t){return t.done?t.value:o.next()})},x(w),w[s]="Generator",w[o]=function(){return this},w.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=C,$.prototype={constructor:$,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(L),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function i(r,i){return s.type="throw",s.arg=t,n.next=r,i&&(n.method="next",n.arg=e),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,p):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),L(n),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;L(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:C(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),p}},t}(t.exports);try{regeneratorRuntime=r}catch(t){Function("r","regeneratorRuntime = r")(r)}},o0o1:function(t,e,n){t.exports=n("ls82")},q9oO:function(t,e,n){"use strict";n.r(e);var r=n("dS7j"),i=n("Hycs"),o=n("D+s9"),a={components:{eForm:r.default},props:{data:{type:Object,required:!0},sup_this:{type:Object,required:!0}},data:function(){return{permissions:[],menus:[]}},methods:{to:function(){var t=this;Object(i.d)().then(function(e){t.menus=e.detail}),Object(o.d)().then(function(e){t.permissions=e.detail});var e=this.$refs.form;e.permissionIds=[],e.menuIds=[],e.form={id:this.data.id,name:this.data.name,desc:this.data.desc,permissions:[],menus:[]},this.data.permissions.forEach(function(t,n){e.permissionIds.push(t.id)}),this.data.menus.forEach(function(t,n){e.menuIds.push(t.id)}),e.dialog=!0}}},s=(n("Btdx"),n("KHd+")),c=Object(s.a)(a,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("el-button",{attrs:{disabled:1===this.data.id,size:"mini",type:"success"},on:{click:this.to}},[this._v("编辑")]),this._v(" "),e("eForm",{ref:"form",attrs:{permissions:this.permissions,menus:this.menus,sup_this:this.sup_this,"is-add":!1}})],1)},[],!1,null,"3ebe883c",null);e.default=c.exports},rwy4:function(t,e,n){},yXPU:function(t,e){function n(t,e,n,r,i,o,a){try{var s=t[o](a),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,i)}t.exports=function(t){return function(){var e=this,r=arguments;return new Promise(function(i,o){var a=t.apply(e,r);function s(t){n(a,i,o,s,c,"next",t)}function c(t){n(a,i,o,s,c,"throw",t)}s(void 0)})}}},zF5t:function(t,e,n){"use strict";n.d(e,"d",function(){return i}),n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a}),n.d(e,"c",function(){return s}),n.d(e,"e",function(){return c}),n.d(e,"f",function(){return u}),n.d(e,"g",function(){return l});var r=n("t3Un");function i(){return Object(r.a)({url:"api/roles/",method:"get"})}function o(t){return Object(r.a)({url:"api/roles/",method:"post",data:t})}function a(t){return Object(r.a)({url:"api/roles/"+t+"/",method:"delete"})}function s(t,e){return Object(r.a)({url:"api/roles/"+t+"/",method:"put",data:e})}function c(t){return Object(r.a)({url:"api/roles/"+t+"/",method:"get"})}function u(t,e){return Object(r.a)({url:"api/roles/"+t+"/",method:"patch",data:e})}function l(t){return Object(r.a)({url:"api/ansiblerole/upload/",method:"POST",data:t})}}}]);
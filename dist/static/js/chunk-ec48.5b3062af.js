(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-ec48","chunk-1709"],{"41Be":function(e,t,i){"use strict";i.d(t,"a",function(){return r});var o=i("Q2AE");function r(e){if(e&&e instanceof Array&&e.length>0){var t=e;return!!(o.a.getters&&o.a.getters.roles).some(function(e){return t.includes(e)})}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1}},"5ZET":function(e,t,i){"use strict";i.r(t);var o=i("41Be"),r={components:{eForm:i("gAlZ").default},props:{query:{type:Object,required:!0},menus:{type:Array,required:!0}},data:function(){return{downloadLoading:!1}},methods:{checkPermission:o.a,toQuery:function(){console.log(this.query),this.$parent.page=1,this.$parent.init()}}},n=i("KHd+"),s=Object(n.a)(r,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"head-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"输入名称搜索"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.toQuery(t)}},model:{value:e.query.value,callback:function(t){e.$set(e.query,"value",t)},expression:"query.value"}}),e._v(" "),i("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-search"},on:{click:e.toQuery}},[e._v("搜索")]),e._v(" "),i("div",{staticStyle:{display:"inline-block",margin:"0px 2px"}},[e.checkPermission(["admin","menu_all","menu_create"])?i("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:function(t){e.$refs.form.dialog=!0}}},[e._v("新增")]):e._e(),e._v(" "),i("eForm",{ref:"form",attrs:{menus:e.menus,"is-add":!0}})],1)],1)},[],!1,null,null,null);t.default=s.exports},"6Nwi":function(e,t,i){},HufR:function(e,t,i){"use strict";var o=i("6Nwi");i.n(o).a},Hycs:function(e,t,i){"use strict";i.d(t,"d",function(){return r}),i.d(t,"a",function(){return n}),i.d(t,"b",function(){return s}),i.d(t,"c",function(){return a});var o=i("t3Un");function r(){return Object(o.a)({url:"api/menu/tree/",method:"get"})}function n(e){return Object(o.a)({url:"api/menus/",method:"post",data:e})}function s(e){return Object(o.a)({url:"api/menus/"+e+"/",method:"delete"})}function a(e,t){return Object(o.a)({url:"api/menus/"+e+"/",method:"put",data:t})}},gAlZ:function(e,t,i){"use strict";i.r(t);var o=i("Hycs"),r=i("cCY5"),n=i.n(r),s=/\.\/(.*)\.svg/,a=function(e){return e.keys()}(i("Uf/o")).map(function(e){return e.match(s)[1]}),l={name:"IconSelect",data:function(){return{name:"",iconList:a}},methods:{filterIcons:function(){var e=this;this.name?this.iconList=this.iconList.filter(function(t){return t.includes(e.name)}):this.iconList=a},selectedIcon:function(e){this.$emit("selected",e),document.body.click()},reset:function(){this.name="",this.iconList=a}}},c=(i("HufR"),i("KHd+")),u=Object(c.a)(l,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"icon-body"},[i("el-input",{staticStyle:{position:"relative"},attrs:{clearable:"",placeholder:"请输入图标名称"},on:{clear:e.filterIcons},nativeOn:{input:function(t){return e.filterIcons(t)}},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}},[i("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})]),e._v(" "),i("div",{staticClass:"icon-list"},e._l(e.iconList,function(t,o){return i("div",{key:o,on:{click:function(i){return e.selectedIcon(t)}}},[i("svg-icon",{staticStyle:{height:"30px",width:"16px"},attrs:{"icon-class":t}}),e._v(" "),i("span",[e._v(e._s(t))])],1)}),0)],1)},[],!1,null,"1628183e",null).exports,f=(i("VCwm"),{components:{Treeselect:n.a,IconSelect:u},props:{menus:{type:Array,required:!0},isAdd:{type:Boolean,required:!0},sup_this:{type:Object,default:null}},data:function(){return{loading:!1,dialog:!1,form:{name:"",sort:999,path:"",component:"",is_show:"true",is_frame:"false",pid:null,icon:""},rules:{is_show:[{required:!0,message:"是否在导航栏显示",trigger:"blur"}],name:[{required:!0,message:"请输入名称",trigger:"blur"}],sort:[{required:!0,message:"请输入序号",trigger:"blur",type:"number"}],is_frame:[{required:!0,message:"请选择菜单类型",trigger:"blur"}]}}},methods:{cancel:function(){this.resetForm()},doSubmit:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return!1;e.loading=!0,e.isAdd?e.doAdd():e.doEdit()})},doAdd:function(){var e=this;Object(o.a)(this.form).then(function(t){e.resetForm(),e.$message({showClose:!0,type:"success",message:"添加成功!",duration:2500}),e.loading=!1,e.$parent.$parent.init(),e.$parent.$parent.getMenus()}).catch(function(t){e.loading=!1,console.log(t)})},doEdit:function(){var e=this;Object(o.c)(this.form.id,this.form).then(function(t){e.resetForm(),e.$message({showClose:!0,type:"success",message:"修改成功!",duration:2500}),e.loading=!1,e.sup_this.init(),e.sup_this.getMenus()}).catch(function(t){e.loading=!1,console.log(t)})},resetForm:function(){this.dialog=!1,this.$refs.form.resetFields(),this.form={name:"",sort:999,path:"",component:"",is_show:"true",is_frame:"false",pid:null,icon:""}},selected:function(e){this.form.icon=e}}}),m=Object(c.a)(f,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{attrs:{"append-to-body":!0,visible:e.dialog,title:e.isAdd?"新增菜单":"编辑菜单",width:"600px"},on:{"update:visible":function(t){e.dialog=t}}},[i("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,size:"small","label-width":"80px"}},[i("el-form-item",{attrs:{label:"是否显示",prop:"is_show"}},[i("el-radio",{attrs:{label:"true"},model:{value:e.form.is_show,callback:function(t){e.$set(e.form,"is_show",t)},expression:"form.is_show"}},[e._v("是")]),e._v(" "),i("el-radio",{attrs:{label:"false"},model:{value:e.form.is_show,callback:function(t){e.$set(e.form,"is_show",t)},expression:"form.is_show"}},[e._v("否")])],1),e._v(" "),"true"===e.form.is_show?i("el-form-item",{attrs:{label:"菜单图标",prop:"icon"}},[i("el-popover",{attrs:{placement:"bottom-start",width:"460",trigger:"click"},on:{show:function(t){return e.$refs.iconSelect.reset()}}},[i("IconSelect",{ref:"iconSelect",on:{selected:e.selected}}),e._v(" "),i("el-input",{staticStyle:{width:"460px"},attrs:{slot:"reference",placeholder:"点击选择图标",readonly:""},slot:"reference",model:{value:e.form.icon,callback:function(t){e.$set(e.form,"icon",t)},expression:"form.icon"}},[e.form.icon?i("svg-icon",{staticClass:"el-input__icon",staticStyle:{height:"32px",width:"16px"},attrs:{slot:"prefix","icon-class":e.form.icon},slot:"prefix"}):i("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"prefix"},slot:"prefix"})],1)],1)],1):e._e(),e._v(" "),i("el-form-item",{attrs:{label:"菜单名称",prop:"name"}},[i("el-input",{staticStyle:{width:"460px"},attrs:{placeholder:"名称"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"菜单排序",prop:"sort"}},[i("el-input",{staticStyle:{width:"460px"},attrs:{placeholder:"序号越小越靠前"},model:{value:e.form.sort,callback:function(t){e.$set(e.form,"sort",e._n(t))},expression:"form.sort"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"内部菜单",prop:"is_frame"}},[i("el-radio",{attrs:{label:"false"},model:{value:e.form.is_frame,callback:function(t){e.$set(e.form,"is_frame",t)},expression:"form.is_frame"}},[e._v("是")]),e._v(" "),i("el-radio",{attrs:{label:"true"},model:{value:e.form.is_frame,callback:function(t){e.$set(e.form,"is_frame",t)},expression:"form.is_frame"}},[e._v("否")])],1),e._v(" "),i("el-form-item",{attrs:{label:"链接地址"}},[i("el-input",{staticStyle:{width:"460px"},attrs:{placeholder:"菜单路径"},model:{value:e.form.path,callback:function(t){e.$set(e.form,"path",t)},expression:"form.path"}})],1),e._v(" "),"false"===e.form.is_frame?i("el-form-item",{attrs:{label:"组件路径"}},[i("el-input",{staticStyle:{width:"460px"},attrs:{placeholder:"组件路径"},model:{value:e.form.component,callback:function(t){e.$set(e.form,"component",t)},expression:"form.component"}})],1):e._e(),e._v(" "),i("el-form-item",{attrs:{label:"父级菜单"}},[i("treeselect",{staticStyle:{width:"460px"},attrs:{options:e.menus,placeholder:"请选择父级菜单"},model:{value:e.form.pid,callback:function(t){e.$set(e.form,"pid",t)},expression:"form.pid"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"text"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),i("el-button",{attrs:{loading:e.loading,type:"primary"},on:{click:e.doSubmit}},[e._v("确认")])],1)],1)},[],!1,null,"7239d68b",null);t.default=m.exports}}]);
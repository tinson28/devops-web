(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2e68"],{P4qI:function(e,t,o){"use strict";o.d(t,"e",function(){return n}),o.d(t,"b",function(){return i}),o.d(t,"f",function(){return s}),o.d(t,"c",function(){return a}),o.d(t,"d",function(){return c}),o.d(t,"a",function(){return l});var r=o("t3Un");function n(){return Object(r.a)({url:"api/cloudconfig/",method:"get"})}function i(e){return Object(r.a)({url:"api/cloudconfig/",method:"post",data:e})}function s(e){return Object(r.a)({url:"api/cloudconfig/"+e+"/",method:"get"})}function a(e){return Object(r.a)({url:"api/cloudconfig/"+e+"/",method:"delete"})}function c(e,t){return Object(r.a)({url:"api/cloudconfig/"+e+"/",method:"put",data:t})}function l(e){return Object(r.a)({url:"api/pull/excu/",method:"post",data:e})}},Qvsa:function(e,t,o){"use strict";o.r(t);var r=o("P4qI"),n={props:{isAdd:{type:Boolean,required:!0},sup_this:{type:Object,default:null}},data:function(){return{loading:!1,dialog:!1,form:{name:"",region:"",access_id:"",access_key:"",desc:""},rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]}}},methods:{cancel:function(){this.resetForm()},doSubmit:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return!1;e.loading=!0,e.isAdd?e.doAdd():e.doEdit()})},doAdd:function(){var e=this;Object(r.b)(this.form).then(function(t){e.resetForm(),e.$message({showClose:!0,type:"success",message:"添加成功!",duration:2500}),e.loading=!1,e.$parent.$parent.cancel(),e.$parent.$parent.init()}).catch(function(t){e.loading=!1,console.log(t)})},doEdit:function(){var e=this;Object(r.d)(this.form.id,this.form).then(function(t){e.resetForm(),e.$message({showClose:!0,type:"success",message:"修改成功!",duration:2500}),e.loading=!1,e.$parent.$parent.cancel(),e.sup_this.init()}).catch(function(t){e.loading=!1,console.log(t)})},resetForm:function(){this.dialog=!1,this.$refs.form.resetFields(),this.form={name:"",region:"",access_id:"",access_key:"",desc:""}}}},i=o("KHd+"),s=Object(i.a)(n,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-dialog",{attrs:{"append-to-body":!0,visible:e.dialog,title:e.isAdd?"新增标签":"编辑标签",width:"480px"},on:{"update:visible":function(t){e.dialog=t}}},[o("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,size:"small","label-width":"66px"}},[o("el-form-item",{attrs:{label:"名称",prop:"name"}},[o("el-input",{staticStyle:{width:"330px"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),o("el-select",{staticClass:"filter-item",staticStyle:{width:"192px"},attrs:{clearable:"",placeholder:"云产商"},on:{change:e.toQuery},model:{value:e.form.provider,callback:function(t){e.$set(e.form,"provider",t)},expression:"form.provider"}},e._l(e.group_list,function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1),e._v(" "),"aliyun"===e.form.provider?o("el-form-item",{attrs:{label:"AccessID"}},[o("el-input",{staticStyle:{width:"330px"},model:{value:e.form.access_id,callback:function(t){e.$set(e.form,"access_id",t)},expression:"form.access_id"}})],1):e._e(),e._v(" "),"aliyun"===e.form.provider?o("el-form-item",{attrs:{label:"AccessKey"}},[o("el-input",{staticStyle:{width:"330px"},attrs:{"show-password":""},model:{value:e.form.access_key,callback:function(t){e.$set(e.form,"access_key",t)},expression:"form.access_key"}})],1):e._e(),e._v(" "),o("el-form-item",{attrs:{label:"desc"}},[o("el-input",{staticStyle:{width:"330px"},attrs:{rows:"5",type:"textarea"},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}})],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"text"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),o("el-button",{attrs:{loading:e.loading,type:"primary"},on:{click:e.doSubmit}},[e._v("确认")])],1)],1)},[],!1,null,"4b50c1bb",null);t.default=s.exports}}]);
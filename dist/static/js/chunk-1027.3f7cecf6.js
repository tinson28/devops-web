(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1027"],{c11S:function(e,r,t){"use strict";var o=t("wqO8");t.n(o).a},ntYl:function(e,r,t){"use strict";t.r(r);var o=t("p46w"),n=t.n(o),i={name:"Login",data:function(){return{loginForm:{username:"",password:"",rememberMe:!1},loginRules:{username:[{required:!0,trigger:"blur",message:"用户名不能为空"}],password:[{required:!0,trigger:"blur",message:"密码不能为空"}]},loading:!1,redirect:void 0}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},created:function(){this.getCookie()},methods:{getCookie:function(){var e=n.a.get("username"),r=n.a.get("rememberMe");this.loginForm={username:void 0===e?"":e,rememberMe:void 0!==r&&Boolean(r)}},handleLogin:function(){var e=this;this.$refs.loginForm.validate(function(r){var t={username:e.loginForm.username,password:e.loginForm.password,rememberMe:e.loginForm.rememberMe};if(!r)return console.log("提交错误!"),!1;e.loading=!0,t.rememberMe?(n.a.set("username",t.username,{expires:1}),n.a.set("rememberMe",t.rememberMe,{expires:1})):(n.a.remove("username"),n.a.remove("rememberMe")),e.$store.dispatch("Login",t).then(function(){e.loading=!1,e.$router.push({path:e.redirect||"/"})}).catch(function(){e.loading=!1})})}}},s=(t("c11S"),t("KHd+")),a=Object(s.a)(i,function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"login"},[t("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"label-position":"left","label-width":"0px"},nativeOn:{keyup:function(r){return!r.type.indexOf("key")&&e._k(r.keyCode,"enter",13,r.key,"Enter")?null:e.handleLogin(r)}}},[t("h3",{staticClass:"title"},[e._v("后台管理系统")]),e._v(" "),t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"请输入账号或者邮箱,手机号也可以哦(￣３￣)a"},model:{value:e.loginForm.username,callback:function(r){e.$set(e.loginForm,"username",r)},expression:"loginForm.username"}},[t("svg-icon",{staticClass:"el-input__icon",staticStyle:{height:"39px",width:"13px","margin-left":"2px"},attrs:{slot:"prefix","icon-class":"user"},slot:"prefix"})],1)],1),e._v(" "),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{type:"password","auto-complete":"off",placeholder:"请输入您宝贵的密码"},model:{value:e.loginForm.password,callback:function(r){e.$set(e.loginForm,"password",r)},expression:"loginForm.password"}},[t("svg-icon",{staticClass:"el-input__icon",staticStyle:{height:"39px",width:"13px","margin-left":"2px"},attrs:{slot:"prefix","icon-class":"password"},slot:"prefix"})],1)],1),e._v(" "),t("el-checkbox",{staticStyle:{margin:"0px 0px 25px 0px"},model:{value:e.loginForm.rememberMe,callback:function(r){e.$set(e.loginForm,"rememberMe",r)},expression:"loginForm.rememberMe"}},[e._v("记住账号")]),e._v(" "),t("el-form-item",{staticStyle:{width:"100%"}},[t("el-button",{staticStyle:{width:"100%"},attrs:{loading:e.loading,size:"medium",type:"primary"},nativeOn:{click:function(r){return r.preventDefault(),e.handleLogin(r)}}},[e.loading?t("span",[e._v("登 录 中...")]):t("span",[e._v("登 录")])])],1)],1)],1)},[],!1,null,null,null);r.default=a.exports},wqO8:function(e,r,t){}}]);
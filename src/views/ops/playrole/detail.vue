<template>
  <div  class='app-container' >
    <el-card>
  <el-row :gutter="10">
    <el-col :span="6" >
      <div id="tree_container" style="overflow-x:auto;">
          <!--<el-tree-->
          <!--ref="tree"-->
          <!--node-key="id"-->
          <!--:key="treeKey"-->
          <!--:data="data"-->
          <!--:props="defaultProps"-->
          <!--:default-expanded-keys="treeExpandedKeys"-->
          <!--:expand-on-click-node="false"-->
          <!--:lazy="true"-->
          <!--:load="loadTreeNode"-->
          <!--@node-expand="treeExpand"-->
          <!--@node-collapse="treeCollapse">-->
          <el-tree
            style="width:max-content;min-width:270px;"
            ref="tree"
            node-key="id"
            :key="treeKey"
            :data="treeData"
            default-expand-all
            :expand-on-click-node="false"
            @node-expand="treeExpand"
            @node-collapse="treeCollapse"
            @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }"  @mouseenter="data.show_option=true" @mouseleave="data.show_option=false">
            <i v-show="data.isDir==1" :class="!node.folderCollapse ? 'el-icon-thirdwenjian':'el-icon-thirdfolder'"></i>
            <!-- <i v-show="data.isDir==1" v-if="!node.folderCollapse" class="el-icon-thirdwenjian"></i>
            <i v-show="data.isDir==1" v-if="node.folderCollapse" class="el-icon-thirdfolder"></i> -->
            <i v-show="data.isDir==0" class="el-icon-thirdfile_code"></i>
            <span style="margin-left:5px;">{{ node.label }}</span>
            <span v-show="data.show_option==true" class="custom__tree__icons">
                <el-tooltip class="item" effect="dark" v-if="data.isDir" content="新增" placement="top">
                    <i class="tree-icon el-icon-thirdadd3" @click="() => append(data)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" v-if="data.pid!=0" content="编辑" placement="top">
                    <i class="tree-icon el-icon-thirdedit" @click="() => edit(node, data)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" v-if="data.pid!=0" content="删除" placement="top">
                    <i class="tree-icon el-icon-delete-solid" @click="() => remove(node, data)"></i>
                </el-tooltip>
            </span>
        </span>
          </el-tree>
          <el-dialog top="5vh" class="dialog" :title="editType=='ADD'? '新增':'编辑'" :visible.sync="isShowDlg" width="500px"
                     :close="treeEditClose">
            <el-form  label-width="120px" ref="nodeQuery"
                     :model="nodeQuery" size="small" class="demo-form-inline">
              <el-form-item label="节点类型" prop="name" v-if="editType=='ADD'">
                <!--<el-input placeholder="请输入子节点名称" v-model="nodeQuery.name"></el-input>-->
                <el-select v-model="nodeQuery.idDir" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="子节点名称" prop="name">
                <el-input placeholder="请输入子节点名称" v-model="nodeQuery.name"></el-input>
              </el-form-item>
              <el-form-item class="btns__adjust">
                <el-button size="medium" type="primary" @click="sure">确定</el-button>
                <el-button size="medium" @click="reset">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

      </div>
    </el-col>
    <el-col :span="18">
      <div v-if="isShowEditor">
      <el-row>
        <!-- <span style="color: #00a65a;font-size:13px">当前文件是：{{ filePath }}-------</span>
         <el-button size="mini" type="primary" @click="editFile">启用编辑</el-button>
        <el-button size="mini" type="warning" @click="saveFile">确认修改</el-button> -->
        <el-breadcrumb separator="/">
        <el-breadcrumb-item  v-for="(item,i) in filePathArr" :key=i>{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row>
        <el-card class='right-card'>
        <div slot="header" style="display:flex;align-items:center;justify-content:space-between;">
          <div>
          <i class="el-icon-document"></i>
          <span>{{ fileName }}</span>
          </div>
          <div >
            <el-radio-group  v-model="editorMode" size="mini" @change="changeMode">
              <el-radio-button label="readOnly">只读</el-radio-button>
              <el-radio-button label="edit">编辑</el-radio-button>
            </el-radio-group>
            <el-button style="margin-left:8px" plain size="mini" type="success" @click="saveFile">保存</el-button>
          <!-- <el-button  plain size="mini" type="primary"  @click="editFile">编辑</el-button> -->
          
          </div>
          <!-- <i style="float: right; padding: 3px 0" class="el-icon-edit-outline"></i>
          <i style="float: right; padding: 3px 0" class="el-icon-upload"></i> -->
        </div>
        <!-- <div > -->
        <editor ref="aceeditor" @init="editorInit" v-model="fileConetent"  lang="yaml" readOnly="true"  theme="monokai" height="400" width="100%"></editor>
        <!-- </div> -->
        </el-card>
      </el-row>
      </div>
    </el-col>
  </el-row>
  </el-card>
  </div>
</template>

<script>
  import { add, edit,getTreeData,del,getFileContent,saveFileContent } from '@/api/rolefiles'
  import { isvalidChinaese } from '@/utils/validate'
  import editor from "vue2-ace-editor"
  // import TreeItem from './TreeItem'
  import store from '@/store'
  // import vueztree from 'vue-ztree-2.0/dist/vue-ztree-2.0.umd.min.js'
  // import 'vue-ztree-2.0/dist/vue-ztree-2.0.css'
  // import vueZtree from "./vue-ztree"
  // var validChinaese = (rule, value, callback) => {
  //   if (!value) {
  //     callback(new Error('请输入项目英文名称'))
  //   } else if (!isvalidChinaese(value)) {
  //     callback(new Error('不能输入中文'))
  //   } else {
  //     callback()
  //   }
  // }
  export default {
    components: { editor },
    data() {
      return {
        options: [{
          value: 'false',
          label: '文件'
        }, {
          value: 'true',
          label: '目录'
        }],
        treeData:[],
        data: [
        ],
        editorMode:'readOnly',
        fileConetent:'',
        filePath:'',
        filePathArr:[],
        fileName:'',
        // tree数据源
        defaultProps: { // 树相关属性设置
          id: "",
          children: "children",
          label: "name",
          isDir: "isDir"
        },
        chooseId:'',
        // folderExpend: true,
        activeData: null,   // 当前操作数据
        treeExpandedKeys: [],   // 记录打开节点的数组
        treeKey: '',    // 控制tree渲染的key
        nodeQuery: {
          name: '',    // 编辑树节点表单的model
          idDir: ''
        },
        editType:'',
        isShowDlg: false,   // 是否显示编辑节点弹框
        isShowEditor: false
      }
    },
    created(){
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      init(){
        // console.log(typeof this.$route.query.isAdd)
        // console.log(this.$route.query.id)
        // console.log(this.$route.query.name)
        if(!JSON.parse(this.$route.query.isAdd)){
          getTreeData(this.$route.query.id).then(re => {
            const result = re.detail;
            // console.log(result)
            this.treeData = result
            // const treeData = result.data;
          })
          // console.log('进来了')
          // let nodes=[{id:1 ,pid:0 ,isDir:true,label:this.$route.query.name,children:[]}]
          // let dirs=["defaults","files","handlers","meta","tasks","templates","vars"]
          // // console.log(nodes)
          // dirs.forEach(function (v,i) {
          //   if(v=="files"|| v=="templates"){
          //     nodes[0].children.push({
          //       id:'dsfdhajkhfieriuuidajfk1548'+String(i+2),pid:1,label:v,isDir:true
          //     })
          //   }else{
          //     nodes[0].children.push({
          //       id:'dsfdhajkhfieriuuidajfk1548'+String(i+2),pid:1,label:v,isDir:true,children:[{
          //         label:"main.yml",isDir:false
          //       }]
          //     })
          //   }
          // })
          // this.data=nodes
          // console.log(this.data)

        }
        let scroll_area=document.getElementById('tree_container')
        scroll_area.addEventListener('mousewheel', this.handleScroll, true); 
        // window.addEventListener('mousewheel', this.debounce(this.handleScroll,300), true)||window.addEventListener("DOMMouseScroll",this.debounce(this.handleScroll,300),false)
      },
      // renderContent(h, { node, data, store }) {
      //   return (
      //     <span class="custom-tree-node">
      //     <i class=el-icon-folder-opened></i>
      //     <span style="margin-left:5px;">{node.label}</span>
      //     </span>
      // )
      // },
      // renderContent(h, { node, data, store }) {
      //   return (
      //     <span class="custom-tree-node">
      //     <i class="el-icon-folder-opened"></i>
      //     <span>{node.label}</span>
      //     <span>
      //     <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
      //   <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
      //   </span>
      //   </span>);
      // },
      editorInit: function (ed) {
        require("brace/theme/monokai")
        require("brace/ext/language_tools")
        require("brace/snippets/text.js")
        require("brace/mode/yaml")
        require("brace/snippets/yaml.js")
        require("brace/snippets/html.js")
        // console.log(ed)
        ed.setOptions({
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true,
          wrap: "free"
        })
        ed.setReadOnly(true)
      },
      // 新增节点
      append(data) {
        console.log(data)
        this.editType = "ADD";
        this.isShowDlg = true;
        // 记录当前节点数据，供新增弹框关闭后回调用
        this.activeData = data;
      },

      // 移除节点
      remove(node, data) {
        del(data.id).then(re => {
          const result = re.data
          this.init()
          // if (result && result.success) {
          //   // 重新渲染tree
          //   this.renderTree();
          //   this.$message({
          //     type: "success",
          //     message: "删除成功!"
          //   });
          // }
        });
      },
      // 编辑节点
      edit(node, data) {
        this.nodeQuery.name = data.name;
        // 记录当前操作数据
        this.activeData = data;
        this.editType = "EDIT";
        this.isShowDlg = true;
      },

      // 新增节点回调函数
      appendCallback() {
        const data = this.activeData
        const nodeQuery = this.nodeQuery
        console.log(data)
        nodeQuery.parentId = data.id === '0' ? '' : data.id
        const post={file_name:nodeQuery.name,is_dir:nodeQuery.idDir,pid:data.id,role:this.$route.query.id}
        // 将新节点名称和父节点id传递到后台
        // addNode(nodeQuery).then(re => {
        //   this.renderTree();
        // });
        // const newChild = { id: id++, label: 'testtest', children: [] };
        // if (!data.children) {
        //   this.$set(data, 'children', []);
        // }
        // data.children.push(newChild);
        // this.renderTree();
        add(post).then(re=>{
          this.init()
        })
      },
      submit(){

      },
      // 编辑节点回调函数
      editCallback() {
        // const data = this.activeData, nodeQuery = this.nodeQuery;
        // data.name = nodeQuery.name;
        // // 将节点新名称和节点id传递到后台
        // editNode(data).then(re => {
        //   const result = re.data;
        //   if (result && result.success) {
        //     this.$message({
        //       type: "success",
        //       message: "修改成功！"
        //     });
        //     this.renderTree();
        //   }
        // });
        const data = this.activeData
        const nodeQuery = this.nodeQuery
        console.log(data)
        nodeQuery.parentId = data.id === '0' ? '' : data.id
        const post={id:data.id,file_name:nodeQuery.name,is_dir:data.isDir,pid:data.pid,role:this.$route.query.id}
        // 将新节点名称和父节点id传递到后台
        // addNode(nodeQuery).then(re => {
        //   this.renderTree();
        // });
        // const newChild = { id: id++, label: 'testtest', children: [] };
        // if (!data.children) {
        //   this.$set(data, 'children', []);
        // }
        // data.children.push(newChild);
        // this.renderTree();
        edit(data.id,post).then(re=>{
          this.init()
        })
      },

      // 刷新key值，重新渲染tree
      renderTree() {
        this.treeKey = +new Date();
      },

      // // 当节点打开时，记录下打开节点的id
      treeExpand(data, node, self) {
        // this.treeExpandedKeys.push(data.id);
        console.log('节点打开')
        node.folderCollapse=false
      },
      //
      // // 当节点关闭时，移除节点的id
      treeCollapse(data, node, self) {
        // const index = treeExpandedKeys.indexOf(data.id);
        // if (index > -1) {
        //   this.treeExpandedKeys.splice(index, 1);
        // }
        console.log('节点关闭')
        node.folderCollapse=true
      },
      treeEditClose(){

      },
      // tree noed 新增/编辑确定事件
      sure() {
        const editType = this.editType;
        // this.$refs["parentNodeQuery"].validate(valid => {
        //   if (valid) {
        //     editType === "ADD" ? this.appendCallback() : this.editCallback();
        //     this.reset();
        //   } else {
        //     console.log("error submit!!");
        //     return false;
        //   }
        // });
        editType === "ADD" ? this.appendCallback() : this.editCallback();
        this.reset();
      },
      addDir(){
        console.log(this.$refs.tree.getCurrentKey())
        console.log(this.$refs.tree.getCurrentNode())
        if(!this.$refs.tree||!this.$refs.tree.getCurrentNode().isDir){
          this.$message.error('请选中目录节点，再添加！')
        }else{
          this.editType = "ADD";
          this.isShowDlg = true;
          // 记录当前节点数据，供新增弹框关闭后回调用
          this.activeData = data;
        }
      },
      handleNodeClick(data){
        if(!data.isDir){
          // console.log(data)
          getFileContent(data.id).then(res=>{
            console.log(res)
            this.filePath=res.detail.file_name
            this.fileConetent=res.detail.file_content
            this.isShowEditor=true
            let parent_path=this.treeData[0].label
            let arr_file_path=this.filePath.split('/')
            let idx=arr_file_path.findIndex((i)=>i==parent_path)
            this.fileName=arr_file_path[arr_file_path.length-1]
            let __that=this
            __that.filePathArr=[]
            arr_file_path.forEach(function(item,index){
              if (index>=idx){
                __that.filePathArr.push(item)
              }
            })
          })
          this.chooseId=data.id
        }
      },
      // tree node 弹框取消事件
      reset() {
        this.activeData = null;
        this.isShowDlg = false;
        this.nodeQuery = {
          name: "",
          parentId: ""
        };
        this.editType = "ADD";
      },
      editFile(){
        // console.log(this.editor)
        console.log(this.$refs.aceeditor.editor)
        this.$refs.aceeditor.editor.setReadOnly(false)
      },
      saveFile(){
        const post={file_content:this.fileConetent}
        saveFileContent(this.chooseId,post).then(res=>{
          console.log(res)
          if(res.code=='200'){
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
          }
          else{
            this.$message({
                message: '保存失败！',
                type: 'error'
              });
          }
          // this.filePath=res.detail.file_name
          // this.fileConetent=res.detail.file_content
          // this.isShowEditor=true
        })
      },
      onEditorFocus(val,editor){ // 富文本获得焦点时的事件
        console.log(val); // 富文本获得焦点时的内容
        editor.enable(false); // 在获取焦点的时候禁用
      },
      //函数防抖
      debounce(func, wait) {
          let timeout;
          return function () {
              let context = this;
              let args = arguments;
              if (timeout) clearTimeout(timeout);
              timeout = setTimeout(() => {
                  func.apply(context, args)
              }, wait);
          }
      },
      //判断滚动方向
      handleScroll(e){
          let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;  
          // 设备/屏幕高度
          let scrollObj = document.getElementById('tree_container'); // 滚动区域
          let v = -e.wheelDelta/2
          scrollObj.scrollLeft+=v
          e.preventDefault()
      },
      changeMode(){
        if(this.editorMode=='readOnly'){
          console.log(this.editorMode)
          this.$refs.aceeditor.editor.setReadOnly(true)
        }else{
          console.log(this.editorMode)
          this.$refs.aceeditor.editor.setReadOnly(false)
        }
      }

    }
  };

</script>

<style scoped>

</style>
<style>
  .el-row {
    padding-top:0px;
    margin-bottom: 15px;
    &:last-child {
        margin-bottom: 0;
    }
  }
  .right-card .el-card__body{
    padding:0px;
  }
  .right-card .el-card__header{
    padding:8px 20px;
  }
</style>

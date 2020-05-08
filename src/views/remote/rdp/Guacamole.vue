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
    <div>
        <!--<el-row :gutter="12">-->
        <!--<el-col :span="8">-->
        <!--<div style="padding:5px;height: 32px"><span style="margin-left: 30px">当前登录服务器为:{{username}}@{{server}}:{{port}} </span></div>-->
        <!--</el-col>-->
        <!--<el-col :span="3">-->
        <!--<el-upload-->
        <!--ref="upload"-->
        <!--action="string"-->
        <!--:http-request="upload"-->
        <!--:file-list="roleForm.fileList">-->
        <!--&lt;!&ndash;<el-input placeholder="请输入子节点名称" ></el-input>&ndash;&gt;-->
        <!--<el-button  size="small" type="primary">上传文件</el-button>-->
        <!--&lt;!&ndash;<el-button style="margin-left: 10px;" size="small" type="success" @click="upload">上传到服务器</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button size="small" type="primary">点击上传</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<div slot="tip" class="el-upload__tip">只能上传zip文件，且不超过500kb</div>&ndash;&gt;-->
        <!--</el-upload>-->
        <!--</el-col>-->
        <!--<el-col :span="13">-->
        <!--<el-input v-model="downloadPath" size="small" style="width: 70%;margin-left: 2px" placeholder="请输入需要下载的文件路径"></el-input>-->
        <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="downloadFile">下载文件</el-button>-->
        <!--&lt;!&ndash;<el-form :inline="true">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-form-item >&ndash;&gt;-->
        <!--&lt;!&ndash;<el-input  size="small"  label="请输入需要下载的文件路径"></el-input>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-form-item >&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">下载</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-form>&ndash;&gt;-->
        <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-form-item label="role上传">-->

        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</el-header>-->
        <div id="rdp_window">
        <div id='dpi'></div>
        <div ref="my_terminal" id="display" style="height:100%;width:100%;margin: 0px"></div>
        <!--</el-container>-->
        <div v-show="isShow">
            <span>{{file_name}}</span>
            <el-progress :percentage="percentage"></el-progress>
        </div>
        </div>
        <el-drawer
                title="侧边栏"
                :visible.sync="drawer"
                size="50%">
            <div style="margin: 20px 20px;">
                <el-input id="clipboard"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder=""
                        v-model="textarea2">
                </el-input>
            </div>
        </el-drawer>
    </div>
</template>
<script>
    // import Terminal from './Xterm'
    // import * as fit from 'xterm/lib/addons/fit/fit'
    import Guacamole from 'guacamole-common-js'
    import store from '@/store'
    // import {uploadFile,downloadFile} from '@/api/sftp'
    import {getConnectionsBy} from '@/api/connection'
    import {saveAs} from 'file-saver'

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
                term: null, terminalSocket: null,drawer:false, roleForm: {role_name: '', fileList: []},textarea2:'',
                downloadPath: '', username: '', server: '', port: '',file_name:'',percentage:0,isShow:false,keydown:''
            }
        },
        methods: {
            getDPI() {
                return
            },
            sendKeyEvent(keysym) {
                guac.sendKeyEvent(0, keysym);
            },
            sendKeyEvent(keysym) {
                guac.sendKeyEvent(1, keysym);
            },
            sendMouseState(mouseState) {
                guac.sendMouseState(mouseState);
            },
            disconnect() {
                guac.disconnect();
            },
            onError(error) {
                console.log(error);
            },
            //将内容传送到往堡垒机，data是获取到的文本框中的内容
            setClipboard(data) {
                var stream = client.createClipboardStream("text/plain");

                var writer = new Guacamole.StringWriter(stream);
                for (var i=0; i<data.length; i += 4096){
                    writer.sendText(data.substring(i, i+4096));
                }

                writer.sendEnd();
            },
        },
        mounted() {
            let display = document.getElementById("display");
            let rdp_window=document.getElementById("rdp_window")
            // Instantiate client, using an HTTP tunnel for communications.
            //http://guacamole.apache.org/doc/guacamole-common-js/Guacamole.WebSocketTunnel.html
            let ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";
            let ws_path = 'ws://127.0.0.1:8000/websocket/rdp?sid=' + this.$route.query.sid + '&uid=' + this.$route.query.uid
                + '&group_name=' + this.$route.query.uid
            let guac = new Guacamole.Client(
                // new Guacamole.HTTPTunnel("tunnel")
                new Guacamole.WebSocketTunnel(ws_path)
            );
            let __this = this
            display.appendChild(guac.getDisplay().getElement());
            guac.onerror = function (error) {
                console.log(error)
            }
            let fileSystem;
            guac.onfilesystem = function (object) {
                // console.log(object)
                // console.log(Guacamole.InputStream)
                // fileSystem=object;
                //
                // //监听onbody事件，对返回值进行处理，返回内容可能有两种，一种是文件夹，一种是文件。
                // object.onbody = function(stream, mimetype, filename){
                //   stream.sendAck('OK', Guacamole.Status.Code.SUCCESS);
                //   downloadFile(stream, mimetype, filename);
                // }
            }
            //监听堡垒机端往剪切板复制事件，然后写入文本框中
            guac.onclipboard = function(stream, mimetype){
                console.log('复制了')
                if (/^text\//.exec(mimetype)) {
                    var stringReader = new Guacamole.StringReader(stream);
                    var json = "";
                    stringReader.ontext = function ontext(text) {
                        json += text
                    }

                    stringReader.onend = function() {
                        // var clipboardElement = document.getElementById("clipboard");
                        // clipboardElement.value = '';
                        // clipboardElement.value = json;
                        __this.textarea2='';
                        __this.textarea2=json;
                    }
                }
            }
            guac.onfile = function (stream, mimetype, filename) {
                //通知服务端，已经收到了stream
                console.log(filename)
                console.log(this)
                __this.isShow=true
                __this.file_name=filename
                // console.log(stream)
                // console.log(mimetype)
                // console.log(filename)
                stream.sendAck('OK', Guacamole.Status.Code.SUCCESS);
                //开始处理输入流，这里封装了一个downloadFile方法
                downloadFile(stream, mimetype, filename);
            }
            guac.onprogress=function(blob,offset){
                console.log(blob)
                console.log(offset)
            }
            let remote_ip = window.location.host
            let width = document.body.scrollWidth
            console.log(width)
            let height = document.body.scrollHeight
            console.log(height)
            let dpi = getDPI()
            console.log(dpi)
            // Connect
            guac.connect(`${remote_ip},${width},${height},${dpi}`)

            // Disconnect on close
            window.onunload = this.disconnect



            // Mouse
            let mouse = new Guacamole.Mouse(guac.getDisplay().getElement())
            console.log(guac.getDisplay().getElement())
            console.log(document)
            mouse.onmousedown =
                mouse.onmouseup =
                    mouse.onmousemove = function (mouseState) {
                        guac.sendMouseState(mouseState)
                    }
            // Keyboard
            let keyboard = new Guacamole.Keyboard(document)
            let arr=[]


            // document.onkeydown = function (e) {
            //     console.log('document.keydown')
            //     if (arr.length > 0) {
            //     // a-z按键长按去重
            //         if (arr.indexOf(e.key.toLowerCase()) >= 0) {
            //             return;
            //         }
            //     }
            //     arr.push(e.key.toLowerCase());
            //     this.keydown = arr.join("+");
            //
            //     // 监听按键捕获
            //     if (this.keydown == "shift+alt+meta" || this.keydown == "alt+arrowup") {
            //         this.keydown = "";
            //         __this.drawer=true
            //         console.log(this.keydown,arr)
            //     }
            // };
            //
            // document.onkeyup = function (e) {
            //     console.log('document.keyup')
            //     arr.splice(arr.indexOf(e.key.toLowerCase()), 1);
            //     this.keydown = arr.join("+");
            // }





            keyboard.onkeydown = function (keysym) {
                // console.log(keysym)
                console.log('guac.keydown')
                console.log(keysym)
                if (arr.length > 0) {
                    // a-z按键长按去重
                    if (arr.indexOf(keysym.toString()) >= 0) {
                        return;
                    }
                }
                arr.push(keysym.toString());
                __this.keydown = arr.join("+");

                // 监听按键捕获
                console.log(__this.keydown)
                if (__this.keydown == "65505+65511+65513" || __this.keydown == "65513+65511+65505" || __this.keydown == "65505+65513+65511"  ||
                    __this.keydown == "65511+65505+65513" || __this.keydown == "65511+65513+65505" || __this.keydown == "65513+65505+65511") {
                    __this.keydown = "";
                    __this.drawer=true
                    console.log(__this.keydown,arr)
                }
                else{
                    guac.sendKeyEvent(1, keysym)
                }
                // arr.push(keysym)
                // __this.keydown=arr.join('+')
                // console.log(__this.keydown)
                // if(__this.keydown == '65505+65507+65511') { // a-z按键长按去重
                //     console.log("that's right")
                // }
                // else{
                //     guac.sendKeyEvent(1, keysym)
                // }
                // __this.keydown=''
                // arr=[]
                //guac.sendKeyEvent(1, keysym)
            }

            keyboard.onkeyup = function (keysym) {
                console.log('guac.keyup')
                console.log(keysym)
                arr.splice(arr.indexOf(keysym.toString()), 1);
                __this.keydown = arr.join("+");
                guac.sendKeyEvent(0, keysym)
            }

            function getDPI() {
                return document.getElementById("dpi").clientHeight
            }

            window.onbeforeunload = function (e) {
                return '确定离开此页吗？'
            }

            //连接有滞后，初始化文件系统给个延迟
            // setTimeout(function(){
            //     //从根目录开始,想服务端发送get请求
            //     let path = '/';
            //     fileSystem.requestInputStream(path);
            // }, 5000);

            function downloadFile(stream, mimetype, filename) {

                //使用blob reader处理数据
                var blob_builder;
                if (window.BlobBuilder) blob_builder = new BlobBuilder();
                else if (window.WebKitBlobBuilder) blob_builder = new WebKitBlobBuilder();
                else if (window.MozBlobBuilder) blob_builder = new MozBlobBuilder();
                else
                    blob_builder = new (function () {

                        var blobs = [];

                        /** @ignore */
                        this.append = function (data) {
                            blobs.push(new Blob([data], {"type": mimetype}));
                        };

                        /** @ignore */
                        this.getBlob = function () {
                            return new Blob(blobs, {"type": mimetype});
                        };

                    })();

                // 收到blob的处理，因为收到的可能是一块一块的数据，需要把他们整合，这里用到了blob_builder
                stream.onblob = function (data) {
                    // console.log(length)
                    if (__this.percentage<=89){
                        __this.percentage+=1
                    }
                    // Convert to ArrayBuffer
                    var binary = window.atob(data);
                    var arrayBuffer = new ArrayBuffer(binary.length);
                    var bufferView = new Uint8Array(arrayBuffer);

                    for (var i = 0; i < binary.length; i++)
                        bufferView[i] = binary.charCodeAt(i);

                    blob_builder.append(arrayBuffer);
                    length += arrayBuffer.byteLength;

                    // Send success response
                    stream.sendAck("OK", 0x0000);

                };

                // 结束后的操作
                stream.onend = function () {
                    //获取整合后的数据
                    __this.percentage=100
                    var blob_data = blob_builder.getBlob();

                    //数据传输完成后进行下载等处理
                    if (mimetype.indexOf('stream-index+json') != -1) {
                        //如果是文件夹,需要解决如何将数据读出来，这里使用filereader读取blob数据，最后得到一个json格式数据
                        var blob_reader = new FileReader();
                        blob_reader.addEventListener("loadend", function () {
                            let folder_content = JSON.parse(blob_reader.result)
                            //这里加入自己代码，实现文件目录的ui，重新组织当前文件目录
                        });
                        blob_reader.readAsBinaryString(blob_data);
                    } else {
                        //如果是文件，直接下载，但是需要解决个问题，就是如何下载blob数据
                        //借鉴了https://github.com/eligrey/FileSaver.js这个库
                        var file_arr = filename.split("/");
                        var download_file_name = file_arr[file_arr.length - 1];
                        saveAs(blob_data, download_file_name);
                    }
                }
            }

        },


        // beforeDestroy() {
        //   this.terminalSocket.close()
        //   this.term.destroy()
        // }
    }
</script>


<style>
    #dpi {
        height: 1in;
        width: 1in;
        position: absolute;
        left: -100%;
        top: -100%;

    }
</style>

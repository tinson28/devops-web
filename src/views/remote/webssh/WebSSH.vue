<template>
  <div  style="height: 100%">
    <my-terminal :terminal="terminal"></my-terminal>
  </div>
</template>

<script>
  import Console from './Console'

  export default {
    name: 'WebSSH',
    components: {
      'my-terminal': Console
    },
    data() {
      return {
        terminal: {
          pid: 1,
          name: 'terminal'
          // cols: 92,
          // rows: 20
        }
      }
    },
    method:{
      beforeinit(){
        // this.cols=this.get_box_size().cols
        // this.rows=this.get_box_size().rows
      },
      get_box_size() {
        let init_width = 92;
        let init_height = 22;

        let windows_width = $(window).width();
        let windows_height = $(window).height();

        return {
          cols: Math.floor(windows_width / init_width),
          rows: Math.floor(windows_height / init_height),
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .el-header, .el-footer {
    background-color: #e3f2fd;
    color: #333;
    text-align: left;
    line-height: 60px;
    height:500px;
  }
  .el-main{
    padding: 0px;
  }
  .el-row{
    /*line-height: 60px;*/
    padding-top: 13px;
    /*padding-bottom: 60px;*/
  }

</style>

<template>
<div class="box">
 <span>{{title}}：</span>
  <label class="file_label" >
      <input type="file" style='file' class="file"  @change='checkFile' ref='file'>
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </label>
</div>
  
</template>


<script>
  export default {
    data() {
      return {
        imageUrl: ''
      };
    },
    props:['title'],
    methods: {
      checkFile() {
        var windowURL = window.URL || window.webkitURL;
        if(this.$refs.file && this.$refs.file.files && this.$refs.file.files[0]){
          this.imageUrl= windowURL.createObjectURL(this.$refs.file.files[0])   ;   //预览
         
          this.$emit('files',this.$refs.file.files[0])
        }
      }

    }
  }
</script>
<style type="text/css" scoped>
.box{height: 82px;line-height: 82px;margin-bottom: 20px;}
.box>span{height: 82px;line-height: 82px;display: inline-block;}
.file{display: none;}
</style>
<style>
  .file_label {
    display:inline-block; 
    vertical-align: middle;
    width: 178px;
    height: 80px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
 .file_label:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 80px;
    display: block;
  }
</style>
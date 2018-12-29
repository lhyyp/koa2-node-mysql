<template lang="html">
  <div class="box">
      <my-aside></my-aside>
      <h2 class="title">添加文章</h2>
      <el-input placeholder="请输入标题" v-model="editor.title" clearable >
        <template slot="prepend">标题：</template>
      </el-input> 
      <div class="classification">
          文章分类：
          <el-radio v-model="editor.classification" :label="item.id" v-for='item in getArticlepicture' :key="item.id">{{item.name}}</el-radio>
      </div>
       <my-upload  v-on:files="files" :title='title'></my-upload>
       <div class="abstract_div"> 
          文章摘要： 
         <el-input type="textarea":autosize="{ minRows: 2, maxRows: 4}"placeholder="请输入文章摘要"v-model="editor.abstract" class='abstract'></el-input>
        </div>
      <editor-bar  :isClear="isClear" v-on:change='change' v-model="editor.content" ></editor-bar>
      <el-button type="primary" @click='getCom' class='marginTop20'>发表</el-button>
  </div>
</template>

<script>
import axios from 'axios'
import myUpload from '@/components/upload'
import EditorBar from '@/components/EditorBar'
import myAside from '@/components/aside'
import { Message } from 'element-ui';
export default {
  data () {
    return {
      editor: {
        content: '',                  //文章内容
        title: '',                //文章标题
        classification: 1,        // 文章分类
        picturesArticle: '',      //文章图片
        abstract :''                  //文章摘要
      },
      isClear: false,
      title:'文章图片',
      getArticlepicture:[]   //所有文章分类

    }
  },
  components: {
    EditorBar,
    myUpload,myAside
  },
  mounted(){
    this.getArticlepictures();
  },
  methods:{
    files (files)  {     // files就是子组件传过来的值
      this.editor.picturesArticle = files;    
    },
    change(val){
      this.editor.content = val
    },
    getArticlepictures () {    //获取所有文章分类
       axios.get('/api/getArticlepictures').then(
        (res) => {
          this.getArticlepicture = res.data.result;        
        }).catch(
          (error) => {
            Message('服务器错误');
          }
        )
    },
    getCom(){
      let formData = new FormData(); 
      if(this.editor.title){
        formData.append("title", this.editor.title);
      } else{
        Message('请设置文章标题');
        return ;
      }
      formData.append("classification", this.editor.classification);
      if(this.editor.picturesArticle){
        formData.append("files", this.editor.picturesArticle);
      }else{
        Message('请设置文章图片');
        return ;
      }
      if(this.editor.abstract){
        formData.append("abstract", this.editor.abstract);
      } else{
        Message('请输入文章摘要');
        return ;
      }
      if(this.editor.content){
        formData.append("content", this.editor.content);
      } else{
        Message('请输入文章内容');
        return ;
      }
      let loading = this.$loading({
          lock: true,
          text: '发表中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)',
          customClass:'loading'
        });
       axios.post('/api/create',formData).then(
        (res) => {
           loading.close();
          if(res.data.code == 200){
            loading.close();
            Message({
              type: 'success',
              message: res.data.message,
              customClass:'message'
            });
            this.timer = setTimeout(() => {
              this.$router.push({name: 'index-article'})
            },2000)
            
          }else{
            Message(res.data.message);
          }
        }).catch(
          (error) => {
            loading.close();
            Message('服务器错误');
            console.log(error);
          }
        )
    }
  }
}
</script>
<style type="text/css" scoped>
  .box{width: 1200px;margin:0 auto;}
  .title{text-align: center;height: 100px;line-height: 100px;}
  .classification{padding: 20px 0;}
  .marginTop20{margin-top: 20px;}
  .abstract_div{padding: 20px 0;}
  .abstract{margin-top: 10px;}
</style>
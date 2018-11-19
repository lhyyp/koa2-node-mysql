<template>
  <div>
    <el-input type="textarea" :rows="5" placeholder = '请输入评论' :value="value" @input="commentFn" class='marginB20' resize='none' ></el-input>
    <el-button type="primary" @click='subComments'>畅言一下</el-button>
  </div>
</template>
<script>
  import axios from 'axios'
  import { Message } from 'element-ui';
  export default {
    name: 'ReplyTextarea',
    data () {
      return {
        comment: ''
      }
    },
    props:['id','uid','value','name'],    //id => 即将回复的(评论的id)   UID => 即将回复的（评论的uid)  name => 即将回复的（评论的用户名）
    methods:{
      commentFn(val) {
        this.comment = val
        this.$emit('input',val)
      },
      subComments (){
        var reg = new RegExp(this.name); 
        var comment = this.comment.replace(reg,'');
        /*
          articleId => 文章id
          content => 评论内容
          cid => 原有评论的id 默认0,
          pid => 原有评论的uid 默认0
        */
        let   data = {
          articleId  : this.$route.query.id,
          content : comment,
          cid : this.id || 0,
          pid : this.uid || 0
        } 
        if(!this.$store.getters.getToken){
          Message('请先登录');
          return   ; 
        } 
        if(!data.content){
          Message('请输入评论内容！');
          return   ; 
        }
        axios.post('/api/addComments',data).then(
          (res) => {
            this.comment = '';
            this.$emit('addComment',true)
          }).catch(
            (error) => {
              Message('服务器错误');
            }
          )
      } 
    }
  }
</script>
<style scoped>
.marginB20{margin:10px 0;}
</style>
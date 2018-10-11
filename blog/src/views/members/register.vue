
<template>
<div>
  <my-aside></my-aside>
   <div  class="login-wrap">
        <div  class="ms-title">欢迎注册^_^</div>
        <form class="ms-login">
            <div>
              <input type="text"  class='username' placeholder='请输入用户名'  v-model="data.name" > 
            </div>
            <div>
              <input type="password"  class='password' placeholder='请输入密码'  v-model='data.pass'  @keyup.enter='login()'>
            </div>
            <my-upload  v-on:files="files" :title='title'></my-upload>
            <div>
              <span class="login-btn" @click='register()' >注册</span>
              <p class="already">还没有理账号？<a href="/login" >请立即登录</a></p>
            </div>
      </form>  
    </div>
</div>
 
</template>

<script>
import axios from 'axios'
import myAside from '@/components/home/aside'
import myUpload from '@/components/home/upload'
import { Message } from 'element-ui';

export default {
  name: 'HelloWorld',
  data () {
    return {
        data:{
          name:'',
          pass:'',
          files:''
        }, 
        timer:'',
        title:'上传头像'
    }
  },
  components:{
    myAside,myUpload
  },
  mounted(){
    // this.getApi();
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods:{
    files (files)  {     // files就是子组件传过来的值
      this.data.files = files;
      
    },
    register(){
      let formData = new FormData(); 
      if(this.data.name){
        formData.append("name", this.data.name);
      } else{
        Message('请设置用户名');
        return ;
      }
      if(this.data.pass){
        formData.append("pass", this.data.pass);
      }else{
        Message('请设置密码');
        return ;
      }
      if(this.data.files){
        formData.append("files", this.data.files);
      }else{
        Message('请设置头像');
        return ;
      }
      let loading = this.$loading({
          lock: true,
          text: '注册中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)',
          customClass:'loading'
        });
      axios.post('/api/register',formData).then(
        (res) => {
           loading.close();
          if(res.data.code == 200){
            loading.close();
            Message({
              type: 'success',
              message: res.data.message,
              customClass:'message'
            });
            this.$store.commit('updataMemberInfo',res.data.result);
            this.timer = setTimeout(() => {
              this.$router.push({path: '/'});
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

<style scoped>
.login-wrap{position: fixed; top:0; left:0; right: 0; bottom: 0; width:100%; height:100%; background: #324157; }
.ms-title{position: absolute; top:50%; width:100%; margin-top: -230px; text-align: center; font-size:30px; color: #fff;}
.ms-login{position: absolute; left:50%; top:50%; width:380px; height:280px; margin:-150px 0 0 -190px; padding:40px; border-radius: 5px; background: #fff;}
.username,.password{border:1px solid #67c23a;height: 40px;padding:0 15px;width: 100%;border-radius: 4px;margin-bottom: 22px; box-sizing: border-box;}
.login-btn{color: #fff; background-color: #409EFF; border:none;text-align: center;border-radius: 4px;display: block;width: 100%;height: 36px;line-height: 36px;outline: none;}
.already{font-size: 12px;color: #333; line-height: 16px;text-align: center;margin-top: 10px;}
.already a{color: #029bf0;margin-left: 4px;}

</style>
<style type="text/css">
  .loading .el-loading-spinner .el-loading-text{color: #fff;font-size: 16px;}
  .loading .el-loading-spinner i{color: #fff;}
</style>
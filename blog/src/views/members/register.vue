
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
            <div>
              <span class="login-btn" @click='login()' v-loading.fullscreen.lock="fullscreenLoading">注册</span>
              <p class="already">还没有理账号？<a href="/login" >请立即登录</a></p>
            </div>
      </form>  
    </div>
</div>
 
</template>

<script>
import axios from 'axios'
import myAside from '@/components/home/aside'
import { Message } from 'element-ui';

export default {
  name: 'HelloWorld',
  data () {
    return {
        data:{
          name:'',
          pass:''
        },
        fullscreenLoading:false,
        timer:''
    }
  },
  components:{
    myAside
  },
  mounted(){
    // this.getApi();
  },
  beforeDestroy() {
     clearTimeout(this.timer)
  },
  methods:{
    login(){
      let data = this.data;
      let loading = this.$loading({
          lock: true,
          text: '登录中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)',
          customClass:'loading'
        });
      axios.get('/api/login',{params :data}).then(
        (res) => {
           loading.close();
          if(res.data.code == 200){
            loading.close();
            Message({
              type: 'success',
              message: res.data.message,
              duration :2000,
              center:true,
              customClass:'message'
            });
            this.$store.commit('updataMemberInfo',res.data.result);
            this.timer = setTimeout(() => {
              this.$router.push({path: '/'});
            },2000)
            
          }else{
           Message({
              type: 'error',
              message: res.data.message,
              duration :2000,
              center:true,
              customClass:'message'
            });
          }
        }).catch(
          (error) => {
            loading.close();
            Message({
              type: 'warning',
              message: '服务器错误',
              duration :2000,
              center:true,
              customClass:'message'
            });
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
.ms-login{position: absolute; left:50%; top:50%; width:380px; height:240px; margin:-150px 0 0 -190px; padding:40px; border-radius: 5px; background: #fff;}
.username,.password{border:1px solid #67c23a;height: 40px;padding:0 15px;width: 100%;border-radius: 4px;margin-bottom: 22px; box-sizing: border-box;}
.login-btn{color: #fff; background-color: #409EFF; border:none;text-align: center;border-radius: 4px;display: block;width: 100%;height: 36px;line-height: 36px;outline: none;}
.already{font-size: 12px;color: #333; line-height: 16px;text-align: center;margin-top: 10px;}
.already a{color: #029bf0;margin-left: 4px;}

</style>
<style type="text/css">
  .loading .el-loading-spinner .el-loading-text{color: #fff;font-size: 16px;}
  .loading .el-loading-spinner i{color: #fff;}
</style>
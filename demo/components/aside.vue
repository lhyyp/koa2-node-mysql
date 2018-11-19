<template>
  <ul class="aside">
     <router-link tag="li" v-show="show" to="/members/login" >登录</router-link> 
     <router-link tag="li" v-show="show" to="/members/register" >注册</router-link>
      <router-link tag="li" v-show="isShow" to="/wangeditor" >发表文章</router-link> 
     <li v-show="isShow" @click='logout()'>退出</li>
       <router-link tag="li" to="/" >首页</router-link> 
     <router-link tag="li" to="https://github.com/lhyyp/koa2-node-mysql" >Github</router-link>
  </ul>
 
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
        show:'',
        isShow:'',
        memberInfo :{}
    }
  },
  mounted(){
    this.onOff();
  },
  methods:{
    onOff(){
      if(this.$store.getters.getToken){  // 通过vuex state获取当前的token是否存在  
        this.show = false;
        this.isShow = true;
        this.memberInfo = this.$store.getters.getMemberInfo;
      }else{
        this.show = true;
        this.isShow = false;
      }
    },
    logout(){
      axios.get('/api/logout').then(
        (res) => {
           Message({
              type: 'success',
              message: res.data.message,
              duration :2000,
              center:true,
              customClass:'message'
            });
           window.location.reload()
        }).catch(
        function(error){
          console.log(error);
      })
    }
  }
}
</script>

<style scoped>
.aside{position: fixed;top: 50%;right: 30px;transform: translateY(-50%);z-index: 200001;}
.aside li{cursor: pointer;background: #4C4C4C;width: 150px;height: 50px;text-align: center;line-height: 50px;color: #fff;margin: 5px 0;border-radius: 5px;}
.aside li:hover{background: #FF8A10;}
.aside li.active{background: #FF8A10;}
</style>
<template>
  <div>
    <ul class="header">
      <li class="Message">
        <p class="p-1">从不羡慕别人的优秀，因为相信自己也可以优秀。</p>
        <p class="p-2">闲下来时看看书，书本里的故事，总有你学到的人生。</p>
      </li>
      <li class="last"><img src="~/assets/images/tea.jpg"></li>
    </ul>
    <ul class="item">
      <nuxt-link :to="{name:'index'}" tag="li" active-class = "active" exact>首页</nuxt-link>
      <nuxt-link :to="{name:'index-article'}" tag="li" active-class = "active" exact>全部文章</nuxt-link>
      <!-- <nuxt-link tag="li" to="/" active-class = "active" exact>首页</nuxt-link> 
      <nuxt-link tag="li" to='/Article' active-class = "active" exact>全部文章</nuxt-link>
      <nuxt-link tag="li" :to="'/MyArticle/id='+memberInfo.id" active-class = "active" v-show="isShow" exact>我的文章</nuxt-link> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'myHeader',
  data () {
    return {
      show:'',
      isShow:'',
      memberInfo:''
    }
  },
  mounted(){
    // this.onOff();   
  },
  methods:{
    /*
    onOff(){
      if(this.$store.getters.getToken){  // 通过vuex state获取当前的token是否存在  
        this.show = false;
        this.isShow = true;
        this.memberInfo = this.$store.getters.getMemberInfo;
      }else{
        this.show = true;
        this.isShow = false;
      }
    }
    */
  }
}
</script>

<style scoped>
.header{height: 140px;background: #FFFFCD url('~assets/images/logo.png') 0 0 no-repeat;background-size: 100% 100%;padding-left: 410px;}
.header li.Message{padding-top: 40px;float: left;}
.header li.Message p{line-height: 30px;height: 30px;color: #646060;}
.header li.Message p.p-2{padding-left: 30px;}
.header li.Message p.p-3{padding-left: 350px;}
.header li.last{float: right;margin-top: 20px;}
.item{height: 50px;line-height: 50px;margin: 10px 0 20px;width: 100%;background: #6cc;text-align: center;box-shadow: 2px 2px 2px #bdbdbd;font-size: 14px;}
.item li{float: left;width: 140px;color: #fff;font-size: 16px;cursor: pointer;}
.item li+li{margin-left: 5px;}
.item li.active{border-radius: 5px;background: #f15694;}
.item li:hover{border-radius: 5px;background: #f15694;}
</style>
<template>
  <div>
    <ul class="header">
      <li class="Message">
        <p class="p-1">从不羡慕别人的优秀，因为相信自己也可以优秀。</p>
        <p class="p-2">闲下来时看看书，书本里的故事，总有你学到的人生。</p>
        <p class="p-3">---By:<span>二营长</span></p>
      </li>
      <li class="last"><img src="../../assets/images/tea.jpg"></li>
    </ul>
    <ul class="item">
      <router-link tag="li" to="/" active-class = "active" exact>Home</router-link> 
      <router-link tag="li" to="/article" active-class = "active" exact>全部文章</router-link>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  },
  mounted(){
  },
  methods:{
  }
}
</script>

<style scoped>
.header{height: 140px;background: #FFFFCD url('../../assets/images/logo.png') 0 0 no-repeat;background-size: 100% 100%;padding-left: 370px;}
.header li.Message{padding-top: 40px;float: left;}
.header li.Message p{line-height: 30px;height: 30px;color: #646060;}
.header li.Message p.p-2{padding-left: 30px;}
.header li.Message p.p-3{padding-left: 350px;}
.header li.last{float: right;margin-top: 20px;}
.item{height: 50px;line-height: 50px;margin: 10px 0;width: 100%;background: #6cc;text-align: center;box-shadow: 2px 2px 2px #bdbdbd;font-size: 14px;}
.item li{float: left;width: 140px;color: #fff;font-size: 16px;cursor: pointer;}
.item li+li{margin-left: 5px;}
.item li.active{border-radius: 5px;background: #f15694;}
.item li:hover{border-radius: 5px;background: #f15694;}
</style>
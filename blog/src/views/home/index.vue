<template>
  <div class="container">
  <div class="banner">
    <my-banner></my-banner>
    <div class="right">
       <p class="p-1">做人呢，最要紧的是开心！</p>
    </div>
  </div>
    
  </div>
 
</template>

<script>
import axios from 'axios'
// import myBanner from '@/components/home/banner'
import myBanner from '@/components/home/Broadcast'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  },
  components:{
      myBanner
  },
  mounted(){
    // this.getApi();
  },
  methods:{
    getApi(){
      axios.post('/api/').then(
        function(res){
          console.log(res)
        }).catch(
        function(error){
          console.log(error);
      })
    }
  }
}
</script>

<style scoped>
.banner{overflow: hidden;width: 100%;}
.right{float: left;width: 380px;height:272px;background: url('/static/images/day.jpg') 0 0 no-repeat;margin-left: 20px;margin-top: 14px;}
.right .p-1{width: 200px;margin-top: 120px ;margin-left: 140px;color: #f7b0b0;line-height: 25px;font-size: 16px;}
</style>
<template>
  <div class="bannerCom">
    <transition-group tag="ul" name="image" class="item left">
      <li @mouseout='move' @mouseover='stop' v-show="index===mark" ref="index" v-for='(item,index) in bannerList' :key='item.id'><img :src="'/upload/images/'+item.src"></li>
    </transition-group>
    <div class="right">
      <div class="hoverBg" ref="hoverBg"></div>
      <ul class="list">
        <li  @click='change(index)' @mouseover='change(index)' @mouseout='move' :class="{ 'active':index===mark }" v-for='(item , index) in bannerList' :key='index'><img :src="'/upload/images/'+item.src" ></li>
      </ul>
    </div>

  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'banner',
  data () {
    return {
        mark:0,
        list:[],
        timer:'',
      }
  },
  beforeDestroy() {
     this.stop();
  },
  props:['bannerList'],
  mounted(){
  },
  methods:{
    autoPlay () {     
      this.mark++; 
      if (this.mark === 5) { 
        this.mark = 0    
      } 
      this.$refs.hoverBg.style.top = this.mark*60 + 'px';  
    },    
    change (i) {   
     this.stop();
      this.mark = i  ; 
      this.$refs.hoverBg.style.top = this.mark*60+'px'; 
    },
    stop () {
      clearInterval(this.timer);
    },
    move () {
      this.stop();
      this.timer = setInterval(this.autoPlay, 2500)
    } 
  }
}
</script>

<style scoped>
.bannerCom{width: 800px;height: 300px;float: left;margin-left: 20px;}
.bannerCom .left{width: 680px;height: 300px;float: left; }
.bannerCom .left img{width: 680px;height: 300px;}
.bannerCom .item{position: relative;}
.bannerCom .item li{position: absolute;}
.bannerCom .right{float: right;width: 100px;margin-left: 20px;position: relative;}
.bannerCom .right .hoverBg{position: absolute;width: 126px;height: 64px;background: url('../assets/images/hover.png') 0 0 no-repeat;left: -16px;transition: all 1.2s ease;top:0;}
.bannerCom .right .list li{width: 100px;height: 60px;padding: 5px 0;}
.bannerCom .right .list img{width: 100px;height: 50px;}

.image-enter-active {
    opacity: 1;
    transition: all 1.5s ease;
  }
  .image-leave-active {
     opacity: 1;
    transition: all 1.5s ease;
  }
  .image-enter {
    opacity: 0;
  }
  .image-leave {
     opacity: 0;
  }

</style>
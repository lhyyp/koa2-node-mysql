<template>
  <Swiper v-if="slidesReal.length > 0" :autoPlay='true' :showIndicator='true' interval="2500" duration="500">
        <Slide @click="clickMe" v-for="(item,index) in slidesReal" :key="index">
          //添加click事件
        </Slide>
   </Swiper>
 
</template>

<script>
import axios from 'axios'
import { Swiper, Slide } from 'vue-swiper-component';
export default {
  name: 'HelloWorld',
  data () {
    return {
      slidesReal: [
        1,2,3
      ]
    }
  },
  components: {
      Swiper,
      Slide
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

</style>
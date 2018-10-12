
<template>
<div>
   <my-header></my-header>
   <my-aside></my-aside>
   <router-view :key="key"></router-view>
</div>
 
</template>

<script>
import axios from 'axios'
import myHeader from '@/components/home/header'
import myAside from '@/components/home/aside'


export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  components:{
      myHeader,myAside
  },
  mounted(){
    // this.getApi();
  },
 computed: {
    key() {
      return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
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
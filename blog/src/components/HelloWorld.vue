<template>
<div>111111111111</div>
 
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

    this.getApi();
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

<template>
   <div>
     <div class="container">
       <myHeader/>
        <myAside/>
       <nuxt-child class='body'/>
     </div>
     <div class="bg"></div>
   </div>
</template>

<script>
import myHeader from '~/components/myHeader.vue'
import myAside from '@/components/aside'
export default {
  components: {
    myHeader,myAside
  },
}
</script>

<style>
html,body,div,h1,h2,h3,h4,h5,h6,p,table,form,label,ol,ul,li,dl,dt,dd,img,p{margin:0; padding:0;}
ul,li{list-style:none;}
img{border: 0; vertical-align: top;}
a{color: #333; text-decoration: none;}
body{font-family: 'microsoft yahei';background: #f5f5f5;}
#app{width: 1200px;margin: 0 auto; }
.clearfix:after {content: ''; display: block; clear: both; }
.clearfix {zoom: 1; }
.fl{float: left;}
.bg{background: url('~assets/images/bg.jpg');  position: fixed; top: 0; left: 0; z-index: -1; height: 100vh; width: 100vw;} 
.container{width: 1200px;margin: 0 auto;background: #fff;}
.body{padding-bottom: 50px;}
</style>

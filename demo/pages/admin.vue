<template>
	<div class="container">
		<myAside/>
		<div class='left'>
			<myHeader/>
			<nuxt-child />
		</div>
		
	</div>
</template>

<script>
import myAside from '@/components/admin/leftAside'
import myHeader from '@/components/admin/header'
export default {
  components: {
    myAside,myHeader
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
.container{display: flex;}
.left{flex: 1;}
</style>

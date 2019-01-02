<!-- <template>
	<ul class="comyainer">
		<nuxt-link tag="li"  to="/admin"  class="item clearfix" exact-active-class='active'>
			<span class="fl icon"></span>
			<span class="fl">发表文章</span>
		</nuxt-link> 
		<nuxt-link tag="li"  to="/admin/banner"  class="item" exact-active-class='active'>发表文章</nuxt-link> 
		<nuxt-link tag="li"  to="/wangeditor"  class="item" exact-active-class='active'>发表文章</nuxt-link> 
		
	</ul>
</template>
<script>
	export default {}
</script>

<style scoped>
	.comyainer{background-color:#304156;}
    .item{padding-left: 20px; height: 60px;width: 180px;box-sizing: border-box;background: #0d1620;line-height: 60px;font-size: 14px;color: #fff;cursor: pointer;}
    .item:hover{background: transparent;}
    .active{background: transparent;}
    .item .icon{width: 20px;height: 20px;margin-top: 20px;background: url('~static/icon/flamingBird.png');margin-right:10px;}
</style>
 -->
<template>
 	<div>
		<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true" >
		  	<el-menu-item index="/admin">
			    <i class="el-icon-setting"></i>
			    <span slot="title">首页</span>
		 	</el-menu-item>
			<el-submenu index="/admin/banner">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span slot="title">配置</span>
				</template>
				<el-menu-item index="/admin/banner">banner</el-menu-item>
				<el-menu-item index="/admin/ArticleManagement">文章管理</el-menu-item>
			</el-submenu>
		</el-menu>
 	</div>
</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>

<script>
	import Bus from '~/assets/js/bus.js'
	export default {
		data() {
			return {
				isCollapse: false
			};
		},
		mounted(){
			this.getCollapse();
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			getCollapse(){
				Bus.$on('isShow',(data)=>{
					this.isCollapse = data;
				})
			}
		}	
	}
</script>
<template>
	<div class="conHeader clearfix">
		<el-button type="info" @click='changeCollapse' class="fl">
			<i :class="actClass"></i>
		</el-button>
	</div>
</template>
<script>
	import Bus from '~/assets/js/bus.js'
	export default {
		data(){
			return {
				isCollapse:false,
				actClass : 'el-icon-arrow-left'
			}
		},
		methods:{
			changeCollapse(){
				this.isCollapse = !this.isCollapse;
				if(this.isCollapse){
					this.actClass = "el-icon-arrow-right";
				}else{
					this.actClass = "el-icon-arrow-left";
				}
				Bus.$emit('isShow',this.isCollapse);
			}
		}
	}
</script>

<style scoped>
	.conHeader{padding:10px 20px;border-bottom: 1px solid #ccc;}
</style>
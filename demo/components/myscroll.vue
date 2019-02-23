https://github.com/lhyyp/koa2-node-mysql.git<template>
	<div class="contianer">
	    <ul class="clearfix " :style="{width:getWith(),left:num+'px'}">
	    	<li v-for="(item,index) in arr" :key="index" class="item fl">{{item}}</li>
	    </ul>	
	    <div class="leftBtn btn" @click="goLeft"><span></span></div>
	    <div class="rightBtn btn" @click="goRight"><span></span></div>
	</div>
</template>
<script>
	export default {
		data () {
	        return {
	            arr:[1,2,3,4,5,6,7,8,9,10],
	            num:0
	        }
	    },
	    methods:{
	    	getWith(){
	    		return this.arr.length*305-20+'px'
	    	},
	    	goLeft(){
	    		let oWith = this.arr.length*305-20  ;   //容器宽度	    		
	    		if(this.num > 1200-oWith){
	    			this.num = this.num-305;
	    		}
	    	},
	    	goRight(){
	    		if(this.num < 0){
	    			this.num = this.num+305;
	    		}

	    	}
	    }
	}
</script>
<style>
.item{width: 285px;height: 280px;background: #ccc;color: #fff;text-align: center;line-height: 280px;}
.item+.item{margin-left: 20px;}
.contianer{width: 1200px;height: 320px;padding: 20px 0;box-sizing:border-box;margin:0 auto;position: relative;overflow: hidden;}
.contianer ul{transition: all 1.2s ease;position: absolute;}
.btn{ ulwidth: 40px;height: 140px;background: #333;position: absolute;top:70px;}
.leftBtn{left: 0;}
.rightBtn{right:0;}
.btn span{border-top:1px solid #fff;border-right:1px solid #fff;display: block;width: 20px;height: 20px;margin:60px 10px;}
.leftBtn span{transform: rotate(225deg);}
.rightBtn span{transform: rotate(45deg);}

</style>

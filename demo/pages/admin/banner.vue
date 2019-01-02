<template>
	<div class="home">
		<el-button type="primary" @click="add">添加</el-button>
		<ul class="box">
			<li class="item" v-for='(item,index) in form' :key="index">
				<div>
					<el-input placeholder="请输入内容" v-model="item.url">
					    <template slot="prepend">Http://</template>
					</el-input>
				</div>
				<!-- <my-upload  v-on:files="files" :title='title'  @click.native='getIndex(index)'></my-upload> -->
				<el-upload action="/api/uploadImg" list-type="picture-card" :data="item.url">
					<i class="el-icon-plus"></i>
				</el-upload>
					
			</li>
		</ul>
		  <el-button type="primary" plain @click="submitBanner">submit</el-button>

		
	</div>
</template>	
<style scoped>
	.home{background: #f0f2f5;padding: 20px;}
	.box{display: flex;margin: 20px auto;}
	.box .item{width: 400px;padding:20px 50px;box-sizing: border-box;border:1px solid #ccc;border-radius: 10px;background: #fff;}
</style>
<script>
import myUpload from '@/components/upload'
import axios from 'axios'
import { Message } from 'element-ui';
export default {
  data () {
    return {
    	title:'banner图片',
    	uploadIndex:null,
    	form:[
    	 	{url:null,file:null}
    	]

    }
  },
  components: {
    myUpload
  },
  mounted(){
  },
  methods:{
    files (files)  {     // files就是子组件传过来的值
    	this.form[this.uploadIndex].file = files;
    },
    add(){
    	this.form.push({url:null,file:null})
    },
    getIndex(index){
    	this.uploadIndex = index;
    },
    submitBanner(){
    	let formData = new FormData();
    	this.form.forEach((ietm)=>{
    		formData.append("src", ietm.file);
    		formData.append("url", ietm.url);

    	})
		let loading = this.$loading({
          lock: true,
          text: '发表中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)',
          customClass:'loading'
        });
    	axios.post('/api/addBanner',formData).then(
        (res) => {
        	loading.close();
			if(res.data.code == 200){
				Message({
					type: 'success',
					message: res.data.message,
					customClass:'message'
				});
			}else{
				Message(res.data.message);
			}
        }).catch(
			(error) => {
				loading.close();
				Message('服务器错误');
			}
        )

    }

   
    
  }
}
</script>
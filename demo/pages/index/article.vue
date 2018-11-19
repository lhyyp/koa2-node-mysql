<template>
	<div class="box clearfix">
	    <div class="left">
	      <div v-if='list.result.length>0'>
	        <ul>
	           <router-link :to="{path:'/deatil',query:{ id:item.id }}" tag="li" class="article-item clearfix" v-for='(item,index) in list.result' :key='index'>
	              <div  class="news-img-box fl">
	                <img srcset="" sizes="" :src='"/upload/"+item.picturesArticle' class="" width='200' height="140">             
	              </div> 
	              <div  class="news-content fl">
	                  <h3  class="title-h3">{{item.title}}</h3> 
	                  <div  class="author-info clearfix">
	                    <p class="author fl">
	                        <img  :src="/upload/+item.Headportrait" width="33" height="33"  class="author-img"> 
	                        <span >{{item.author}}</span>
	                    </p> 
	                    <span  class="date-time fl">发布时间：<em>{{item.publicationTime}}</em></span> 
	                    <span  class="classify fl">分类：{{item.classification}}</span>
	                  </div> 
	                  <p class="news-info">{{item.abstract}}</p>
	              </div>
	            </router-link>
	        </ul>
	        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 5]" :page-size="number" layout="total, sizes, prev, pager, next, jumper" :total="list.count" background class='marginB30' ></el-pagination>
	      </div>
	      <div v-else>
	        暂无数据
	      </div>
	    </div>
	    <div class="right">
	      right
	    </div>
  </div>
</template>
<script type="text/javascript">
	import axios from 'axios'
	export default{
		async asyncData (app) {			
		    let list = await app.$axios.get('/api/getArtiList');
		    let Articlepicture = await app.$axios.get('/api/getArticlepictures');
		    if(list.data.result !== null && Articlepicture !== null){
	            list.data.result.forEach((item) => {
					for(let i = 0 ; i < Articlepicture.data.result.length ; i++){
						if(item.classification === Articlepicture.data.result[i].id){   //把所有·文章分类id => 替换成分类名
							item.classification = Articlepicture.data.result[i].name;
						}
					}
	            })
	        }
		    return {
		      list: list.data
		    }
		},
		data () {
			return {
				page:1,                  //当前页码
				number:5                 //每页条数
			}
	    },
		methods: {
			handleSizeChange(val) {   //val => 每页条数
				this.number = val;
				this.getStus();
			},
			handleCurrentChange(val) {     //val => 当前页码
				this.page = val;
				this.getStus();
			},
			async getStus() {
		        let list = await axios.get('/api/getArtiList?page='+this.page+'&&number='+this.number);
		        this.list = list.data; 
  			}
		}
	}
</script>
<style scoped>
.left{float: left;width: 860px;}
.right{float: right;width: 290px;background: #fff;}
.article-item{padding: 25px 0; margin-left:20px;background: #fff;border-bottom: 1px solid #f0f0f0;margin-bottom:  20px ; cursor: pointer;}
.article-item:hover{    border-radius: 4px; box-shadow: 1px 3px 9px #ccc; transition: .3s;} .fl{float: left;}
.news-content{width: 600px;margin-left: 20px;}
.title-h3{height: 40px;line-height: 40px;font-size: 16px;}
.author-info{color:#919898;line-height: 33px;font-size: 14px;}
.author-info .author img{border-radius: 50%;}
.author-info .author span{color:#919898;line-height: 33px;margin-left: 10px;}
.author-info .date-time{margin: 0 25px;}
.author-info .date-time em{font-style: normal;}
.news-info{color: #526163; overflow: hidden; font-size: 14px; padding-top:10px ;overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;}
.marginB30{margin-bottom: 30px;}
</style>
<template>
  <div class="box clearfix">
    <div class="left">
      <div v-if='list.length>0'>
        <ul>
           <router-link :to="{path:'/ArticleDeail',query:{ id:item.id }}" tag="li" class="article-item clearfix" v-for='(item,index) in list' :key='index'>
              <div  class="news-img-box fl">
                <img srcset="" sizes="" :src='"/upload/"+item.picturesArticle' class="" width='205' height="140">             
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
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 5]" :page-size="number" layout="total, sizes, prev, pager, next, jumper" :total="count" background class='marginB30' ></el-pagination>
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
<script>
  import axios from 'axios'
  export default {
    name: 'MyArticle',
    data () {
      return {
        id: '',                   // 用户ID
        page:1,                  //当前页码
        number:5,                //每页条数
        count :null,               //总页数
        list:[],                //文章列表
        getArticlepicture:null   //所有文章分类
      }
    },
    mounted(){
      this.getArticlepictures();   //获取所有文章分类
      this.getStus();
    },
    methods:{
      handleSizeChange(val) {   //val => 每页条数
        this.number = val;
        this.getStus();
      },
      handleCurrentChange(val) {     //val => 当前页码
        this.page = val;
        this.getStus();
      },
      getStus() {
        this.id = this.$route.params.id || 0;   // 用户ID
        this.getArtiList().then(() => {    //获取文章列表
          if(this.list !== null && this.getArticlepicture !== null){
            this.list.forEach((item) => {
              for(let i = 0;i<this.getArticlepicture.length;i++){
                if(item.classification === this.getArticlepicture[i].id){   //把所有·文章分类id => 替换成分类名
                  item.classification = this.getArticlepicture[i].name
                }
              }
            })
          }
        });    //获取文章列表

      },
      getArticlepictures () {    //获取所有文章分类
          axios.get('/api/getArticlepictures').then(
          (res) => {
            this.getArticlepicture = res.data.result;      
          }).catch(
            (error) => {
              Message('服务器错误');
            }
          )
      },
      getArtiList(){      //获取文章列表
         return axios.get('/api/getArtiList/?id='+this.id+'&&page='+this.page+'&&number='+this.number).then(
          (res) => {
            if(res.data.code == 200){
              this.list = res.data.result;
              this.count = res.data.count;
            }else{
              this.list = [];
            }
          }).catch(
          function(error){
            console.log(error);
        })
      }
    }
  }
</script>
<style scoped>
.left{float: left;width: 860px;}
.right{float: right;width: 290px;background: #fff;}
.article-item{padding: 25px 0; background: #fff;border-bottom: 1px solid #f0f0f0;margin-bottom:  20px ; cursor: pointer;}
.article-item:hover{    border-radius: 4px; box-shadow: 1px 3px 9px #ccc; transition: .3s;} .fl{float: left;}
.news-content{width: 615px;margin-left: 20px;}
.title-h3{height: 40px;line-height: 40px;font-size: 16px;}
.author-info{color:#919898;line-height: 33px;font-size: 14px;}
.author-info .author img{border-radius: 50%;}
.author-info .author span{color:#919898;line-height: 33px;margin-left: 10px;}
.author-info .date-time{margin: 0 25px;}
.author-info .date-time em{font-style: normal;}
.news-info{color: #526163; overflow: hidden; font-size: 14px; padding-top:10px ;overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;}
.marginB30{margin-bottom: 30px;}
</style>
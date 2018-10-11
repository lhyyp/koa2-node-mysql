<template>
  <div class="box clearfix">
    <div class="left">
       <h2>{{ArtiDeailList.title}}</h2>
       <div class="detail-info-box">
          <ul class="clearfix">
              <li class="item-time">
                 编辑时间：<span class="date-time">{{ArtiDeailList.publicationTime}}</span>
              </li> 
              <li id="Browse">
                  浏览量:<span id="countnum">{{ArtiDeailList.pv}}</span>
              </li> 
              <li>
                作者:<span class="author">{{ArtiDeailList.author}}</span>
              </li>
            </ul>
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
    name: 'ArticleDeail',
    data () {
      return {
       ArtiDeailList:{}
      }
    },
    mounted(){
      this.getArtiDeail();
    },
    methods:{
       getArtiDeail () {    //获取文章详情
          axios.get('/api/getArtiDeail/?id='+this.$route.query.id).then(
          (res) => {
            this.ArtiDeailList = res.data.result;   
            console.log(this.ArtiDeailList)    
          }).catch(
            (error) => {
              Message('服务器错误');
            }
          )
      }
    }
  }
</script>
<style scoped>

.left{float: left;width: 860px;}
.right{float: right;width: 290px;background: #fff;}

</style>
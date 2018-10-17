<template>
  <div>
    <div class="box clearfix">
      <div class="left">
        <h2 class="tilte">{{ArtiDeailList.title}}</h2>
        <ul class="ArtiMessage">
            <li class="item-time">
               编辑时间：<span class="date-time marginL10">{{ArtiDeailList.publicationTime}}</span>
            </li> 
            <li class="Browse ">
                浏览量：<span class="countnum marginL10">{{ArtiDeailList.pv}}</span>
            </li> 
            <li>
              作者：<span class="author marginL10">{{ArtiDeailList.author}}</span>
            </li>
          </ul>
          <div v-html="ArtiDeailList.content" class="content"></div>
          <ReplyTextarea :id='0' :uid='0' v-on:addComment="addComment"  v-model="aaa" class='ReplyText' v-if='this.$store.getters.getToken == true'></ReplyTextarea>
          <div v-else>
              登录之后才可以评论哟,<router-link  to="/login" class='login'>立即登录</router-link> 
          </div>  
          <my-commentsList></my-commentsList>    
      </div>
      <div class="right">
        right
      </div>
    </div>
    <my-aside></my-aside>
  </div>
  
 
</template>
<script>
  import myAside from '@/components/home/aside'
  import myCommentsList from '@/components/home/CommentsList'
  import ReplyTextarea from '@/components/home/ReplyTextarea'
  import axios from 'axios'
  export default {
    name: 'ArticleDeail',
    data () {
      return {
       ArtiDeailList:{},
       aaa  : null
       
      }
    },
    components:{
      myAside,myCommentsList,ReplyTextarea
    },
    mounted(){
      this.getArtiDeail();
    },
    methods:{
       addComment(val){
          this.aaa = null;
          let data = {};
          data.articleId = this.$route.query.id;
          data.page = this.$store.getters.getPage ;
          data.number = this.$store.getters.getNumber;
          this.$store.dispatch('list',data)
       },
       getArtiDeail () {    //获取文章详情
          axios.get('/api/getArtiDeail/?id='+this.$route.query.id).then(
          (res) => {
            this.ArtiDeailList = res.data.result; 
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
.left{float: left;width: 840px;padding: 20px 10px;}
.right{float: right;width: 290px;background: #fff;}
.left .tilte{height: 50px;line-height: 50px;font-size: 20px;color: #0088db;text-align: center;}
.ArtiMessage{display: flex;display: -webkit-flex;justify-content:space-around;padding: 15px 0;border-top: 1px dashed #999;border-bottom: 1px dashed #999;}
.marginL10{margin-left: 10px;}
.content{padding: 10px 0;}
.marginB20{margin: 20px 0;}
.login{color: #029bf0;margin-left: 10px;}
</style>
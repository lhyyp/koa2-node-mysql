<template>
  <div class="box clearfix">
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
    <ReplyTextarea :id='0' :uid='0' class='ReplyText' v-model="val" v-on:addComment="addComment" v-if='this.$store.getters.getToken == true'/>
    <div v-else>
        登录之后才可以评论哟,<router-link  to="/login" class='login'>立即登录</router-link> 
    </div>  
    <commentsList :List = 'List' :Count='Count'/>
  </div>
</template>
<script>
import commentsList from '~/components/commentsList.vue'
import ReplyTextarea from '~/components/ReplyTextarea'
export default {
  components: {
    commentsList,ReplyTextarea
  },
  async asyncData(app) {
    let ArtiDeailList = await app.$axios.get('/api/getArtiDeail/?id=' + app.query.id);
    let CommentsList = await app.$axios.get('/api/getCommentsList/?articleId=' + app.query.id);
    let List= null ,Count = null ;
    if(!CommentsList.data.result){
        List = [];
    }else{
      List = CommentsList.data.result;
      Count = CommentsList.data.count;
    }
    return {
      ArtiDeailList : ArtiDeailList.data.result,
      List  : List,
      Count : Count
    }
  },
  data () {
      return {
         val:null
      }
  },
  methods: {
    addComment(val){
        this.val = null;
        let data = {};
        data.articleId = this.$route.query.id;
        data.page = this.$store.getters.getPage ;
        data.number = this.$store.getters.getNumber;
        this.$store.dispatch('list',data)
      },

  }
}
</script>
<style scoped>
.box{width: 1200px;margin: 0 auto;}
.left {float: left; width: 840px; padding: 20px 10px; }
.right {float: right; width: 290px; background: #fff; }
.tilte {height: 100px; line-height: 100px; font-size: 20px; color: #0088db; text-align: center; }
.ArtiMessage {display: flex; display: -webkit-flex; justify-content: space-around; padding: 15px 0; border-top: 1px dashed #999; border-bottom: 1px dashed #999; }
.marginL10 {margin-left: 10px; }
.content {padding: 20px 0; }
.marginB20 {margin: 20px 0; }
.login {color: #029bf0; margin-left: 10px; }
.div_login{margin: 15px 0;}
</style>

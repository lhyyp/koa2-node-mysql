<template>
  <div class="box">
    <div v-if='getList.length'>
        <ul >
          <li v-for = '(item,index) in getList' :key='index' class='commentItem'>
            <div class='clearfix Item'>
              <div class='fl userInfo'>
               <img :src="/upload/+item.avator">
              </div>
              <div class='fl commentText'>
               <p class="text"><span>{{item.name}}</span>: {{item.content}}</p>
               <p class='time'>{{item.commentTime}}<a href="javascript:;"  @click='Reply(item,"sss"+index)' v-if='getToken == true' ><img src="/static/images/Reply.png"><span>回复</span></a></p>
              </div>
             <ReplyTextarea :id='item.id' :uid='item.uid' :name="'@ '+item.name+': '" v-on:addComment="addComment"  v-model="aaa" class='ReplyText' :ref="'sss'+index"></ReplyTextarea>
            </div>
            <div v-if='item.list.length' class="single-reply">
              <div class='clearfix Item' v-for='(itm,Index) in item.list' :key='Index'>
                <div class='fl userInfo'>
                  <img :src="/upload/+itm.avator">
                </div>
                <div class='fl commentText'>
                   <p>{{itm.name}}</p>
                   <p class="text">回复<span>{{itm.pName}}</span>: {{itm.content}}</p>
                   <p class='time'>{{itm.commentTime}}<a href="javascript:;"  @click="Reply(itm,'sss'+index+'-'+Index)" v-if='getToken == true'><img src="/static/images/Reply.png"><span>回复</span></a></p>
                </div>
                <ReplyTextarea :id='item.id' :uid='itm.uid' :name="'@ '+itm.name+': '" v-model="aaa" v-on:addComment="addComment"  class='ReplyText' :ref="'sss'+index+'-'+Index" ></ReplyTextarea>
              </div>
            </div>
          </li>
        </ul> 
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="getPage" :page-sizes="[10, 5]" :page-size="getNumber" layout="total, sizes, prev, pager, next, jumper" :total="getCount" background class='marginT30' ></el-pagination>
    </div>
    <div v-else> 想对作者说点什么？</div>

  </div>
</template>
<script>
  import axios from 'axios'
  import ReplyTextarea from '@/components/home/ReplyTextarea'
  import { MessageBox } from 'element-ui'
  import { mapGetters } from 'vuex'
  export default {
    name: 'CommentsList',
    data () {
      return {
        index : null,                // 显示的评论框
        comment : null,                 //评论框内容
        aaa: ''
      }
    },
    computed:{
      ...mapGetters(['getList','getCount','getToken','getPage','getNumber'])
    },
    components:{
       ReplyTextarea
    },
    mounted(){
      this.getStus();
    },
    methods:{
      addComment(val){
        if(val){
          this.getStus(() => {
            this.$refs[this.index][0].$el.className = "ReplyText";
            this.index = null;
          }); 
        }
      },
      getStus(fn){
        let data = {};
          data.articleId = this.$route.query.id;
          data.page = this.getPage ;
          data.number = this.getNumber;
          this.$store.dispatch('list',data).then( fn );
      },
      handleSizeChange(val) {   //val => 每页条数
        this.$store.commit('updataNumber',val)
        this.getStus();
      },
      handleCurrentChange(val) {     //val => 当前页码
        this.$store.commit('updataPage',val)
        this.getStus();
      },
      Reply(item,index){
        if(this.index == index){
          return ;
        }
        if(this.index !== null){    //已经打开一个评论框
          let name = '@ '+item.name+': ' ;
          let reg = new RegExp(name); 
          let aaa = this.aaa.replace(reg,'');
          if( aaa ){         //评论框之前有输入内容
            MessageBox.confirm('您确认要放弃正在编辑的评论吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {  //确定取消，并打开新的评论框
              this.aaa = '@ '+item.name+': '; 
              this.$refs[this.index][0].$el.className = "ReplyText";
              this.$refs[index][0].$el.className = "";
              this.index = index;                        
            }).catch(() => {

            })
          }else{
            this.aaa = '@ '+item.name+': '; 
            this.$refs[this.index][0].$el.className = "ReplyText";
            this.$refs[index][0].$el.className = "";
            this.index = index; 
          }
        }else{
          this.aaa = '@ '+item.name+': '; 
          this.$refs[index][0].$el.className = "";
          this.index = index;
        }
         
        
      } 
    }
  }
</script>
<style scoped>
.commentItem{padding: 10px;background: #fff;margin-bottom: 10px;}
.fl{float: left;}
.userInfo{display: block;}
.userInfo img{width: 50px;height: 50px;border-radius: 100%}
.commentText{width: 770px;}
.commentText .text{line-height: 30px;}
.commentText .text span{color: #295c9d;margin: 5px;}
.time{font-size: 12px;color: #777;height: 17px;line-height: 17px;}
.time a{display: none;margin-left: 20px; position: relative;}
.Item{margin-top: 10px;}
.Item:hover .fl>.time a{display: inline-block;}
.time a span{position: absolute;background: #555;display: none;width: 35px;height:20px;text-align: center;top:-25px;color: #fff;font-size: 12px;line-height: 20px;border-radius: 3px;left: -8px;}
.time a:hover span{display: block;}
.time img{height: 17px;}
.single-reply{padding: 5px 0 5px 50px;}
.single-reply .commentText{width: 720px;}
.box,.marginT30{margin-top: 30px;}
.marginT30{margin-bottom: 30px;}
.ReplyText{display: none}
</style>
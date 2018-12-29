<template>
  <div class="marginT30">
    <div v-if='getList.length'>
          <ul >
            <li v-for = '(item,index) in getList' :key='index' class='commentItem'>
              <div class='clearfix Item'>
                <div class='fl userInfo'>
                 <img :src="/upload/+item.avator">
                </div>
                <div class='fl commentText'>
                 <p class="text"><span>{{item.name}}</span>: {{item.content}}</p>
                 <p class='time'>{{item.commentTime}}<a href="javascript:;"  @click='Reply(item,"data-"+index)' v-if='getToken == true' ><img src="~/assets/images/Reply.png"><span>回复</span></a></p>
                </div>
                <ReplyTextarea :id='item.id' :uid='item.uid' :name="'@ '+item.name+': '" v-model="val" v-on:addComment="addComment" class='ReplyText' :ref="'data-'+index" ></ReplyTextarea>            
              </div>
              <div v-if='item.list.length' class="single-reply">
                <div class='clearfix Item' v-for='(itm,Index) in item.list' :key='Index'>
                  <div class='fl userInfo'>
                    <img :src="/upload/+itm.avator">
                  </div>
                  <div class='fl commentText'>
                     <p>{{itm.name}}</p>
                     <p class="text">回复<span>{{itm.pName}}</span>: {{itm.content}}</p>
                     <p class='time'>{{itm.commentTime}}<a href="javascript:;"  @click="Reply(itm,'data-'+index+'-'+Index)" v-if='getToken == true'><img src="~/assets/images/Reply.png"><span>回复</span></a></p>
                  </div>
                  <ReplyTextarea :id='item.id' :uid='itm.uid' :name="'@ '+itm.name+': '" v-model="val" v-on:addComment="addComment" class='ReplyText' :ref="'data-'+index+'-'+Index" ></ReplyTextarea>
                 
                </div>
              </div>
            </li>
          </ul> 
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="getPage" :page-sizes="[10, 5]" :page-size="getNumber" layout="total, sizes, prev, pager, next, jumper" :total="getCount" background class='marginT30' ></el-pagination>
      </div>

    

  </div>
</template>
<script>
  import axios from 'axios'
  import ReplyTextarea from '~/components/ReplyTextarea'
  import { MessageBox } from 'element-ui'
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
  export default {
    name: 'CommentsList',
    data () {
      return {
        index : null,                // 显示的评论框
        comment : null,                 //评论框内容
        val: ''
      }
    },
    computed:{
       ...mapGetters(['getList','getCount','getToken','getPage','getNumber'])
    },
    props:['List','Count'],
    components:{  
      ReplyTextarea   
    },
    mounted(){
      this.$store.commit('updataList',this.List);
      this.$store.commit('updataCount',this.Count);
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
          data.page = this.$store.getters.getPage ;
          data.number = this.$store.getters.getNumber;   
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
          let val = this.val.replace(reg,'');
          if( val ){         //评论框之前有输入内容
            MessageBox.confirm('您确认要放弃正在编辑的评论吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {  //确定取消，并打开新的评论框
              this.val = '@ '+item.name+': '; 
              this.$refs[this.index][0].$el.className = "ReplyText";  //隐藏之前显示的输入框
              this.$refs[index][0].$el.className = "";          //显示点击（ index => 确定显示的输入框的索引）输入框
              this.index = index;                               //跟新显示的输入框的索引                 
            }).catch(() => {

            })
          }else{
            this.val = '@ '+item.name+': '; 
            this.$refs[this.index][0].$el.className = "ReplyText";
            this.$refs[index][0].$el.className = "";
            this.index = index; 
          }
        }else{
          this.val = '@ '+item.name+': '; 
          this.$refs[index][0].$el.className = "";
          this.index = index;
        }
         
        
      }
    }
  }
</script>
<style scoped>
.commentItem{padding: 10px;background: #fff;margin-bottom: 10px;}
li{list-style: none;}
.fl{float: left;}
.userInfo{display: block;}
.userInfo img{width: 50px;height: 50px;border-radius: 100%}
.commentText{width: 770px;}
.commentText .text{line-height: 30px;}
.commentText .text span{color: #295c9d;margin: 5px;}
.time{font-size: 12px;color: #777;height: 17px;line-height: 17px;}
.time a{display: none;margin-left: 20px; position: relative;}
.Item{margin-top: 10px;overflow: hidden}
.Item:hover .fl>.time a{display: inline-block;}
.time a span{position: absolute;background: #555;display: none;width: 35px;height:20px;text-align: center;top:-25px;color: #fff;font-size: 12px;line-height: 20px;border-radius: 3px;left: -8px;}
.time a:hover span{display: block;}
.time img{height: 17px;}
.single-reply{padding: 5px 0 5px 50px;}
.single-reply .commentText{width: 720px;}
.marginT30{margin-top: 30px;}
.ReplyText{display: none}
</style>
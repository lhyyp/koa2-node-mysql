import axios from 'axios'
const state = {
	token:false,
	list:[],
	Count: null,    //总页数
	page:1,                  //当前页码
    number:5,                //每页条数
    memberInfo:{}

}
const getters = {
	getToken:state=>state.token,
	getList:state=>state.list,
	getCount:state=>state.Count,
	getPage:state=>state.page,
	getNumber:state=>state.number,
	getMemberInfo:state=>state.memberInfo

}
const mutations={
	updataToken(state,payloade){
        state.token=payloade
      },
	updataList(state,payloade){
		state.list=payloade
	},
	updataCount(state,payloade){
		state.Count=payloade
	},
	updataPage(state,payloade){
		state.page=payloade
	},
	updataNumber(state,payloade){
		state.number=payloade
	},
	updataMemberInfo(state,payloade){
        state.memberInfo=payloade;
      }
}
const actions={
	loginmess({ commit,state}){
	    return axios.get('/api/islogin').then((res) => {
		    	if(res.data.code == 0){
		    		commit('updataToken',false)
		    	}else{
		    		commit('updataToken',true);
		    		commit('updataMemberInfo',res.data)
		    	}
		   
		    }, (err) => {
		      console.log(err)
	    })
	  },
	  list({ commit,state},data){
	    return axios.get('/api/getCommentsList',{params:data}).then((res) => {
		    	if(res.data.result){
	             	commit('updataList',res.data.result);
	             	commit('updataCount',res.data.count);
	            }else{
	            	commit('updataList',[]);
	             	commit('updataCount',0)
	            }
		    }, (err) => {
		      console.log(err)
	    })
	  }
}
export default({
	state,getters,mutations,actions
})
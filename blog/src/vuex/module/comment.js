import axios from 'axios'
const state={
	list:[],
	Count: null,    //总页数
	page:1,                  //当前页码
    number:5,                //每页条数

}
const getters={
	getList:state=>state.list,
	getCount:state=>state.Count,
	getPage:state=>state.page,
	getNumber:state=>state.number,

}
const mutations={
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
	}
}
const actions={
	  list({ commit,state},data){
	    return axios.get('/api/getCommentsList',{params:data}).then((res) => {
		    	if(res.data.result){
		    		console.log(res.data.result)
	             	commit('updataList',res.data.result);
	             	commit('updataCount',res.data.count);
	            }
		    }, (err) => {
		      console.log(err)
	    })
	  }
}
export default({
	state,getters,mutations,actions
})
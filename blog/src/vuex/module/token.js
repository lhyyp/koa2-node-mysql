import axios from 'axios'
const state={
	token:0,
	memberInfo:{1:1}
}
const getters={
	getToken:state=>state.token,
	getMemberInfo:state=>state.memberInfo
}
const mutations={
	updataToken(state,payloade){
        state.token=payloade
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
		    		commit('updataToken',true)
		    		commit('updataMemberInfo',res.data.data)
		    	}
		   
		    }, (err) => {
		      console.log(err)
	    })
	  }
}
export default({
	state,getters,mutations,actions
})
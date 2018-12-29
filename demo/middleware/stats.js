
export default function ({ route,store,redirect,res,app}) {
	var nameList =['wangeditor'];
	if(store.getters.getToken == null){
	  	store.dispatch('loginmess').then(()=>{
	  		check(nameList,route,store,redirect);
	  	})
	}else{
	  	check(nameList,route,store,redirect);
	}
}
function check(nameList,route,store,redirect){
	if(nameList.indexOf(route.name)!=-1){
	  	if(route.name == 'login' || route.name == 'register'){
	  		if (store.getters.getToken){
	  			return redirect('/')
	  		}else{
	  			route.app.urls = route.fullPath    
	  		}
	  	}else{
	  		if (!store.getters.getToken){
	  			return redirect('/members/login')
	  		}
	  	}
	}
}

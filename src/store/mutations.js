
import getters from './getters.js';

var state = {
	token: null,
	mylogin: false,
	mylogout: true
}
const mutations = {
	login(state,data){
		localStorage.token = data;
		state.token = data;
	},
	loginout(state,data){
		localStorage.removeItem('token');
		state.token = null
	},
	add1(state){
		state.mylogin = true
	},
	del1(state){
		state.mylogin = false
	},
	add2(state){
		state.mylogout = true
	},
	del2(state){
		state.mylogout = false
	}
}


export default{
	state,
	mutations,
	getters
}

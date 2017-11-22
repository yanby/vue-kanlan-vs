import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import store from './store/index.js'
import router from './router/index.js'
import verify from "vue-verify-plugin"
import reg from "./validate/index.js"


Vue.prototype.$http = axios;
Vue.use(verify,{
    blur:true,
    rules: reg
});



// http request 拦截器
axios.interceptors.request.use(
    config => {
      config.headers["X-Requested-With"] = "XMLHttpRequest";
      if (store.state.mutations.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = store.state.mutations.token;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
       if(response.data.code == -999){
           layer.msg("登录超时,请重新登录！")
           store.commit("loginout");
           router.replace({
               path: '/login',
               query: {redirect: router.currentRoute.fullPath}
           })
       }
      return response;
    },
    error => {
        return Promise.reject(error)
    });

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})





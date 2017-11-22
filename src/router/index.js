import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index.js'


Vue.use(Router);

import Home from "../components/home/Home.vue";

import Falv from "../components/FooterPage/Falv.vue";
import Yinsi from "../components/FooterPage/Yinsi.vue";
import Guanyu from "../components/FooterPage/Guanyu.vue";
import Yijian from "../components/FooterPage/Yijian.vue";
import Lianxi from "../components/FooterPage/Lianxi.vue";

/*登录页面相关路由*/
import Login from "../components/login/Login.vue"
import WriteEmai from "../components/password/WriteEmai.vue";
import CheckEmai from "../components/password/CheckEmai.vue";
import SucceedEmail from "../components/password/SucceedEmail.vue";

/*注册页面相关路由*/
import Register from "../components/register/Register.vue"
import bindPhone from "../components/register/bindPhone.vue"

/*个人中心相关路由*/
import AccountSet from "../components/personCenter/AccountSet.vue"
import AccountCenter from "../components/personCenter/AccountCenter.vue"
import OrderCenter from "../components/personCenter/OrderCenter.vue"

/*账户设置路由*/
import UpdatePassword from "../components/AccountSet/UpdatePassword.vue"
import UpdatePhone from "../components/AccountSet/UpdatePhone.vue"
import UpdateEmail from "../components/AccountSet/UpdateEmail.vue"

/*立即支付路由*/
import Payment from "../components/payment/Payment.vue"

/*实名认证路由*/
import personSucceed from "../components/certification/personSucceed.vue"
const router =  new Router({
	mode: "history",
	scrollBehavior: ()=>({y:0}),
	routes: [
		{
			path: "*",
			redirect: "/home"
		},
		{
			path: "/",
			redirect: "/home"
		},
		{
			path: "/login",
			component: Login
		},
		{
			path: "/register",
			component: Register
		},
		{
			path: "/home", 
			component: Home,
		},
		{
			path: "/FooterPage/falv",
			component: Falv,
			name : "falv"
		},
		{
			path: "/FooterPage/yinsi",
			component: Yinsi
		},
		{
			path: "/FooterPage/guanyu",
			component: Guanyu
		},
		{
			path: "/FooterPage/yijian",
			component: Yijian
		},
		{
			path: "/FooterPage/lianxi",
			component: Lianxi
		},
		{
			path: "/password/WriteEmai",
			component: WriteEmai
		},
		{
			path: "/password/CheckEmai:email",
			name: "CheckEmai",
			component: CheckEmai
		},
		{
			path: "/password/SucceedEmail:email",
			name: "SucceedEmail",
			component: SucceedEmail
		},
		{
			path: "/register/phone",
			meta: {
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			},
			component: bindPhone
		},
		{
			path: "/personCenter/AccountSet",
			meta: {
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			},
			component: AccountSet
		},
		{
			path: "/personCenter/AccountCenter",
			meta: {
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			},
			component: AccountCenter
		},
		{
			path: "/personCenter/OrderCenter",
			meta: {
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			},
			component: OrderCenter
		},
		{
			path: "/AccountSet/UpdatePassword",
			meta: {
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			},
			component: UpdatePassword
		},
		{
			path: "/AccountSet/UpdatePhone",
			meta: {
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			},
			component: UpdatePhone
		},
		{
			path: "/AccountSet/UpdateEmail",
			meta: {
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			},
			component: UpdateEmail
		},
		{
			path: "/payment/Payment/:id",
			name: "payment",
			meta: {
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			},
			component: Payment
		},
		{
			path: "/certification/personSucceed",
			meta: {
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			},
			component: personSucceed
		}
	]
})
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
	store.commit("login", window.localStorage.getItem('token'))
}

router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requireAuth)) {  // 判断该路由是否需要登录权限
		if (store.state.mutations.token) {  // 通过vuex state获取当前的token是否存在
			next();
		}
		else {
			next({
				path: '/login',
				query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	}
	else {
		next();
	}
})

export default router;

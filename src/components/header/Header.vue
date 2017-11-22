<template>
	<div class="header">
		<h1>APP开发者之家</h1>
		<div class="header-wrap">
			<ul class="nav">
				<li><router-link to="/home">首页</router-link></li>
				<li><a href="javascript:;">安全</a>
					<dl class="teshu">
						<dt class=""><a href="">个人认证</a></dt>
						<dt class="b0"><a href="">单位认证</a></dt>
					</dl>
				</li>
				<li><a href="javascript:;">版权</a>
					<dl class="teshu">
						<dt><router-link to="/BanQuan">软著登记</router-link></dt>
						<dt class="b0"><router-link to="/BanQuan/chaxun">软著查询</router-link></dt>
					</dl>
				</li>
				<li><a href="javascript:;">游戏备案</a></li>
				<li><a href="javascript:;">网络维权</a></li>
				<li><a href="javascript:;">帮助中心</a>
					<dl>
						<dt class="b0"><router-link to="/FooterPage/lianxi">联系我们</router-link></dt>
					</dl>
				</li>
				<li class="m0" v-show="mylogout"><router-link to="/login">登录</router-link> | <router-link to="/register">注册</router-link>
				</li>
				<li class="m0" v-show="mylogin"><span id="user">{{username}}</span>
					<dl class="other">
						<dt><router-link to="/personCenter/AccountCenter">账户中心</router-link></dt>
						<dt><a href="">软著登记</a></dt>
						<dt><router-link to="/personCenter/OrderCenter">订单中心</router-link></dt>
						<dt><a href="">消息中心</a></dt>
						<dt class="b0"><a href="javascript:;" @click="esc()">退出</a></dt>
					</dl>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from "vuex";
	export default{
		data(){
			return {
				username: ""
			}
		},
		mounted(){
			this.username = "您好，欢迎您！"
		},
		updated(){
			var str = localStorage.getItem("user")
			var user = JSON.parse(str);
			if(user){
				if(user.loginName.length >= 20){
					var abc = user.loginName.substring(0,20)
					this.username = abc + "...";
				}else{
					this.username = user.loginName;
				}
			}
		},
		computed: {
			...mapGetters([
				'mylogin',
				'mylogout'
			])
		},
		methods: {
			esc()
			{
				this.$http.post(logoutUrl).then(function (res) {
					console.log(res)
					if (res.data.code == 100) {
						$.cookie("user", null)
						localStorage.clear();
						this.$store.dispatch("add2")
						this.$store.dispatch("del1")
						this.$store.commit("loginout", res.data.content.token)
						this.$router.push({path: "/home"})
					}
				}.bind(this)).catch(function (err) {
					console.log("Header页面错误：", err)
				})
			}
		}
	}
</script>
<style lang="less" scoped>

</style>
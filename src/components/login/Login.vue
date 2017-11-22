<template>
	<div class="login-wrap">
		<div class="banner">
			<div class="login">
				<form action="" id="form">
					<h3>用户登录</h3>
					<ul class="content">
						<li><span class="account"></span><input type="text" placeholder="邮箱/手机号码" v-model="username" name="username" v-verify="username">
							<label class="cur" v-remind="username"></label>
						</li>
						<li><span class="password"></span><input type="password" placeholder="请输入您的密码" v-model="password" name="password" v-verify="password">
							<label class="cur" v-remind="password"></label>
						</li>
						<li><span class="pencil"></span>
							<input type="text" name="code" placeholder="请输入验证码" v-verify="code" v-model="code" style="width: 260px;">
							<a href='javascript:;' @click="changeImg()">
								<img id="validImg" :src="imgUrl" style="width: 100px;height: 40px;margin-left: 15px;">
							</a>
							<label class="cur" v-remind="code"></label>
						</li>
						<li style="margin-bottom: 0"><router-link to="/password/WriteEmai"  class="forgetPwd fr">忘记密码</router-link></li>
					</ul>
					<div class="btn">
						<router-link to="/register">注册</router-link>
						<a href="javascript:;" class="login_a fr bg-orange" @click="go()" id="loginfrom"> 登录</a>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
	import qs from 'qs';
	import {mapGetters,mapActions} from "vuex";
	export default{
		data(){
			return{
				username: "",
				password: "",
				loginName: "",
				code: "",
				imgUrl : imgUrl
			}
		},
		mounted(){
			this.changeImg();
		},
		verify: {
			username:["required","emailPhone"],
			password:["required","password"],
			code: ["required","code"]
		},
		methods: {
				...mapActions([
					'add1',
					"del2"
				]),
		changeImg(){
			this.imgUrl = imgUrl + "?date=" + new Date();
		},
		go(){
			if(this.$verify.check()){
				var data = {
					"username": this.username,
					"password": this.password
				}
				this.$http.post(loginUrl,qs.stringify(data)).then(function(res){
					console.log(res)
					if(res.data.code == 100){
						//成功以后向第三方发送请求
						$.ajax({
							type:'post',
							url: shimingUrl,
							data:{cookieValue:res.data.content.token},
							dataType:'jsonp',
							success:function(result){
								console.log(result);
							}
						});

						//保存用户所有信息
						var obj = res.data.content;
						var str = JSON.stringify(obj)
						localStorage.user = str;

						this.$store.commit("login", res.data.content.token)
						this.$store.dispatch("add1")
						this.$store.dispatch("del2")
						//判断又没有绑定手机号
						if(res.data.content.mobileTelephone){
							this.$router.push({path:"/personCenter/AccountCenter"})
						}else{
							this.$router.push({path:"/register/phone"})
						}

					}else{
						layer.msg(res.data.message)
					}
				}.bind(this)).catch(function(err){
					console.log("登录页面错误：",err)
				})
			}
		}
	}
	}
</script>
<style lang="less" scoped>
	@import "../../assets/css/denglu-zhuce.less";
</style>
<template>
	<div class="register">
		<div id="layer">
			<p class="top_p">恭喜您，账户注册成功！请使用账号密码直接登录</p><p>3秒后跳转到登录页，您也可以点击直接登录</p>
			<div><a href="javascript:;" @click="login()">立即登录</a></div>
		</div>
		<div id="modal-alert">
				<h4>1. 特别提示</h4>
				<p>移动应用安全版权服务平台同意按照本协议的规定及其不时发布的操作规则提供基于互联网以及移动网的相关服务（以下称“网络服务”），为获得网络服务，服务使用人（以下称“用户”）应当同意本协议的全部条款并按照页面上的提示完成全部的注册程序。用户在进行注册程序过程中点击“同意”按钮即表示用户完全接受本协议项下的全部条款。</p>
				<h5>1.1 用户注册成功后，移动应用安全版权服务平台将把用户注册账号时激活的邮箱作为用户名，用户可用此邮箱和绑定的手机号码作为登录帐号，账号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</h5>
				<h5>1.2 用户注册成功后，在使用移动应用安全版权服务平台服务的过程中，移动应用安全版权服务平台有权基于用户的操作行为进行非商业性的调查研究。</h5>
				<h4>2. 服务内容</h4>
				<h5>2.1 移动应用安全版权服务平台网络服务的具体内容由移动应用安全版权服务平台根据实际情况提供。</h5>
				<h5>2.2 移动应用安全版权服务平台提供的部分网络服务为收费的网络服务，用户使用收费网络服务需要向移动应用安全版权服务平台支付一定的费用。对于收费的网络服务，移动应用安全版权服务平台会在用户使用之前给予用户明确的提示，只有用户根据提示确认其愿意支付相关费用，用户才能使用该等收费网络服务。如用户拒绝支付相关费用，则移动应用安全版权服务平台有权不向用户提供该等收费网络服务。</h5>
				<h5>2.3 用户理解，移动应用安全版权服务平台仅提供相关的网络服务，除此之外与相关网络服务有关的设备（如个人电脑、手机、及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）均应由用户自行负担。	</h5>
				<h4>3. 服务变更、中断或终止</h4>
				<h5>3.1 鉴于网络服务的特殊性，用户同意移动应用安全版权服务平台有权随时变更、中断或终止部分或全部的网络服务（包括收费网络服务及免费网络服务）。如变更、中断或终止的网络服务属于免费网络服务，移动应用安全版权服务平台无需通知用户，也无需对任何用户或任何第三方承担任何责任；如变更、中断或终止的网络服务属于收费网络服务，移动应用安全版权服务平台应当在变更、中断或终止之前事先通知用户，并应向受影响的用户提供等值的替代性的收费网络服务，如用户不愿意接受替代性的收费网络服务，就该用户已经向移动应用安全版权服务平台支付的服务费，移动应用安全版权服务平台应当按照该用户实际使用相应收费网络服务的情况扣除相应服务费之后将剩余的服务费退还给该用户。</h5>
				<h5>3.2 用户理解，移动应用安全版权服务平台需要定期或不定期地对提供网络服务的平台（如互联网网站、移动网络等）或相关的设备进行检修或者维护，如因此类情况而造成收费网络服务在合理时间内的中断，移动应用安全版权服务平台无需为此承担任何责任，但移动应用安全版权服务平台应尽可能事先进行通告。</h5>
				<h5>3.3 如发生下列任何一种情形，移动应用安全版权服务平台有权随时中断或终止向用户提供本协议项下的网络服务【该网络服务包括但不限于收费及免费网络服务（其中包括基于广告模式的免费网络服务）】而无需对用户或任何第三方承担任何责任：</h5>
				<p>3.3.1 用户提供的身份信息不真实；</p>
				<p>3.3.2 用户违反本协议中规定的使用规则；</p>
				<p>3.3.3 用户在使用收费网络服务时未按规定向移动应用安全版权服务平台支付相应的服务费。</p>
				<h5>3.4 用户注册的免费网络服务帐号如存在违反法律法规或国家政策要求，或侵犯任何第三方合法权益的情况，移动应用安全版权服务平台有权冻结该账号在本平台的一切相关活动。</h5>
				<h4>4. 使用规则</h4>
				<h5>4.1 用户在申请使用移动应用安全版权服务平台网络服务时，必须向移动应用安全版权服务平台提供准确的身份资料，如身份资料有任何变动，必须及时更新。</h5>
				<h5>4.2 用户不应将其帐号、密码转让或出借予他人使用。如用户发现其帐号遭他人非法使用，应立即通知移动应用安全版权服务平台。因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用，移动应用安全版权服务平台不承担任何责任。</h5>
				<h5>4.3 用户同意移动应用安全版权服务平台有权在提供网络服务过程中以各种方式投放各种商业性广告或其他任何类型的商业信息（包括但不限于在移动应用安全版权服务平台网站的任何页面上投放广告），并且，用户同意接受移动应用安全版权服务平台通过电子邮件或其他方式向用户发送商品促销或其他相关商业信息。</h5>
				<h5>4.4 用户在使用移动应用安全版权服务平台网络服务过程中，必须遵循以下原则：</h5>
				<p>4.4.1 遵守中国有关的法律和法规；</p>
				<p>4.4.2 遵守所有与网络服务有关的网络协议、规定和程序；</p>
				<p>4.4.3 不得为任何非法目的而使用网络服务系统；</p>
				<p>4.4.4 不得以任何形式使用移动应用安全版权服务平台网络服务侵犯移动应用安全版权服务平台的商业利益，包括并不限于发布非经移动应用安全版权服务平台许可的商业广告；</p>
				<p>4.4.5 不得利用移动应用安全版权服务平台网络服务系统进行任何可能对互联网或移动网正常运转造成不利影响的行为；</p>
				<p>4.4.6 不得利用移动应用安全版权服务平台提供的网络服务上传、展示或传播任何虚假的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料；</p>
				<p>4.4.7 不得侵犯其他任何第三方的专利权、著作权、商标权、名誉权或其他任何合法权益；</p>
				<p>4.4.8 不得利用移动应用安全版权服务平台网络服务系统进行任何不利移动应用安全版权服务平台的行为；</p>
				<h5>4.5 移动应用安全版权服务平台有权对用户使用移动应用安全版权服务平台网络服务【该网络服务包括但不限于收费及免费网络服务（其中包括基于广告模式的免费网络服务）】的情况进行审查和监督(包括但不限于对用户存储在移动应用安全版权服务平台的内容进行审核)，如用户在使用网络服务时违反任何上述规定，移动应用安全版权服务平台或其授权的人有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户张贴的内容等、暂停或终止用户使用网络服务的权利）以减轻用户不当行为造成的影响。</h5>
				<h5>4.6 移动应用安全版权服务平台针对某些特定的移动应用安全版权服务平台网络服务的使用通过各种方式（包括但不限于网页公告、电子邮件、短信提醒等）作出的任何声明、通知、警示等内容视为本协议的一部分，用户如使用该等移动应用安全版权服务平台网络服务，视为用户同意该等声明、通知、警示的内容。</h5>
				<h4>5. 知识产权</h4>
				<h5>5.1移动应用安全版权服务平台提供的平台服务中包含的任何文本、图片、图形、音频和/或视频资料均受版权、商标和/或其它财产所有权法律的保护，未经相关权利人同意，上述资料均不得在任何媒体直接或间接发布、播放、出于播放或发布目的而改写或再发行，或者被用于其他任何商业目的。所有这些资料或资料的任何部分仅可作为私人和非商业用途而保存在某台计算机内。移动应用安全版权服务平台不就由上述资料产生或在传送或递交全部或部分上述资料过程中产生的延误、不准确、错误和遗漏或从中产生或由此产生的任何损害赔偿，以任何形式，向用户或任何第三方负责。</h5>
				<h5>5.2移动应用安全版权服务平台为提供平台服务而使用的任何软件（包括但不限于软件中所含的任何图像、照片、动画、录像、录音、音乐、文字和附加程序、随附的帮助材料）的一切权利均属于该软件的著作权人，未经该软件的著作权人许可，用户不得对该软件进行反向工程（reverse engineer）、反向编译（decompile）或反汇编（disassemble）。</h5>
				<h4>6.隐私保护</h4>
				<h5>6.1保护用户隐私是移动应用安全版权服务平台的一项基本政策，移动应用安全版权服务平台保证不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在移动应用安全版权服务平台的非公开内容，但下列情况除外：</h5>
				<p>6.1.1 事先获得用户的明确授权；</p>
				<p>6.1.2 根据有关的法律法规要求；</p>
				<p>6.1.3 按照相关政府主管部门的要求；</p>
				<p>6.1.4 为维护社会公众的利益；</p>
				<p>6.1.5 为维护移动应用安全版权服务平台的合法权益。</p>
				<h5>6.2 移动应用安全版权服务平台可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与移动应用安全版权服务平台同等的保护用户隐私的责任，则移动应用安全版权服务平台有权将用户的注册资料等提供给该第三方。</h5>
				<h5>6.3 在不透露单个用户隐私资料的前提下，移动应用安全版权服务平台有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</h5>
				<h4>7. 免责声明</h4>
				<h5>7.1 用户明确同意其使用移动应用安全版权服务平台网络服务所存在的风险将完全由其自己承担；因其使用移动应用安全版权服务平台网络服务而产生的一切后果也由其自己承担，移动应用安全版权服务平台对用户不承担任何责任。</h5>
				<h5>7.2 移动应用安全版权服务平台不担保网络服务一定能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。移动应用安全版权服务平台不保证为向用户提供便利而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由移动应用安全版权服务平台实际控制的任何网页上的内容，移动应用安全版权服务平台不承担任何责任。</h5>
				<h5>7.3 对于因不可抗力或移动应用安全版权服务平台不能控制的原因造成的网络服务中断或其它缺陷，移动应用安全版权服务平台不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</h5>
				<h5>7.4 用户同意，对于移动应用安全版权服务平台向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，移动应用安全版权服务平台无需承担任何责任：</h5>
				<p>7.4.1 移动应用安全版权服务平台向用户免费提供的各项网络服务；</p>
				<p>7.4.2 移动应用安全版权服务平台向用户赠送的任何产品或者服务；</p>
				<p>7.4.3 移动应用安全版权服务平台向收费网络服务用户附赠的各种产品或者服务。</p>
				<h4>8. 违约赔偿</h4>
				<h5>8.1 如因移动应用安全版权服务平台违反有关法律、法规或本协议项下的任何条款而给用户造成损失，移动应用安全版权服务平台同意承担由此造成的损害赔偿责任。</h5>
				<h5>8.2 用户同意保障和维护移动应用安全版权服务平台及其他用户的利益，如因用户违反有关法律、法规或本协议项下的任何条款而给移动应用安全版权服务平台或任何其他第三人造成损失，用户同意承担由此造成的损害赔偿责任。</h5>
				<h4>9. 协议修改</h4>
				<h5>9.1 移动应用安全版权服务平台有权随时修改本协议的任何条款，一旦本协议的内容发生变动，移动应用安全版权服务平台将会直接在移动应用安全版权服务平台网站上公布修改之后的协议内容，该公布行为视为移动应用安全版权服务平台已经通知用户修改内容。移动应用安全版权服务平台也可通过其他适当方式向用户提示修改内容。</h5>
				<h5>9.2 如果不同意移动应用安全版权服务平台对本协议相关条款所做的修改，用户有权停止使用网络服务。如果用户继续使用网络服务，则视为用户接受移动应用安全版权服务平台对本协议相关条款所做的修改。</h5>
				<h4>10. 通知送达</h4>
				<h5>10.1 本协议项下移动应用安全版权服务平台对于用户所有的通知均可通过网页公告、电子邮件、手机短信或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。</h5>
				<h5>10.2 用户对于移动应用安全版权服务平台的通知应当通过移动应用安全版权服务平台对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。</h5>
				<h4>11. 法律管辖</h4>
				<h5>11.1 本协议的订立、执行和解释及争议的解决均应适用中国法律并受中国法院管辖。</h5>
				<h5>11.2 如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向移动应用安全版权服务平台所在地的人民法院提起诉讼。</h5>
				<h4>12. 其他规定</h4>
				<h5>12.1 本协议构成双方对本协议之约定事项及其他有关事宜的完整协议，除本协议规定的之外，未赋予本协议各方其他权利。</h5>
				<h5>12.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</h5>
				<h5>12.3 本协议中的标题仅为方便而设，在解释本协议时应被忽略。</h5>
			</div>
		<div class="register-wrap">
			<div class="banner">
				<div class="register">
					<form action="" id="form">
						<div class="title"><span></span><router-link to="/login">返回登录</router-link></div>
						<h3>注册</h3>
						<ul class="content">
							<li><span class="email"></span><input type="text" placeholder="请输入邮箱" name="loginName" v-model="loginName" v-verify="loginName" id="loginName">
								<label class="cur" v-remind="loginName"></label>
							</li>
							<li><span class="pencil"></span><input type="text" placeholder="请输入邮箱验证码" v-verify="emailCode" v-model="emailCode" style="width: 260px;">
								<b id="send" class="send" @click="sendCode()" style="width: 100px;height: 36px;margin-left: 17px;line-height:36px;background: #ff8a00;color: #fff;display: inline-block;text-align: center;">发送验证码</b>
								<b id="sendNo" class="send" style="width: 100px;height: 36px;margin-left: 17px;line-height:36px;background: #ddd;color: #999;display: none;text-align: center;">60s</b>
								<label class="cur" v-remind="emailCode"></label>
							</li>
							<li><span class="lock"></span><input type="password" v-verify="password" placeholder="请输入密码，密码为8-16位数字字母组合，区分大小写" name="password"  v-model="password">
								<label class="cur" v-remind="password"></label>
							</li>
							<li><span class="lock"></span><input type="password" placeholder="请再次输入密码" name="confirm_password" v-model="confirm_password" v-verify="confirm_password">
								<label class="cur" v-remind="confirm_password"></label>
							</li>
							<li><span class="pencil"></span>
								<input type="text" name="validateCode" v-verify="code" placeholder="请输入验证码" id="validateCode" style="width: 260px;" v-model="code">
								<a href='javascript:;' @click="changeImg()">
									<img id="validImg" :src="imgUrl" style="width: 100px;height: 40px;margin-left: 15px;">
								</a>
								<label class="cur" v-remind="code"></label>
							</li>
						</ul>
						<p class="register-xieyi"><input type="checkbox" v-model="agree">我已阅读并同意<a class="protocol" @click="alert()"> 《用户注册协议》 </a>的条款</p>
						<div class="btn"><a href="javascript:;" class="bg-orange next" @click="go()" id="registerform">确定</a></div>
					</form>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import qs from 'qs';
	export default{
		data(){
			return{
				agree: false,
				loginName: "",
				password: "",
				emailCode: "",
				confirm_password: "",
				code: "",
				agree: "",
				imgUrl : imgUrl
			}
		},
		mounted(){
			this.changeImg();
		},
		verify: {
			loginName:["required","email"],
			password:["required","password"],
			code: ["required","code"],
			confirm_password: ["required",{
				test(val){
					var reg = this.password;
					var isok = false;
					if(val == reg){
						isok = true;
					}else{
						isok = false;
					}
					return isok;
				},
				message:"两次密码输入不一致！"
			}],
			emailCode: ["required",{
				test:function(val) {
					var reg = /^\d{6}$/;
					var result = reg.test(val)
					var isok = false;
					if (result) {
						var data = {
							email : this.loginName,
							validCode: this.emailCode
						}
						$.ajax({
							type: "post",
							url: checkRegEmailUrl,
							data: data,//序列化表单
							dataType: "json",
							async: false,
							success:function(data) {
								if(data.code == 100){
									isok = true;
								}else{
									isok = false;
								}
							}
						});
						console.log("return isok = "+ isok);
						return isok;
					}
				},
				message:"验证码输入有误！"
			}]
		},
		methods: {
			sendCode(){
				var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				var result = reg.test(this.loginName)
				if(!result){
					layer.msg("请先填写邮箱！")
				}else{
					var data = {
						email : this.loginName
					}
					this.$http.post(sendRegEmailUrl,qs.stringify(data)).then(function(res){
						console.log(res)
						if(res.data.code == 100){
							var time = 60;
							second();
							function second(){
								if(time == 0){
									$("#send").show();
									$("#sendNo").css({"display":"none"});
									$("#send").html("重新发送")
								}else{
									time--;
									$("#send").hide();
									$("#sendNo").css({"display":"inline-block"});
									$("#sendNo").html(time+"s")
									setTimeout(function(){
										second();
									},1000)
								}
							}
						}else{
							layer.msg(res.data.message)
						}
					}.bind(this)).catch(function(err){
						console.log("Register页面错误：",err)
					})
				}
			},
			changeImg(){
				this.imgUrl = imgUrl + "?date=" + new Date();
			},
			go(){
				var that = this;
				if(this.$verify.check()){
					if(this.agree){
						var data = {
							"loginName":this.loginName,
							"password":this.password
						}
						this.$http.post(regUrl,data).then(function(res){
							console.log(res)
							if(res.data.code == 100){
								this.$root.user = res.data.content;
								this.close = layer.open({
									type: 1,
									title: false,
									area: ['500px', '300px'],
									skin: 'psd',
									content: $("#layer")
								})
								setTimeout(function(){
									layer.close(that.close);
									that.$router.push({path:"/login"})
								},3000)
							}else{
								layer.msg(res.data.message)
							}
						}.bind(this)).catch(function(err){
							console.log("Register页面错误：",err)
						})
					}else{
						layer.msg("您还未同意用户注册协议！")
					}
				}
			},
			login(){
				layer.close(this.close)
				this.$router.push({path:"/login"})
			},
			alert(){
				layer.open({
					type: 1,
					title: "用户注册协议",
					skin: 'big',
					area: ['600px', '400px'],
					content: $('#modal-alert')
				});
			}
		}
	}
</script>
<style lang="less" scoped>
	@import "../../assets/css/denglu-zhuce.less";
	.psd .layui-layer-content{
		height: 200px!important;
		padding: 45px 20px 0px;
		text-align: center;
	}
	.psd .layui-layer-content .top_p{
		font-size: 16px;
		font-weight:bold;
		margin-bottom:20px;
	}
	.psd .layui-layer-content div{
		text-align: center;
		margin-top: 70px;
	}
	.psd .layui-layer-content div a{
		display: inline-block;
		width: 100px;
		height: 36px;
		background: #ff8a00;
		text-align: center;
		line-height: 36px;
		color: #fff;
		border-radius: 5px;
	}
</style>
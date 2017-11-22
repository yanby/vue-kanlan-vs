<template>
	<div class="daiwei-index">
		<div class="wrap clearfix">
			<PensonLeft></PensonLeft>
			<div class="right">
				<div class="right-whole">
					<div class="right_top">
						<div class="account">
							<span class="fl icon_account"></span>
							<div class="text fl">
								<p>实名认证</p>
								<p class="english">Certification</p>
							</div>
						</div>
						<div class="account_div">
							<div class="account_shenfen">
								<div class="text_line">
									<span  class="frist_title">
										<i class="icon_success"></i>
										实名认证成功
									</span>
								</div>
								<ul class="text_ul text_ul2">
									<li class="active">
										恭喜您实名认证成功，您的实名认证有效期为2017年11月6日-2018年11月6日！
									</li>
								</ul>
								<div class="seal"></div>
							</div>
							<div class="account_shenfen">
								<div class="text_line">
									<span>
										认证身份
									</span>
								</div>
								<ul class="text_ul">
									<li class="active" style="padding-top: 10px;">
										<span>姓名：</span><em>{{realName}}</em>
									</li>
									<li class="active">
										<span>身份证号：</span><em>{{identityNum}}</em>
									</li>
									<li class="active"i><span>认证类型：</span><em>{{userType}}</em></li>
									<li class="active" style="padding-bottom: 10px;"><span>认证途径：</span><em>银行卡核验</em></li>
								</ul>
							</div>
							<div class="account_shenfen" style="margin-bottom: 0">
								<div class="text_line">
									<span>
										<i class="icon_success"></i>
										认证身份
									</span>
								</div>
								<ul class="text_ul">
									<li class="active" style="padding: 10px;">
										个人实名认证成功后，您可根据自身情况选择是否继续认证单位，单位认证后通过后，您将以单位身份进行相关操作！  <a href="" style="margin-left: 10px;">查看详情</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import PensonLeft from "../personCenter/PensonLeft.vue";
	export default {
		data(){
			return{
				realName: "",
				identityNum:"",
				userType: ""
			}
		},
		mounted(){
			this.$http.post(userDetail).then(function(res){
				console.log(res)
				if(res.data.code == 100){
					this.realName = res.data.content.realName;//个人有没有认证
					this.identityNum = res.data.content.identityNum;//身份证号

					if(res.data.content.userType == 1){
						this.userType = "个人";//身份类型
					}else if(res.data.content.userType == 2){
						this.userType = "单位";//身份类型
					}
				}
			}.bind(this)).catch(function(err){
				console.log("Header页面错误：",err)
			})
		},
		components: {
			"PensonLeft": PensonLeft
		}
	}
</script>
<style lang="less" scoped>
	@import "../../assets/css/certification.less";
</style>
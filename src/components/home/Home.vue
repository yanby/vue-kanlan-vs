<template>
	<div class="home">
		<div class="banner">
			<ul class="banner-img">
				<li class="img3"><a href="javascript:;"></a></li>
				<li class="img1"><a href="javascript:;"></a></li>
				<li class="img2"><a href="javascript:;"></a></li>
				<li class="img3"><a href="javascript:;"></a></li>
				<li class="img1"><a href="javascript:;"></a></li>
			</ul>
			<div class="page">
				<span class="cur"></span>
				<span></span>
				<span class="m0"></span>
			</div>
		</div>
		<div class="content">
			<div class="w1200">
				<div class="gonggao"><span></span>目前服务平台处测试运行阶段，所有服务均免费提供。正式运行时间和服务标准另行公告。</div>
				<ul class="clearfix">
					<li>
						<div class="icon icon3"></div>
						<div class="txt"><b></b><span>实名认证</span><b></b></div>
						<a href = "/payservice/platpayStep1" class="btn">立即申请</a>
						<div class="msg">权威专业的实名认证服务 <br>
							一次认证-多平台通用</div>
					</li>
					<li>
						<div class="icon icon1"></div>
						<div class="txt"><b></b><span>软著登记</span><b></b></div>
						<a href = "/coprApply/index" class="btn">立即申请</a>
						<div class="msg">中国版权保护中心首次实现 <br>
							无纸化线上软著登记服务</div>
					</li>
					<li>
						<div class="icon icon2"></div>
						<div class="txt"><b></b><span>游戏备案</span><b></b></div>
						<div class="msg">业内人士审核，100%通过，30天出证</div>
						<a class="btn">立即申请</a>
					</li>
					<li>
						<div class="icon icon4"></div>
						<div class="txt"><b></b><span>网络维权</span><b></b></div>
						<div class="msg">提供侵权快速制止、侵权索赔和转授权服务!</div>
						<a class="btn">立即申请</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		created(){
			this.getCookie();
		},
		mounted(){
			this.silider();
		},
		methods: {
			silider(){
				var index = 0;
				var timer = null;
				var len = $(".page span").length;

				clearInterval(timer);
				timer = setInterval(function(){
					index++;
					sliding();
				}, 5000);

				function sliding() {
					if(index < len){
						$('.banner .banner-img').animate({left:'-'+((index+1)*100)+'%'}, 1000);
						$(".banner .page span").eq(index).addClass("cur").siblings().removeClass("cur");
					}else if(index >= len){
						$(".banner .page span").eq(0).addClass("cur").siblings().removeClass("cur");
						$('.banner .banner-img').animate({left:'-'+((len+1)*100)+'%'}, 1000,'swing',function () {
							$('.banner .banner-img').css({left:'-100%'});
						});
						index = 0;
					}
				}
				$('.banner').mouseenter(function(){
					clearInterval(timer);
				}).mouseleave(function(){
					timer = setInterval(function(){
						index++;
						sliding();
					}, 5000);
				});
				$(".page span").on("click",function () {
					if($('.banner-img').is(':animated')){
						return;
					}
					if(index == len - 1 && $(this).index() == 0){
						index++;
					}else if(index == 0 && $(this).index() == len-1){
						index--;
					}else{
						index = $(this).index();
					}
					sliding();
				})
			},
			getCookie(){
				var loginCode = $.cookie("loginCode"); //获取cookie中的用户名
				if(loginCode == ""){
					$.cookie('loginCode', '1', { expires: 7 });
				}else{

				}
			}
		}
	}
</script>
<style lang="less" scoped>
	@import "../../assets/css/index.less";
</style>
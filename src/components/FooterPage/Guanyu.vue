<template>
	<div class="yejiao-index">
		<div class="wrap clearfix">
			<LeftView></LeftView>
			<div id="right" class="fl">
				<div class="guanyu-us">
					<h3>关于我们</h3>
					<div class="guanyu-content">
						<h4>一.移动应用安全版权服务平台简介</h4>
						<p>移动应用安全版权服务平台是一家基于移动互联网背景的综合服务平台。由移动互联网应用安全与版权联盟、国家移动互联网应用安全管理中心（CNAAC)、广东移动互联网安全监测中心、中国版权保护中心（CPCC)、北京网络行业协会等联合建设。</p>
						<p>移动应用安全版权服务平台致力于为企业和移动应用开发者们提供实名认证、软著登记、安全检测、版号加急等系列优质服务，未来我们将持续丰富平台内容、深化技术应用、优化用户体验、完善服务体系，努力为用户创造更多价值！</p>
						<h4>二.平台服务</h4>
						<h5>1.实名认证</h5>
						<p>实名认证是由移动应用安全版权服务平台联合多家主流应用商店为企业和广大开发者提供的实名认证服务。我们采用领先行业标准的双重认证机制来核验用户身份的真实性，充分保护用户合法权益，同时实名认证结果受权威认可并与多家主流应用商店通用，用户只需一次认证，即可多平台通用。</p>
						<h5>2.软著登记</h5>
						<p>软著登记是由移动应用安全版权服务平台联合中国版权保护中心（CPCC)共同打造的全程无纸化线上软件著作权登记服务，致力为用户创造极致的软著登记服务体验。作为APP软件著作权线上唯一入口，我们提供的线上软著登记服务具有无纸化、透明、高效、简洁的特点，用户在家即可轻松申请。</p>
						<h5>3.安全检测</h5>
						<p>安全检测是由移动应用安全版权服务平台为广大开发者提供的APP安全检测服务。主要为用户提供APP风险管理、病毒检测与查杀、漏洞补丁识别与及时修复等系列APP安全问题解决方案，由国家计算机病毒应急处理中心提供权威检测结果。</p>
						<h5>4.版号加急</h5>
						<p>版号加急是由移动应用安全版权服务平台为广大游戏开发商提供的游戏版号申请、加急服务，帮助用户缩短版号申请周期，有效提升版号申请效率。</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import LeftView from "./left.vue";
	export default{
		components: {
			"LeftView": LeftView
		},
		mounted(){
			this.scroll();
		},
		methods:{
			scroll(){
				$(".guanyu-us .guanyu-content").mCustomScrollbar();
			}
		}
	}
</script>
<style lang="less" scoped>
	@import "../../assets/css/yejiao-center.less";
</style>
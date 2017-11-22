<template>
	<div>
		<div class="footer-one" v-show="mylogin">
			<div class="footer-wrap">
				<div class="footer-list">
					<router-link to="/FooterPage/falv">法律公告</router-link>
					<router-link to="/FooterPage/yinsi">隐私保护</router-link>
					<router-link to="/FooterPage/guanyu">关于我们</router-link>
					<router-link to="/FooterPage/yijian">意见反馈</router-link>
					<router-link to="/FooterPage/lianxi" class="m0">联系我们</router-link>
				</div>
				<div class="footer-msg"><span>移动应用安全版权服务平台 </span><span>地址：北京市朝阳区霄云路甲35号58幢 </span><span>京ICP备15003837号-2</span></div>
			</div>
		</div>
		<div class="footer-two" v-show="mylogout">
			<ul class="footer-content clearfix">
				<li>
					<dl>
						<dt><router-link to="/FooterPage/falv">法律公告</router-link></dt>
						<dt><router-link to="/FooterPage/yinsi">隐私保护</router-link></dt>
						<dt><router-link to="/FooterPage/guanyu">关于我们</router-link></dt>
						<dt><router-link to="/FooterPage/yijian">意见反馈</router-link></dt>
						<dt style="margin-bottom: 3px;"><router-link to="/FooterPage/lianxi">联系我们</router-link></dt>
					</dl>
				</li>
				<li class="center">
					<p>移动互联网应用安全与版权联盟</p>
					<p>国家移动互联网应用安全管理中心（CNAAC)</p>
					<p>广东移动互联网安全监测中心</p>
					<p>中国版权保护中心（CPCC) </p>
					<p>北京网络行业协会</p>
					<p class="m0">看兰（北京）数据技术服务有限公司</p>
				</li>
				<li class="right">
					<h3>移动应用安全版权服务平台</h3>
					<p class="mt20">邮箱：kf@safebq.com</p>
					<p>地址：北京市朝阳区霄云路甲35号58幢</p>
					<p style="margin-top: 40px;">京ICP备15003837号-2</p>
				</li>
				<li class="code">
					<div class="img"></div>
					<p>官方微信公众号</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from "vuex";
	export default{
		computed: {
			...mapGetters([
				'mylogin',
				'mylogout'
			])
		}
	}
</script>
<style lang="less" scoped>

</style>
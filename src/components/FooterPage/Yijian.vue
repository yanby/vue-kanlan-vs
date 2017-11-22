<template>
	<div class="yejiao-index">
		<div class="wrap clearfix">
			<LeftView></LeftView>
			<div id="right" class="fl">
				<div class="yijian-feedback">
					<div class="modal"></div>
					<h3>意见反馈</h3>
					<div class="content">
						<form action="" method="" autocomplete="off" id="form">
							<p>您在使用产品的过程中遇到的问题和对产品的建议，请在这里告诉我们，我们会努力改进，多谢您的宝贵意见！</p>
							<div class="feedback">
								反馈内容：<textarea name="advice" id="advice" placeholder="请输入您的意见和建议" v-model="opinion"></textarea>
							</div>
							<div class="text">上传附件，用于描述问题，最多只能上传三张</div>
							<div class="upload_wrap clearfix" id="upload_wrap">
								<div class="upload upload1 fl">
									<div class="btn">
										<span class="add">+</span>
										<input type="file" class="file" id="file1">
										<input type="hidden" id="img1" name="img1">
									</div>
									<div class="imgs">
										<img src="" alt="">
									</div>
								</div>
								<div class="upload upload2 fl">
									<div class="btn">
										<span class="add">+</span>
										<input type="file" class="file" id="file2">
										<input type="hidden" id="img2" name="img2">
									</div>
									<div class="imgs">
										<img src="" alt="">
									</div>
								</div>
								<div class="upload upload3 fl">
									<div class="btn">
										<span class="add">+</span>
										<input type="file" class="file" id="file3">
										<input type="hidden" id="img3" name="img3">
									</div>
									<div class="imgs">
										<img src="" alt="">
									</div>
								</div>
							</div>
						</form>
					</div>
					<div class="operation"><a href="javascript:;" class="next-a bg-orange" @click="go()">立即提交</a></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import qs from 'qs';
	import LeftView from "./left.vue";
	export default{
		data(){
			return{
				opinion: ""
			}
		},
		components: {
			"LeftView": LeftView
		},
		mounted(){
			upload($(".upload1"),"img1");
			upload($(".upload2"),"img2");
			upload($(".upload3"),"img3");
		},
		methods:{
			go(){
				var data = {
					advise: this.opinion
				}
				if(this.opinion){
					this.$http.post(userFeedBackUrl,data).then(function(res){
						console.log(res)
						if(res.data.code == 100) {
							layer.msg("您的意见提交成功！")
						}
					}.bind(this)).catch(function(err){
						console.log("Accountset页面错误：",err)
					})
				}else{
					layer.msg("请填写您的意见和建议！")
					return false;
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	@import "../../assets/css/yejiao-center.less";
</style>
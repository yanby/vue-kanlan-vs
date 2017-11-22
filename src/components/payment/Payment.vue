<template>
	<div class="fufei-data">
		<div id="mony"></div>
		<div class="w1000">
			<div class="title">
				<h1>支付款项</h1>
				<b></b>
			</div>
			<div class="content">
				<div class="content_nav">
					<span class="nav_icon"></span>
					<div class="nav_detail">
						<h2>订单提交成功！请您在 <a id="time">24小时00分00秒</a> 内完成支付</h2>
						<p>订单号：{{orderZid}}</p>
					</div>
					<p class="fr">应付金额： <span>300</span> 元</p>
				</div>
				<div class="content_table">
					<table>
						<tr>
							<th width="150" style="padding-left: 146px;"><span>支付款项</span></th>
							<th width="100"><span>金额（元）</span></th>
							<th width="100"><span>数量</span></th>
							<th width="150"><span>小计（元）</span></th>
						</tr>
						<tr>
							<td  style="padding-left: 146px">{{fund}}</td>
							<td>{{money}}</td>
							<td>{{num}}</td>
							<td>{{tatol}}</td>
						</tr>
					</table>
				</div>
				<div class="content_fapiao">
					<form action="">
						<div class="payment_methods">
							<label>支付方式：</label>
							<span class="zhifubao" :class="{'cur':isCur}" @click="zhifubao()"><b class="yes"></b></span>
							<!--<span class="weixin" :class="{'cur1':isCur1}" @click="weixin()"><b class="yes"></b></span>-->
						</div>
						<div class="line"></div>
						<div class="btn">
							<a href="javascript:;" class="bg-orange" @click="go()">立即支付</a>
						</div>
					</form>
				</div>
				<div class="content_footer">
					<p><i></i>平台认证费仅包含一次平台身份认证的费用，不包含平台其他服务并且不保证认证结果</p>
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
				isCur : true,
				isCur1 : false,
				fund: "",
				money: "",
				num : "",
				tatol: "",
				orderZid : ""
			}
		},
		mounted(){
			run($("#time"))
			this.orderZid = this.$route.params.id;
			console.log(this.orderZid)
			this.$http.get(orderInfoUrl+"?orderZid="+this.orderZid).then(function(res){
				console.log(res)
				if(res.data.code == 100){
					this.fund = res.data.content.productName;
					this.money = res.data.content.price;
					this.num = res.data.content.quantity;
					this.tatol = res.data.content.totalPrice;
				}
			}.bind(this)).catch(function(err){
				console.log("Header页面错误：",err)
			})
		},
		methods: {
			zhifubao(){
				this.isCur = true;
				this.isCur1 = false;
			},
			weixin(){
				this.isCur1 = true;
				this.isCur = false;
			},
			go(){
				this.$http.post(alipayOrderUrl+"?orderZid="+this.orderZid+"").then(function(res){
					console.log(res)
					if(res.data.code == 100){
						$("#mony").html(res.data.content);
						document.forms[0].submit()
					}else{
						layer.msg(res.data.message)
					}
				}.bind(this)).catch(function(err){
					console.log("Header页面错误：",err)
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	span.cur,span.cur1{
		border: 1px solid #ff8a00!important;
	}
	span.cur .yes,span.cur1 .yes{
		display: block;
	}
	.yes{
		display: none;
		width: 30px;
		height: 24px;
		position: absolute;
		top: 0;
		right: 0;
		background: url(../../assets/images/icon.png) -33px -834px no-repeat;
	}
	@import "../../assets/css/renzheng-fufei.less";
</style>
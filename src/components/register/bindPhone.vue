<template>
    <div>
        <ul id="codeMsg"><li>1，请确认该手机号是否为当前使用的手机号</li><li>2，请检查短信时否被安全软件拦截</li><li>3，由于运营商网络原因，短信可能延迟到达</li><li>4，若有其他问题，请与我们的客服人员联系</li></ul>
        <div id="layer">
            <p class="top_p">恭喜您，手机绑定成功！</p><p>3秒后跳转到个人中心，您也可以点击进入个人中心</p>
            <div><a href="javascript:;" @click="login()">个人中心</a></div>
        </div>
        <div class="email-yanzheng-sueeccd">
            <div class="banner">
                <div class="content">
                    <form action="" class="form">
                        <div class="mail_head">
                            <span></span>
                            <p class="fail_p public_color">登录成功,请先绑定手机号！</p>
                        </div>
                        <ul class="phone_form">
                            <li><span class="phone"></span><input v-model="phone" type="text" placeholder="每一个用户只能绑定一个手机号码" name="phone" v-verify="phone">
                                <label v-remind="phone" class="cur"></label></li>
                            <li><span class="pencil"></span><input v-verify="code" v-model="code" name="code" type="text" placeholder="请输入手机验证码" class="yanzheng_Code">
                                <b id="send1" class="send" @click="sendCode1()" style="width: 100px;height: 36px;margin-left: 17px;line-height:36px;background: #ff8a00;color: #fff;display: inline-block;text-align: center;">发送验证码</b>
                                <b id="sendNo1" class="send" style="width: 100px;height: 36px;margin-left: 17px;line-height:36px;background: #ddd;color: #999;display: none;text-align: center;">60s</b>
                                <label v-remind="code" class="cur"></label>
                            </li>
                        </ul>
                        <div class="bottom_btn">
                            <a href="javascript:;" class="btn bg-orange" @click="go()">确定</a>
                            <a href="javascript:;" class="code" @click="codeMsg()">没有收到验证码?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import qs from 'qs';
    export default {
        data(){
            return{
                close: "",
                phone: "",
                code: "",
                email: ""
            }
        },
        mounted(){
            var str = localStorage.getItem("user")
            var user = JSON.parse(str);
            this.email = user.loginName;
        },
        verify: {
            phone:["required","phone"],
            code: ["required",{
                test:function(val) {
                    var reg = /^\d{6}$/;
                    var result = reg.test(val);
                    var isok = false;
                    if (result) {
                        var data = {
                            phone : this.phone,
                            validCode: this.code
                        }
                        $.ajax({
                            type: "post",
                            url: checkRegPhoneUrl,
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
            codeMsg(){
                layer.open({
                    type: 1,
                    title: false,
                    area: ['500px', '300px'],
                    skin: 'demo-class',
                    content: $("#codeMsg")
                })
            },
            sendCode1(){
                var reg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
                var result = reg.test(this.phone)
                if(!result){
                    layer.msg("请先填写手机号！")
                }else {
                    var data = {
                        phone : this.phone
                    }
                    this.$http.post(sendRegPhoneUrl,qs.stringify(data)).then(function(res){
                        console.log(res)
                        if(res.data.code == 100){
                            var time = 60;
                            second1();
                            function second1() {
                                if (time == 0) {
                                    $("#send1").show();
                                    $("#sendNo1").css({"display": "none"});
                                    $("#send1").html("重新发送")
                                } else {
                                    time--;
                                    $("#send1").hide();
                                    $("#sendNo1").css({"display": "inline-block"});
                                    $("#sendNo1").html(time + "s")
                                    setTimeout(function () {
                                        second1();
                                    }, 1000)
                                }
                            }
                        }else{
                            layer.msg(res.data.message);
                        }
                    }.bind(this)).catch(function(err){
                        console.log("bindPhone页面错误：",err)
                    })
                }
            },
            go(){
                var that = this;
                if(this.$verify.check()){
                    var data = {
                        email: this.email,
                        phone : this.phone
                    }
                    this.$http.post(bindPhoneUrl,qs.stringify(data)).then(function(res){
                        console.log(res)
                        if(res.data.code == 100){
                            localStorage.resPhone = this.phone;
                            this.close = layer.open({
                                type: 1,
                                title: false,
                                area: ['500px', '300px'],
                                skin: 'psd',
                                content: $("#layer")
                            })
                            setTimeout(function(){
                                layer.close(that.close);
                                that.$router.push({path:"/personCenter/AccountCenter"})
                            },3000)
                        }else{
                            layer.msg(res.data.message);
                        }
                    }.bind(this)).catch(function(err){
                        console.log("bindPhone页面错误：",err)
                    })
                }
            },
            login(){
                layer.close(this.close)
                this.$router.push({path:"/personCenter/AccountCenter"})
            },
            back(){
                window.history.back();
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
    .demo-class #codeMsg{
        padding: 70px 20px 0;
        text-align: left!important;
    }
    .demo-class .layui-layer-content ul li{
        line-height: 30px;
    }
</style>

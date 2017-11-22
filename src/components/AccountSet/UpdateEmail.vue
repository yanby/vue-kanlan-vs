<template>
    <div class="shuru-password">
        <div id="layer" style="display: none">
            <p class="top_p">恭喜您，您的邮箱修改成功！请重新登录</p><p>3秒后跳转到登录页，您也可以点击重新登录</p>
            <div><a href="javascript:;" @click="login()">立即登录</a></div>
        </div>
        <div class="content">
            <form action="" class="form">
                <div class="title"><span></span><a href="javascript:;" @click="back()">返回</a></div>
                <div class="wire"></div>
                <h3>修改邮箱</h3>
                <ul>
                    <li><span class="pencil"></span><input v-verify="code" v-model="code" name="code" type="text" placeholder="请输入手机验证码" class="yanzheng_Code" style="width: 260px;">
                        <b id="send2" class="send" @click="sendCode1()" style="width: 100px;height: 36px;margin-left: 17px;line-height:36px;background: #ff8a00;color: #fff;display: inline-block;text-align: center;">发送验证码</b>
                        <b id="sendNo2" class="send" style="width: 100px;height: 36px;margin-left: 17px;line-height:36px;background: #ddd;color: #999;display: none;text-align: center;">60s</b>
                        <label v-remind="code" class="cur"></label>
                    </li>
                    <li><span class="email"></span><input type="text" placeholder="请输入新的邮箱" v-model="email" name="email" v-verify="email">
                        <label class="cur" v-remind="email"></label>
                    </li>
                    <li><span class="pencil"></span><input type="text" placeholder="请输入邮箱验证码" v-verify="emailCode" v-model="emailCode" style="width: 260px;">
                        <b id="send3" class="send" @click="sendCode()" style="width: 100px;height: 36px;margin-left: 17px;line-height:36px;background: #ff8a00;color: #fff;display: inline-block;text-align: center;">发送验证码</b>
                        <b id="sendNo3" class="send" style="width: 100px;height: 36px;margin-left: 17px;line-height:36px;background: #ddd;color: #999;display: none;text-align: center;">60s</b>
                        <label class="cur" v-remind="emailCode"></label>
                    </li>
                </ul>
                <div class="next"><a class="next-a bg-orange" @click="go()">确认</a></div>
            </form>
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
                email: "",
                emailCode: ""
            }
        },
        mounted(){
            this.$http.post(userDetail).then(function(res){
                console.log(res)
                if(res.data.code == 100) {
                    this.phone = res.data.content.mobileTelephone;
                }
            }.bind(this)).catch(function(err){
                console.log("Accountset页面错误：",err)
            })
        },
        verify: {
            email:["required","email"],
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
            }],
            emailCode: ["required",{
                test:function(val) {
                    var reg = /^\d{6}$/;
                    var result = reg.test(val)
                    var isok = false;
                    if (result) {
                        var data = {
                            email : this.email,
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
                var result = reg.test(this.email)
                if(!result){
                    layer.msg("请先填写邮箱！")
                }else{
                    var data = {
                        email : this.email
                    }
                    this.$http.post(sendRegEmailUrl,qs.stringify(data)).then(function(res){
                        console.log(res)
                        if(res.data.code == 100){
                            var time = 60;
                            second();
                            function second(){
                                if(time == 0){
                                    $("#send3").show();
                                    $("#sendNo3").css({"display":"none"});
                                    $("#send3").html("重新发送")
                                }else{
                                    time--;
                                    $("#send3").hide();
                                    $("#sendNo3").css({"display":"inline-block"});
                                    $("#sendNo3").html(time+"s")
                                    setTimeout(function(){
                                        second();
                                    },1000)
                                }
                            }
                        }else{
                            layer.msg(res.data.message);
                        }
                    }.bind(this)).catch(function(err){
                        console.log("Register页面错误：",err)
                    })
                }
            },
            sendCode1(){
                if(this.phone == "" || this.phone == null){
                    layer.msg("请先填写手机号！")
                }else{
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
                                    $("#send2").show();
                                    $("#sendNo2").css({"display": "none"});
                                    $("#send2").html("重新发送")
                                } else {
                                    time--;
                                    $("#send2").hide();
                                    $("#sendNo2").css({"display": "inline-block"});
                                    $("#sendNo2").html(time + "s")
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
                    this.$http.post(updateEmailUrl,qs.stringify(data)).then(function(res){
                        console.log(res)
                        if(res.data.code == 100){
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
                            layer.msg(res.data.message);
                        }
                    }.bind(this)).catch(function(err){
                        console.log("bindPhone页面错误：",err)
                    })
                }
            },
            login(){
                layer.close(this.close)
                this.$router.push({path:"/login"})
            },
            back(){
                window.history.back();
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/css/wangji-mima.less";
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
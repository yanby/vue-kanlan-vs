<template>
    <div class="shuru-password">
        <div id="layer" style="display: none">
            <p class="top_p">恭喜您，密码重置成功！请重新登录</p><p>3秒后跳转到登录页，您也可以点击重新登录</p>
            <div><a href="javascript:;" @click="login()">立即登录</a></div>
        </div>
        <div class="content">
            <form action="" class="form">
                <div class="title"><span></span><a href="javascript:;" @click="back()">返回</a></div>
                <div class="wire"></div>
                <h3>修改密码</h3>
                <ul>
                    <li><span class="pencil"></span><input type="text" placeholder="请输入邮箱验证码" v-verify="emailCode" v-model="emailCode" style="width: 260px;">
                        <b id="send" class="send" @click="sendCode()" style="width: 100px;height: 36px;margin-left: 17px;line-height:36px;background: #ff8a00;color: #fff;display: inline-block;text-align: center;">发送验证码</b>
                        <b id="sendNo" class="send" style="width: 100px;height: 36px;margin-left: 17px;line-height:36px;background: #ddd;color: #999;display: none;text-align: center;">60s</b>
                        <label class="cur" v-remind="emailCode"></label>
                    </li>
                    <li><span class="email"></span><input type="password" v-verify="password" v-model="password" placeholder="请输入新密码，密码为8-16位数字字母组合，区分大小写" name="password">
                        <label class="cur" v-remind="password"></label>
                    </li>
                    <li><span class="lock"></span><input type="password" placeholder="请再次输入新密码" name="confirm_password" v-verify="confirm_password" v-model="confirm_password">
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
                password: "",
                confirm_password: "",
                code: "",
                email: "",
                emailCode: "",
                imgUrl : imgUrl
            }
        },
        mounted(){
            this.$http.post(userDetail).then(function(res){
                console.log(res)
                if(res.data.code == 100) {
                    this.email = res.data.content.loginName;
                }
            }.bind(this)).catch(function(err){
                console.log("Accountset页面错误：",err)
            })
        },
        verify: {
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
                        layer.msg(res.data.message);
                    }
                }.bind(this)).catch(function(err){
                    console.log("Register页面错误：",err)
                })
            },
            changeImg(){
                this.imgUrl = imgUrl + "?date=" + new Date();
            },
            go(){
                var that = this;
                if(this.$verify.check()){
                    var data = {
                        email: this.email,
                        password : this.password
                    }
                    this.$http.post(updatePasswordUrl,qs.stringify(data)).then(function(res){
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
        padding: 60px 20px 0px;
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
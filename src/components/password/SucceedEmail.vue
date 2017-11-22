<template>
    <div class="email-yanzheng-succeed">
        <div id="layer">
            <p class="top_p">恭喜您，密码重置成功！请用新密码重新登录</p><p>3秒后跳转到登录页，您也可以点击直接登录</p>
            <div><a href="javascript:;" @click="login()">立即登录</a></div>
        </div>
        <div class="content">
            <form action="" class="form">
                <div class="title"></div>
                <div class="wire"></div>
                <h3>邮箱验证成功 ! 请输入新密码</h3>
                <ul>
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
                <div class="next"><a href="javascript:;" class="next-a bg-orange" @click="go()">确认</a></div>
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
                imgUrl : imgUrl
            }
        },
        mounted(){
            this.changeImg();
            this.email = this.$route.params.email;
            console.log(this.email)
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
            }]
        },
        methods: {
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

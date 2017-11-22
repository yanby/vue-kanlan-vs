<template>
    <div class="zhaohui-password">
        <div class="content">
            <form action="" id="form" autocomplete="off">
                <div class="title"><span></span><a href="javascript:;"  @click="back()">返回</a></div>
                <div class="wire"></div>
                <h3><span></span>验证邮件已发送</h3>
                <ul>
                    <li>验证码已发送至您的邮箱 <span class="blue">{{email}}</span></li>
                    <li><span class="pencil"></span><input type="text" placeholder="请输入验证码" name="emailCode" id="emailCode" v-model="emailCode" v-verify="emailCode">
                        <label class="cur" v-remind="emailCode"></label>
                    </li>
                </ul>
                <div class="next"><a href="javascript:;" class="next-a" id="emailform" @click="go()">确定</a></div>
            </form>
            <ol>
                <li>没有收到验证邮件？</li>
                <li>• 确认您的邮箱是否填写正确，您可选择返回 <span class="blue fz16" @click="back()">重新填写</span></li>
                <li>• 请查看您的垃圾邮件</li>
                <li>• 若您仍未收到邮件，请尝试 <span class="blue fz16" @click="sendCode">重新发送</span></li>
                <li v-show="msg" class="red" style="font-size: 16px;">&nbsp;&nbsp;验证码已发送</li>
            </ol>
        </div>
    </div>
</template>

<script>
    import qs from 'qs';
    export default {
        data(){
            return{
                emailCode: "",
                email: "",
                msg: false
            }
        },
        mounted(){
            this.email = this.$route.params.email;
            console.log(this.email)
        },
        verify: {
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
            go(){
                if(this.$verify.check()){
                    this.$router.push({name:"SucceedEmail",params:{email:this.email}})
                }
            },
            back(){
                window.history.back();
            },
            sendCode(){
                var that = this;
                var data = {
                    email: this.email
                }
                this.$http.post(sendRegEmailUrl,qs.stringify(data)).then(function(res){
                    console.log(res)
                    if(res.data.code == 100){
                        this.msg = true;
                        setTimeout(function(){
                            that.msg = false;
                        },3000)
                    }else{
                        layer.msg(res.data.message)
                    }
                }.bind(this)).catch(function(err){
                    console.log("First页面错误：",err)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/css/wangji-mima.less";
</style>
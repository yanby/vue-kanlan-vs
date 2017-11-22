<template>
    <div class="zhaohui-password">
        <div class="content">
            <form action="" class="form">
                <div class="title"><span></span><a href="javascript:;" @click="back()">返回</a></div>
                <div class="wire"></div>
                <h3>通过邮箱找回密码</h3>
                <ul>
                    <li><span class="email"></span><input type="text" placeholder="请输入您的注册邮箱" v-model="email" v-verify="email" name="emails">
                        <label class="cur" v-remind="email"></label>
                    </li>
                    <li><span class="pencil"></span>
                        <input type="text" name="codes" placeholder="请输入验证码" v-model="code" v-verify="code" style="width: 260px;">
                        <a href='javascript:;' @click="changeImg()">
                            <img id="validImg" :src="imgUrl" style="width: 100px;height: 40px;margin-left: 15px;">
                        </a>
                        <label class="cur" v-remind="code"></label>
                    </li>
                </ul>
                <div class="next"><a href="javascript:;" class="next-a" @click="go()">下一步</a></div>
            </form>
        </div>
    </div>
</template>

<script>
    import qs from 'qs';
    export default {
        data(){
            return{
                email:"",
                code: "",
                imgUrl : imgUrl
            }
        },
        mounted(){
            this.changeImg();
        },
        verify: {
            email:["required","email"],
            code: ["required","code"]
        },
        methods: {
            changeImg(){
                this.imgUrl = imgUrl + "?date=" + new Date();
            },
            go(){
                if(this.$verify.check()){
                    var data = {
                        email: this.email
                    }
                    this.$http.post(sendRegEmailUrl,qs.stringify(data)).then(function(res){
                        console.log(res)
                        if(res.data.code == 100){
                            this.$router.push({name:"CheckEmai",params:{email:this.email}})
                        }else{
                            layer.msg(res.data.message)
                        }
                    }.bind(this)).catch(function(err){
                        console.log("First页面错误：",err)
                    })
                }
            },
            back(){
                window.history.back();
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/css/wangji-mima.less";
</style>
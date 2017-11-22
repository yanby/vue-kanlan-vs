<template>
    <div class="person-index clearfix">
        <div class="wrap clearfix">
            <PensonLeft></PensonLeft>
            <div class="right">
                <div class="right-whole">
                    <div class="right_top">
                        <div class="account">
                            <span class="fl icon_account"></span>
                            <div class="text fl">
                                <p>账户安全</p>
                                <p class="english">Account Secutity</p>
                            </div>
                        </div>
                        <div class="account_div">
                            <ul class="accunt_ul">
                                <li class="active"><span class="icon_circle"></span>信息加密保护中<router-link to="/AccountSet/UpdatePassword" class="fr blue_a">修改登录密码</router-link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="right_top">
                        <div class="account">
                            <span class="fl icon_account"></span>
                            <div class="text fl">
                                <p>手机号码</p>
                                <p class="english">Mobile No</p>
                            </div>
                        </div>
                        <div class="account_div">
                            <ul class="accunt_ul">
                                <li class="active"><span class="icon_circle"></span>已验证<em>已绑定手机号码<a>{{phone}}</a></em><router-link to="/AccountSet/UpdatePhone" class="fr blue_a">修改绑定手机</router-link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="right_top">
                        <div class="account">
                            <span class="fl icon_account"></span>
                            <div class="text fl">
                                <p>邮箱</p>
                                <p class="english">Mailbox</p>
                            </div>
                        </div>
                        <div class="account_div">
                            <ul class="accunt_ul">
                                <li class="active"><span class="icon_circle"></span>已验证<em>已绑定手机邮箱<a>{{email}}</a></em><router-link to="/AccountSet/UpdateEmail" class="fr blue_a">修改绑定邮箱</router-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PensonLeft from "./PensonLeft.vue";
    export default {
        data(){
            return{
                phone: "",
                email: ""
            }
        },
        mounted(){
            this.$http.post(userDetail).then(function(res){
                console.log(res)
                if(res.data.code == 100) {
                    this.email = res.data.content.loginName;
                    this.phone = res.data.content.mobileTelephone;
                }
            }.bind(this)).catch(function(err){
                console.log("Accountset页面错误：",err)
            })
        },
        components: {
            "PensonLeft": PensonLeft
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/css/pensonCenter.less";
</style>
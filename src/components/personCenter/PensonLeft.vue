<template>
    <div class="left">
        <div class="left_title">
            <div class="left_header"><span class="user"></span></div>
            <div class="left_text tc">
                <p>您好！</p>
                <p>{{username}}</p>
            </div>
        </div>
        <ul class="list" id="list">
            <li class="cur"><a href="javascript:;" @click="AccountCenter()" name="AccountCenter"><span class="icon_1"></span>账户中心</a></li>
            <li><a href="javascript:;" @click="pta()" name="certification"><span class="icon_2"></span>个人认证</a></li>
            <li><a href="javascript:;"><span class="icon_3"></span>单位认证</a></li>
            <li><a href="javascript:;"><span class="icon_4"></span>软著登记</a></li>
            <li><a href="javascript:;" @click="OrderCenter()" name="OrderCenter"><span class="icon_5"></span>订单中心</a></li>
            <li><a href="javascript:;" @click="AccountSet()" name="AccountSet"><span class="icon_6"></span>账户设置</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                username: "",
                shiming: shiming,
                realName: ""
            }
        },
        created(){
            var str = localStorage.getItem("user")
            var user = JSON.parse(str);
            if(user){
                if(user.loginName.length >= 20){
                    var abc = user.loginName.substring(0,20)
                    this.username = abc + "...";
                }else{
                    this.username = user.loginName;
                }
            }
        },
        mounted(){
            var currentPath = window.location.pathname;
            $("#list li").each(function(){
                var selectA = $(this).find("a");
                var name = selectA.attr("name");
                if(currentPath.indexOf(name) > 0) {
                    $(this).addClass("cur");
                }else {
                    $(this).removeClass("cur");
                }
            })
            this.$http.post(userDetail).then(function(res){
                console.log(res)
                if(res.data.code == 100){
                    this.realName = res.data.content.realName;//个人有没有认证
                }
            }.bind(this)).catch(function(err){
                console.log("Header页面错误：",err)
            })
        },
        methods:{
            AccountCenter(){//账户中心
                this.$router.push({path:"/personCenter/AccountCenter"})
            },
            OrderCenter(){//订单中心
                this.$router.push({path:"/personCenter/OrderCenter"})
            },
            AccountSet(){//账号设置
                this.$router.push({path:"/personCenter/AccountSet"})
            },
            pta(){//判断有没有认证
                if(this.realName){//已认证
                    this.$router.push({path:"/certification/personSucceed"})
                }else{
                    window.location = shiming;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/css/personCenterLeft.less";
</style>
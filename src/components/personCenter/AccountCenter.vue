<template>
    <div class="person-index clearfix">
        <div id="introduce">
            <div class='img'></div><div class='btn' @click="introduceClose()">我知道了</div>
        </div>
        <div id="authorLayer">
            <h2 style="">您将生成如下身份的实名认证授权码</h2>
            <p style="" v-show="userType1 === 1"><span style="">个人</span>{{realName}}</p>
            <p style="" v-show="userType1 === 2"><span style="">单位</span>{{companyName}}</p>
            <div class="btn">
                <a href="javascript:;" @click="authorConfirm()" class="confirm">确定</a>
                <a href="javascript:;" @click="authorCancel()" class="cancel">取消</a>
            </div>
            <div class="msg" style="">
                若需生成其他身份的授权码，请切换账户身份后重试
            </div>
        </div>
        <div id="authorConfirm">
            <h2>免责声明</h2>
            <ul><li>1. 点击确认生成即表明您已同意将您的实名认证信息以授权码的形式，授权给平台合作公司使用，同时理解并同意免责声明条款</li>
                <li>2. 生成的授权码包含您的隐私信息，请保证授权码的安全</li>
                <li>3. 生成的授权码已做加密处理，只有本平台的合作公司才可以使用</li>
                <li>4. 每个授权码有效期30分钟，最多使用一次</li>
                <li>5. 第三方得到生成的授权码，即表明您同意将实名认证信息授权给其使用</li>
                <li>6. 未经您的允许本平台不会将您的实名信息以任何形式透露给任何第三方</li>
                <li>7. 本服务的最终解释权归本平台所有</li>
            </ul>
            <div class="btn"><a href='javascript:;' @click='authorCode()'>确认生成</a></div>
        </div>
        <div id="authorCode">
            <h2>实名认证授权</h2>
            <div class='copy_website tl'>
                <p class='wenzi'>将如下授权码粘贴到应用商店核验页面，完成授权认证：</p>
                <div class='lianjie'>
                    <textarea spellcheck='false' style='user-select: none;' v-model="shouquanCode" id="copy"></textarea><span @click="newAuthCode()">重新生成</span>
                </div>
                <div><span class='btn' @click="authorSucceed()">复制授权码</span></div>
                <ul><li>• 每个授权码有效期30分钟，最多使用一次。可多次生成。</li>
                    <li>• 若需完成多个应用商店的授权，请在旧码验证成功后再生成新码</li>
                    <li>• 第三方得到此授权码，即表明您同意将实名认证信息授权给其使用</li>
                </ul>
            </div>
        </div>
        <div id="cutLayer">
            <h2 style="">选择账户身份</h2>
            <form action="">
                <ul style="">
                    <li style="" v-show="realName1"><span style="">个人</span><b>{{realName}}</b><input type="radio" name="type" checked id="geren"></li>
                    <li style="" v-for="(item,index) in companyInfoList"><span style="">单位</span><b>{{item.companyName}}</b><input name="type" type="radio" @click="comZid(item,index)"></li>
                </ul>
                <div class="btn">
                    <a class="confirm" href="javascript:;" @click="cutConfirm()" style="">确定</a>
                    <a class="cancel" href="javascript:;" @click="cutCancel()" style="">取消</a>
                </div>
            </form>
            <div class="msg" style="">
                切换身份后仍可使用原有账号密码登录
            </div>
        </div>
        <div class="wrap clearfix">
            <PensonLeft></PensonLeft>
            <div class="right">
                <div class="right-whole">
                    <div class="right_top">
                        <div class="account">
                            <span class="fl icon_account"></span>
                            <div class="text fl">
                                <p>账户信息</p>
                                <p class="english">Account information</p>
                            </div>
                            <div class="fr">
                                <router-link to="/personCenter/AccountSet">修改账户信息</router-link>
                            </div>
                        </div>
                        <div class="account_div">
                            <ul class="accunt_ul">
                                <li class="active">
                                    <b>当前账户：</b>
                                    <i v-show="userType1 === 1"><span class="icon_circle"></span>{{realName}}<a href="javascript:;" @click="cutLayer()" class="active_a">切换身份</a></i>
                                    <i v-show="userType1 === 2"><span class="icon_rectangle"></span>{{companyName}}<a href="javascript:;" @click="cutLayer()" class="active_a">切换身份</a></i>
                                    <i v-show="userType1 === 0">未认证<a :href="shiming"  style="margin-left: 50px;">现在去认证>> </a></i>
                                </li>
                                <li><b>绑定邮箱：</b>{{email}}</li>
                                <li class="active"><b>绑定手机：</b>{{phone}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="right_top" v-show="authorization">
                        <div class="account">
                            <span class="fl icon_shiming"></span>
                            <div class="text fl">
                                <p>实名认证授权</p>
                                <p class="english">Real name authentication authorization</p>
                            </div>
                            <div class="fr">
                                <a href="javascript:;" @click="introduce()">如何完成应用商店实名认证授权？</a>
                            </div>
                        </div>
                        <div class="account_div">
                            <ul class="accunt_ul">
                                <li class="active">授权<a class="text_color" style="margin: 0 5px;">当前账户</a>的实名认证信息们请点击<a href="javascript:;" class="active_a" @click="authorLayer()">生成授权码</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="right_top">
                        <div class="account">
                            <span class="fl icon_shenfen"></span>
                            <div class="text fl">
                                <p>账户身份</p>
                                <p class="english">Account identity</p>
                            </div>
                        </div>
                        <div class="account_div" v-show="identity === 0">
                            <div class="account_shenfen">
                                <div class="text_line">
                                    <span>个人</span>
                                </div>
                                <ul class="text_ul">
                                    <li>
                                        <span>认证状态：</span>
                                        未认证
                                        <a :href="shiming" style="margin-left: 50px;">现在去认证>></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="account_shenfen" style="margin-bottom: 0">
                                <div class="text_line">
                                    <span>单位</span>
                                </div>
                                <ul class="text_ul">
                                    <li>
                                        <span>认证状态：</span>
                                        未认证
                                        <a :href="shiming" style="margin-left: 50px;">现在去认证>></a>
                                    </li>
                                    <li>
                                        <span>&nbsp</span>
                                        <em class="text_em">个人认证通过后，方可进行单位认证</em>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="account_div" v-show="identity === 1">
                            <div class="account_shenfen">
                                <div class="text_line">
                                    <span>个人</span>
                                </div>
                                <ul class="text_ul">
                                    <li>
                                        <span>姓名：</span>
                                        {{realName}}
                                    </li>
                                    <li>
                                        <span>身份证号：</span>
                                        {{identityNum}}
                                    </li>
                                </ul>
                                <div class="text_renzheng">
                                    <p>认证有效期</p>
                                    <p>{{realNameExpireDate}}</p>
                                    <span></span>
                                </div>
                            </div>
                            <div class="account_shenfen">
                                <div class="text_line">
                                    <span>单位</span>
                                </div>
                                <ul class="text_ul">
                                    <li>
                                        <span>认证状态：</span>
                                        未认证
                                        <a :href="shiming" style="margin-left: 50px;">现在去认证>></a>
                                    </li>
                                    <li>
                                        <span>&nbsp</span>
                                        <em class="text_em">个人认证通过后，方可进行单位认证</em>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="account_div" v-show="identity === 2">
                            <div class="account_shenfen">
                                <div class="text_line">
                                    <span>个人</span>
                                </div>
                                <ul class="text_ul">
                                    <li>
                                        <span>姓名：</span>
                                        {{realName}}
                                    </li>
                                    <li>
                                        <span>身份证号：</span>
                                        {{identityNum}}
                                    </li>
                                </ul>
                                <div class="text_renzheng">
                                    <p>认证有效期</p>
                                    <p>{{realNameExpireDate}}</p>
                                    <span></span>
                                </div>
                            </div>
                            <div class="account_shenfen">
                                <div class="text_line">
                                    <span>单位</span>
                                </div>
                                <ul class="text_ul">
                                    <li>
                                        <span>名称：</span>
                                        {{companyName}}
                                    </li>
                                    <li>
                                        <span>证件号码：</span>
                                        ***
                                    </li>
                                </ul>
                                <div class="text_renzheng">
                                    <p>认证有效期</p>
                                    <p>{{companyExpireDate}}</p>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import qs from 'qs';
    import PensonLeft from "./PensonLeft.vue";
    export default {
        data(){
            return{
                shiming: shiming,
                authorLayer1: "",
                authorConfirm1: "",
                authorCode1: "",
                cutLayer1: "",
                introduce1: "",
                userType: "",
                userType1: 1,
                realName: "",
                realName1: "",
                email: "",
                phone: "",
                type: "",
                identityNum: "",//身份证号
                authorization: "",  //授权码显示隐藏
                identity: 0, //单位和个人显示隐藏
                companyInfoList: "",//身份列表
                companyZid: "",//单位有没有认证
                companyName: "", //公司名称
                changeType: 1, //切换的个人还是法人
                danweiZid: "",
                shouquanCode: "",
                realNameExpireDate: "",//个人过期时间
                companyExpireDate: ""//法人过期时间
            }
        },
        mounted(){
            this.init();
        },
        components: {
            "PensonLeft": PensonLeft
        },
        methods:{
            penson(e){
                console.log(e.target.checked)
            },
            comZid(item,index){
                this.danweiZid = item.zid;
                this.companyName  = item.companyName;
            },
            init(){
                this.$http.post(userDetail).then(function(res){
                    console.log(res)
                    if(res.data.code == 100){
                        this.email = res.data.content.loginName;
                        this.phone = res.data.content.mobileTelephone;
                        this.companyName = res.data.content.companyName;
                        this.identityNum = res.data.content.identityNum;//身份证号
                        this.userType = res.data.content.userType;//身份类型
                        this.realName = res.data.content.realName;//个人有没有认证
                        this.companyZid = res.data.content.companyZid;//单位有没有认证
                        this.companyInfoList = res.data.content.companyInfoList;//身份列表
                        this.realNameExpireDate = res.data.content.realNameExpireDate;//个人过期时间
                        this.companyExpireDate = res.data.content.companyExpireDate;//个人过期时间

                        //判断有没有认证
                        if(this.realName == ""){//未认证
                            this.userType1 = 0;
                            this.authorization = false;
                            this.realName1 = false

                        }else{
                            this.realName1 = true;
                            this.authorization = true;
                            //判断用户类型
                            if(this.userType == 1){//个人
                                this.userType1 = 1;
                            }else if(this.userType == 2){//单位
                                this.userType1 = 2;
                            }
                        }
                        //判断个人和单位有没有认证
                        if(this.realName == "" && this.companyZid == 0){
                            this.identity = 0;
                        }else if(this.realName != "" && this.companyZid == 0){
                            this.identity = 1;
                        }else if(this.realName != "" && this.companyZid != 0){
                            this.identity = 2;
                        }
                    }
                }.bind(this)).catch(function(err){
                    console.log("Header页面错误：",err)
                })
            },
            introduce(){
                this.introduce1 = layer.open({
                    type: 1,
                    area: ['760px', '600px'],
                    title:false,
                    skin: 'tishi',
                    content: $("#introduce")
                })
            },
            introduceClose(){
                layer.close(this.introduce1)
            },
            authorLayer(){
                this.authorLayer1 = layer.open({
                    type: 1,
                    title: false,
                    area: ['500px', '300px'],
                    skin: 'shou',
                    content: $("#authorLayer")
                })
            },
            authorConfirm(){
                layer.close(this.authorLayer1)
                this.authorConfirm1 = layer.open({
                    type: 1,
                    area: ['500px', '520px'],
                    title:false,
                    skin: 'protest',
                    content: $("#authorConfirm")
                })
            },
            authorCode(){ //生成授权码
                var data = {
                    email : this.email
                }
                layer.close(this.authorConfirm1)
                this.$http.post(ptAuthCodeUrl,qs.stringify(data)).then(function(res){
                    console.log(res)
                    if(res.data.code == 100){
                        layer.open({
                            type: 1,
                            area: ['500px', '350px'],
                            title:false,
                            skin: 'demo-class',
                            content: $("#authorCode")
                        })
                        this.shouquanCode = res.data.content;
                    }else{
                        layer.msg(res.data.message)
                    }
                }.bind(this)).catch(function(err){
                    console.log("First页面错误：",err)
                })
            },
            newAuthCode(){
                var data = {
                    email : this.email
                }
                this.$http.post(ptAuthCodeUrl,qs.stringify(data)).then(function(res){
                    console.log(res)
                    if(res.data.code == 100){
                        this.shouquanCode = res.data.content;
                        layer.msg("授权码已重新生成！")
                    }else{
                        layer.msg(res.data.message)
                    }
                }.bind(this)).catch(function(err){
                    console.log("First页面错误：",err)
                })
            },
            authorSucceed(){
                $("#copy").select();
                document.execCommand("Copy");
                layer.msg("复制成功！")
            },
            authorCancel(){
                layer.close(this.authorLayer1)
            },
            cutCancel(){
                layer.close(this.cutLayer1)
            },
            cutLayer(){
                if(this.companyInfoList == ""){
                    layer.msg("目前没有可切换的身份！")
                }else{
                    this.cutLayer1 = layer.open({
                        type: 1,
                        title: false,
                        area: ['500px', '500px'],
                        skin: 'cut',
                        content: $("#cutLayer")
                    })
                }
            },
            cutConfirm(){
                var that = this;
                layer.confirm("确认切换成该身份？",{
                    title:false
                },function(){
                    if($("#geren").prop("checked")){
                        that.changeType = 1;
                    }else{
                        that.changeType = 2;
                    }
                    var data = {
                        userType: that.changeType,
                        changeZid: that.danweiZid
                    }
                    that.$http.post(chageUserTypeUrl,qs.stringify(data)).then(function(res){
                        console.log(res)
                        if(res.data.code == 100){
                            if(that.changeType == 1){
                                that.userType1 = 1
                            }else{
                                that.userType1 = 2
                            }
                            layer.msg("身份切换成功！")
                            layer.close(that.cutLayer1)
                        }else{
                            layer.msg(res.data.message)
                        }
                    }.bind(that)).catch(function(err){
                        console.log("First页面错误：",err)
                    })
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../assets/css/pensonCenter.less";
    .shou .layui-layer-content #authorLayer{
        height: 210px!important;
        padding: 60px 20px 0px;
        text-align: center;
    }
    .shou .layui-layer-content h2{
        color: #ff8a00;font-size: 16px;
    }
    .shou .layui-layer-content p{
        padding: 40px 0px;
    }
    .shou .layui-layer-content p span{
        border: 1px solid #1d9eff!important;color: #1d9eff;border-radius: 5px;padding: 0 5px;margin-right: 20px;
    }
    .shou .layui-layer-content .btn .confirm{
        margin-right: 30px;width: 80px;height: 30px;line-height: 30px;text-align: center;color: #fff;border-radius: 5px;background: #ff8a00;display: inline-block;
    }
    .shou .layui-layer-content .btn .cancel{
        width: 80px;height: 30px;line-height: 30px;text-align: center;color: #fff;border-radius: 5px;background: #ddd;display: inline-block;
    }
    .shou .layui-layer-content .msg{
        padding-top: 5px;border-top: 1px solid #ddd;margin-top: 30px;
    }

    .cut .layui-layer-content #cutLayer{
        height: 420px!important;
        padding: 60px 20px 0px;
        text-align: center;
    }
    .cut .layui-layer-content h2{
        font-size: 16px;color: #ff8a00;
    }
    .cut .layui-layer-content ul{
        padding: 30px 0;width: 300px;height: 240px;margin: 0 auto;text-align: left;
    }
    .cut .layui-layer-content ul li{
        padding-bottom: 5px;margin-bottom: 10px;border-bottom: 1px solid #ddd;
    }
    .cut .layui-layer-content ul li span{
        border: 1px solid #1d9eff!important;color: #1d9eff;border-radius: 5px;padding: 0 5px;margin-right: 20px;
    }
    .cut .layui-layer-content ul li input{
        float: right;margin-top: 5px;
    }
    .cut .layui-layer-content .btn .confirm{
        margin-right: 30px;width: 80px;height: 30px;line-height: 30px;text-align: center;color: #fff;border-radius: 5px;background: #ff8a00;display: inline-block;
    }
    .cut .layui-layer-content .btn .cancel{
        width: 80px;height: 30px;line-height: 30px;text-align: center;color: #fff;border-radius: 5px;background: #ddd;display: inline-block;
    }
    .cut .layui-layer-content .msg{
        padding-top: 5px;border-top: 1px solid #ddd;margin-top: 30px;
    }
    .protest .layui-layer-content h2{
        padding: 20px 0 10px;
        text-align: center;
        font-size: 16px;
        color: #ff8a00;
    }
    .protest .layui-layer-content #authorConfirm{
        height: 400px;
        text-align: left;
    }
    .protest .layui-layer-content ul{
        width: 400px;
        padding: 25px;
        margin: 0 auto;
        background: #fbf9f7;
    }
    .protest .layui-layer-content ul li{
        color: #333;
        line-height: 30px;
    }
    .protest .layui-layer-content .btn{
        padding: 25px 0 0;
        text-align: center;
    }
    .protest .layui-layer-content div a{
        display: inline-block;
        width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        background: #ff8a00;
        border-radius: 5px;
    }
    .demo-class .layui-layer-content{
        padding-bottom: 0!important;
    }
    .demo-class .layui-layer-content h2{
        padding: 20px 0;
        text-align: center;
        font-size: 16px;
        color: #ff8a00;
    }
    .demo-class .layui-layer-content .wenzi{
        font-size: 14px;
    }
    .demo-class .layui-layer-content .copy_website{
        width: 380px;
        margin: 0 auto;
    }
    .demo-class .layui-layer-content .copy_website .lianjie{
        margin: 20px 0;
    }
    .demo-class .layui-layer-content .copy_website .lianjie textarea{
        border:1px solid #dedede;
        width: 290px;
        height: 60px;
        font-size:12px;
        padding-left: 5px;
    }
    .demo-class .layui-layer-content .copy_website .lianjie span{
        display: inline-block;
        vertical-align: top;
        width: 80px;
        color: #fff;
        margin-left:10px;
        height: 60px;
        background: #ff8a00;
        text-align: center;
        line-height: 60px;
        cursor: pointer;
    }
    .demo-class .layui-layer-content .btn{
        display: inline-block;
        width: 380px;
        height: 36px;
        line-height:36px;
        color: #ff8a00;
        text-align: center;
        border: 1px solid #ff8a00;
        cursor: pointer;
        margin-bottom: 20px;
    }
    .demo-class .layui-layer-content ul li{
        font-size: 12px;
        color: #999;
    }
    .demo-class .lianjie textarea::selection { background:#fff; }
    .tishi #introduce{
        padding: 50px 0;
    }
    .tishi .layui-layer-content{
        padding-top:40px;
    }
    .tishi .layui-layer-content .img{
        margin: 0 auto;
        width: 660px;
        height: 2150px;
        background: url(../../assets/images/tishi.png) no-repeat;
    }
    .tishi .layui-layer-content .btn{
        width: 100px;
        height: 36px;
        line-height: 36px;
        background: #ff8a00;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        margin: 0 auto;
        cursor: pointer;
        margin-top: 40px;
    }
</style>


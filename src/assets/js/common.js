
//var url = "http://web22.dadaozei.cn/";
var url = "http://xingk.tunnel.qydev.com/";
var userDetail = url + "userInfo/userDetail";

var loginUrl = url + "login";
var logoutUrl = url + "logout";
var imgUrl = url + "validCode";
var checkValidCodeUrl = url + "checkValidCode";
var sendRegPhoneUrl = url + "sendRegPhone";
var bindPhoneUrl = url + "bindPhone";
var checkRegPhoneUrl = url + "checkRegPhone";
var sendRegEmailUrl = url + "sendRegEmail";
var checkRegEmailUrl = url + "checkRegEmail";
var updateEmailUrl = url + "updateEmail";
var updatePasswordUrl = url + "updatePassword";
var orderInfoUrl = url + "cooperOrder/orderInfo";
var cancelOrderUrl = url + "cooperOrder/cancelOrder";
var alipayOrderUrl = url + "cooperOrder/aliPayOrder";
var listUrl = url + "cooperOrder/list";
var regUrl = url + "reg";
var chageUserTypeUrl = url + "userInfo/chageUserType";
var ptAuthCodeUrl = url + "userInfo/ptAuthCode";
var uploadUrl = url + "upload/upload";
var userFeedBackUrl = url + "userFeedBack/add";




//第三方接口地址
var shimingUrl = "http://192.168.1.22:8062/saveCookie";
var shiming = "http://192.168.1.22:8062/plateStatusPage/plat2realname";




//倒计时30分钟\
var time;
var h=23;
var m=59;
var s=59;
function run(id){
    setInterval(function(){
        --s;
        if(s<0){
            --m;
            s=59;
        }
        if(m<0){
            --h;
            m=59
        }
        if(h<0){
            s=0;
            m=0;
        }
        id.html(h+"小时"+m+"分"+s+"秒");
    },1000)
}


//时间戳转化为当前时间
function NowTime(s){
    var unixTimestamp = new Date( s ) ;
    Date.prototype.toLocaleString = function() {
        return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
    };
    var commonTime = unixTimestamp.toLocaleString();
    return commonTime;
}
//证件图片上传
function upload(id,myId){
    var img = id.find($(".imgs img"))
    var img_src = id.find($(".imgs img")).attr("src");
    var file = id.find($(".file"));
    var modal = $(".modal");

    file.on("change", function () {

        var files = this.files;
        var reader = new FileReader();

        var name = files[0].name;
        var fileName = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
        if (fileName != "jpg" && fileName != "jpeg" && fileName != "png" && fileName != "bmp") {
            layer.msg("图片格式不正确！");
            img.attr("src", img_src)
            return;
        }
        var fileSize = files[0].size;
        var size = fileSize / 1024;
        if (size > 10000) {
            layer.msg("图片不能大于10M");
            return;
        } else if (size <= 0) {
            layer.msg("图片不能小于0M");
            return;
        }


        reader.readAsDataURL(files[0]);
        reader.onload = function () {
            var image = new Image();//本地缓存一张图片
            image.onload = function () {
                //获取上传图片的宽高
                var width = image.width;
                var height = image.height;
                // console.log(width)
                if (height >= 800) {
                    width = "600px";
                } else if (width >= 800) {
                    width = "800px";
                }
                img.on("click", function () {
                    modal.css({"display": "block"});
                    $(this).css({"min-width": width,"height": "auto","position": "fixed","left": 0,"right": 0,"bottom": 0, "top": 0,"margin": "auto", "z-index": 200, "background": "#fff"})
                })
                modal.on("click", function () {
                    $(this).css({"display": "none"})
                    img.css({"min-width": "100px", "height": "100px", "position": "absolute", "z-index": 100})
                })
            }

            var imgCur_src = this.result;//获取正在上传的图片
            img.attr("src", imgCur_src);//吧刚开始的图片替换成上传的图片

            //把上传图片的宽高赋值给缓存的图片
            image.src = imgCur_src;
        }

        var idstr = file.attr("id");
        uploadfile(idstr, myId);

    })
}

function uploadfile(id, myId) {
    var file = document.getElementById(id).files[0];
    var fd = new FormData();
    fd.append("pic", file);
    $.ajax({
        type: "POST",
        contentType: false, //必须false才会避开jQuery对 formdata 的默认处理 , XMLHttpRequest会对 formdata 进行正确的处理
        processData: false, //必须false才会自动加上正确的Content-Type
        url: uploadUrl,
        data: fd,
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.token);
            request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        },
        success: function (msg) {
            console.log(msg)
            if (msg.code == "100") {
                $("#" + myId).val(msg.data);
            }else if(msg.code == -999){
                layer.msg(msg.message)
            }
        },
        error: function (msg) {
            console.log(msg);
        }
    });
}


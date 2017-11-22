const  validate = {
    emailPhone:{
        test(val){
            var reg = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)|(^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$)/;
            var result = reg.test(val)
            return result;
        },
        message:"账号输入有误！"
    },
    password:{
        test(val){
            var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            var result = reg.test(val)
            return result;
        },
        message:"密码输入有误！"
    },
    code:{
        test:function(val){
            var reg = /^[a-zA-Z0-9]{4}$/;
            var result = reg.test(val)
            var isok = false;
            if(result){
                $.ajax({
                    type: "post",
                    url: checkValidCodeUrl+'?validCode='+val+'',
                    data: val,//序列化表单
                    dataType: "json",
                    async: false,
                    xhrFields: {
                        withCredentials: true
                    },
                    success:function(data) {
                        if(data==true){
                            isok = true;
                        }else{
                            isok = false;
                        }
                    }
                });
                //console.log("return isok = "+ isok);
                return isok;
            }
        },
        message:"验证码输入有误！"
    },
    email:{
        test(val){
            var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            var result = reg.test(val)
            return result;
        },
        message:"邮箱输入有误！"
    },
    phone:{
        test(val){
            var reg= /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
            var result = reg.test(val)
            return result;
        },
        message:"手机号输入有误！"
    }
}
export default validate;
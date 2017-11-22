<template>
    <div class="person-index clearfix">
        <div class="wrap clearfix">
            <PensonLeft></PensonLeft>
            <div class="right">
                <div class="right-whole">
                    <div class="order">
                        <h2>我的订单</h2>
                    </div>
                   <div class="order-msg">
                        <div class="my-order">
                            <ul class="order-title">
                                <li v-for="(item,index) in items" :class="{cur: item.active}" @click="Pay(item,index)">{{item.name}}</li>
                            </ul>
                            <div class="search">
                                <input type="text" placeholder="搜索"><span></span>
                            </div>
                        </div>
                       <div class="order-content">
                           <ul class="order-tabel">
                               <li>
                                   <table id="table"
                                          class="table-wrap"
                                          data-toolbar="#toolbar"
                                          data-toggle="table"
                                          data-query-params-type="queryParams"
                                          data-pagination="true"
                                          data-page-list="[10]"
                                          data-single-select="false">
                                       <thead>
                                       <tr>
                                           <th data-field="createDate">创建时间</th>
                                           <th data-field="zid">订单号</th>
                                           <th data-field="productName">款项</th>
                                           <th data-field="price">金额(元)</th>
                                           <th data-field="quantity">数量</th>
                                           <th data-field="totalPrice">合计(元)</th>
                                           <th data-field="invoiceStatus">电子发票</th>
                                           <th data-field="operation">订单状态</th>
                                       </tr>
                                       </thead>
                                   </table>
                               </li>
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
                OrderStatus: 2,
                close: "",
                items: [
                    {name: "待付款订单",active: true},
                    {name: "已完成订单",active: false},
                    {name: "全部订单",active: false},
                ]
            }
        },
        mounted(){
            this.tableList();
        },
        components: {
            "PensonLeft": PensonLeft
        },
        methods:{
            Pay(item,index){
                for(var i=0;i<this.items.length;i++){
                    this.items[i].active = false    //这里我们需要做的是清除所有a标签的样式
                }
                this.items[index].active = true   //这里我们单独赋予被选中的a标签show的样式
                if(index == 0){
                    this.OrderStatus = 2;//未支付
                    $("#table").bootstrapTable('refresh');
                }else if(index == 1){
                    this.OrderStatus = 1;//已完成
                    $("#table").bootstrapTable('refresh');
                }else{
                    this.OrderStatus = null;
                    $("#table").bootstrapTable('refresh');
                }
            },
            tableList(){
                var that = this;
                window.payNow = function (zid){
                    console.log(zid)
                    that.$router.push({name: "payment",params:{id:zid}})
                }
                window.payCancel = function (zid,status){
                    that.close = layer.confirm("确定取消订单？",{
                        title: false
                    },function(){
                        that.$http.get(cancelOrderUrl+"?orderZid="+zid+"").then(function(res){
                            console.log(res)
                            if(res.data.code == 100){
                                layer.close(that.close)
                                status = 0;
                                $("#table").bootstrapTable('refresh');
                            }
                        }.bind(that)).catch(function(err){
                            console.log("Header页面错误：",err)
                        })
                    })
                }
                var that = this;
                $('#table').bootstrapTable('destroy');
                $("#table").bootstrapTable({
                    columns: [
                        {
                            formatter: function(val,row){
                                var time = row.createDate;
                                return NowTime(time)
                            }
                        },
                        {
//                            formatter: function(val,row){
//                                var result = "";
//                                if(row.payType == "1"){
//                                    result = "支付宝"
//                                }else{
//                                    result = "微信"
//                                }
//                                return result;
//                            }
                        }, {}, {}, {}, {}, {},
                        {
                            formatter: function(val,row){
                                var zid = row.zid
                                var status = row.orderStatus
                                var result = "";
                                if(row.orderStatus == 1){
                                    result = "交易完成"
                                }else if(row.orderStatus == 2){
                                    result = "<span onclick='payNow(\""+zid+"\")' class='pay' style='width: 80px;height: 30px;line-height: 30px;margin-right: 20px;background: #ff8a00;text-align: center;color: #fff;border-radius: 5px;display: inline-block;cursor: pointer;'>立即支付</span><span style='cursor: pointer;' onclick='payCancel(\""+zid+"\",\""+status+"\")' class='cancel'>取消</span>"
                                }else if(row.orderStatus == 0){
                                    result = "订单已取消"
                                }
                                return result;
                            }
                        }
                    ],
                    method: "get",
                    url: listUrl,
                    sidePagination: "server",
                    queryParamsType : "limit",
                    ajaxOptions:{
                        headers: {"Authorization":localStorage.token,"X-Requested-With":"XMLHttpRequest"}
                    },
                    queryParams:function(p){
                        p["OrderStatus"] = that.OrderStatus;
                        return p;
                    },
                    responseHandler:function(data){
                        var res = data.content;
                        if(data.code == -999){
                            that.$router.push({path: "/login"})
                        }
                        return res;
                    }
                });

            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../assets/css/pensonCenter.less";
</style>


<template>
    <van-nav-bar title="雇主详情" left-arrow @click-left="onClickLeft" />
    <div class="wrapper">
        <div class="container">
            <van-row justify="center" style="padding:0 1.25rem;border-bottom:1px solid #ccc;">
                <van-col style="font-size:0.4rem">门店老师信息</van-col>
            </van-row>
            <van-row class="xinxi">
                <van-col class="pics">
                    <van-image src="/pics/user.png" />
                </van-col>
                <van-col class="base">
                    <p>
                        <span class="gray">老师姓名：</span><span>付东女</span>
                    </p>
                    <p>
                        <span class="gray">老师门店：</span><span>{{task.address}}</span>
                    </p>
                    <p>
                        <span class="gray">微信/手机：</span><span>18502159022</span>
                    </p>
                </van-col>
            </van-row>
        </div>
        <div class="container container2">
            <p class="guzhu">客户编号：<span>{{task.user_id}}</span>
                <span class="time">更新时间：<span>{{getTime(task.created_at)}}</span></span>
            </p>
            <p>【需求编号】<span>{{task.work_id}}</span></p>
            <p>【工作地点】<span>{{task.address}}</span></p>
            <p>【人员类型】<span>{{task.work_type}}</span></p>
            <p>【人员性别】<span>{{getGender(task.sex)}}</span></p>
            <p>【服务内容】<span>{{getContent(task.content)}}</span></p>
            <p>【其他需求】<span>{{task.remark}}</span></p>
            <p>【休息时间】<span>暂定</span></p>
            <p>【年龄限制】<span>不限</span></p>
            <p>【工资待遇】<span>{{task.money}}</span></p>
            <van-row>
                <van-col :span="24">
                    <van-button class="toReserve" type="success" @click="getTask">接单</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
        
</template>
<script setup>
    import { ref,getCurrentInstance } from "vue";
    // import { Toast } from 'vant';
    // import 'vant/es/toast/style';
    const { proxy }=getCurrentInstance();
    const onClickLeft = () => history.back();
    const task=JSON.parse(window.sessionStorage.getItem('taskInfo'));
    console.log(13,task);
    function getTask(){
        proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/getTask",{
            token:window.localStorage.getItem("token"),
            work_id:task.work_id
        }).then((res)=>{
            if(res.data.code===2000){
                proxy.$toast(res.data.msg);
            }
        })
    }
    function getContent(contIn){
        let cont={};
        if(contIn){
            cont=JSON.parse(contIn);
            let arr=[];
            for(let key in cont){
                arr.push(cont[key]);
            }
            return arr.join("|");
        }
        else{
            return "无特殊要求";
        }
    }
    function getTime(timeIn) {
        timeIn=timeIn*1000;
        let tTime = new Date(timeIn);
        let tYear = tTime.getFullYear(),
            tMonth = tTime.getMonth() + 1,
            tDay = tTime.getDate(),
            tHour = tTime.getHours(),
            tMin = tTime.getMinutes(),
            tSec = tTime.getSeconds();
        return tYear + "-" + tMonth + "-" + tDay + " " + tHour + ':' + tMin + ":" + tSec;
    }
    function getGender(sexIn){
        if(sexIn==1){
            return '男';
        }else if(sexIn==2){
            return '女';
        }else if(sexIn==3){
            return '保密'
        }else{
            return sexIn;
        }
    }
</script>
<style lang="scss" scoped>
    $gray:#999999;
    .guzhu{
        padding-bottom:0.625rem;
        border-bottom: 1px solid #ccc;
        .time{
            float:right;
        }
    }
    .guzhu::after{
        content: '';
        display: block;
        clear: both;
    }
    img{height: 100%;width:100%}
    .toReserve{
        height: 1rem;
        line-height: 1rem;
        border-radius: 5px;
        width: 100%;
        font-size:0.5rem;
    }
    .container2{
        padding:20px;
    }
    .container{
        background-color: white;
        padding-bottom:10px;
        margin-bottom:5px;
    }
    .wrapper{
        background-color: #EEEEEE;
        padding:5px 0;
    }
    .xinxi{
        background-color: white;
        padding:10px;
        .pics{
            width:2.5rem;
            height: 2.5rem;
            margin-right:0.5rem;
            .van-image{
                width:100%;
                height: 100%;
            }
        }
    }
    .base{
        flex-grow: 1;
        p{
            margin:0;
        }
    }
    .clearf::after{
        content: '';
        display: block;
        clear: both;
    }
    .num{
        float: right;
    }
    .gray{
        color:$gray;
    }
    .center{
        text-align: center;
        margin-top: 1rem;
    }
    .reserve{
        background-color: #E9F6EE;
        margin:0 20px;
        .van-col{
            padding:0.3rem;
            font-size: 0.3rem;
            align-items: center;
        }
    }
    p{
        font-size:0.4rem ;
    }
</style>
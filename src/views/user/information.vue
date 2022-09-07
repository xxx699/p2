<template>
    <van-nav-bar title="服务员推荐" left-arrow @click-left="onClickLeft" />
    <div class="wrapper">
        <div class="container">
            <van-row class="xinxi">
                <van-col class="pics">
                    <van-image src="/pics/server.png" />
                </van-col>
                <van-col class="base">
                    <p class="clearf">
                        {{server.nick_name}}
                        <span class="num">编号：{{server.user_id}}</span>
                    </p>
                    <p>
                        <span class="gray">性别：</span><span>{{getGender(server.sex)}}</span>
                        |
                        <span class="gray">民族：</span><span>汉</span>
                    </p>
                    <p>
                        <span class="gray">属相：</span><span>未知</span>
                        |
                        <span class="gray">星座：</span><span>未知</span>
                    </p>
                    <van-row>
                        <van-col class="center" :span="8">
                            <p><span style="font-size:0.625rem">{{server.age}}</span>岁</p>
                            <p style="padding:0;margin:0">年龄</p>
                        </van-col>
                        <van-col class="center" :span="8">
                            <p style="font-size:0.625rem">8个月</p>
                            <p style="padding:0;margin:0">经验</p>
                        </van-col>
                        <van-col class="center" :span="8">
                            <p style="font-size:0.625rem">{{server.province}}</p>
                            <p style="padding:0;margin:0">籍贯</p>
                        </van-col>
                    </van-row>
                </van-col>
            </van-row>
            <van-row class="reserve">
                <van-col>
                    优秀不优秀，看过才知道，赶紧约看吧！
                    <van-button type="success" @click="yuekan">我要约看</van-button>
                </van-col>
            </van-row>
        </div>
        <div class="container container2">
            <p style="font-size:16px">相关证书</p>
            <van-row>
                <van-col>
                    <!-- <img src="" alt=""> -->
                    健康证明
                </van-col>
            </van-row>
        </div>
        <div class="container container2">
            <p>类型：
                <span>{{server.work_type}}</span>
            </p>
            <p>工作能力：
                <span>极强</span>
            </p>
            <p>自我介绍：
                <span>姓名：{{server.nick_name}}</span>
                <p>QQ号：{{server.qq}}</p>
                <p>手机号：{{server.phone}}</p>
                <p>籍贯：{{server.province}}</p>
                <p>服务城市：{{server.address}}</p>
                <p>求职意向：{{getContent(server.content)}}</p>
            </p>
        </div>
        <div class="container container2">
            <p>个人亮点展示
                <span style="color:#999; margin-left:30px;font-size:12px">证书展示</span>
            </p>
            <img src="" alt="">
        </div>
        <div class="container container2">
            <p>服务流程</p>
            <img src="/pics/servelc.png" alt="">
        </div>
        <div class="container container2">
            <p style="padding-top:0;padding-bottom:0.625em;border-bottom:1px solid #ccc">相似服务员推荐</p>
            <list></list>
        </div>
    </div>
    <van-tabbar>
        <van-tabbar-item>
            <template #default>
                <i class="iconfont">&#xe60b;</i>
                <span>点赞</span>
            </template>
        </van-tabbar-item>
        <van-tabbar-item>
            <template #default>
                <i class="iconfont">&#xe60a;</i>
                <span>收藏</span>
            </template>
        </van-tabbar-item>
        <van-tabbar-item>
            <template #default>
                <i class="iconfont">&#xe60a;</i>
                <span>分享</span>
            </template>
        </van-tabbar-item>
        <van-tabbar-item>
            <van-button class="toReserve" type="success" @click="yuekan">我要约看</van-button>
        </van-tabbar-item>
    </van-tabbar>
</template>
<script setup>
    import { ref,getCurrentInstance } from "vue"
    import list from "@/views/user/list.vue"
    const { proxy }=getCurrentInstance();
    const onClickLeft = () => history.back()
    const server=JSON.parse(window.sessionStorage.getItem("server"));
    console.log(78,server);
    function yuekan(){
        proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/addWork",{
            token:window.localStorage.getItem("token"),
            work_user_id:server.user_id,
            phone:server.phone,
            address:server.address,
            province:server.province,
            city:server.city,
            area:server.area,
            money:server.h_price,
            start_time:Math.round(Date.now()/1000).toString(),
            end_time:Math.round(Date.parse("2022/10/1 24:00")/1000).toString(),
        }).then((res)=>{
           if(res.data.code==2000){
            proxy.$toast(res.data.msg);
           }
        })
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
    function getContent(contIn){
    if(contIn){
        return JSON.parse(contIn);
    }
    else{
        return "无特殊要求";
    }
}
</script>
<style lang="scss" scoped>
    $gray:#999999;
    img{height: 100%;width:100%}
    .toReserve{
        height: 35px;
        line-height: 35px;
        border-radius: 5px;
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
            width:2.8rem;
            height: 3.75rem;
            margin-right:0.6rem;
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
        margin-top: 1em;
    }
    .reserve{
        background-color: #E9F6EE;
        margin:0 10px;
        .van-col{
            padding:0.3rem;
            font-size: 0.3rem;
            align-items: center;
        }
        .van-button{
            padding:0.3rem;
            height: 0.5rem;
            line-height: 0.5rem;
        }
    }
    p{
        font-size: 0.3rem;
    }
</style>
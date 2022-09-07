<template>
    <van-nav-bar title="角色切换" left-arrow @click-left="onClickLeft" />
    <van-row class="image">
        <van-col v-if="showPic">
            <p>我是雇主</p>
            <van-image src="/pics/user.png"/>
        </van-col>
        <van-col v-else>
            <p>我是服务员</p>
            <van-image src="/pics/server.png"/>
        </van-col>
    </van-row>
    <van-row>
        <van-col v-if="showPic">
            <p>您当前的身份是“雇主”</p>
            <van-button @click="changeRole">切换到“服务员”身份</van-button>
        </van-col>
        <van-col v-else>
            <p>您当前的身份是“服务员”</p>
            <van-button @click="changeRole">切换到“雇主”身份</van-button>
        </van-col>
    </van-row>
</template>
<script setup>
    import { ref,getCurrentInstance } from "vue"
    const { proxy }=getCurrentInstance();
    const onClickLeft = () => history.back();
    const showPic=ref(true);
    console.log("change",window.sessionStorage.getItem("userType"));
    if(window.sessionStorage.getItem("userType")==1){
        console.log('为真');
        showPic.value=true;
    }else{
        console.log(1358);
        showPic.value=false;
    }
    const changeRole=()=>{
        if(showPic.value){
            showPic.value=false;
            window.sessionStorage.setItem("userType",2)
            setTimeout(()=>{
                proxy.$router.push({path:'/userview'})
            },2000)
        }else{
            showPic.value=true;
            window.sessionStorage.setItem("userType",1);
            setTimeout(()=>{
                proxy.$router.push({path:'/userview'})
            },2000)
        }
    }
</script>
<style lang="scss" scoped>
    .van-row{
        background-color: #F1F1F1;
        padding:40px 30px;
    }
    .image{
        .van-col{
            border:0.06em solid #38C350;
            width:100%;
            text-align: center;
            background-color: #F5FDF6;
            padding-top:2.5em;
            p{
                font-size: 1.125em;
                font-weight: bold;
                margin-bottom:0.6em;
            }
        }
    }
    .van-col{
        text-align: center;
        width: 100%;
    }
    .van-button{
        width: 100%;
        background-color:#38C350;
        color:white;
        font-size: 1em;
        border-radius:5px;
    }
</style>
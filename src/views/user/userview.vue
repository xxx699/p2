<template>
    <div class="main-header">
        <p>我</p>
        <van-row justify="center" class="header">
            <van-col span="23" class="layout">
                <div class="tx">
                    <img src="/pics/5.JPG" alt="">
                </div>
                <div class="cont">
                    <van-row class="account">
                        <van-col style="display:block;font-size:0.45rem">{{account.user_account}}</van-col>
                   </van-row>
                    <van-row class="userType">
                        <van-col v-if="show">当前身份：服务员</van-col>
                        <van-col v-else>当前身份：雇主</van-col>
                    </van-row>
                    <van-button class="change" :to="{path:'/change',query:{role:'user'}}">切换身份&gt;</van-button>
                </div>
            </van-col>
        </van-row>
    </div>
    <div style="padding:20px;background-color: #F1F1F1;height: calc(100vh - 1.5rem);">
        <van-grid :column-num="5" square :border="false">
            <van-grid-item v-for="(item,index) in simple" v-show='item.show' :key="'a'+index" >
                <i class="iconfont">{{item.unicode}}</i>
                <span>{{item.text}}</span>
            </van-grid-item>
        </van-grid>
        <div class="serve">
            <p >我的服务</p>
            <van-grid square :clickable="true" :border="false">
                <van-grid-item class="myser" v-for="(item,index) in serve" v-show='item.show'  :key="'b'+index" :to="item.path">
                    <i class="iconfont">{{item.unicode}}</i>
                    <span>{{item.text}}</span>
                </van-grid-item>
            </van-grid>
        </div>
        <div class="serve">
            <p>更多功能</p>
            <van-grid square :clickable="true" :border="false">
                <van-grid-item >
                    <i class="iconfont">&#xe6c2;</i>
                    <span>我要反馈</span>
                </van-grid-item>
                <van-grid-item >
                    <i class="iconfont">&#xe603;</i>
                    <span>视频帮助</span>
                </van-grid-item>
                <van-grid-item >
                    <i class="iconfont">&#xe6c8;</i>
                    <span>短信通知</span>
                </van-grid-item>
                <van-grid-item v-show="show">
                    <i class="iconfont">&#xe601;</i>
                    <span>无忧保供</span>
                </van-grid-item>
                <van-grid-item v-show="show">
                    <i class="iconfont">&#xe603;</i>
                    <span>水平测试</span>
                </van-grid-item>
                <van-grid-item >
                    <i class="iconfont">&#xe601;</i>
                    <span>设置</span>
                </van-grid-item>
            </van-grid>
        </div>
        <van-row>
            <van-col class="back">
                <van-button class="backto" @click="backToLogin">退出登录</van-button>
            </van-col>
        </van-row>
    </div>
</template>
<script setup>
    import { ref,getCurrentInstance } from "vue"
    const { proxy }=getCurrentInstance();
    let show=false;
    const account=JSON.parse(window.sessionStorage.getItem("saveAccount"));
    console.log(account,22);
    if(window.sessionStorage.getItem('userType')==1){
        show=false;
    }else{
        show=true;
    }
    const serve=[
        { unicode:'\ue61a',text:"我的需求",path:'/myreserve', show:true},
        { unicode:'\ue6b0',text:"面试评价", show:true },
        { unicode:'\ue661',text:"电子签名", show:true },
        { unicode:'\ue6c2',text:"电子收据", show:true },
        { unicode:'\ue603',text:"支付订单", show:true },
        { unicode:'\ue6c8',text:"申请发票", show:true },
        { unicode:'\uf615',text:"我的保险", show:true },
        { unicode:'\ue619',text:"我的续约", show:true },
        { unicode:'\ue619',text:"我的续保", show:true },
        { unicode:'\ue60a',text:"我的收藏", show:!show },
        { unicode:'\ue60b',text:"我的约看",path:'/yuekan', show:!show },
        { unicode:'\ue6c2',text:"我的接单",path:'/yuekan', show },
        { unicode:'\ue6c8',text:"身份认证", show },
        { unicode:'\ue600',text:"个人信息", show,path:'/modifymyinfo' },
    ];
    const simple=[
        { unicode:'\ue646',text:"钱包",show:true },
        { unicode:'\ue618',text:"积分",show:true },
        { unicode:'\ue65c',text:"优惠券",show:!show },
        { unicode:'\ue65c',text:"银行卡",show},
        { unicode:'\uf59d',text:"抵扣码",show:true },
        { unicode:'\ufffe',text:"推荐有礼" ,show:true},
    ]
    function backToLogin(){
        proxy.$router.push({ path:'/login' });
    }
</script>
<style lang="scss">
@font-face {
  font-family: 'iconfont';
  src: url('@/assets/download/iconfont.ttf?t=1660118849763') format('truetype');
}
/* 第二步：定义使用iconfont的样式 */
.iconfont {
  font-family: "iconfont" !important;
  font-size: 0.6rem;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
img {
    height: 100%;
    width: 100%;
}

.main-header {
    background-color: #0AB829;
    text-align: center;
    padding-top: 30px;
    p {
        color: white;
        font-size: 0.6rem;
    }
    
}
.header {
    // padding-top:75px;
    .layout {
        background-color: white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 1.25em;
        display: flex;
    }
}
.serve{
    margin-top:20px;
    background-color: white;
    padding-top:15px;
    border-radius: 5px;
    p{
        margin-left:10px;
        margin-bottom:0;
        font-size: 0.4rem;
    }
    .van-grid{
        border-radius: 5px;
    }
    span{
        font-size: 0.3rem;
    }
}
.tx {
    width: 2.5em;
    flex-shrink: 0;
    margin-right:0.3em;
    img {
        border-radius: 50%;
    }
}
.cont{
    position: relative;
    flex-grow: 1;
    .van-button{
        border:none;
        position: absolute;
        right:-0.8rem;
        top:0;
        color:#0AB829
    }
}
.back{
    margin-top:20px;
    width:100%;
    .backto{
        width: 100%;
        background-color:#38C350;
        color:white;
        font-size: 1em;
        border-radius:5px;
    }
}
.userType, span{
    font-size: 0.4rem;
    
}
.userType{
    color:#999999;
}
.van-grid-item__content{
    padding: initial;
}
.account{
    font-size: 0.5rem;
}
.myser{
    height: 0.5rem;
}
</style>
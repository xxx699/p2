<template>
    <van-nav-bar title="我的需求" left-arrow @click-left="onClickLeft" />
    <van-tabs color="#0AB828" title-active-color="#0AB828" v-model:active="active">
        <van-tab title="进行中">
            <div class="layout2">
                <van-cell is-link >
                    <template #default>
                        <div class="popout">
                            <div>
                                <van-image round width="35px" height="35px" src="/pics/xuqiu.png" />
                            </div>
                            <div>
                                <p style="font-size: 0.3rem;line-height: 0.35rem;">温馨提示：您的找服务需求提交成功，我们预计在7日内处理完成。</p>
                                <p>item</p>
                            </div>
                        </div>
                    </template>
                </van-cell>
            </div>
            <div class="wrapper" v-for="item in list" :key="item.user_id">
                <div class="container">
                    <p class="number">找服务需求编号 :
                        <span>{{item.work_id}}</span>
                        <span>{{getTime(item.start_time)}}</span>
                    </p>
                    <div class="layout">
                        <div class="pics">
                            <van-image round src="/pics/xuqiu.png" />
                        </div>
                        <div>
                            <p>不住家
                                <span>
                                    <span style="font-weight:bold;font-size: 0.45rem;">{{item.money}}</span>元
                                </span>
                                <van-button type="danger">取消</van-button>
                            </p>
                            <p style="font-size:0.3rem">{{getContent(item.content)}}</p>
                            <p style="color:#bbb;font-size:0.3rem">{{getOtherInfo(item.content)}}</p>
                        </div>
                    </div>
                </div>
                <p class="sold">
                    <van-image round  width="1.875em" height="1.875em" src="/pics/xuqiu.png" />
                    <span>家政顾问:赵燕</span>
                    <span class="phone" >手机:18181420529</span>
                </p>
                <div style="background-color:#EFEFEF;height:0.625em"></div>
            </div>
        </van-tab>
        <van-tab title="已完成">
        </van-tab>
    </van-tabs>
</template>
<script setup>
import { ref,getCurrentInstance } from 'vue'
const { proxy }=getCurrentInstance();
const list = ref([]);
const listTemp=ref([]);
const listAll=ref([]);
const onClickLeft = () => history.back();
const userInfo=JSON.parse(window.sessionStorage.getItem("saveAccount"));
console.log(userInfo,55);
getData();
function getData(){
    if(window.sessionStorage.getItem('userType')==1){
        proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/workList",
        {token:window.localStorage.getItem("token"),
            user_type:JSON.parse(window.sessionStorage.getItem("saveAccount")).user_type,
            work:1
        }).then((res)=>{
            if(res.data.code===2000){
                list.value=res.data.data;
            }
        })
    }else{
        proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/workList",{
            token:window.localStorage.getItem("token"),
            user_type:JSON.parse(window.sessionStorage.getItem("saveAccount")).user_type,
            work:0
        }).then((res)=>{
            if(res.data.code===2000){
                listAll.value=res.data.data;
                proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/workList",
                {token:window.localStorage.getItem("token"),
                    user_type:JSON.parse(window.sessionStorage.getItem("saveAccount")).user_type,
                    work:1
                }).then((res)=>{
                    if(res.data.code===2000){
                        listTemp.value=res.data.data;
                        list.value=listAll.value.filter(item=>{
                            let flag=true;
                            listTemp.value.forEach(items=>{
                                if(item.work_id==items.work_id){
                                    flag=false;
                                }
                            })
                            if(flag==true){
                                return item;
                            }
                        });
                        console.log(list.value);
                    }
                })
            }
        })
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
function getContent(contIn){
    let cont={};
    if(contIn){
        cont=JSON.parse(contIn);
        let arr=[];
        for(let key in cont){
            if(cont[key]==2){
                arr.push('女');
            }else if(cont[key]==1){
                arr.push('男');
            }else if(cont[key]==3){
                arr.push("保密");
            }else{
                arr.push(cont[key]);
            }
        }
        return arr.join("|");
    }
    else{
        return "无特殊要求";
    }
}
function getOtherInfo(rowIn){
    return '暂无其他需求';
}
</script>
<style lang="scss" scoped>
    p {
    margin: 0;
    padding: 0
    }
    .van-cell{
        box-shadow: 0 0 0.5rem 0.3em #ccc;
    }
    .popout{
        display: flex;
        align-items: center;
        font-size:0.75rem;
        .van-image{
            margin-right:0.5rem;
        }
    }
    .layout2{
        padding:20px;
    }
    .van-button{
        height: 0.7rem;
        padding:0 0.3rem;
        font-size: 0.3rem;
    }
    .container{
        padding:10px;
    }

.sold {
    background-color: #F3FFF5;
    padding:10px;
    .van-image{
        vertical-align: middle;
        margin-right:0.3em;
        
    }
}
.sold::after{
    content: '';
    display: block;
    clear: both;
}
.phone{
    float: right;
}
.pics {
    width: 2rem;
    height: 2rem;
    margin-right: 0.625em;

    .van-image {
        width: 100%;
        height: 100%;
    }
}

.layout {
    display: flex;
    padding: 10px;

    div:last-of-type {
        flex-grow: 1;

        p:first-of-type {
            .van-button {
                float: right;
            }

            ::afer {
                content: '';
                display: block;
                clear: both;
            }
        }
    }
}

.number {
    border-bottom: 1px solid #f2f2f2;
    font-size: 0.3rem;
    span:last-of-type {
        float: right;
    }
}
p{
    font-size: 0.4rem;
}
.number::after {
    content: '';
    display: block;
    clear: both;
}

.van-row {
    padding: 10px;
    background-color: blanchedalmond;
}
</style>
<template>
    <van-nav-bar title="我的约看" left-arrow @click-left="onClickLeft" />
    <div v-for="item in list" :key="item">
        <van-cell  is-link to="/information">
                <template #default>
                    <div class="layout">
                        <div>
                            <van-image src="/pics/server.png" />
                        </div>
                        <div>
                            <p>姓名 ：
                                <span>{{item.work_user.nick_name}}</span>
                                <van-tag type="danger">上新</van-tag>
                            </p>
                            <p>0岁 | {{item.province}} | {{item.money}}元/月</p>
                            <van-tag plain type="success">{{item.work_type}}</van-tag>
                            <van-tag plain type="success">{{item.address}}</van-tag>
                        </div>
                    </div>
                </template>
            </van-cell>
            <van-cell class="cancel" is-link>
                <template #default>
                    <div style="display:flex">
                        <div class="cancelicon">
                            <van-image width="2.2em" height="2.2em" src="/pics/cancel.png" />
                        </div>
                        <div>
                            <p style="font-size:0.75em">很抱歉，此次约看未能顺利完成，请您约看其他合适的服务员，如有疑问您可以拨打客服电话4006093600沟通...</p>
                            <van-row>
                                <van-col>item</van-col>
                            </van-row>
                        </div>
                    </div>
                </template>
            </van-cell>
    </div>
</template>
<script setup>;
    import { ref,getCurrentInstance } from 'vue';
    const { proxy }=getCurrentInstance();
    const onClickLeft = () => history.back(); 
    const list = ref([]);
    const listTemp=ref([]);
    const listAll=ref([]);
    if(window.sessionStorage.getItem('userType')==1){
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
    }else{
        proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/workList",
        {token:window.localStorage.getItem("token"),
            user_type:JSON.parse(window.sessionStorage.getItem("saveAccount")).user_type,
            work:1
        }).then((res)=>{
            if(res.data.code===2000){
                list.value=res.data.data;
            }
        })
    }
    
</script>
<style lang="scss" scoped>
    .cancelicon{
        .van-image{
            margin-top:1.5em;
            margin-right:1.25em;
        }
    }
    .cancel{
        margin-top:1.25em;
        background-color: #EFEFEF;
        padding:0.625em;
        margin-left:0.8em;
    }
    .layout{
        position: relative;
        display: flex;
        div:first-of-type{
            width: 2.3rem;
            height: 3rem;
            margin-right:0.3rem;
            .van-image{
                height: 100%;
                width: 100%;
            }
        }
    }
    .van-cell{
        .van-badge__wrapper{
            margin-top:2.2em;
        }
    }
</style>
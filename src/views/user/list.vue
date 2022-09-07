<template>
    <van-list v-model:loading="loading" :finished="finished" 
    finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" is-link to="/information" @click="toInfo(item)">
            <template #default>
                <div class="layout">
                    <div>
                        <van-image src="/pics/server.png" />
                    </div>
                    <div>
                        <p>{{item.nick_name}}
                            <van-tag type="danger">上新</van-tag>
                        </p>
                        <p>{{item.age}}岁 | {{item.city}} | {{item.h_price}}元/月</p>
                        <van-tag plain type="success">{{item.work_type}}</van-tag>
                        <van-tag plain type="success" v-show="item.address">{{item.address}}</van-tag>
                    </div>
                    <!-- <van-button>&gt;</van-button> -->
                </div>
            </template>
        </van-cell>
    </van-list>
</template>
<script setup>
import { ref,getCurrentInstance,watch } from 'vue'
import { List } from 'vant';
const { proxy } = getCurrentInstance();
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
let condition={};
const request=ref({
    page:1,
    size:10,
    province:"",
    city:'',
    work_type:''
})
const toInfo=(dataIn)=>{
    // proxy.$store.commit("serverInfo",dataIn);
    window.sessionStorage.setItem("server",JSON.stringify(dataIn));
}
watch(
    ()=>proxy.$store.state.change,
    (valnew,valold)=>{
        if(valnew){
            condition=JSON.parse(window.sessionStorage.getItem("saveCondition"));
            request.value.city=condition.chooseCity;
            request.value.work_type=condition.chooseType;
            // console.log(request.value.city,request.value.work_type);
            onLoad();
        }
    }
)
const onLoad = () => {
    // 异步更新数据
    loading.value=true;
    request.value.size+=10;
    proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/workUserList",request.value).then((res)=>{
        if(res.data.code==2000){
            list.value=res.data.data.data;
            console.log(list.value,5554);
            // 加载状态结束
            loading.value = false;
            // 数据全部加载完成
            if (request.value.size>=res.data.data.count) {
                finished.value = true;
            }  
        }
    }) 
};
function getGender(i){
    if(i==1){
        return '男';
    }else if(i==2){
        return '女'
    }else if(i==3){
        return '保密'
    }else{
        return i;
    }
}
</script>
<style lang="scss" scoped>
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
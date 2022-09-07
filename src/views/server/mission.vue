<template>
    <van-list v-model:loading="loading" :finished="finished" 
    finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" is-link to="/taskinfo" @click="toInfo(item)">
            <template #default>
                <!-- <div class="layout"> -->
                    <div>
                        <p>{{item.work_type}} |做家务</p>
                        <p>工资：{{item.money}}
                            <van-tag type="danger">新单</van-tag>
                        </p>
                        <p>地点：{{item.address}}</p>
                    </div>
                    <!-- <van-button>&gt;</van-button> -->
                <!-- </div> -->
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
    // proxy.$store.commit("taskInfo",dataIn);
    window.sessionStorage.setItem("taskInfo",JSON.stringify(dataIn));
}
watch(
    ()=>proxy.$store.state.change,
    (valnew,valold)=>{
        if(valnew){
            // condition=JSON.parse(window.sessionStorage.getItem("saveCondition"));
            // request.value.city=condition.chooseCity;
            // request.value.work_type=condition.chooseType;
            // console.log(request.value.city,request.value.work_type);
            onLoad();
        }
    }
)
const onLoad = () => {
    // 异步更新数据
    loading.value=true;
    request.value.size+=10;
    proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/TaskList",request.value).then((res)=>{
        if(res.data.code==2000){
            // console.log(res.data.data);
            list.value=res.data.data.data;
            // 加载状态结束
            loading.value = false;
            // 数据全部加载完成
            if (request.value.size>=res.data.data.count) {
                finished.value = true;
            }  
        }
    }) 
};
</script>
<style lang="scss" scoped>
    .layout{
        position: relative;
        display: flex;
        div:first-of-type{
            width: 80px;
            height: 100px;
            margin-right:10px;
            img{
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
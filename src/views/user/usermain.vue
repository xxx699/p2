<template>
     <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" :key="$route.name"  v-if="$route.meta.keepAlive"/>
        </keep-alive>
            <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"/>
    </router-view> 
    <!-- <keep-alive :include="['release']">
        <router-view> -->
            <!-- <component :is="Component"></component> -->
        <!-- </router-view>
    </keep-alive> -->
    <!-- <router-view/> -->
    <van-tabbar v-model="active" active-color="#0AB829">
        <van-tabbar-item  name="jx" icon="home-o" :to="{ path:'/userlist',query:{title:'jx'} }">精选</van-tabbar-item>
        <van-tabbar-item  name="release" :to="{ path:'/release',query:{title:'release'} }">
            <span>发布</span>
            <template #icon="props">
                <i :class="[props.checked?'acitveicon':'iconfont']">&#xe694;</i>
            </template>
        </van-tabbar-item>
        <van-tabbar-item name="dingd" >
            <span>订单</span>
            <template #icon="props">
                <i :class="[props.checked?'acitveicon':'iconfont']">&#xe650;</i>
            </template>
        </van-tabbar-item >
        <van-tabbar-item name="mine" icon="friends-o" :to="{ path:'/userview',query:{title:'mine'} }">我的</van-tabbar-item>
    </van-tabbar>
</template>
<script setup>
    import { ref,getCurrentInstance, onMounted,keepAlive} from "vue"
    const { proxy } = getCurrentInstance();
    let active=ref("mine")
    let userType=ref(1);
    if(window.sessionStorage.getItem('userType')==1){
        userType.value=1;
    }else{
        userType.value=0;
    }
    onMounted(()=>{
        let tempAc=proxy.$route.query.title;
        active.value=tempAc;
    })
</script>
<style lang="scss" scoped>
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
.acitveicon{
    font-family: "iconfont" !important;
  font-size: 0.6rem;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
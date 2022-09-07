<template>
    <van-nav-bar :title="title" @click-left="intoList">
        <template #left>
            <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>
    <component :is="whichlist"></component>
</template>
<script setup>
    import { getCurrentInstance, shallowRef,ref } from 'vue';
    import list from "@/views/user/list.vue";
    import mission from "@/views/server/mission.vue";
    let whichlist=shallowRef();
    let title=ref('')
    if(window.sessionStorage.getItem("userType")==1){
        whichlist.value=list;
        title.value="精选服务员"
    }else{
        whichlist.value=mission;
        title.value="推荐工作"
    }
    const { proxy }=getCurrentInstance();
    const intoList=()=>{
        proxy.$router.push({path:'userlists'});
    }
</script>
<style>
</style>
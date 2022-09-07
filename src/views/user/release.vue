<template>
    <van-nav-bar :title="showTask?'找服务':'找工作'" />
    <div>
        <van-tabs color="#0AB828" title-active-color="#0AB828" v-model:active="active">
            <van-tab title="家庭服务">
                <router-view v-slot="{Component}">
                    <!-- <keep-alive :include="['homeres']"> -->
                        <component :is="Component"></component>
                    <!-- </keep-alive> -->
                </router-view>
            </van-tab>
            <van-tab title="企业服务">
                <keep-alive>
                    <companyres/>
                </keep-alive>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script setup>
    import { ref,KeepAlive,getCurrentInstance } from "vue";
    import companyres from "@/views/user/Companyres.vue"
    const { proxy } =getCurrentInstance();
    proxy.$router.push("/release/homeres");
    let showTask=ref(1);
    if(window.sessionStorage.getItem("userType")==1){
        showTask.value=1;
    }else{
        showTask.value=0;
    }
</script>
<style lang="scss" scoped>
</style>
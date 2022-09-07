<template>
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
    <form action="/">
        <van-search class="input" v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch">
            <template #action>
                <div class="search" @click="onClickButton">搜索</div>
            </template>
        </van-search>
    </form>
    <van-dropdown-menu :duration="0" active-color="black" :close-on-click-outside="false">
        <van-dropdown-item title="全部城市">
            <template #default>
                <van-radio-group v-model="serveInfo.chooseCity">
                    <van-radio v-for="(item, index) in cities" :key="item.name" :name="item.city">
                        <template #icon="props">
                            <van-button :type="props.checked ? 'success' : 'default'">{{ item.city }}</van-button>
                        </template>
                    </van-radio>
                </van-radio-group>
                <van-row class="reset">
                    <van-col :span="12">
                        <van-button>重置</van-button>
                    </van-col>
                    <van-col :span="12">
                        <van-button type="success" @click="submit">确定</van-button>
                    </van-col>
                </van-row>
            </template>
        </van-dropdown-item>
        <van-dropdown-item title="所有人员类型">
            <van-radio-group v-model="serveInfo.chooseType">
                <van-radio v-for="(item, index) in type" :key="'t' + index" :name="item.type">
                    <template #icon="props">
                        <van-button :type="props.checked ? 'success' : 'default'">{{ item.type }}</van-button>
                    </template>
                </van-radio>
            </van-radio-group>
            <van-row class="reset">
                <van-col :span="12">
                    <van-button>重置</van-button>
                </van-col>
                <van-col :span="12">
                    <van-button type="success" @click="submit">确定</van-button>
                </van-col>
            </van-row>
        </van-dropdown-item>
    </van-dropdown-menu>
    <component :is="whichlist"></component>
</template>
<script setup>
    import { ref, getCurrentInstance,shallowRef  } from "vue"
    import list from "@/views/user/list.vue"
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
    const { proxy } = getCurrentInstance();
    const onClickLeft = () => history.back();
    const serveInfo=ref({
        chooseCity:"全部城市",
        chooseType:"所有人员类型",
    })
    let value = ref();
    const cities = ref([
        { city: '全部城市', name: 1 },
        { city: '北京', name: 2 },
        { city: '深圳', name: 3 },
        { city: '武汉', name: 4 },
        { city: '成都', name: 5 },
        { city: '上海', name: 6 },
        { city: '广州', name: 7 },
        { city: '西安', name: 8 },
        { city: '长沙', name: 9 },
        { city: '重庆', name: 10 },
        { city: '天津', name: 11 },
        { city: '杭州', name: 12 },
        { city: '青岛', name: 13 },
        { city: '天津', name: 14 },
        { city: '重庆', name: 15 },
        { city: '西安', name: 16 },
        { city: '长沙', name: 17 },
        { city: '郑州', name: 18 },
        { city: '杭州', name: 19 },
        { city: '青岛', name: 20 },
        { city: '大连', name: 22 },
        { city: '南京', name: 23 },
        { city: '佛山', name: 24 },
        { city: '南通', name: 25 },
        { city: '东莞', name: 25 },
    ])
    const type = ref([
        { type: "所有人员类型" },
        { type: "住家保姆" },
        { type: "不住家保姆" },
        { type: "月嫂" },
        { type: "育儿嫂" },
        { type: "小时工" },
        { type: "护工" },
    ])
    let send=ref(false);
    const submit=()=>{
        window.sessionStorage.setItem("saveCondition",JSON.stringify(serveInfo.value));
        send.value=true;
        proxy.$store.commit('sendYs',send.value);
        
    }
</script>
<style lang="scss" scoped>
.reset {
    width: 100%;

    .van-button {
        width: 100%;
    }
}

.van-field {
    background-color: #F5F5F5;
    color: #ccc;
}

.van-radio-group {
    display: flex;
    flex-wrap: wrap;
    background-color: #F6F7F8;
    padding: 5px 0 15px 0;

    .van-radio {
        align-items: flex-start;
        margin: 0 10px;
        height: 0.8rem;

        .van-button {
            border-radius: 1.25rem;
            height: 100%;
            line-height: 3.5rem;
            padding: 0.3rem;
        }
    }
}

.search {
    background-color: #0AB828;
    color: white;
    width: 5.625em;
    text-align: center;
    border-radius: 2.5em;
    font-size: 1.125em;
}

.input {
    border-radius: 2.5em;
}
</style>
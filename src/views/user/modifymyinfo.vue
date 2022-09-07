<template>
    <van-form @submit="onSubmit" ref="formRef">
        <van-cell-group inset>
            <van-field v-model="condition2.nickname" name="昵称" label="昵称"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="condition2.qq" name="qq"  type='number' label="QQ" />
            <van-field v-model="condition2.phone" name="phone" type="number" label="手机号" />
            <van-field v-model="condition2.age" name="age" type="number" label="年龄" />
            <van-field  v-model="condition2.address" label="详细地址" readonly name="area" @click="showArea=true"/>
            <van-popup v-model:show="showArea" position="bottom">
                <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
            </van-popup>
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>
<script setup>
    import { ref,getCurrentInstance,toRefs } from 'vue';
    import { areaList } from '@vant/area-data';
    const { proxy }=getCurrentInstance();
    const { condition2 }=toRefs(proxy.$store.state);
    const showArea=ref(false);
    const formRef=ref();
    const onConfirm = (areaValues) => {
      showArea.value = false;
      condition2.value.address = areaValues
        .filter((item) => !!item)
        .map((item) => item.name)
    };
    const onSubmit = () => {
        formRef.value.validate().then(()=>{
            const address=condition2.value.address.split(",");
            const req={
                token:window.localStorage.getItem("token"),
                nick_name:condition2.value.nickname,
                qq:condition2.value.nick_name,
                phone:condition2.value.phone,
                address:condition2.value.address,
                province:address[0],
                city:address[1],
                area:address[2]
            };
            proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/userModify",req).then((res)=>{
                if(res.status==200){
                    if(res.data.code===2000){
                        proxy.$toast(res.data.msg);
                        proxy.$router.push("/userview");
                    }
                }
            })
        })
    }
</script>
<style>
</style>
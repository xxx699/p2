<template>
  <van-form @submit="onSubmit" ref="formRef">
    <van-row justify="center" style="margin-top:30px;">
      <van-col style="font-size:16px">用手机号登录</van-col>
    </van-row>
    <van-cell-group inset>
      <van-field v-model="userInfo.name" name="用户名" label="用户名" placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="userInfo.password" type="password" name="密码" label="密码" placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]" class="password" />
    </van-cell-group>
    <div style="margin:16px 16px 0 16px;">
      <van-button block :disabled="pass" type="primary" native-type="submit">
        登录
      </van-button>
    </div>
    <van-field class="xy" name="checkbox" :rules="[{ validator: validatorMessage }]">
      <template #input>
        <van-checkbox v-model="userInfo.checked" icon-size="14px">
          <template #default>
            我已阅读并同意平台的
            <router-link to="/requried">《隐私政策》</router-link>
            <router-link to="/requried">《需求协议》</router-link>
          </template>
        </van-checkbox>
      </template>
    </van-field>
  </van-form>
  <div style="padding:0 15px">
    <div>
      <img src="/pics/1.png" alt="">
    </div>
    <div>
      <img src="/pics/2.png" alt="">
    </div>
    <div>
      <img src="/pics/3.png" alt="">
    </div>
  </div>
</template>
<script setup>
import { ref, watch, getCurrentInstance } from "vue"
import { Toast } from 'vant';
const { proxy } = getCurrentInstance();
const formRef=ref();
let userInfo = ref({
  name: null,
  password: null,
  checked: false
});
const validatorMessage = (value) => {
  if (value == false) {
    Toast("请先阅读并勾选协议");
    return false;
  }
}
const onSubmit = () => {
  formRef.value.validate().then(()=>{
    proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/login", {
      name: userInfo.value.name,
      pw: userInfo.value.password
    }).then((res) => {
      if (res.data.code == 2000) {
        // // proxy.$store.commit("saveAccount",res.data.data);
        window.sessionStorage.setItem("saveAccount", JSON.stringify(res.data.data));
        window.sessionStorage.setItem("userType",res.data.data.user_type)
        window.localStorage.setItem("token", res.data.data.token);
        proxy.$router.push({ path: '/userview'})
      }
    })
  })
};
let pass = ref(true);
watch(
  () => userInfo.value.password,
  (valNew) => {
    if (valNew) {
      pass.value = false
    }
  }, {
    deep: true
}
)
</script>
<style lang="scss" scoped>
  img{height: 100%; width: 100%;}
.van-field__label {
  width: 0;
}

.van-button {
  color: white;
  font-size: 16px;
  border-radius: 5px;
}

.van-checkbox {
  margin-top: 20px;
  color: #C8C7CC;
  font-size: 0.3rem;
  a {
    color: #008000;
  }
}

.password {
  border-bottom: 1px solid #ccc;
}
.xy{
  justify-content: center;
}
</style>
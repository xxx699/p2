<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field v-model="demands.type" name="用户名" :rules="[{ required: true, message: '请填写用户名' }]">
                <template #input>
                    <h2>您需要的服务员类型是？</h2>
                    <van-radio-group v-model="checked" direction="horizontal">
                        <van-radio name="1">
                            <template #icon>
                                <van-button>小时工</van-button>
                            </template>
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field v-model="username" name="用户名" :rules="[{ required: true, message: '请填写用户名' }]">
                <template #input>
                    <h2>您需要的服务员性别是？</h2>
                    <van-radio-group v-model="checked" direction="horizontal">
                        <van-radio name="1">
                            <template #icon>
                                <van-button>女</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="2">
                            <template #icon>
                                <van-button>男</van-button>
                            </template>
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field v-model="username" name="用户名" :rules="[{ required: true, message: '请填写用户名' }]">
                <template #input>
                    <h2>您需要给公司做饭吗？</h2>
                    <van-radio-group v-model="checked" direction="horizontal">
                        <van-radio name="1">
                            <template #icon>
                                <van-button>需要</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="2">
                            <template #icon>
                                <van-button>不需要</van-button>
                            </template>
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field v-model="username" name="用户名" :rules="[{ required: true, message: '请填写用户名' }]">
                <template #input>
                    <h2>您需要给公司办公室保洁吗？</h2>
                    <van-radio-group v-model="checked" direction="horizontal">
                        <van-radio name="1">
                            <template #icon>
                                <van-button>需要</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="2">
                            <template #icon>
                                <van-button>不需要</van-button>
                            </template>
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field  v-model="result" is-link readonly name="area" placeholder="请选择期望月薪"
                     label="期望月薪" @click="showSalary = true" :rules="[{ required: true, message: '请填写用户名' }]">
                    <!-- <template #input>
                    <h2>服务地址</h2></template> -->
            </van-field>
            <van-popup v-model:show="showSalary" position="bottom">
                <van-picker title="标题" :columns="columns" @confirm="onConfirm2" @cancel="showSalary = false" />
            </van-popup>
            <van-field  v-model="result" is-link readonly name="area" placeholder="点击选择省市区"
                     label="服务地址" @click="showArea = true" :rules="[{ required: true, message: '请填写用户名' }]">
            </van-field>
            <van-popup v-model:show="showArea" position="bottom">
                <van-area :columns-num="2" :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
            </van-popup>
            <van-field  v-model="demands.other" name="其他">
                <template #input>
                    <h2>其他需求</h2> 
                   <van-field class="others" is-link to='/other'/>
                </template>
            </van-field>
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round  type="success" plain native-type="submit">
                存草稿
            </van-button>
            <van-button round  type="success" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>
<script setup>
import { ref } from "vue"
let checked = ref();
const demands = ref({
    type: null,
    gender: null,
    housework: null,
    oldman: null,
    pet: null,
    child: '',
    salary: '',
    address: '',
    other: null,
})
const result = ref('');
let showSalary=ref(false)
    const showArea = ref(false);
    const onConfirm = (areaValues) => {
      showArea.value = false;
      result.value = areaValues
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
    };
    const onConfirm2 = (areaValues) => {
      showSalary.value = false;
      result.value = areaValues
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
    };
const areaList = {
province_list: {
    110000: '北京市',
    120000: '天津市',
  },
  city_list: {
    110100: '北京市',
    120100: '天津市',
  },
};
let minsalary=ref([])
let min=1000;
for(i=0;i<100;i++){
    if(min==29800){
        break;
    }
    minsalary.value.push(min);
    min += 200;
}
console.log(minsalary.value);
const columns = [
      // 第一列
      {
        values: ['周一', '周二', '周三', '周四', '周五'],
        defaultIndex: 2,
      },
      // 第二列
      {
        values: ['上午', '下午', '晚上'],
        defaultIndex: 1,
      },
    ];
</script>
<style lang="scss" scoped>
    .van-cell{
        padding: var(--van-cell-vertical-padding) 0;
    }
.van-field {
    margin-bottom: 10px;

    h2 {
        width: 100%;
    }
}

.wrapper {
    background-color: #F7F9FA;
}

.container {
    background-color: white;
    margin-bottom: 10px;
    padding: 20px 10px;
}
.van-radio, .van-checkbox{
    width:7.2em;
    margin-bottom:0.625em;
}
.van-checkbox__icon, .van-radio__icon {
    height: inherit;
    // width: 100%;
}
.van-field__control--custom{
    display: block;
}
.van-button{
    width:7.5rem;
    height: 2.5rem;
    border-radius: 0.3rem;
}
</style>
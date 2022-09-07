<template>
  <van-nav-bar title="找工作" />
  <div>
        <van-tabs color="#0AB828" title-active-color="#0AB828" v-model:active="active">
            <van-tab title="家庭服务">
              <van-form  @submit="onSubmit" ref="formRef">
        <van-cell-group inset>
            <van-field  :scroll-to-error="true" :rules="[{ required: true, message: '请先选择服务类型' }]">
                <template #input>
                    <h2>您要找的工作是？</h2>
                    <van-radio-group v-model="demands.type" direction="horizontal">
                        <van-radio name="住家保姆">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">住家保姆</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="不住家保姆">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">不住家保姆</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="月嫂">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">月嫂</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="育儿嫂">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">育儿嫂</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="小时工">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">小时工</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="护工">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">护工</van-button>
                            </template>
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field :rules="[{ required: true, message: '请选择性别' }]">
                <template #input>
                    <h2>您的性别是？</h2>
                    <van-radio-group v-model="demands.gender" direction="horizontal">
                        <van-radio name="女">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">女</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="男">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">男</van-button>
                            </template>
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field>
                <template #input>
                    <h2>您愿意做家务吗？</h2>
                    <van-radio-group v-model="demands.housework" direction="horizontal">
                        <van-radio name="1">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">需要</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="2">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">不需要</van-button>
                            </template>
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field >
                <template #input>
                    <h2>您需要照顾老人/病人吗？</h2>
                    <van-checkbox-group v-model="demands.oldman" direction="horizontal">
                        <van-checkbox name="1">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">能自理</van-button>
                            </template>
                        </van-checkbox>
                        <van-checkbox name="2">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">半自理</van-button>
                            </template>
                        </van-checkbox>
                        <van-checkbox name="3">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">不能自理</van-button>
                            </template>
                        </van-checkbox>
                        <van-checkbox name="4">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">病人</van-button>
                            </template>
                        </van-checkbox>
                        <van-checkbox name="5">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">不照顾</van-button>
                            </template>
                        </van-checkbox>
                    </van-checkbox-group>
                </template>
            </van-field>
            <van-field >
                <template #input>
                    <h2>您需要饲养宠物吗？</h2>
                    <van-radio-group v-model="demands.pet" direction="horizontal">
                        <van-radio name="1">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">需要</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="2">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">不需要</van-button>
                            </template>
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field >
                <template #input>
                    <h2>您需要带孩子吗？</h2>
                    <van-checkbox-group v-model="demands.child" direction="horizontal">
                        <van-checkbox name="1">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">辅助带</van-button>
                            </template>
                        </van-checkbox>
                        <van-checkbox name="2">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">全职带</van-button>
                            </template>
                        </van-checkbox>
                        <van-checkbox name="3">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">不带孩子</van-button>
                            </template>
                        </van-checkbox>
                    </van-checkbox-group>
                </template>
            </van-field>
            <van-field  v-model="demands.salary" is-link readonly name="salary" placeholder="请选择期望月薪"
                     label="期望月薪" @click="showSalary = true" :rules="[{ required: true, message: '请选择期望月薪' }]">
                    <!-- <template #title>
                    <h2>期望月薪</h2></template> -->
            </van-field>
            <van-popup v-model:show="showSalary" position="bottom">
                <van-picker title="标题" :columns="columns" @confirm="onConfirm2" @cancel="showSalary = false" />
            </van-popup>
            <van-field  v-model="demands.address" is-link readonly name="area" placeholder="点击选择省市区"
                     label="服务地址" @click="showArea = true" :rules="[{ required: true, message: '请选择城市' }]">
            </van-field>
            <van-popup v-model:show="showArea" position="bottom">
                <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
            </van-popup>
            <van-field  v-model="demands.other" name="其他">
                <template #input>
                    <h2>其他需求</h2> 
                   <van-field class="others" is-link to='/other'/>
                </template>
            </van-field>
        </van-cell-group>
        <div style="margin:0 1rem;height:6rem;">
            <van-button class="sub" round  type="success" plain>
                存草稿
            </van-button>
            <van-button class="sub" round  type="success" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
            </van-tab>
            <van-tab title="企业服务">

            </van-tab>
        </van-tabs>
    </div>
</template>
<script setup>
  import { KeepAlive,getCurrentInstance } from "vue";
  import { Notify } from "vant";
    const { proxy } =getCurrentInstance();
    const formRef=ref();
    const demands = ref({
        type: '',
        gender: '',
        housework: '',
        oldman: [],
        pet: '',
        child: [],
        salary: [],
        address: [],
        other: '',
    })
    let showSalary=ref(false)
    const showArea = ref(false);
    const onConfirm = (areaValues) => {
      showArea.value = false;
      demands.value.address = areaValues
        .filter((item) => !!item)
        .map((item) => item.name)
    };
    const onConfirm2 = (areaValues) => {
      showSalary.value = false;
      demands.value.salary = areaValues;
    };
    let minsalary=ref([])
    let min=1000;
    let maxsalary=ref([]);
    let max=1200;
    for(let i=0;i<200;i++){
        minsalary.value.push(min);
        if(maxsalary.value[i]==29800){
            break;
        }
        min += 200;
    }
    for(let i=0;i<200;i++){
        maxsalary.value.push(max);
        if(maxsalary.value[i]==30000){
            break;
        }
        max += 200;
    }
    const columns = [
        // 第一列
        {
            values: minsalary.value,
            defaultIndex: 2,
        },
        // 第二列
        {
            values: maxsalary.value,
            defaultIndex: 1,
        },
    ];
    const onSubmit = () => {
        formRef.value.validate().then(()=>{
            const address=demands.value.address.split(",");
            const salary=demands.value.salary.split(",");
            const money=parseInt(salary[1]);
            const req={
                token:window.sessionStorage.getItem("token"),
                phone:'',
                province:address[0],
                city:address[1],
                area:address[2],
                money,
                work_type:demands.value.type,
                start_time:Math.round(Date.now()/1000).toString(),
                end_time:Math.round(Date.parse("2022/10/1 24:00")/1000).toString(),
                address:demands.value.address
            }
            proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/addTask",req ).then((res) => {
                if (res.data.code == 2000) {
                    Notify("新增成功");
                    demands.value.type= '';
                    demands.value.gender= '';
                    demands.value.housework= '';
                    demands.value.oldman= [];
                    demands.value.pet= '';
                    demands.value.child= [];
                    demands.value.salary= [];
                    demands.value.address= [];
                    demands.value.other= '';
                 }
            })
        })
    };
</script>
<style lang="scss" scoped>
</style>
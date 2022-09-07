<template>
    <van-form  @submit="onSubmit" ref="formRef">
        <van-cell-group inset class="works">
            <van-field  :scroll-to-error="true" :rules="[{ required: true, message: '请先选择服务类型' }]">
                <template #input>
                    <h2 v-if="showTask">您需要的服务员类型是？</h2>
                    <h2 v-else>您要找的工作是？</h2>
                    <van-radio-group v-model="condition2.type" direction="horizontal">
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
            <van-field  :rules="[{ required: true, message: '请选择性别' }]">
                <template #input>
                    <h2 v-if="showTask">您需要的服务员性别是？</h2>
                    <h2 v-else>您的性别是？</h2>
                    <van-radio-group v-model="condition2.gender" direction="horizontal">
                        <van-radio name="2">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">女</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="1">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">男</van-button>
                            </template>
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field>
                <template #input v-if="showTask">
                    <h2 >您需要做家务吗？</h2>
                    <van-radio-group v-model="condition2.housework" direction="horizontal">
                        <van-radio name="需要">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">需要</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="不需要">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">不需要</van-button>
                            </template>
                        </van-radio>
                    </van-radio-group>
                </template>
                <template #input v-else>
                    <h2>您愿意做家务吗？</h2>
                    <van-radio-group v-model="condition2.housework" direction="horizontal">
                        <van-radio name="愿意">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">愿意</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="不愿意">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">不愿意</van-button>
                            </template>
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field >
                <template #input>
                    <h2 v-if="showTask">您需要照顾老人/病人吗？</h2>
                    <h2 v-else>您愿意照顾老人/病人吗？</h2>
                    <van-checkbox-group v-model="condition2.oldman" direction="horizontal">
                        <van-checkbox name="能自理">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">能自理</van-button>
                            </template>
                        </van-checkbox>
                        <van-checkbox name="半自理">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">半自理</van-button>
                            </template>
                        </van-checkbox>
                        <van-checkbox name="不能自理">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">不能自理</van-button>
                            </template>
                        </van-checkbox>
                        <van-checkbox name="病人">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">病人</van-button>
                            </template>
                        </van-checkbox>
                        <van-checkbox name="不照顾">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">不照顾</van-button>
                            </template>
                        </van-checkbox>
                    </van-checkbox-group>
                </template>
            </van-field>
            <van-field >
                <template #input v-if="showTask">
                    <h2 >您需要饲养宠物吗？</h2>
                    <van-radio-group v-model="condition2.pet" direction="horizontal">
                        <van-radio name="需要">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">需要</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="不需要">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">不需要</van-button>
                            </template>
                        </van-radio>
                    </van-radio-group>
                </template>
                <template #input v-else>
                    <h2>您愿意饲养宠物吗？</h2>
                    <van-radio-group v-model="condition2.pet" direction="horizontal">
                        <van-radio name="愿意">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">愿意</van-button>
                            </template>
                        </van-radio>
                        <van-radio name="不愿意">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">不愿意</van-button>
                            </template>
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field >
                <template #input>
                    <h2 v-if="showTask">您需要带孩子吗？</h2>
                    <h2 v-else>您愿意带孩子吗？</h2>
                    <van-checkbox-group v-model="condition2.child" direction="horizontal">
                        <van-checkbox name="辅助带">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">辅助带</van-button>
                            </template>
                        </van-checkbox>
                        <van-checkbox name="全职带">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">全职带</van-button>
                            </template>
                        </van-checkbox>
                        <van-checkbox name="不带孩子">
                            <template #icon="props">
                                <van-button :type="props.checked ? 'success' : 'default'">不带孩子</van-button>
                            </template>
                        </van-checkbox>
                    </van-checkbox-group>
                </template>
            </van-field>
            <van-field  v-model="condition2.salary" readonly name="salary" :rules="[{ required: true, message: '请选择期望月薪' }]">
                    <template #input>
                        <h2>期望月薪</h2>
                        <van-field v-model="condition2.salary" class="others" is-link placeholder="请选择期望月薪" @click="showSalary = true"/>
                    </template>
            </van-field>
            <van-popup v-model:show="showSalary" position="bottom">
                <van-picker :columns="columns" @confirm="onConfirm2" @cancel="showSalary = false" />
            </van-popup>
            <van-field  v-model="condition2.address" readonly name="area" :rules="[{ required: true, message: '请选择城市' }]">
                     <template #input>
                        <h2>服务地址</h2>
                        <van-field v-model="condition2.address" class="others" is-link placeholder="点击选择省市区" @click="showArea = true"/>
                    </template>
            </van-field>
            <van-popup v-model:show="showArea" position="bottom">
                <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
            </van-popup>
            <van-field  v-model="condition2.other" name="其他">
                <template #input>
                    <h2 v-if="showTask">其他需求</h2>
                    <h2 v-else>我的优势</h2> 
                   <van-field class="others" is-link to='/other'/>
                </template>
            </van-field>
        </van-cell-group>
        <div style="margin:0 0.4rem;height:6rem;">
            <van-button class="sub sub1" round  type="success" plain>
                存草稿
            </van-button>
            <van-button class="sub" round  type="success" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>
<script setup>
    import { ref,getCurrentInstance,toRefs } from "vue"
    import { areaList } from '@vant/area-data';
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
    const {condition2}=toRefs(proxy.$store.state);
    let showTask=ref(1);
    if(window.sessionStorage.getItem("userType")==1){
        showTask.value=1;
    }else{
        showTask.value=0;
    }
    let showSalary=ref(false)
    const showArea = ref(false);
    const onConfirm = (areaValues) => {
      showArea.value = false;
      condition2.value.address = areaValues
        .filter((item) => !!item)
        .map((item) => item.name)
    };
    const onConfirm2 = (areaValues) => {
      showSalary.value = false;
      condition2.value.salary = areaValues;
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
        },
        // 第二列
        {
            values: maxsalary.value,
        },
    ];
    const onSubmit = () => {
        formRef.value.validate().then(()=>{
            const address=condition2.value.address.split(",");
            const salary=condition2.value.salary.split(",");
            const money=parseInt(salary[1]);
            const servcontent={
                "您愿意做家务":condition2.value.housework,
                "您愿意照顾老人":condition2.value.oldman,
                '您愿意饲养宠物':condition2.value.pet,
                "您愿意带孩子":condition2.value.child
            }
            const content={
                "您需要服务的性别":condition2.value.gender,
                "您需要做家务":condition2.value.housework,
                "您需要照顾老人吗":condition2.value.oldman.toString(),
                '您需要饲养宠物吗':condition2.value.pet,
                "您需要带孩子吗":condition2.value.child.toString(),
            }
            const req={
                token:window.localStorage.getItem("token"),
                phone:'',
                province:address[0],
                city:address[1],
                area:address[2],
                money,
                content:JSON.stringify(content),
                work_type:condition2.value.type,
                start_time:Math.round(Date.now()/1000).toString(),
                end_time:Math.round(Date.parse("2022/10/1 24:00")/1000).toString(),
                address:condition2.value.address
            }
            const servereq={
                token:window.localStorage.getItem("token"),
                work_type:condition2.value.type,
                sex:condition2.value.sex,
                province:address[0],
                city:address[1],
                area:address[2],
                address:condition2.value.address,
                content:JSON.stringify(servcontent),
                h_price:money
            }
            if(showTask.value==1){
                console.log(46814);
                proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/addTask",req ).then((res) => {
                    if (res.data.code == 2000) {
                        Notify(res.data.msg);
                        proxy.$store.commit("cleanCont");
                     }
                })
            }else{
                console.log('服务员新增');
                proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/userModify",servereq ).then((res) => {
                    if (res.data.code == 2000) {
                        Notify(res.data.msg);
                        proxy.$store.commit("cleanCont");
                     }
                })
            }
        })
    };
</script>
<style lang="scss" scoped>
    
    .others{
        border:1px solid #ccc;
        border-radius: 0.1rem;
        .van-cell__value{
            padding:0 1rem;
        }
    }
    div .sub{
        width:4.5rem;
        height: 1.5rem;
    }
    div .sub1{
        margin-right:0.2rem;
    }
    .van-cell{
        padding: var(--van-cell-vertical-padding) 0;
    }
.van-field {
    margin-bottom: 0.3rem;
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
    padding: 0.5rem 0.3rem;
}
.van-radio, .van-checkbox{
    width:2.7rem;
    height:1rem;
    margin-bottom:0.3rem;
}
.van-checkbox__icon, .van-radio__icon {
    height: 0.8rem;
}
.van-button{
    width:2.7rem;
    padding:0.3rem 0;
    height: inherit;
    border-radius: 0.15rem;
}
::v-deep .van-field__control--custom{
    display: block;
}
</style>
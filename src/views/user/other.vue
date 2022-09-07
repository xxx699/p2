<template>
    <van-nav-bar left-arrow @click-left="onClickLeft" />
    <div class="wrapper">
        <van-form @submit="onSubmit" class="forms">
           <van-field  v-model="condition2.other" name="其他" placeholder="请详细描述您的需求">
           </van-field>
        </van-form>
        <van-cell>
           <p style="padding:0 0.2rem;border-bottom:0.03rem solid #ddd;">示例</p>
           <p v-if="show" style="font-size:0.5rem;padding:0 0.2rem">有做饭的经验，辅助带过2个宝宝，照顾过3个半自理老人，参加过育婴师培训，有健康证，有驾照，会说一点简单的英语。</p>
           <p v-else style="font-size:0.5rem;padding:0 0.2rem">家里一位女老人自理，需要一名做饭做家务的阿姨，50岁左右，身体健康，人品好，性格好，必须有做饭的经验，籍贯不限，最好能长期干的。</p>
        </van-cell>
        <van-cell class="btn">
            <van-button type="success" @click="submitCont">提交</van-button>
        </van-cell>
    </div>
</template>
<script setup>
    import { toRefs,ref,getCurrentInstance } from "vue"
    import {Notify} from "vant"
    const { proxy } =getCurrentInstance();
    let {condition2}=toRefs(proxy.$store.state);
    const onClickLeft = () => history.back();
    let show=false;
    if(window.sessionStorage.getItem('userType')==1){
        show=false;
    }else{
        show=true;
    }
    function submitCont(){
        const {condition2}=toRefs(proxy.$store.state);
        if(!condition2.value.type || !condition2.value.address || !condition2.value.salary){
        }else{
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
            if(show==false){
                proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/addTask",req ).then((res) => {
                    if (res.data.code == 2000) {
                        Notify("新增成功");
                        proxy.$store.commit("cleanCont");
                     }
                })
            }else{
                console.log('服务员新增');
                proxy.$axios.post("http://chengmei_dev.wanxikeji.cn/api/userModify",servereq ).then((res) => {
                    if (res.data.code == 2000) {
                        Notify(res.data.msg);
                        // demands.value.type= '';
                        // demands.value.gender= '';
                        // demands.value.housework= '';
                        // demands.value.oldman= [];
                        // demands.value.pet= '';
                        // demands.value.child= [];
                        // demands.value.salary= [];
                        // demands.value.address= [];
                        // demands.value.other= '';
                        proxy.$store.commit("cleanCont");
                     }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .btn{
        position: absolute;
        bottom:0;
    }
    .van-button{
        width: 100%;
    }
    .wrapper{
        background-color: #ddd;
    }
    .forms{
        margin-bottom:0.15rem;
        .van-field{
            height: 5rem;
        }
    }
    .van-field{
        padding:0.3rem;
        font-size:0.5rem;
    }
</style>
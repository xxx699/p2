import { createStore } from 'vuex'

export default createStore({
        state:{
            change:false,
            condition2:{
                type: '',
                gender: '',
                housework: '',
                oldman: [],
                pet: '',
                child: [],
                salary: [],
                address: [],
                other: '',
                nickname:'',
                qq:'',
                phone:'',
                address:'',
                age:null
            }
        },
        getters:{
            // state的计算属性
            // myGetters:(state)=>state.myGoodsType,
        },
        mutations:{
            sendYs:(state,changeIn)=>{
                state.change=changeIn;
            },
            cleanCont:(state)=>{
                state.condition2={
                    type: '',
                    gender: '',
                    housework: '',
                    oldman: [],
                    pet: '',
                    child: [],
                    salary: [],
                    address: [],
                    other: '',
                }
            }
        },
        actions:{
            // 此函数通过commit一个mutation改变一个state的值
            // async postGoodsType({state,commit}, GoodsTypeIn){
            //     commit('myMutation',GoodsTypeIn);
            // }
        },
        modules:{}
    
})


import axios from "axios"
import { Notify } from 'vant';
import router from "@/router"
const myAxios = new axios.create({})
// 请求拦截器
myAxios.interceptors.request.use((config)=>{
    if(!config.url.includes("http")){
        config.url="http://chengmei_dev.wanxikeji.cn/"+config.url;
    }
    // if(!config.data.token){
    //     config.headers.token=window.localStorage.getItem("token");
    // }
    return config;
})
// 响应拦截器
myAxios.interceptors.response.use((res)=>{ 
    // 写返回数据错误
    if(res.data.code===3000){
        Notify(res.data.msg);
        router.push("/login");
        return Promise.reject();
    }
    else if(res.data.code==2010) {
        Notify(res.data.msg);
        return Promise.reject();
    //     // 清空token
    //     window.localStorage.removeItem("token");
    //     // 跳转页面
    //     router.push("/login");
    //     // 返回失败的promise
    //     return Promise.reject();
    }
    return res;
},(er)=>{
    // 写网络错误
})
export default myAxios
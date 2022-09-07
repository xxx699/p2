import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import myAxios from './axios'
import "@/assets/iconfont.js"
import 'ant-design-vue/dist/antd.css'
import { Notify,Toast } from 'vant'
import 'vant/es/notify/style'
import 'vant/es/toast/style';
import 'amfe-flexible'
// 路由守卫
router.beforeEach((to,from,next)=>{
    if(to.meta.needLogin==true){
        if(window.localStorage.getItem("token")){
            next()
        }else{
            next('login');
        }
    }else{
        next();
    } 
})
const app=createApp(App)
app.config.globalProperties.$axios=myAxios;
app.config.globalProperties.$router=router;
app.use(Toast).use(Notify).use(store).use(router).mount('#app')

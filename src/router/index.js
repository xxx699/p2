
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/user',
    name: 'user',
    component: ()=> import("@/views/user/usermain.vue"),
    meta:{
      needLogin:true
    },
    children:[
      { path:"/userview", name:"userview", component: ()=> import("@/views/user/userview.vue"),
        meta:{ keepAlive:false },
      },
      { path:"/userlist",  name:"userlist", component: ()=> import("@/views/user/userlist.vue"),
        meta:{ keepAlive:false },
      },
      { path:"/release", name:"release", component: ()=> import("@/views/user/release.vue"),
        meta:{ keepAlive:true },
        children:[
          { path:"homeres", 
            name:"homeres", 
            component: ()=> import("@/views/user/Homeres.vue"),
            meta:{ keepAlive:true }
      },
          ]
      },
      { path:"/mission", name:"mission", component: ()=> import("@/views/server/mission.vue"),
        meta:{ keepAlive:false },
      },
      { path:"/modifymyinfo", name:"modify", component: ()=> import("@/views/user/modifymyinfo.vue"),
        meta:{ keepAlive:false },
      },
      // { path:"/homeres", 
      //       name:"homeres", 
      //       component: ()=> import("@/views/user/Homeres.vue"),
      //       meta:{ keepAlive:true }
      // },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: ()=> import("@/views/login.vue")
  },
  {
    path: '/register',
    name: 'register',
    component: ()=> import("@/views/register.vue")
  },
  {
    path: '/requried',
    name: 'requried',
    component: ()=> import("@/views/required.vue")
  },
  {
    path: '/change',
    name: 'change',
    component: ()=> import("@/views/changerole.vue")
  },
  { path:"/userlists", name:"搜索人员", component: ()=> import("@/views/user/userlists.vue") },
  { path:"/information", name:"详情页面", component: ()=> import("@/views/user/information.vue") },
  { path:"/myreserve", name:"需求列表", component: ()=> import("@/views/user/myreserve.vue") },
  { path:"/yuekan", name:"约看", component: ()=> import("@/views/user/yuekan.vue") },
  { path:"/other", name:"其他需求", component: ()=> import("@/views/user/other.vue") },
  { path:"/companyres", name:"公司服务", component: ()=> import("@/views/user/other.vue") },
  { path:"/taskinfo", name:"人物列表", component: ()=> import("@/views/server/taskinfo.vue") },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

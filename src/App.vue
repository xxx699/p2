<template>
  <router-view></router-view>
</template>

<script>
  // 解决刷新时vuex的数据重置消失
  export default({
    name:'App',
    created(){
      // 先检查sessionStorage中是否有数据，若存在数据则加载到vuex
      if(sessionStorage.getItem("store")){
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(sessionStorage.getItem("store"))
          )
        );
        sessionStorage.removeItem("store");
      }
      // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(proxy.$store.state));
    });
    }
  })
</script>

<style lang="scss">
@font-face {
  font-family: 'iconfont';
  src: url('@/assets/download/iconfont.ttf?t=1660118849763') format('truetype');
}
/* 第二步：定义使用iconfont的样式 */
.iconfont {
  font-family: "iconfont" !important;
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
*{margin:0}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>

<template>
  <div id="app">
    <HeaderView></HeaderView>
    <router-view></router-view>
    <FooterView></FooterView>
  </div>
</template>

<script>
  import Home from "./components/home/Home.vue";
  import HeaderView from "./components/header/Header.vue";
  import FooterView from "./components/footer/Footer.vue";
  export default {
    mounted(){
      if(localStorage.token){
        this.$store.dispatch("add1")
        this.$store.dispatch("del2")
      }else{
        this.$store.dispatch("add2")
        this.$store.dispatch("del1")
      }
    },
    name: 'app',
    components: {
      Home,
      "HeaderView":HeaderView,
      "FooterView":FooterView
    },
    methods:{

    },
    watch: {
      $route(to,from){
        if(to.path == "/login"){
          localStorage.clear();
          this.$store.dispatch("add2")
          this.$store.dispatch("del1")
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>

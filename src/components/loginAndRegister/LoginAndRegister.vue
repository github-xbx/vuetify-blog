<template>
  <div>
    <template v-if="loginOrReg">
      <Login/>

      <p class="black--text mx-5 " >没有账号？ <span @click="loginAndRegister">去注册></span></p>
    </template>
    <template v-if="!loginOrReg">
      <Register/>

      <p class="black--text mx-5 " >已有账号？ <span @click="loginAndRegister">去登陆></span></p>
    </template>
  </div>

</template>

<script>
import Login from "./login"
import Register from "./register"
export default {
  name: "main",
  data: ()=> ({
    loginOrReg:true,//登录和注册组件切换 true为登录false为注册
  }),
  components:{
    Login,
    Register
  },
  methods:{
    loginAndRegister(){
      this.loginOrReg = !this.loginOrReg
      console.log(this.loginOrReg)
    }
  }
}
</script>

<style scoped>

</style>

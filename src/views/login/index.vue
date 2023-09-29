<template>
  <section class="login-wrap">
    <el-card class="login-box">
       <template #header>
        <span>登录</span>
       </template>

      <el-form :model="loginInfo" label-width="auto">
      <el-form-item label="用户名" prop="username">
         <el-input v-model="loginInfo.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
         <el-input v-model="loginInfo.password"></el-input>
      </el-form-item>


      <el-form-item label="验证码" prop="verifycode">
         <el-input v-model="loginInfo.verifycode"></el-input>
      </el-form-item>
    </el-form>
    </el-card>
    
   
  </section>
</template>

<script lang="ts" setup>
import { onMounted, proxyRefs, ref } from 'vue';
import { reactive } from 'vue-demi';

const loginInfo = reactive({
   username: '22',
   password: '33',
   verifycode: ''
})


onMounted(() => {
  
});
</script>

<style lang="scss" scoped>

 .login-wrap {
  background-color:rgba(24, 49, 95, 0.447);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-box {
    width: 500px;

  }
 }

</style>

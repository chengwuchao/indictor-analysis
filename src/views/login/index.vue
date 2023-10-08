<template>
  <div class="login">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <h3 class="title">工作流开发平台</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <svg-icon icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
          <svg-icon icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter="handleLogin"
        >
          <svg-icon icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>
      <el-checkbox
        v-model="loginForm.rememberMe"
        style="margin: 0px 0px 25px 0px"
        >记住密码</el-checkbox
      >
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          s
          type="primary"
          style="width: 100%"
          @click="handleLogin(loginFormRef)"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © Xuan xuan.</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCodeImg } from '@/api/login';
import Cookies from 'js-cookie';
import { encrypt, decrypt } from '@/utils/jsencrypt';
import { reactive, ref } from 'vue';
import router from '@/router';
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted } from 'vue';
import _ from 'lodash';
import { LoginForm } from '@/types/login';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

const loginForm = reactive<LoginForm>({
  username: 'tony',
  password: '123456',
  rememberMe: false,
  code: '',
  uuid: '',
});

const codeUrl = ref('');
const cookiePassword = ref('');
let loading = ref(false);
const redirect = ref('');

const loginRules = reactive<FormRules>({
  username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
  password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
  code: [{ required: true, trigger: 'change', message: '验证码不能为空' }],
});

const loginFormRef = ref<FormInstance>();

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      if (loginForm.rememberMe) {
        Cookies.set('username', loginForm.username, { expires: 30 });
        Cookies.set('password', getDecryptText(encrypt(loginForm.password)), {
          expires: 30,
        });
        Cookies.set('rememberMe', String(loginForm.rememberMe), {
          expires: 30,
        });
      } else {
        Cookies.remove('username');
        Cookies.remove('password');
        Cookies.remove('rememberMe');
      }

      userStore
        .login(loginForm)
        .then(() => {
          router.push({ path: redirect.value || '/' }).catch(() => {});
        })
        .catch(() => {
          loading.value = false;
          getCode();
        });
    }
  });
};

onMounted(() => {
  getCode();
  getCookie();
});

function getCode() {
  getCodeImg().then(({ uuid, img }) => {
    codeUrl.value = 'data:image/gif;base64,' + img;
    loginForm.uuid = uuid;
  });
}

function getCookie() {
  const username = Cookies.get('username');
  const password = Cookies.get('password');
  const rememberMe = Cookies.get('rememberMe');
  loginForm.username = _.defaultTo(username, loginForm.username);
  loginForm.password =
    password === undefined
      ? loginForm.password
      : getDecryptText(decrypt(password));

  loginForm.rememberMe = rememberMe === undefined ? false : Boolean(rememberMe);
}

function getDecryptText(decryptText: string | false) {
  const res = String(decryptText);
  return res === 'false' ? '' : res; // 对数据进行解密
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('@/assets/images/login-background.jpg');
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>

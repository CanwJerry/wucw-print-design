<template>
  <div class="login" ref="loginRef">
    <div class="login-box">
      <p class="login-title">Welcome</p>
      <el-form :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" size="large" placeholder="请输入用户名" :prefix-icon="User" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" size="large" placeholder="请输入密码" :prefix-icon="Lock" clearable></el-input>
        </el-form-item>
      </el-form>
      <div class="login-options">
        <el-checkbox v-model="keepLoginStatus">保持登录状态</el-checkbox>
        <p class="login-forget" @click="handleForgetPassword">忘记密码</p>
      </div>
      <button class="login-btn" @click="handleLogin">登录</button>
      <div class="login-signup">
        还没有账户?<span class="signup" @click="handleSignUp">注册新用户</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
  };
</script>

<script setup>
  import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
  import { User, Lock } from '@element-plus/icons-vue'
  import * as THREE from "three";
  import GLOBE from 'vanta/src/vanta.globe';

  let keepLoginStatus = ref(false);

  const form = reactive({
    username: '',
    password: ''
  })

  const rules = reactive({
    username: [
      { required: true, message: '用户名不能为空', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
    ]
  })

  const handleLogin = function() {
    console.log('登录');
  }

  const handleForgetPassword = function() {
    console.log('忘记密码');
  }

  const handleSignUp = function() {
    console.log('注册新用户');
  }

  const loginRef = ref(null);

  let vantaEffect = null;

  // onMounted(() => {
  //   vantaEffect = GLOBE({
  //     el: loginRef.value,
  //     THREE: THREE,
  //     color: '#6f7f6f',
  //     backgroundColor: '#92c892',
  //   })
  // })

  // onBeforeUnmount(() => {
  //   if(vantaEffect) {
  //     vantaEffect.destroy();
  //   }
  // })
</script>

<style lang='scss' scope>
  @import './index.scss';
</style>
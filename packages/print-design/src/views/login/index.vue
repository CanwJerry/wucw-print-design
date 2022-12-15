<template>
  <w-background>
    <div class="login" ref="loginRef">
      <div class="login-box">
        <p class="login-title">Welcome</p>
        <el-form :model="form" :rules="rules" ref="formRef">
          <el-form-item prop="username">
            <el-input v-model="form.username" size="large" placeholder="请输入用户名" :prefix-icon="User" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              clearable
              size="large"
              placeholder="请输入密码"
              type="password"
              show-password
              :prefix-icon="Lock"
              @keyup.enter="handleLogin">
            </el-input>
          </el-form-item>
        </el-form>
        <div class="login-options">
          <el-checkbox v-model="keepLoginStatus">保持登录状态</el-checkbox>
          <p class="login-forget" @click="handleForgetPassword">忘记密码</p>
        </div>
        <w-button @click="handleLogin"></w-button>
        <div class="login-signup">
          还没有账户?<span class="signup" @click="handleSignUp">注册新用户</span>
        </div>
      </div>
    </div>
  </w-background>
</template>

<script>
  export default {
    name: 'Login',
  };
</script>

<script setup>
  import { ref, reactive } from 'vue';
  import { User, Lock } from '@element-plus/icons-vue'
  import { useRouter } from "vue-router";
  import { userLogin } from '@/api/api';

  const router = useRouter();

  let keepLoginStatus = ref(false);

  const formRef = ref(null);

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
    formRef.value.validate(vaild => {
      if(!vaild) return; 
      userLogin(form).then(res => {
        if(res.status === 200) {
          const { token } = res.data;
          sessionStorage.setItem('accessToken', token);
          router.push('/index');
        }
      })
    })
  }

  const handleForgetPassword = function() {
    router.push('/forget');
  }

  const handleSignUp = function() {
    router.push('/signup');
  }

</script>

<style lang='scss' scope>
  @import './index.scss';
</style>
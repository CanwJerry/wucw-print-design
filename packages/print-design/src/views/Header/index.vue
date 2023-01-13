<template>
  <div class="header">
    <div>logo</div>
    <div class="logout-Info">
      <p>{{ username }}</p>
      <img class="btn" src="@/assets/images/logout.svg" alt="logout" @click="logout">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<script setup>
  import resetLogin from '@/utils/resetLogin';
  
  const username = sessionStorage.getItem('username');

  const logout = () => {
    resetLogin();
  }
</script>

<style lang="scss" scoped>
  .header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logout-Info {
    display: flex;
    .btn {
      margin-left: 20px;
      cursor: pointer;
    }
  }
</style>
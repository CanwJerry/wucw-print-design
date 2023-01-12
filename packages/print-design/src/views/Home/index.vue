<template>
  <div class="home" v-wLoading="loading">
    home
    <el-button v-wBtnLimit:saveID @click="handleSave">保存</el-button>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { getCurrentInstance } from 'vue'

  const { proxy } = getCurrentInstance();

  const loading = ref(false);

  const handleSave = () => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      proxy.$clearBtnLimit('saveID');
    }, 2000);
  }
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
    width: 100%;
  }
</style>
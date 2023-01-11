<template>
  <div class="home" v-wLoading="loading">
    home
  </div>
</template>

<script setup>
  import { ref } from "vue";

  // const title = ref('加载中...');

  const loading = ref(true);
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
    width: 100%;
  }
</style>
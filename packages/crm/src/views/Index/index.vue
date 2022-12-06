<template>
  <div>welcome {{ name }}</div>
</template>

<script>
  export default {
    name: 'Index',
  };
</script>

<script setup>
  import userStore from '@/store/user.store.js';
  import { storeToRefs } from 'pinia';

  const us = userStore();
  const { name } = storeToRefs(us);
</script>

<style lang='scss' scope>

</style>
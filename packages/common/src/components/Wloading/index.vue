<template>
  <div class="loading-box">
    <div class="mask"></div>
    <div class="boxes">
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="text">{{ title }}</div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'Loading',
  }
</script>

<script setup>
  import { ref } from 'vue';

  const title = ref('');

  const setTitle = (val) => {
    title.value = val;
  }

  defineExpose({title, setTitle});
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
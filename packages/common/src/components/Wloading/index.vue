<template>
  <div :class="['loading-box', size]" v-if="visit">
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
    </div>
    <div class="text">{{ title }}</div>
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

  let size = ref('inside');

  const setTitle = (val) => {
    title.value = val;
  }

  const visit = ref(false);

  const show = (val) => {
    size.value = val;
    visit.value = true;
  }

  const hide = () => {
    visit.value = false;
  }

  defineExpose({ title, setTitle, visit, show, hide });
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
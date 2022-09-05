<template>
  <div class="OperateHeader">
    <div class="options"></div>
    <div class="btn">
      <el-button type="primary" size="small" @click="handleClickPreview" :disabled="!data.list.length">预览</el-button>
      <el-button type="primary" size="small" @click="handleClickSave" :disabled="!data.list.length">保存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OperateHeader',
  };
</script>

<script setup>
  import { ref } from 'vue';
  import storeGetters from '@/hooks/useGetters.js';

  const { getDataJson } = storeGetters(['getDataJson']);
  const data = ref(getDataJson);

  function handleClickPreview() {
    console.log(data.value);
    window.open('', '_blank');
  }

  function handleClickSave() {
    console.log(data.value);
  }
</script>

<style lang='scss' scope>
  @import './index.scss';
</style>
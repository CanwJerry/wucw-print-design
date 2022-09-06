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
  import { useRouter } from 'vue-router';
  import storeGetters from '@/hooks/useGetters.js';

  const { getDataJson } = storeGetters(['getDataJson']);
  const data = ref(getDataJson);

  const router = useRouter();
  function handleClickPreview() {
    // 将当前数据保存到缓存，用于预览新界面的渲染
    localStorage.setItem('previewData', JSON.stringify(getDataJson.value));

    const { href } = router.resolve({ name: 'Preview' });
    window.open(href, '_blank');
  }

  function handleClickSave() {
    console.log(data.value);
  }
</script>

<style lang='scss' scope>
  @import './index.scss';
</style>
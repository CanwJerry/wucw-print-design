<template>
  <div class="FormProperties">
    <p v-if="!nowJson.list.length"  class="noData">
      <el-empty description="未选择控件" />
    </p>

    <el-form v-else label-width="82px">
      <el-form-item label="关键字：">
        {{ nowJson.config.key }}
      </el-form-item>
      <el-form-item label="表单名称：">
        <el-input v-model="nowJson.config.formName" placeholder="请输入" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'FormProperties',
  };
</script>

<script setup>
  import { ref } from 'vue';
  import storeGetters from '@/hooks/useGetters.js';

  const { getDataJson } = storeGetters(['getDataJson']);
  const nowJson = ref(getDataJson);
</script>

<style lang='scss' scope>
  @import '../../scss/common.scss';
</style>
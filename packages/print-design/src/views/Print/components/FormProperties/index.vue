<template>
  <div class="FormProperties">
    <p v-if="!nowJson.list.length"  class="noData">
      <el-empty description="未选择控件" />
    </p>

    <el-form v-else label-width="120px">
      <el-form-item label="关键字：">
        {{ nowJson.config.key }}
      </el-form-item>
      <el-form-item label="表单名称：">
        <el-input v-model="nowJson.config.formName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="单据数据接口：">
        <el-button type="primary" @click="handleAddApi">添加接口</el-button>
      </el-form-item>
    </el-form>

    <DialogAddApi ref="AddApiRef" @save="handleSaveApi"/>
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
  import DialogAddApi from './components/dialog-addApi.vue';

  const { getDataJson } = storeGetters(['getDataJson']);
  const nowJson = ref(getDataJson);

  const AddApiRef = ref(null);
  function handleAddApi() {
    AddApiRef.value.show(nowJson.value.otherConfig.formApi);
  }
  function handleSaveApi(saveApi) {
    nowJson.value.otherConfig.formApi = saveApi;
  }
</script>

<style lang='scss' scope>
  @import '../../scss/common.scss';

  .common-radio {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
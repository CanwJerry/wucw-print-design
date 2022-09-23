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
      <el-form-item label="单据接口：">
        <el-input v-model="nowJson.otherConfig.formApi" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="接口方法：" class="common-radio">
        <el-radio-group v-model="nowJson.otherConfig.method">
          <el-radio label="get" size="large">get</el-radio>
          <el-radio label="post" size="large">post</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="ParamsKey：" class="common-radio">
        <el-radio-group v-model="nowJson.otherConfig.paramsKey">
          <el-radio :label="true" size="large">是</el-radio>
          <el-radio :label="false" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="ContentType：">
        <el-input v-model="nowJson.otherConfig.contentType" placeholder="请输入" />
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

  .common-radio {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
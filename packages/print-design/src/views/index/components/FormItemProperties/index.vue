<template>
  <div class="FormItemProperties">
    <p v-show="!selectItem.type" class="noData">
      <el-empty description="未选择控件" />
    </p>

    <el-form v-show="selectItem.type">
      <template v-if="typeof selectItem.label !== 'undefined'">
        <el-form-item label="标签">
          <el-input v-model="selectItem.label" placeholder="请输入" />
        </el-form-item>
      </template>
    </el-form></div>
</template>

<script>
  export default {
    name: 'FormItemProperties',
  };
</script>

<script setup>
  const props = defineProps({
    selectItem: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang='scss' scope>
  @import './index.scss';
  @import '../../scss/common.scss';
</style>
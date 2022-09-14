<template>
  <!-- 文字控件 -->
  <el-form-item v-if="record.type === 'text'">
    <div
      class="textStyle"
      :style="{
        textAlign: record.options.textAlign,
        color: record.options.color,
        fontSize: record.options.fontSize + 'px',
        fontWeight: record.options.fontWeight,
        letterSpacing: record.options.letterSpacing + 'px'
      }"
    >
      {{ record.label }}
    </div>
  </el-form-item>
  <!-- 按钮控件 -->
  <el-form-item v-if="record.type === 'button'">
    <el-button
      class="btn"
      :type='record.options.type'
      :size='record.options.size'
      @click="previewPage ? handleDynamic(record.options.dynamicFun) : ''"
    >
      {{ record.label }}
    </el-button>
  </el-form-item>
  <!-- 动态表格控件 -->
  <el-form-item v-if="record.type === 'batchTable'">
    <el-table
      class="batch-table"
      :data="record.tableData"
      style="width: 100%"
      border
    >
      <template #empty>
        暂无数据
      </template>
      <template v-for="item in record.headList">
        <el-table-column :prop="item.prop" :label="item.label" :width="item.width"/>
      </template>
    </el-table>
  </el-form-item>
</template>

<script>
  export default {
    name: 'FormModulItem',
  };
</script>

<script setup>
  import storeState from '@/hooks/useState.js';
  const { previewPage } = storeState(['previewPage']);

  const props = defineProps({
    record: {
      type: Object,
      required: true
    },
  })

  function handleDynamic(fun) {
    (new Function(fun))();
  }
</script>

<style lang='scss' scope>
  .textStyle {
    width: 100%;
    background-color: #fff;
  }
</style>
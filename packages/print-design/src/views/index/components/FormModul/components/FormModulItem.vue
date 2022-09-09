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
      :type='record.options.type'
      :size='record.options.size'
    >
      {{ record.label }}
    </el-button>
  </el-form-item>
</template>

<script>
  export default {
    name: 'FormModulItem',
  };
</script>

<script setup>
  const props = defineProps({
    record: {
      type: Object,
      required: true
    },
  })
</script>

<style lang='scss' scope>
  .textStyle {
    width: 100%;
    background-color: #fff;
  }
</style>
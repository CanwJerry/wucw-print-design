<template>
  <el-form-item v-if="record.type === 'text'">
    <div
      class="textStyle"
      :style="{
        textAlign: record.options.textAlign,
        color: record.options.color,
        fontSize: record.options.fontSize + 'px'
      }"
    >
      {{ record.label }}
    </div>
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
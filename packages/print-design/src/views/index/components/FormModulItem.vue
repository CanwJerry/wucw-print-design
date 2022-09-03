<template>
  <el-form-item v-if="record.type === 'text'">
    {{ record.label }}
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

<script lang='scss' scope>

</script>
<template>
  <div
    class="FormModul"
    @click.stop="emits('handleSelectItem', record)"
  >
    <!-- 该组件的其他功能 -->
    <!-- 该组件的其他功能 -->
    <!-- 该组件的其他功能 -->
    {{ record.label }}
    <!-- 该组件的其他功能 -->
    <FormModulItem :record="record" />
  </div>
</template>

<script>
  export default {
    name: 'FormModul',
  };
</script>

<script setup>
  import FormModulItem from './FormModulItem.vue';

  const emits = defineEmits(['handleSelectItem']);
  const props = defineProps({
    record: {
      type: Object,
      required: true
    },
  })
</script>

<script lang='scss' scope>

</script>
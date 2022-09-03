<template>
  <div class="drag-move">
    <!-- table组件 -->
    <template v-if="record.type === 'table'">
      <FormModulTable
        :key="record.key"
        :record="record"
        @handleSelectItem="handleSelectItem"
      />
    </template>

    <!-- 基础组件 -->
    <template v-else>
      <FormModul
        :key="record.key"
        :record="record"
        @handleSelectItem="handleSelectItem"
      />
    </template>
  </div>
</template>

<script>
  export default {
    name: 'LayoutItem',
  };
</script>

<script setup>
  import FormModul from "../FormModul.vue";
  import FormModulTable from '../FormModulTable/index.vue';

  const emits = defineEmits(['handleSelectItem']);
  const props = defineProps({
    record: {
      type: Object,
      required: true
    },
    startType: {
      type: String,
      default: ''
    },
  })

  function handleSelectItem(record) {
    emits('handleSelectItem', record);
  }
</script>

<style lang='scss' scope>
  @import './index.scss';
</style>
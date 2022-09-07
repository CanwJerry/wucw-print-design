<template>
  <div
    class="drag-move"
  >
    <!-- grid组件 - 栅格布局 -->
    <template v-if="record.type === 'grid'">
      <FormModulGrid
        :key="record.key"
        :record="record"
        @click="handleSelectItem(record)"
        @handleColAdd="handleColAdd"
      />
    </template>

    <!-- table组件 - 表格布局 -->
    <template v-else-if="record.type === 'table'">
      <FormModulTable
        :key="record.key"
        :record="record"
        @click="handleSelectItem(record)"
      />
    </template>

    <!-- 基础组件 -->
    <template v-else>
      <FormModul
        :key="record.key"
        :record="record"
        @click="handleSelectItem(record)"
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
  import { useStore } from 'vuex';
  import FormModul from "../FormModul/index.vue";
  import FormModulTable from '../FormModulTable/index.vue';
  import FormModulGrid from '../FormModulGrid/index.vue';
  const store = useStore();

  const emits = defineEmits(['handleColAdd']);
  const props = defineProps({
    record: {
      type: Object,
      required: true
    },
  })

  function handleSelectItem(item) {
    store.commit('updateSelectItem', item);
  }

  function handleColAdd(e, index, columns) {
    emits("handleColAdd", e, index, columns);
  }
</script>

<style lang='scss' scope>
  @import './index.scss';
</style>
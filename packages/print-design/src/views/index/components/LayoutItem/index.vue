<template>
  <div
    class="drag-move"
  >
    <!-- table组件 -->
    <template v-if="record.type === 'table'">
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
  import FormModul from "../FormModul.vue";
  import FormModulTable from '../FormModulTable/index.vue';
  const store = useStore();

  const props = defineProps({
    record: {
      type: Object,
      required: true
    },
  })

  function handleSelectItem(item) {
    store.commit('updateSelectItem', item);
  }
</script>

<style lang='scss' scope>
  @import './index.scss';
</style>
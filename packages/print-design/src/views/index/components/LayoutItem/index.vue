<template>
  <div
    class="drag-move"
    :class="{ active: record.key === selectItem.key && !isPreview }"
  >
    <div
      v-show="record.key === selectItem.key"
      class="drag-move-del"
      @click.stop="handleDel"
    >
      <el-tooltip content="删除" placement="top" :hide-after="50">
        <el-icon el-icon><Delete /></el-icon>
      </el-tooltip>
    </div>

    <div class="drag-move-item">
      <!-- grid组件 - 栅格布局 -->
      <template v-if="record.type === 'grid'">
        <FormModulGrid
          :key="record.key"
          :record="record"
          @click="handleSelectItem(record)"
          @handleColAdd="handleColAdd"
          @handleDel="handleDel"
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
  </div>
</template>

<script>
  export default {
    name: 'LayoutItem',
  };
</script>

<script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { Delete } from '@element-plus/icons-vue'
  import storeGetters from '@/hooks/useGetters.js';
  import storeState from '@/hooks/useState.js';
  import FormModul from "../FormModul/index.vue";
  import FormModulTable from '../FormModulTable/index.vue';
  import FormModulGrid from '../FormModulGrid/index.vue';
  const store = useStore();
  
  const { previewPage } = storeState(['previewPage']);
  const isPreview = ref(previewPage);
  
  const { getSelectItem } = storeGetters(['getSelectItem']);
  const selectItem = ref(getSelectItem);

  const emits = defineEmits(['handleColAdd', 'handleDel']);
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

  function handleDel() {
    emits('handleDel');
  }
</script>

<style lang='scss' scope>
  @import './index.scss';
</style>
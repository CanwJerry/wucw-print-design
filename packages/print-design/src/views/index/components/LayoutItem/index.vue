<template>
  <div
    class="drag-move"
    :class="{active: record.key === selectItem.key}"
  >
    <div class="drag-move-del" @click="handleDel(record)">
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
  import FormModul from "../FormModul/index.vue";
  import FormModulTable from '../FormModulTable/index.vue';
  import FormModulGrid from '../FormModulGrid/index.vue';
  const store = useStore();

  const { getSelectItem } = storeGetters(['getSelectItem']);
  const selectItem = ref(getSelectItem);

  const emits = defineEmits(['handleColAdd']);
  const props = defineProps({
    record: {
      type: Object,
      required: true
    },
  })

  function handleDel(item) {
    console.log(item.key);
    store.commit('delDateJsonListItem', item.key);
  }

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
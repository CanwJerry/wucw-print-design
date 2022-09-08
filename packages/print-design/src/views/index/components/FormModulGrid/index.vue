<template>
  <div
    class="grid-box"
    @click.stop="emits('handleSelectItem', record)"
  >
    <el-row :gutter="record.options.gutter">
      <template v-for="(item, index) in record.columns">
        <el-col :span="item.span">
          <div class="grid-content">
            <draggable
              v-bind="{
                group: 'form-draggable',
                ghostClass: 'moving',
                animation: 180,
                handle: '.drag-move',
              }"
              :list="item.list"
              tag="div"
              class="draggable-box"
              item-key="id"
              @add="emits('handleColAdd', $event, index, item.list)"
            >
              <template #item="{ element }">
                <transition-group tag="div" name="list">
                  <LayoutItem
                    :key="element.key"
                    :record="element"
                    @handleColAdd="handleColAdd"
                    @handleDel="handleDel"
                  />
                </transition-group>
              </template>
            </draggable>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'FormModulGrid',
  };
</script>

<script setup>
  import draggable from 'vuedraggable';
  import LayoutItem from '../LayoutItem/index.vue';

  const emits = defineEmits(['handleSelectItem', 'handleColAdd', 'handleDel']);
  const props = defineProps({
    record: {
      type: Object,
      default: () => {},
    },
  });

  function handleColAdd(e, columns) {
    emits("handleColAdd", e, columns);
  }

  function handleDel() {
    emits("handleDel");
  }
</script>

<style lang='scss' scope>
  @import './index.scss';
</style>
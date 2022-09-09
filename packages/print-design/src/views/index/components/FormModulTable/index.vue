<template>
  <div
    class="table-box"
    @click.stop="emits('handleSelectItem', record)"
  >
    <table class="table-layout">
      <tr v-for="(trItem, trIndex) in record.trs" :key="trIndex">
        <td
          v-for="(tdItem, tdIndex) in trItem.tds"
          v-show="tdItem.colspan && tdItem.rowspan"
          :key="tdIndex"
          :colspan="tdItem.colspan"
          :rowspan="tdItem.rowspan"
          class="table-td"
          @contextmenu.prevent="emits('handleShowRightMenu', $event, record, trIndex, tdIndex)"
        >
          <draggable
            v-bind="{
              group: 'form-draggable',
              ghostClass: 'moving',
              animation: 180,
              handle: '.drag-move',
            }"
            :disabled="previewPage"
            :list="tdItem.list"
            tag="div"
            class="draggable-box"
            item-key="id"
            @add="emits('handleColAdd', $event, tdIndex, trItem.tds)"
          >
            <template #item="{ element }">
              <div>
                <LayoutItem
                  :key="element.key"
                  :record="element"
                  @handleColAdd="handleColAdd"
                  @handleDel="handleDel"
                  @handleShowRightMenu="handleShowRightMenu"
                />
              </div>
            </template>
          </draggable>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'FormModulTable',
  };
</script>

<script setup>
  import draggable from 'vuedraggable';
  import LayoutItem from '../LayoutItem/index.vue';
  import storeState from '@/hooks/useState.js';
  const { previewPage } = storeState(['previewPage']);

  const emits = defineEmits(['handleSelectItem', 'handleColAdd', 'handleDel', 'handleShowRightMenu']);
  const props = defineProps({
    record: {
      type: Object,
      default: () => {},
    },
  });

  function handleColAdd(e, columns) {
    emits("handleColAdd", e, columns);
  };

  function handleDel() {
    emits("handleDel");
  };

  function handleShowRightMenu(event, record, trIndex, tdIndex) {
    emits("handleShowRightMenu", event, record, trIndex, tdIndex);
  };
</script>

<style lang='scss' scope>
  @import './index.scss';
</style>
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
        >
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
  const emits = defineEmits(['handleSelectItem']);
  const props = defineProps({
    record: {
      type: Object,
      default: () => {},
    },
  });
</script>

<style lang='scss' scope>
  @import './index.scss';
</style>
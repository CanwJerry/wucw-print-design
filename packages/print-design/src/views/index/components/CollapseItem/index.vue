<template>
  <draggable
    tag="ul"
    :list="list"
    :group="{ name: 'form-draggable', pull: 'clone', put: false }"
    :sort="false"
    :animation="180"
    ghostClass="moving"
    item-key="id"
    @end="handleStart(list)"
  >
    <template #item="{ element, index }">
      <li @click="handleClick(element)">
        <!-- <svg v-if="element.icon" class="icon" aria-hidden="true">
          <use :xlink:href="`#${element.icon}`"></use>
        </svg> -->
        {{ element.label }}
      </li>
    </template>
  </draggable>
</template>

<script>
  export default {
    name: 'collapseItem',
  };
</script>

<script setup>
  import draggable from 'vuedraggable';

  const emits = defineEmits(['start', 'addItemClick']);
  const props = defineProps({
    list: {
      type: Array,
      default: () => [],
    },
  });

  function handleStart(list) {
    emits('start', list);
  }

  function handleClick(list) {
    emits('addItemClick', list);
  }
</script>

<style lang="scss" scope>
</style>
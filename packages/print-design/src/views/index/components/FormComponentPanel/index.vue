<template>
  <div class="FormComponentPanel">
    <p v-show="data.list.length === 0" class="noData">
      <el-empty description="从左侧选择控件添加" />
    </p>

    <el-form>
      <draggable
        v-bind="{
          group: 'form-draggable',
          ghostClass: 'moving',
          animation: 180,
          handle: '.drag-move',
        }"
        :list="data.list"
        tag="div"
        class="draggable-box"
        item-key="id"
      >
        <template #item="{ element }">
          <transition-group tag="div" name="list">
            <LayoutItem
              :key="element.key"
              :record="element"
              :startType="startType"
            />
          </transition-group>
        </template>
      </draggable>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'FormComponentPanel',
  };
</script>

<script setup>
  import draggable from 'vuedraggable';
  import LayoutItem from '../LayoutItem/index.vue';

  const props = defineProps({
    startType: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      required: true,
    },
  });
</script>

<stype lang='scss' scope>
  @import './index.scss';
  @import '../../scss/common.scss';
</stype>
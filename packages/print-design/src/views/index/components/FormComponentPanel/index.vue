<template>
  <div class="FormComponentPanel" :class="{ previewStyle: isPreview }">
    <p v-show="data.list.length === 0" class="noData">
      <el-empty description="从左侧选择控件添加" />
    </p>

    <el-form>
      <el-form-item v-if="isPreview">
        <el-button type="primary" class="printBtn" @click="handlePrint">打印</el-button>
      </el-form-item>
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
        @add="handleColAdd($event, null, data.list)"
      >
        <template #item="{ element }">
          <transition-group tag="div" name="list">
            <LayoutItem
              :key="element.key"
              :record="element"
              @handleColAdd="handleColAdd"
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
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  import storeGetters from '@/hooks/useGetters.js';
  import draggable from 'vuedraggable';
  import LayoutItem from '../LayoutItem/index.vue';
  const store = useStore();
  const route = useRoute();

  const emits = defineEmits(['handleColAdd']);

  const { getDataJson } = storeGetters(['getDataJson']);
  const data = ref(getDataJson);
  const isPreview = ref(false);

  // 打印功能
  function handlePrint() {
    window.print();
  }

  // 通过拖拽的方式添加控件,给对应的key赋值
  function handleColAdd(e, index, columns) {
    const newIndex = e.newIndex;
    // 直接拖拽控件
    if(index === null) {
      const key = columns[newIndex].type + "_" + new Date().getTime();
      columns[newIndex].key = key;
      // 更新selectItem的值
      store.commit('updateSelectItem', selectItem);
      // 向dataJson.list中添加选中的item
      store.commit('addDateJsonListItem', selectItem);
      return;
    }
    
    // 往布局控件里面添加控件
    const key = columns[index].list[newIndex].type + "_" + new Date().getTime();
    const item = JSON.parse(JSON.stringify({ ...columns[index].list[newIndex], key }))
    columns[index].list[newIndex] = item;
  }

  onMounted(() => {
    // 当前页面是否在预览界面
    if(route.name === 'Preview') {
      isPreview.value = true;
      store.commit('updatePreviewPage', true);
      // 获取缓存中的数据
      store.commit('updateDataJson', JSON.parse(localStorage.getItem('previewData')));
    }
  })
</script>

<stype lang='scss' scope>
  @import './index.scss';
  @import './preview.scss';
  @import '../../scss/common.scss';
</stype>
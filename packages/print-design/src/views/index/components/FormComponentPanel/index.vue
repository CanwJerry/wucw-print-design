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
      >
        <template #item="{ element }">
          <transition-group tag="div" name="list">
            <LayoutItem
              :key="element.key"
              :record="element"
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

  const { getDataJson } = storeGetters(['getDataJson']);
  const data = ref(getDataJson);
  const isPreview = ref(false);

  // 打印功能
  function handlePrint() {
    window.print();
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
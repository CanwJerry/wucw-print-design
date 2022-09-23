<template>
  <div class="form-designer-container">
    <div class="content">
      <!-- 左侧控件区域 -->
      <aside class="left">
        <el-collapse v-model="leftActiveName" class="collapse">
          <el-collapse-item title="基础控件" name="base">
            <CollapseItem
              :list="basicsList"
              @addItemClick="handleAddItemClick"
            />
          </el-collapse-item>
          <el-collapse-item title="布局控件" name="layout">
            <CollapseItem
              :list="layoutList"
              @addItemClick="handleAddItemClick"
            />
          </el-collapse-item>
          <el-collapse-item title="单据数据" name="form">
            <CollapseForm />
          </el-collapse-item>
        </el-collapse>
      </aside>

      <!-- 中间面板区域 -->
      <section class="main">
        <!-- 头部操作按钮 -->
        <OperateHeader />
        <!-- 内容区域 -->
        <FormComponentPanel />
      </section>

      <!-- 右侧控件区域 -->
      <aside class="right">
        <el-tabs v-model="rightActiveName" class="tabs">
          <el-tab-pane label="表单属性设置" name="formProperties">
            <template #default>
              <FormProperties />
            </template>
          </el-tab-pane>
          <el-tab-pane label="控件属性设置" name="formItemProperties">
            <template #default>
              <FormItemProperties />
            </template>
          </el-tab-pane>
        </el-tabs>
      </aside>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
  };
</script>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  // FIXME:暂时有点问题
  // import storeMutations from '@/hooks/useMutations.js';
  import CollapseItem from '@/views/index/components/CollapseItem/index.vue';
  import CollapseForm from '@/views/index/components/CollapseForm/index.vue';
  import FormComponentPanel from '@/views/index/components/FormComponentPanel/index.vue';
  import FormItemProperties from '@/views/index/components/FormItemProperties/index.vue';
  import FormProperties from '@/views/index/components/FormProperties/index.vue';
  import OperateHeader from '@/views/index/components/OperateHeader/index.vue';
  import { basicsList, layoutList } from './config/formItem.config.js';

  const store = useStore();
  const leftActiveName = ref('base');
  const rightActiveName = ref('formProperties');

  function handleAddItemClick(list) {
    const key = `${list.type}_${new Date().getTime()}`
    const selectItem = JSON.parse(JSON.stringify({ ...list, key }));
    // 更新selectItem的值
    store.commit('updateSelectItem', selectItem);
    // 向dataJson.list中添加选中的item
    store.commit('addDateJsonListItem', selectItem);
  }

  onMounted(() => {
    localStorage.setItem('accessToken', 'ek9jZHZ4OW5lVDBLakNJNGk4NDg0NFFESTFONk40d3N1NzExMU0wM2NYN3I0dUZHUXFFTW5weFBUbVBGdGlUZVBsdVhxcUROVnRnMnNITmxFaHhEaEZ3TWw5d0tqYWRVOG51SFBobkx0cWtFMHNWUWxQSWExREZPYkM4SVdqR1pHQmxzVHlZR3BGUVBkOFNnQVlRcVZDZGU3V2x0aGE4UHFSSVhUMFl2Z2R4Y0lsNmlhSlFJSUR4Z0QrUnBhQ1Jza01haElzNWZRbVJtS3BNa2p3cXVOMEhyaG1BZ1luVUxPNFlLcDhPbmJoOEpVbmFVb1VSQkhka1FWa0Y0RFN4VTJYMDNuaEdYN2w2dHlTSS9sdVZhZ0wxdS8za2dmTDNYdU1tS0xiMUVTU1hVakM5TDJFMms5S1VtTEkxTjI0ZFBXNEJsLy9mbHB6Y0cwQXoyWENlQXhpR1VuVEpYbnVZaDFoNXpmbzB0SzhOM3NTa2h6SUJlT2ZtTzNvUWJvVDls');

    // 给当前的表单添加一个唯一的key值 => 首次进入、新建、另存为都会改变单据的key值
    if(!store.state.dataJson.config.key) {
      store.state.dataJson.config.key = `form_${new Date().getTime()}`;
    }
  })
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
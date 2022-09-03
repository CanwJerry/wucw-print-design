<template>
  <div class="form-designer-container">
    <div class="content">
      <!-- 左侧控件区域 -->
      <aside class="left">
        <el-collapse v-model="leftActiveName" class="collapse">
          <el-collapse-item title="基础控件" name="base">
            <CollapseItem
              :list="basicsList"
              @start="handleStart"
              @addItemClick="handleAddItemClick"
            />
          </el-collapse-item>
          <el-collapse-item title="布局控件" name="layout">
            <CollapseItem
              :list="layoutList"
              @start="handleStart"
            />
          </el-collapse-item>
        </el-collapse>
      </aside>

      <!-- 中间面板区域 -->
      <section class="main">
        <!-- <FormComponentPanel /> -->
      </section>

      <!-- 右侧控件区域 -->
      <aside class="right">
        <el-tabs v-model="rightActiveName" class="tabs">
          <el-tab-pane label="表单属性设置" name="formProperties">表单属性设置</el-tab-pane>
          <el-tab-pane label="控件属性设置" name="formItemProperties">
            <!-- <template #default>
              <FormItemProperties />
            </template> -->
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
  import { ref } from 'vue';
  import CollapseItem from '@/views/index/components/CollapseItem/index.vue';
  import FormComponentPanel from '@/views/index/components/FormComponentPanel/index.vue';
  import FormItemProperties from '@/views/index/components/FormItemProperties/index.vue';
  import { basicsList, layoutList } from './config/formItem.config.js';

  const leftActiveName = ref('base');
  const rightActiveName = ref('formItemProperties');
  const selectItem = ref({});

  function handleStart(list) {
    console.log(list);
  }

  function handleAddItemClick(list) {
    console.log(list);
  }
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
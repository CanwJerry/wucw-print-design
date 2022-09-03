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
        </el-collapse>
      </aside>

      <!-- 中间面板区域 -->
      <section class="main">
        <FormComponentPanel
          :data="dataJson"
        />
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
              <FormItemProperties
                :selectItem="selectItem"
              />
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
  import { ref } from 'vue';
  import mut from '@/hooks/useMutations.js';
  import CollapseItem from '@/views/index/components/CollapseItem/index.vue';
  import FormComponentPanel from '@/views/index/components/FormComponentPanel/index.vue';
  import FormItemProperties from '@/views/index/components/FormItemProperties/index.vue';
  import FormProperties from '@/views/index/components/FormProperties/index.vue';
  import { basicsList, layoutList } from './config/formItem.config.js';

  const leftActiveName = ref('base');
  const rightActiveName = ref('formItemProperties');
  const selectItem = ref({});
  const dataJson = ref({
    list: [],
    config: {
      layout: '',
      labelCol: {},
      labelWidth: 100,
      labelLayout: 'flex',
      wrapperCol: {},
      hideRequiredMark: false,
      customStyle: '',
    },
  })

  function handleAddItemClick(list) {
    const key = `${list.type}_${new Date().getTime()}`
    selectItem.value = { ...list, key };
    // 向dataJson.list中添加选中的item
    mut.addDateJsonListItem(123);
    console.log(mut.addDateJsonListItem.value);
  }
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
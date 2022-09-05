<template>
  <div class="FormItemProperties">
    <p v-if="!selectItem.type" class="noData">
      <el-empty description="未选择控件" />
    </p>

    <el-form v-if="selectItem.type">
      <template v-if="typeof selectItem.label !== 'undefined'">
        <el-form-item label="关键字：" label-width="82px">
          {{ selectItem.key }}
        </el-form-item>
        <el-form-item label="标签：" label-width="82px">
          <el-input v-model="selectItem.label" placeholder="请输入" />
        </el-form-item>
      </template>
      
      <!-- text 控件 -->
      <template v-if="selectItem.type === 'text'">
        <el-form-item label="字体大小：" label-width="82px">
          <el-input-number v-model="selectItem.options.fontSize" :min="12" :max="32"></el-input-number>
        </el-form-item>
        <el-form-item label="内容对齐：" label-width="82px" width="100%">
          <el-radio-group v-model="selectItem.options.textAlign">
            <el-radio-button label="left">左</el-radio-button>
            <el-radio-button label="center">中</el-radio-button>
            <el-radio-button label="right">右</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字体颜色：" label-width="82px">
          <el-color-picker v-model="selectItem.options.color"></el-color-picker>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'FormItemProperties',
  };
</script>

<script setup>
  import { ref, watch } from 'vue';
  import { useStore } from 'vuex';
  import storeGetters from '@/hooks/useGetters.js';
  const store = useStore();

  const { getSelectItem } = storeGetters(['getSelectItem']);
  const selectItem = ref(getSelectItem);

  // 监听到selectItem修改后，更新store里面存储的selectItem和dataList.list里面存储的item
  watch(selectItem, (newVal) => {
    store.commit('updateSelectItem', newVal);
  },{
    deep: true
  })
</script>

<style lang='scss' scope>
  @import './index.scss';
  @import '../../scss/common.scss';
</style>
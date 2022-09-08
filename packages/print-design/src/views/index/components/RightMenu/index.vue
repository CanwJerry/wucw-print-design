<template>
  <div
    class="right-menu"
    :style="{ top: options.menuTop + 'px', left: options.menuLeft + 'px' }"
  >
    <ul>
      <li @click="handleDownMerge">
        <el-icon><CaretBottom /></el-icon>
        向下合并
      </li>
      <li @click="handleRightMerge">
        <el-icon><CaretRight /></el-icon>
        向右合并
      </li>
      <li @click="handleSplit">
        <el-icon><Menu /></el-icon>
        拆分单元格
      </li>
      <li @click="handleAddRow">
        <el-icon><ArrowDown /></el-icon>
        增加一行
      </li>
      <li @click="handleAddCol">
        <el-icon><ArrowRight /></el-icon>
        增加一列
      </li>
      <li @click="handleDelRow">
        <el-icon><Delete /></el-icon>
        删除当前行
      </li>
      <li @click="handleDelCol">
        <el-icon><Delete /></el-icon>
        删除当前列
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'RightMenu',
  };
</script>

<script setup>
  import { ref, computed } from 'vue';
  import { CaretBottom, CaretRight, Menu, ArrowDown, ArrowRight, Delete } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus'

  const props = defineProps({
    options: {
      type: Object,
      default: () => {}
    }
  })

  // 向下合并单元格
  function handleDownMerge() {};

  // 向右合并单元格
  function handleRightMerge() {};

  // 拆分单元格
  function handleSplit() {};

  // 增加一列
  function handleAddCol() {
    props.options.list.trs.forEach(item => {
      item.tds.splice(props.options.tdIndex + 1, 0, {
        colspan: 1,
        rowspan: 1,
        list: []
      });
    });
  };

  // 增加一行
  function handleAddRow() {
    const { list, trIndex } = props.options;
    // 获取总列数Col
    let sumCols = list.trs[0].tds;
    sumCols = sumCols.map(item => item.colspan).reduce((sumVal, nowVal) => {
      return sumVal + nowVal;
    })
    // 新增行 => 根据总列数,确定新增的这一行有多少列
    const rowJson = { tds: [] };
    for(let i = 0; i < sumCols; i++) {
      rowJson.tds.push({
        colspan: 1,
        rowspan: 1,
        list: []
      })
    }
    // 取当前rowspan最大值
    let maxRowSpan = 1;
    list.trs[trIndex].tds.forEach(item => {
      if (maxRowSpan < item.rowspan) {
        maxRowSpan = item.rowspan;
      }
    });
    list.trs.splice(trIndex + maxRowSpan, 0, rowJson);
  };

  // 删除当前行
  function handleDelRow() {
    const { list, trIndex } = props.options;
    if(list.trs.length === 1) {
      ElMessage.error('已经是最后一行了');
      return;
    }
    list.trs.splice(trIndex, 1);
  };

  // 删除当前列
  function handleDelCol() {
    const { list, tdIndex } = props.options;
    list.trs.forEach(item => {
      if (item.tds.length === 1) {
        ElMessage.error('已经是最后一列了');
        return;
      }
      item.tds.splice(tdIndex, 1);
    })
  };
</script>

<style lang='scss' scope>
  @import './index.scss';
</style>
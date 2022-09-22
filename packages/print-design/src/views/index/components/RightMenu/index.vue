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
  function handleDownMerge() {
    const { tdIndex, trIndex, list } = props.options;
    // 获取当前的单元格
    const currentTd = list.trs[trIndex].tds[tdIndex];

    // 判断是否为最后一行，最后一行的话则不进行合并
    if (list.trs.length - currentTd.rowspan <= trIndex) {
      ElMessage.error("当前是最后一行，无法向下合并");
      return false;
    }

    // 获取当前单元格的rowspan
    const currentRowspan = currentTd.rowspan;

    // 判断下一列单元格与当前单元格的colspan是否一致，如果不一致则无法合并
    if (currentTd.colspan !== list.trs[trIndex + currentRowspan].tds[tdIndex].colspan) {
      ElMessage.error("当前表格无法向下合并");
      return false;
    }

    // 获取下一列单元格的rowspan
    const nextRowspan = list.trs[trIndex + currentRowspan].tds[tdIndex].rowspan;

    // 当前单元格rowspan等于当前单元格rowspan加上下一列单元格rowspan
    list.trs[trIndex].tds[tdIndex].rowspan = currentRowspan + nextRowspan;

    // 将被合并的单元rowspan修改为0
    list.trs[trIndex + currentRowspan].tds[tdIndex].rowspan = 0;

    // 清空被合并单元格list
    list.trs[trIndex + currentRowspan].tds[tdIndex].list = [];
  };

  // 向右合并单元格
  function handleRightMerge() {
    const { tdIndex, trIndex, list } = props.options;
    // 获取当前的单元格
    const currentTd = list.trs[trIndex].tds[tdIndex];

    // 获取当前列的所有colspan总和
    const sumCols = list.trs[trIndex].tds.map(item => item.colspan).reduce((partial, value) => {
      return partial + value;
    });

    // 判断是否为最后一列，最后一列的话则不进行合并
    if(sumCols - currentTd.colspan <= tdIndex) {
      ElMessage.error("当前是最后一列，无法向右合并");
      return false;
    }

    // 获取当前单元格的colspan
    const currentColspan = currentTd.colspan;

    // 判断需要合并的单元格rowspan是否与当前单元格一致
    if(currentTd.rowspan !== list.trs[trIndex].tds[tdIndex + currentColspan].rowspan) {
      ElMessage.error("当前表格无法向右合并");
      return false;
    }

    // 获取下一列单元格的colspan
    const nextColspan = list.trs[trIndex].tds[tdIndex + currentColspan].colspan;

    // 合并单元格colspan
    list.trs[trIndex].tds[tdIndex].colspan = currentColspan + nextColspan;
    
    // 将被合并的单元格colspan设置为0
    list.trs[trIndex].tds[tdIndex + currentColspan].colspan = 0;

    // 清空被合并单元格的list
    list.trs[trIndex].tds[tdIndex + currentColspan].list = [];
  };

  // 拆分单元格
  function handleSplit() {
    const { tdIndex, trIndex, list } = props.options;
    // 获取当前单元格的colspan及rowspan
    const { colspan, rowspan } = list.trs[trIndex].tds[tdIndex];
    
    // 遍历当前的行
    for(let rowIndex = trIndex; rowIndex < trIndex + rowspan; rowIndex++) {
      for (let colIndex = tdIndex; colIndex < tdIndex + colspan; colIndex++) {
        if (rowIndex === trIndex && colIndex === tdIndex) continue;
        list.trs[rowIndex].tds.splice(colIndex, 1, {
          colspan: 1,
          rowspan: 1,
          list: []
        });
      }
    }

    // 修改当前单元格colspan、rowspan为 1
    const currentSpan = list.trs[trIndex].tds[tdIndex];
    currentSpan.colspan = 1;
    currentSpan.rowspan = 1;
  };

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
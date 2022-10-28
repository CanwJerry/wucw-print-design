<template>
  <el-dialog
    v-model="visible"
    title="添加类型"
    @close="close"
  >
    <el-button type="primary" size="small" class="add-btn" @click="handleAddRow">添加</el-button>

    <el-table :data="typesList" width="100%" maxHeight="400">
      <template #empty>
        暂无数据
      </template>
      <el-table-column prop="label" label="真实值">
        <template #default="scope">
          <el-input v-model="scope.row.realVal"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="翻译值">
        <template #default="scope">
          <el-input v-model="scope.row.translateVal"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="260">
        <template #default="scope">
          <el-button type="danger" size="small" @click="handleDel(scope)">删除</el-button>
          <el-button type="primary" size="small" :disabled="scope.$index == 0" @click="handleMoveUp(scope.row, scope.$index)">上移</el-button>
          <el-button type="primary" size="small" :disabled="(scope.$index + 1) == typesList.length" @click="handleMoveDown(scope.row, scope.$index)">下移</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    name: 'ShowType',
  };
</script>

<script setup>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';

  const typesList = ref([]);
  const emits = defineEmits(['save']);
  let visible = ref(false);

  function show(data) {
    visible.value = true;
    typesList.value = JSON.parse(JSON.stringify(data));
  }

  function close() {
    visible.value = false;
    typesList.value = [];
  };

  function handleSave() {
    emits('save', 'save', typesList.value);
    close();
  };

  // 新增行
  function handleAddRow() {
    typesList.value.unshift({
      realVal: '',
      translateVal: '',
    });
  }

  // 删除
  function handleDel(row) {
    const { $index } = row;
    typesList.value.splice($index, 1);
  };

  // 上移
  function handleMoveUp(row, index) {
    if (index > 0) {
      let upData = typesList.value[index - 1];
      typesList.value.splice(index - 1, 1);
      typesList.value.splice(index, 0, upData);
    } else {
      ElMessage.warning('已经是第一条，上移失败');
    }
  };

  // 下移动
  function handleMoveDown(row, index) {
    if ((index + 1) == typesList.length) {
      ElMessage.warning('已经是最后一条，下移失败');
    } else {
      let downData = typesList.value[index + 1];
      typesList.value.splice(index + 1, 1);
      typesList.value.splice(index, 0, downData);
    }
  };

  defineExpose({ show, close });
</script>

<style lang='scss' scope>
  .add-btn {
    margin-bottom: 30px;
  }
</style>
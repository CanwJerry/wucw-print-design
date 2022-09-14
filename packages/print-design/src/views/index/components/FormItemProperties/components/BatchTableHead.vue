<template>
  <el-dialog
    v-model="visible"
    title="添加字段"
    @close="handleCancel"
  >
    <el-button type="primary" size="small" class="add-btn" @click="handleAddRow">添加</el-button>

    <el-table :data="headers" width="100%" maxHeight="400">
      <template #empty>
        暂无数据
      </template>
      <el-table-column prop="label" label="字段名">
        <template #default="scope">
          <el-input v-model="scope.row.label"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="字段编号">
        <template #default="scope">
          <el-input v-model="scope.row.prop"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="width" label="字段宽度">
        <template #default="scope">
          <el-input v-model="scope.row.width"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="260">
        <template #default="scope">
          <el-button type="danger" size="small" @click="handleDel(scope)">删除</el-button>
          <el-button type="primary" size="small" :disabled="scope.$index == 0" @click="handleMoveUp(scope.row, scope.$index)">上移</el-button>
          <el-button type="primary" size="small" :disabled="(scope.$index + 1) == headers.length" @click="handleMoveDown(scope.row, scope.$index)">下移</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    name: 'BatchTableHead',
  };
</script>

<script setup>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';

  const props = defineProps({
    headList: {
      type: Array,
      default: () => []
    }
  })
  const emits = defineEmits(['btnEvent']);

  const visible = true;

  const hds = JSON.parse(JSON.stringify(props.headList));
  const headers = ref(hds);

  // 新增行
  function handleAddRow() {
    headers.value.unshift({
      label: '',
      prop: '',
      width: ''
    });
  }

  // 删除
  function handleDel(row) {
    const { $index } = row;
    headers.value.splice($index, 1);
  };

  // 上移
  function handleMoveUp(row, index) {
    if (index > 0) {
      let upData = headers.value[index - 1];
      headers.value.splice(index - 1, 1);
      headers.value.splice(index, 0, upData);
    } else {
      ElMessage.warning('已经是第一条，上移失败');
    }
  };

  // 下移动
  function handleMoveDown(row, index) {
    if ((index + 1) == headers.length) {
      ElMessage.warning('已经是最后一条，下移失败');
    } else {
      let downData = headers.value[index + 1];
      headers.value.splice(index + 1, 1);
      headers.value.splice(index, 0, downData);
    }
  };

  function handleCancel() {
    headers.value = [];
    emits('btnEvent', false);
  };

  function handleSave() {
    emits('btnEvent', false, headers.value);
  };
</script>

<style lang='scss' scope>
  .add-btn {
    margin-bottom: 30px;
  }
</style>
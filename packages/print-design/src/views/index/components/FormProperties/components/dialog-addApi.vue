<template>
  <el-dialog
    width="70%"
    v-model="visible"
    title="添加接口"
    @close="close"
  >
    <el-button type="primary" size="small" class="add-btn" @click="handleAddRow">添加</el-button>

    <el-table :data="apiList" width="100%" maxHeight="400">
      <template #empty>
        暂无数据
      </template>
      <el-table-column prop="label" label="接口名称">
        <template #default="scope">
          <el-input v-model="scope.row.apiName"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="请求地址" width="360">
        <template #default="scope">
          <el-input v-model="scope.row.url"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="请求参数" width="220">
        <template #default="scope">
          <el-tooltip
            class="box-item"
            effect="dark"
            :raw-content="true"
            :auto-close="0"
            content="请求参数使用英文逗号分隔<br/>(如: formName,saNo,params)"
            placement="top"
          >
            <el-input v-model="scope.row.params"></el-input>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="类型">
        <template #default="scope">
          <el-input v-model="scope.row.contentType"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="方法">
        <template #default="scope">
          <el-select v-model="scope.row.method">
            <el-option
              v-for="item in methodOpt"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="ParamsKey">
        <template #default="scope">
          <el-select v-model="scope.row.paramsKey">
            <el-option
              v-for="item in paramsKeyOpt"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="danger" size="small" @click="handleDel(scope)">删除</el-button>
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
    name: 'AddApi',
  };
</script>

<script setup>
  import { ref } from 'vue';

  const apiList = ref([]);
  const emits = defineEmits(['save']);
  const methodOpt = ref([
    {
      value: 'get',
      label: 'get',
    },
    {
      value: 'post',
      label: 'post',
    },
  ]);
  const paramsKeyOpt = ref([
    {
      value: true,
      label: 'ture',
    },
    {
      value: false,
      label: 'false',
    },
  ])
  let visible = ref(false);

  function show(data) {
    visible.value = true;
    apiList.value = JSON.parse(JSON.stringify(data));
  }

  function close() {
    visible.value = false;
    apiList.value = [];
  };

  function handleSave() {
    emits('save', apiList.value);
    close();
  };

  // 新增行
  function handleAddRow() {
    apiList.value.unshift({
      apiName: '',
      url: '',
      params: '',
      method: 'post',
      paramsKey: false,
      contentType: 'application/json',
    });
  }

  // 删除
  function handleDel(row) {
    const { $index } = row;
    apiList.value.splice($index, 1);
  };

  defineExpose({ show, close });
</script>

<style lang='scss' scope>
  .add-btn {
    margin-bottom: 30px;
  }
</style>
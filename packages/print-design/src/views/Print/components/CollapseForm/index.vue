<template>
  <ul class="form-list">
    <template v-if="getLeftDocumentData.length">
      <li
        v-for="item in getLeftDocumentData"
      >
        <p
          class="label"
          :class="{ active: item.formKey === activeName }"
          @click="handleChangeDataJson(item)"
        >
          {{ item.formName }}
        </p>
        <el-icon class="del" @click="handleDel(item)">
          <CircleCloseFilled />
        </el-icon>
      </li>
    </template>
    <template v-else>
      <li style="justify-content:center;color:#ccc;">暂无数据</li>
    </template>
  </ul>
</template>

<script>
  export default {
    name: 'AllForm',
  };
</script>

<script setup>
  import { ref, onMounted } from 'vue';
  import { CircleCloseFilled } from '@element-plus/icons-vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { RemoveDocumentPrint } from '@/api/api.js';
  import { useStore } from 'vuex';
  import storeGetters from '@/hooks/useGetters.js';
  const store = useStore();
  const { getActiveName, getLeftDocumentData } = storeGetters(['getActiveName', 'getLeftDocumentData']);

  const activeName = ref(getActiveName);

  function handleChangeDataJson(item) {
    if(getLeftDocumentData.value.length) {
      // 更新activeName
      store.commit('updateActiveName', item.formKey);
      
      const otherConfig = JSON.parse(item.otherConfig);
      const dataJson = {
        list: JSON.parse(item.formJson),
        config: {
          formName: item.formName,
          key: item.formKey
        },
        // TODO:如果有新增另外的字段可以在此处做兼容
        otherConfig
      }
      store.commit('updateDataJson', dataJson);
    }
  };

  const baseDoc = [
    "form_1663921719422",
    "form_1663919735791",
    "form_1663919153158",
    "form_1663917610582",
    "form_1663917074831",
    "form_1663916595383",
    "form_1663915859888",
    "form_1663915222984",
    "form_1663912962548",
    "form_1663912217461",
    "form_1663904244360",
    "form_1663753674575",
    "form_1663230371276"
  ];
  function handleDel(item) {
    if(baseDoc.includes(item.formKey)) {
      ElMessage.error('无法删除初始单据');
      return;
    }

    ElMessageBox.confirm(
      `确认删除 ${item.formName} 单据?`,
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(() => {
      const data = { formKey: item.formKey };
      RemoveDocumentPrint(data).then(res => {
        if(res.status === 200) {
          ElMessage.success('删除成功');
          getDocumentPrintInfo();
        } else {
          ElMessage.error(res.msg);
        }
      })
    });
  };

  // 获取左侧单据数据
  function getDocumentPrintInfo() {
    store.dispatch('getDocumentList');
  };

  onMounted(() => {
    getDocumentPrintInfo();
  })
</script>

<style lang='scss' scope>
  .form-list {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;

      .label {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        padding: 0 5px;
        box-sizing: border-box;
        &:hover {
          cursor: pointer;
          background-color: #f4f5f7;
        }
      }

      .del {
        cursor: pointer;
        display: inline-block;
        margin-left: 5px;
        color: rgba(255, 0, 0, 0.384);
        height: 16px;
        width: 16px;
        &:hover {
          color: red;
        }
      }
    }
  }

  .active {
    color: #fff;
    background: linear-gradient(to right, #f4f5f7, rgba(8, 131, 8, 0.4784313725), rgba(28, 139, 28, 0.4039215686), rgba(38, 138, 38, 0.4039215686));
    background-size: 400%;
    animation: bgcAnimation .5s ease forwards;
  }

  @keyframes bgcAnimation {
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 16% 50%;
    }
  }
</style>
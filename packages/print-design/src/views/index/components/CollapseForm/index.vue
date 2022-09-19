<template>
  <ul class="form-list">
    <li
      @click="handleChangeDataJson(item)"
      v-for="item in documentData"
    >
      {{ item.formName }}
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'AllForm',
  };
</script>

<script setup>
  import { ref, onMounted } from 'vue';
  import { GetDocumentPrintInfo } from '@/api/api.js';
  import { useStore } from 'vuex';
  const store = useStore();

  const documentData = ref([]);

  function handleChangeDataJson(item) {
    if(documentData.value.length) {
      const dataJson = {
        list: JSON.parse(item.formJson),
        config: {
          formName: item.formName,
          key: item.formKey
        },
      }
      store.commit('updateDataJson', dataJson);
    }
  };

  // 获取单据数据
  function getDocumentPrintInfo() {
    const data = {
      pageIndex: 1,
      pageSize: 100,
      keyword: '',
      formKey: ''
    }
    GetDocumentPrintInfo(data).then(res => {
      if(res.code === 0) {
        documentData.value = res.data.list;
      }
    })
  };

  onMounted(() => {
    getDocumentPrintInfo();
  })
</script>

<style lang='scss' scope>
  .form-list {
    li {
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      padding: 0 5px;
      box-sizing: border-box;

      &:hover {
        cursor: pointer;
        color: #fff;
        background: linear-gradient(to right, #f4f5f7, rgba(8, 131, 8, 0.4784313725), rgba(28, 139, 28, 0.4039215686), rgba(38, 138, 38, 0.4039215686));
        background-size: 400%;
        animation: bgcAnimation .5s ease forwards;
      }
    }
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
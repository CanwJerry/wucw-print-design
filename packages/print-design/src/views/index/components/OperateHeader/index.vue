<template>
  <div class="OperateHeader">
    <div class="options">
      <el-button type="primary" size="small" @click="handleAddNewForm">新建</el-button>
    </div>
    <div class="btn">
      <el-button type="primary" size="small" @click="handleClickPreview" :disabled="!data.list.length">预览</el-button>
      <el-button type="primary" size="small" @click="handleClickSave" :disabled="!data.list.length">保存</el-button>
      <el-button type="primary" size="small" @click="handleClickSave('other')" :disabled="!data.list.length">另存为</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OperateHeader',
  };
</script>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import storeGetters from '@/hooks/useGetters.js';
  import { SaveDocumentPrint } from '@/api/api.js';
  import { ElMessage } from 'element-plus';
  const store = useStore();

  const { getDataJson } = storeGetters(['getDataJson']);
  const data = ref(getDataJson);

  const router = useRouter();
  function handleClickPreview() {
    // 将当前数据保存到缓存，用于预览新界面的渲染
    localStorage.setItem('previewData', JSON.stringify(getDataJson.value));
    
    const { href } = router.resolve({ name: 'Preview' });
    // 正常的预览
    window.open(href, '_blank');
    // TODO: 预览想要有数据必须要这样传递
    // window.open(`${href}?formName=${data.value.config.formName}&no=${'WW20220914000002'}`, '_blank');
  }

  // 保存按钮
  function handleClickSave(type) {
    const { config, list } = data.value;
    
    const form = {
      formName: config.formName,
      formKey: config.key,
      formJson: JSON.stringify(list)
    }
    // 如果是另存为的话重新获取key值，将当前表单作为新的表单保存
    if(type === 'other') {
      form.formKey = `form_${new Date().getTime()}`;
    }
    SaveDocumentPrint(form).then(res => {
      if(res.code === 0) {
        ElMessage.success(type === 'other' ? '另存存成功' :'保存成功');
        // 保存成功后更新右侧单据数据菜单
        store.dispatch('getDocumentList');
      } else {
        ElMessage.error(res.msg);
      }
    })
  };

  // 新建
  function handleAddNewForm() {
    store.commit('addNewDataJson', `form_${new Date().getTime()}`);
  }
</script>

<style lang='scss' scope>
  @import './index.scss';
</style>
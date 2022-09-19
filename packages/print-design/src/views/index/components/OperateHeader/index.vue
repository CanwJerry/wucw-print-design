<template>
  <div class="OperateHeader">
    <div class="options"></div>
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
  import storeGetters from '@/hooks/useGetters.js';
  import { SaveDocumentPrint } from '@/api/api.js';
  import { ElMessage } from 'element-plus';

  const { getDataJson } = storeGetters(['getDataJson']);
  const data = ref(getDataJson);

  const router = useRouter();
  function handleClickPreview() {
    // 将当前数据保存到缓存，用于预览新界面的渲染
    localStorage.setItem('previewData', JSON.stringify(getDataJson.value));

    const { href } = router.resolve({ name: 'Preview' });
    window.open(href, '_blank');
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
      }
    })
  };

  // 另存为
  function handleClickOtherSave() {
    console.log('123123123');
  }
</script>

<style lang='scss' scope>
  @import './index.scss';
</style>
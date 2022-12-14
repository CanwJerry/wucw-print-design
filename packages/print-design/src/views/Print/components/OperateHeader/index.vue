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
  import { ElMessage, ElMessageBox } from 'element-plus';
  const store = useStore();

  const { getDataJson } = storeGetters(['getDataJson']);
  const data = ref(getDataJson);

  const router = useRouter();
  function handleClickPreview() {
    // 将当前数据保存到缓存，用于预览新界面的渲染
    localStorage.setItem('previewData', JSON.stringify(getDataJson.value));
    
    const { href } = router.resolve({ name: 'Preview' });
    // 正常的预览
    // window.open(href, '_blank');

    // 使用方式：
    // const { href } = router.resolve({ name: 'printDesign.priview' });
    // window.open(`${href}?formName=库存调整单&saNo=${'KCTZ20220919000001'}`, '_blank');

    // TODO: 预览想要有数据必须要这样传递
    // 委外发货单
    // window.open(`${href}?formName=${data.value.config.formName}&no=${'WW20220914000002'}`, '_blank');
    // 销售出库送货单
    // window.open(`${href}?formName=${data.value.config.formName}&salesOutOfStockNO=${'XSCK20220915000001'}`, '_blank');
    // 委外入库单(负数)
    // window.open(`${href}?formName=${data.value.config.formName}&delegateExternalWarehousingNo=${'WWRKFS20220923000002'}`, '_blank');
    // 委外入库单
    // window.open(`${href}?formName=${data.value.config.formName}&delegateExternalWarehousingNo=${'WWRK20220921000003'}`, '_blank');
    // 领料单
    // window.open(`${href}?formName=${data.value.config.formName}&pickingOrderNo=${'LL20220827000001'}`, '_blank');
    // 生产入库单
    // window.open(`${href}?formName=${data.value.config.formName}&ptwNo=${'SCRK20220913000001'}&isAllMatter=false`, '_blank');
    // 采购单
    // window.open(`${href}?formName=${data.value.config.formName}&poNo=${'CG20220921000003'}&isAllMatter=false`, '_blank');
    // 采购入库单(负数)
    // window.open(`${href}?formName=${data.value.config.formName}&pwNo=${'CGRK20220916000044'}`, '_blank');
    // 采购退货单
    // window.open(`${href}?formName=${data.value.config.formName}&prNo=${'CGTH20220920000001'}`, '_blank');
    // 采购退货出库单(负数)
    // window.open(`${href}?formName=${data.value.config.formName}&proNo=${'CGTHCK20220920000002'}`, '_blank');
    // 销售退货入库单
    // window.open(`${href}?formName=${data.value.config.formName}&salesReturnOrderWarehousingNO=${'XSTHRK20220920000001'}`, '_blank');
    // 库存调整单
    // window.open(`${href}?formName=${data.value.config.formName}&saNo=${'KCTZ20220919000001'}`, '_blank');
    // 转码调拨单
    window.open(`${href}?formName=${data.value.config.formName}&productionNo=${'ZMDB20220923000001'}`, '_blank');
  }

  // 保存按钮
  function handleClickSave(type = '') {
    const { config, list, otherConfig } = data.value;
    
    const form = {
      formName: config.formName,
      formJson: JSON.stringify(list),
      formKey: config.key,
      otherConfig: JSON.stringify(otherConfig)
    }

    // 如果是另存为的话重新获取key值，将当前表单作为新的表单保存
    if(type === 'other') {
      ElMessageBox.confirm(
        `确认另存为新的单据?`,
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        form.formKey = `form_${new Date().getTime()}`;
        handleSave(form, type);
      }).catch(() => {
        return;
      })
    }else {
      handleSave(form, type);
    }
  };

  // 保存
  function handleSave(form, type) {
    SaveDocumentPrint(form).then(res => {
      if(res.status === 200) {
        ElMessage.success(type === 'other' ? '另存存成功' :'保存成功');
        // 保存成功后更新右侧单据数据菜单
        store.dispatch('getDocumentList');
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
<template>
  <div class="FormComponentPanel" :class="{ previewStyle: isPreview }">
    <p v-show="data.list.length === 0" class="noData">
      <el-empty description="从左侧选择控件添加" />
    </p>

    <el-form>
      <draggable
        v-bind="{
          group: 'form-draggable',
          ghostClass: 'moving',
          animation: 180,
          handle: '.drag-move',
        }"
        :disabled="isPreview"
        :list="data.list"
        tag="div"
        class="draggable-box"
        item-key="id"
        @add="handleColAdd($event, null, data.list)"
      >
        <template #item="{ element }">
          <div>
            <LayoutItem
              :key="element.key"
              :record="element"
              @handleColAdd="handleColAdd"
              @handleDel="handleDel"
              @handleShowRightMenu="handleShowRightMenu"
            />
          </div>
        </template>
      </draggable>
    </el-form>

    <!-- 右键菜单栏 -->
    <RightMenu
      v-show="showRightMenu"
      :options="menuOptions"
    />
  </div>
</template>

<script>
  export default {
    name: 'FormComponentPanel',
  };
</script>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  import { CustomApi } from '@/api/api.js';
  import draggable from 'vuedraggable';
  import LayoutItem from '../LayoutItem/index.vue';
  import RightMenu from '../RightMenu/index.vue';
  import storeGetters from '@/hooks/useGetters.js';
  const store = useStore();
  const route = useRoute();

  const emits = defineEmits(['handleColAdd']);

  const { getDataJson } = storeGetters(['getDataJson']);
  const data = ref(getDataJson);
  const isPreview = ref(false);
  
  // 通过拖拽的方式添加控件,给对应的key赋值
  function handleColAdd(e, index, columns) {
    const newIndex = e.newIndex;
    // 直接拖拽控件
    if(index === null) {
      const key = columns[newIndex].type + "_" + new Date().getTime();
      columns[newIndex] = JSON.parse(JSON.stringify({ ...columns[newIndex], key }));
      // 更新selectItem的值
      store.commit('updateSelectItem', columns[newIndex]);
      // TODO:因为此时操作的的就是dataJson.list里的对象,所以不需要通过store向dataJson.list中添加选中的item
      // store.commit('addDateJsonListItem', selectItem);
      return;
    }
    // 往布局控件里面添加控件
    const key = columns[index].list[newIndex].type + "_" + new Date().getTime();
    const item = JSON.parse(JSON.stringify({ ...columns[index].list[newIndex], key }))
    columns[index].list[newIndex] = item;
  }

  // 删除已选
  function handleDel() {
    store.commit('delDateJsonListItem');
  }

  // 展示右键菜单
  const showRightMenu = ref(false);
  const menuOptions = ref({});
  function handleShowRightMenu(event, record, trIndex, tdIndex) {
    if(isPreview.value) return;
    // 显示右键菜单
    event.stopPropagation();
    showRightMenu.value = true;
    menuOptions.value = {
      menuTop: event.clientY < 700 ? event.clientY : event.clientY - 250,
      menuLeft: event.clientX,
      trIndex: trIndex,
      tdIndex: tdIndex,
      list: record
    }
  };

  // 取消右键菜单
  function handleRemoveRightMenu() {
    showRightMenu.value = false;
  };

  // 更新dataJson里面每一项的数据
  function updateDataJson(newObj) {
    // 特殊处理
    if(newObj.matters?.at(0).child?.length) {
      newObj.child = newObj.matters.at(0).child;
    }
    store.commit('updateDataJsonItemData', newObj);
  };

  // 根据单据名称获取单据对应的控件结构
  function getDocumentByName(formName) {
    const data = {
      pageIndex: 1,
      pageSize: 100,
      keyword: formName,
      formKey: '',
    }
    store.dispatch('getDocumentList', data).then(res => {
      // 获取页面结构数据
      const previewData = {
        list: JSON.parse(res.list[0].formJson),
        config: {
          formName: res.list[0].formName,
          key: res.list[0].formKey,
        },
        otherConfig: JSON.parse(res.list[0].otherConfig) || {}
      }
      store.commit('updateDataJson', previewData);
    }).then(async () => {
      getDocumentData();
    });
  };

  // 获取单据数据
  async function getDocumentData() {
    const { formApi } = data.value.otherConfig;
    const { formName, ...otherParams } = route.query;
    const getQuery = otherParams;
    const apiFn = [];

    // 组合成对应的api接口函数
    formApi.forEach(item => {
      let params = {};
      if(item.params) {
        item.params.split(',').map(item => { params[item] = getQuery[item] });
      }
      apiFn.push(CustomApi(item.url, params, item.method, item.paramsKey));
    });

    // 调用接口
    const result = await Promise.allSettled(apiFn);
    let obj = {};
    result.map(item => {
      if(item.status === 'fulfilled') {
        Object.assign(obj, item.value.data);
      }
    })
    updateDataJson(obj);
  };

  onMounted(() => {
    // 当前页面是否在预览界面
    if(route.name === 'Preview') {
      isPreview.value = true;
      store.commit('updatePreviewPage', true);
      
      if(route.query.formName) {
        // 根据用户传递过来的formName获取到对应的控件用于布局
        getDocumentByName(route.query.formName);
      } else {
        // 点击预览按钮：获取缓存中的数据用于控件的布局
        store.commit('updateDataJson', JSON.parse(localStorage.getItem('previewData')));
      }
    }

    // 添加监听取消右键菜单
    document.addEventListener('click', handleRemoveRightMenu, true);
    document.addEventListener('contextmenu', handleRemoveRightMenu, true);
  })

  onBeforeUnmount(() => {
    // 移除监听取消右键菜单
    document.removeEventListener('click', handleRemoveRightMenu, true);
    document.removeEventListener('contextmenu', handleRemoveRightMenu, true);
  })
</script>

<stype lang='scss' scope>
  @import './index.scss';
  @import './preview.scss';
  @import '../../scss/common.scss';
</stype>
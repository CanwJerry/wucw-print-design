<template>
  <div class="FormItemProperties">
    <p v-if="!selectItem.type" class="noData">
      <el-empty description="未选择控件" />
    </p>

    <el-form v-if="selectItem.type" label-width="82px">
      <!-- 公共的 -->
      <template v-if="typeof selectItem.label !== 'undefined'">
        <el-form-item label="关键字：">
          {{ selectItem.key }}
        </el-form-item>

        <el-form-item label="标签：">
          <el-input v-model="selectItem.label" placeholder="请输入" />
        </el-form-item>

        <el-form-item label="字段名：">
          <el-input v-model="selectItem.fields" placeholder="请输入" />
        </el-form-item>

        <el-form-item
          v-if="!['button', 'text'].includes(selectItem.type)"
          label="展示标签："
          class="common-radio"
        >
          <el-radio-group v-model="selectItem.options.showLabel">
            <el-radio :label="true" size="large">是</el-radio>
            <el-radio :label="false" size="large">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="控件间距：" class="common-margin">
          <el-input v-model="selectItem.options.marginTop"></el-input>
          <el-input v-model="selectItem.options.marginRight"></el-input>
          <el-input v-model="selectItem.options.marginBottom"></el-input>
          <el-input v-model="selectItem.options.marginLeft"></el-input>
        </el-form-item>
      </template>
      
      <!-- text 控件 -->
      <template v-if="selectItem.type === 'text'">
        <el-form-item label="字体大小：">
          <el-input-number v-model="selectItem.options.fontSize" :min="12" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="字符间距：">
          <el-input-number v-model="selectItem.options.letterSpacing" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="内容对齐：" width="100%">
          <el-radio-group v-model="selectItem.options.textAlign">
            <el-radio-button label="left">左</el-radio-button>
            <el-radio-button label="center">中</el-radio-button>
            <el-radio-button label="right">右</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字体加粗：">
          <el-radio-group v-model="selectItem.options.fontWeight">
            <el-radio-button label="normal">正常</el-radio-button>
            <el-radio-button label="bold">加粗</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字体颜色：">
          <el-color-picker v-model="selectItem.options.color"></el-color-picker>
        </el-form-item>
        <el-form-item label="只展示年月日：" label-width="110px" class="common-radio">
          <el-radio-group v-model="selectItem.options.ymd">
            <el-radio :label="true" size="large">是</el-radio>
            <el-radio :label="false" size="large">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="展示类型：">
          <el-input
            v-model="selectItem.options.showType"
            :rows="2"
            type="textarea"
            placeholder="请输入类型"
          />
        </el-form-item>
      </template>

      <!-- button 控件 -->
      <template v-if="selectItem.type === 'button'">
        <el-form-item label="按钮类型：">
          <el-radio-group v-model="selectItem.options.type">
            <el-radio label="primary"/>
            <el-radio label="success"/>
            <el-radio label="danger"/>
            <el-radio label="default"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="按钮尺寸：">
          <el-radio-group v-model="selectItem.options.size">
            <el-radio-button label="large"/>
            <el-radio-button label="default"/>
            <el-radio-button label="small"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="动态函数：">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="selectItem.options.dynamicFun">
          </el-input>
        </el-form-item>
      </template>

      <template v-if="selectItem.type === 'table'">
        <el-form-item label="展示边框：" class="common-radio">
          <el-radio-group v-model="selectItem.options.bordered">
            <el-radio :label="true" size="large">是</el-radio>
            <el-radio :label="false" size="large">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>

      <!-- grid 控件 -->
      <template v-if="selectItem.type === 'grid'">
        <el-form-item label="栅格间距：">
          <el-input-number v-model="selectItem.options.gutter" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item class="grid-col-config" label="列配置项：">
          <template v-for="(item, index) in selectItem.columns">
            <div
              class="item-config"
              @click="handleGridDel(selectItem.columns, index)"
            >
              <div @click.stop>
                <el-input-number v-model="item.span"></el-input-number>
              </div>
              <el-button type="danger" :icon="Delete" circle />
            </div>
          </template>
          <p class="item-add" @click.stop="handleAdd(selectItem.columns)">添加</p>
        </el-form-item>
      </template>

      <!-- batchTabel 控件 -->
      <template v-if="selectItem.type === 'batchTable'">
        <el-form-item label="标题大小：">
          <el-input-number v-model="selectItem.options.fontSize" :min="12" :max="100"></el-input-number>
        </el-form-item>

        <el-form-item label="表格标题颜色：" label-width="110px">
          <el-color-picker v-model="selectItem.options.color"></el-color-picker>
        </el-form-item>

        <el-form-item label="表头背景颜色：" label-width="110px">
          <el-color-picker v-model="selectItem.options.headBgColor"></el-color-picker>
        </el-form-item>

        <el-form-item label="表头标题颜色：" label-width="110px">
          <el-color-picker v-model="selectItem.options.headColor"></el-color-picker>
        </el-form-item>

        <el-form-item label="表头字段：">
          <el-button type="primary" @click="handleBatch(true)">添加</el-button>
        </el-form-item>

        <BatchTableHead v-if="headDialogVisible" :headList="batchTableHeadList" @btnEvent="handleBatch"/>
      </template>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'FormItemProperties',
  };
</script>

<script setup>
  import { ref, watch } from 'vue';
  import { useStore } from 'vuex';
  import { Delete } from '@element-plus/icons-vue';
  import BatchTableHead from './components/BatchTableHead.vue';
  import storeGetters from '@/hooks/useGetters.js';
  const store = useStore();

  const { getSelectItem } = storeGetters(['getSelectItem']);
  const selectItem = ref(getSelectItem);

  // 监听到selectItem修改后，更新store里面存储的selectItem和dataList.list里面存储的item
  watch(selectItem, (newVal) => {
    store.commit('updateSelectItem', newVal);
  },{
    deep: true
  })

  function handleGridDel(arr, index) {
    arr.splice(index, 1);
  }

  function handleAdd(arr) {
    arr.push({
      span: 12,
      list: []
    },)
  }

  const batchTableHeadList = ref([]);
  const headDialogVisible = ref(false);
  function handleBatch(show, data) {
    // 添加的情况下
    if(show) {
      batchTableHeadList.value = selectItem.value.headList;
    }
    
    // 保存的情况下
    if(data) {
      selectItem.value.headList = data;
    }

    headDialogVisible.value = show;
  }
</script>

<style lang='scss' scope>
  @import './index.scss';
  @import '../../scss/common.scss';
</style>
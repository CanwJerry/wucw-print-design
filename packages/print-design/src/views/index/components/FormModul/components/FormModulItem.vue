<template>
  <!-- 文字控件 -->
  <el-form-item v-if="record.type === 'text'">
    <div
      class="text-style"
      :style="{
        textAlign: record.options.textAlign,
        color: record.options.color,
        fontSize: record.options.fontSize + 'px',
        fontWeight: record.options.fontWeight,
        letterSpacing: record.options.letterSpacing + 'px'
      }"
    >
      <span class="text-label">{{ record.label }}</span>
      <span v-if="previewPage && record.options.ymd">{{ formateDate(record.value) }}</span>
      <span v-else-if="previewPage && record.options.showType">{{ formateValue(record.value, record.options.showType) }}</span>
      <span v-else-if="previewPage">{{ record.value }}</span>
    </div>
  </el-form-item>
  
  <!-- 按钮控件 -->
  <el-form-item v-if="record.type === 'button'">
    <el-button
      class="btn"
      :type='record.options.type'
      :size='record.options.size'
      @click="previewPage ? handleDynamic(record.options.dynamicFun) : ''"
    >
      {{ record.label }}
    </el-button>
  </el-form-item>

  <!-- 动态表格控件 -->
  <el-form-item v-if="record.type === 'batchTable'">
    <div class="batch-table">
      <p
        v-show="record.options.showLabel"
        :style="{
          fontSize: record.options.fontSize + 'px',
          color: record.options.color,
        }"
      >
        {{record.label}}
      </p>
      <table border>
        <thead
          :style="{
            backgroundColor: record.options.headBgColor,
            color: record.options.headColor
          }" >
          <tr>
            <th v-for="item in record.headList">{{ item.label }}</th>
          </tr>
        </thead>
        <template v-if="record.tableData.length && previewPage">
          <tbody>
            <tr v-for="item in record.tableData" :key="item.matterID">
              <td v-for="subItem in record.headList">{{ item[subItem.prop] }}</td>
            </tr>
          </tbody>
        </template>
        <template v-else>
          <tbody>
            <tr style="margin: 0 auto;height: 80px;">
              <td :colspan="record.headList.length">
                暂无数据
              </td>
            </tr>
          </tbody>
        </template>
      </table>
    </div>
  </el-form-item>
</template>

<script>
  export default {
    name: 'FormModulItem',
  };
</script>

<script setup>
  import storeState from '@/hooks/useState.js';
  import { formateDate, formateValue } from '@/utils/format.js';
  const { previewPage } = storeState(['previewPage']);

  const props = defineProps({
    record: {
      type: Object,
      required: true
    },
  })

  function handleDynamic(fun) {
    (new Function(fun))();
  }
</script>

<style lang='scss' scope>
  .text-style {
    width: 100%;
    background-color: #fff;

    .text-label {
      display: inline-block;
    }
  }

  .batch-table{
    width: 100%;
    table{
      width: 100%;
      border-collapse: collapse;
      border-top: 1px solid #909399;
      border-left: 1px solid #909399;
      tr{
        th{
          line-height: 32px;
        }
        td{
          line-height: 32px;
          text-align: center;
        }
      }
      thead{
        background-color: #f1f1f1;
        color: #909399;
        font-size: 14px;
      }
      tbody {
        background-color: #fff;
      }
    }
  }
</style>
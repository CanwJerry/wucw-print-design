import { createStore } from 'vuex';
import { traverse, traverseItemData } from '@/utils';

/**
 * vuex仓库
 */
export const store = createStore({
  state: {
    // 当前选中的选项
    selectItem: {
      type: ''
    },
    // 最终要预览的JSON
    dataJson: {
      list: [],
      config: {
        formName: '',
        key: ''
      },
    },
    // 当前是否在预览界面
    previewPage: false,
  },

  getters: {
    getSelectItem(state) {
      return state.selectItem;
    },
    getDataJson(state) {
      return state.dataJson;
    }
  },

  mutations: {
    // 新增控件dataJson.list
    addDateJsonListItem(state, obj) {
      state.dataJson.list.push(obj);
    },

    // 删除dataJson.list中的某一项
    delDateJsonListItem(state) {
      const arrs = traverse(state.dataJson.list, state.selectItem.key);
      state.dataJson.list = arrs;
      
      // 当前选项
      if (!arrs.length) {
        state.selectItem = { type: '' }
      }else if (arrs.length === 1) {
        state.selectItem = state.dataJson.list.at(0);
      }
    },

    // 清空dataJson数据
    clearDataJson(state) {
      state.dataJson = {
        list: [],
        config: {
          layout: '',
          labelCol: {},
          labelWidth: 100,
          labelLayout: 'flex',
          wrapperCol: {},
          hideRequiredMark: false,
          customStyle: '',
          formName: '',
          key: ''
        },
      }
    },

    // 更新dataJson
    updateDataJson(state, data) {
      state.dataJson = data;
    },

    // 更新dataJson里面每一项的数据
    updateDataJsonItemData(state, data) {
      traverseItemData(state.dataJson.list, data);
      // console.log('更新dataJson里面每一项的数据', data);
    },

    // 根据索引更新dataJson.list, 因为没有key, 所以通过索引
    updateDataJsonListByIndex(state, obj) {
      state.dataJson.list.forEach((item, itemIndex) => {
        if(itemIndex === obj.newIndex) Object.assign(item, obj.deepColumns);
      });;
    },

    // 更新selectItem数据
    updateSelectItem(state, val) {
      state.selectItem = val;
    },

    // 更新previewPage
    updatePreviewPage(state, val) {
      state.previewPage = val;
    }
  },
  actions: {},
});

export default store;
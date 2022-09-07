import { createStore } from 'vuex';

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
        layout: '',
        labelCol: {},
        labelWidth: 100,
        labelLayout: 'flex',
        wrapperCol: {},
        hideRequiredMark: false,
        customStyle: '',
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
    delDateJsonListItem(state, key) {
      const index = state.dataJson.list.findIndex(item => item.key === key);
      const newList = state.dataJson.list.splice(index, 1);
      state.dataJson.list = newList;
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
        },
      }
    },

    // 更新dataJson
    updateDataJson(state, data) {
      state.dataJson = data;
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
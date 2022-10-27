import { createStore } from 'vuex';
import { traverse, traverseItemData } from '@/utils';
import { GetDocumentPrintInfo } from '@/api/api.js';

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
        key: '',
      },
      otherConfig: {
        formApi: '',
        method: 'post',
        paramsKey: false,
        contentType: 'application/json'
      }
    },
    // 当前是否在预览界面
    previewPage: false,
    // 左侧单据数据选中项
    activeName: '',
    // 左侧菜单单据数据
    leftDocumentData: {}
  },

  getters: {
    getSelectItem(state) {
      return state.selectItem;
    },
    getDataJson(state) {
      return state.dataJson;
    },
    getActiveName(state) {
      return state.activeName;
    },
    getLeftDocumentData(state) {
      return state.leftDocumentData;
    },
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
    addNewDataJson(state, newKey) {
      state.dataJson = {
        list: [
          {
            type: 'text',
            label: '新建单据',
            icon: 'icon-??',
            fields: '',
            value: '',
            key: `text_${new Date().getTime()}`,
            options: {
              textAlign: 'left',
              hidden: false, // 是否隐藏，false显示，true隐藏
              color: '#000',
              fontFamily: 'SimHei',
              fontSize: 16,
              fontWeight: 'normal',
              letterSpacing: 0,
              marginTop: 0,
              marginRight: 0,
              marginBottom: 8,
              marginLeft: 0,
              ymd: false,
              showType: {}
            },
          },
        ],
        config: {
          formName: '',
          key: newKey,
        },
        otherConfig: {
          formApi: '',
          method: 'post',
          paramsKey: false,
          contentType: 'application/json'
        }
      }
      state.selectItem = {};
      state.previewPage = false;
      state.activeName = '';
    },

    // 更新dataJson
    updateDataJson(state, data) {
      state.dataJson = data;
      state.selectItem = {};
    },

    // 更新dataJson里面每一项的数据
    updateDataJsonItemData(state, data) {
      traverseItemData(state.dataJson.list, data);
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
    },

    // 更新activeName
    updateActiveName(state, val) {
      state.activeName = val;
    },

    // 更新activeName
    updateLeftDocumentData(state, val) {
      state.leftDocumentData = val;
    }
  },

  actions: {
    getDocumentList({ state, commit }, { pageIndex = 1, pageSize = 100, keyword = '', formKey = '' } = {}) {
      return new Promise(async resolve => {
        const data = {
          pageIndex,
          pageSize,
          keyword,
          formKey,
        }
        const res = await GetDocumentPrintInfo(data);
        if(res.code === 0) {
          commit('updateLeftDocumentData', res.data.list);
          resolve(res.data);
        }
      })
      
    }
  },
});

export default store;
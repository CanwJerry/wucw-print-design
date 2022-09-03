import { createStore } from 'vuex';

/**
 * vuex仓库
 */
export const store = createStore({
  state: {
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
  },
  getters: {},
  mutations: {},
  actions: {},
});

export default store;
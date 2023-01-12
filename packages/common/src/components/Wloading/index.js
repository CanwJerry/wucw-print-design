import { createApp } from "vue";
import Loading from './index.vue';

export default {
  install: function(app) {
    let loading = createApp(Loading);
    let div = document.createElement('div');
    div.id = 'wLoading';

    const style = {
      position: 'fixed',
      top: '0',
    }

    Object.keys(style).forEach(item => {
      div.style[item] = style[item];
    })

    document.body.appendChild(div)

    // 获取到元素实例
    const loadingInstance = loading.mount('#wLoading');
    
    app.config.globalProperties.$wLoadingShow = () => loadingInstance.show('external');

    app.config.globalProperties.$wLoadingClose = loadingInstance.hide;
  }
}
import { createApp } from "vue";
import Loading from './index.vue';

export default {
  install: function(app) {
    let loading = createApp(Loading);
    let div = document.createElement('div');
    div.id = 'wLoading';

    const style = {
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: '0',
    }

    Object.keys(style).forEach(item => {
      div.style[item] = style[item];
    })
    
    // 兼容v-wLoading指令写法
    app.config.globalProperties.$wLoadingShow = () => {
      if(!document.getElementById('wLoading')) {
        document.body.appendChild(div);
        loading.mount('#wLoading');
      }
    }

    // 兼容v-wLoading指令写法
    app.config.globalProperties.$wLoadingClose = () => {
      if(document.getElementById('wLoading')) {
        document.body.removeChild(div);
        loading.mount('#wLoading');
      }
    }

  }
}
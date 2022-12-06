import { createApp } from 'vue';
import Wbutton from '@/components/Wbutton/index.vue';
import Wbackground from '@/components/Wbackground/index.vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

const app = createApp(App);
app.use(router);
app.use(store);
app.component('w-button', Wbutton);
app.component('w-background', Wbackground);

import './style.scss';

/**
 * UI框架、css变量
 */
// 定制的 ElementPlus
// import ElementPlus from '@ydteam/shared/src/components/element-plus/index.js';
// import 'element-plus/dist/index.css'
// import '@ydteam/shared/src/components/element-plus/index.scss';

// import zhCn from 'element-plus/dist/locale/zh-cn';
// app.use(ElementPlus, {
//   locale: zhCn,
//   size: 'large',
// });
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

app.use(ElementPlus)

// vue实例挂载
app.mount('#app');

if (import.meta.env.DEV) {
  // dev模式显示常用信息便于调试
  console.log('import.meta: ', import.meta);
}

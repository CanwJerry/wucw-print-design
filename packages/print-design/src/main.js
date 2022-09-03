import { createApp } from 'vue';
import App from '@/App.vue';
const app = createApp(App);
import router from '@/router';
app.use(router);
import store from '@/store';
app.use(store);
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
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus)

// vue实例挂载
app.mount('#app');

if (import.meta.env.DEV) {
  // dev模式显示常用信息便于调试
  console.log('import.meta: ', import.meta);
}

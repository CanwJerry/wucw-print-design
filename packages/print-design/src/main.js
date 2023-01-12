import { createApp } from 'vue';
import { Wbackground, Wbutton } from 'common/src/components';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { loadingDirective, btnLimit, clearBtnLimit } from 'common/src/directives/index';
import './style.scss';

const app = createApp(App);
app.use(router);
app.use(store);

// 注册全局组件
app.component('w-button', Wbutton);
app.component('w-background', Wbackground);

// 注册全局指令
app.directive('wLoading', loadingDirective);
app.directive('wBtnLimit', btnLimit);

// 注册全局方法
app.config.globalProperties.$clearBtnLimit = clearBtnLimit;

/**
 * UI框架、css变量
 */
// 定制的 ElementPlus
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

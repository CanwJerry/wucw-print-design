import { createApp } from 'vue';
import App from './App.vue';
import pinia from '@/store/index.js';
import router from '@/router/index.js';
import './style.scss';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app')

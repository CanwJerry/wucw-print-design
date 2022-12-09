import { createApp } from 'vue';
import App from './App.vue';
import pinia from '@/store/index.js';
import router from '@/router/index.js';
import { Wbackground, Wbutton } from 'common/src/components';

import './style.scss';
import 'amfe-flexible/index.js';

const app = createApp(App);

app.use(router);
app.use(pinia);

app.component('w-background', Wbackground);
app.component('w-button', Wbutton);

app.mount('#app')

import {createApp } from 'vue';
import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import ElNotification from 'element-plus'

import store from './store';

const app = createApp(App);

app.component("ElNotification", ElNotification);

app.use(router);
app.use(store);
app.use(ElementPlus)

app.mount('#app');

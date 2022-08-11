import {createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';

import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primevue/resources/primevue.css';
import 'primeicons/primeicons.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import ElNotification from 'element-plus'

import Tooltip from 'primevue/tooltip';
import Card from 'primevue/card';

import store from './store';

const app = createApp(App);

app.directive('tooltip', Tooltip);
app.component("CardComponent", Card);
app.component("ElNotification", ElNotification);

app.use(router);
app.use(PrimeVue);
app.use(store);
app.use(ElementPlus)

app.mount('#app');

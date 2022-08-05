import {createApp} from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';

import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import ToastService from 'primevue/toastservice';

import Tooltip from 'primevue/tooltip';
import Card from 'primevue/card';

const app = createApp(App);

app.directive('tooltip', Tooltip);
app.component("CardComponent", Card);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.mount('#app');

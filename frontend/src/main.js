import {createApp} from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.mount('#app');

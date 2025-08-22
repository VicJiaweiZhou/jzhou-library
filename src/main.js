import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura'; // if this fails, use: '@primeuix/themes/aura'
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    // options: { darkModeSelector: '.app-dark' } // optional
  }
});

app.mount('#app');

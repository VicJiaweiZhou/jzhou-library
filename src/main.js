import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';

import router from './router';

// ---- Firebase: 先初始化，再 getAuth ----
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBu9mulDCiHKtEK6OYfbBXMDGFbmXgPfZE",
  authDomain: "week7-jiaweizhou.firebaseapp.com",
  projectId: "week7-jiaweizhou",
  storageBucket: "week7-jiaweizhou.appspot.com",   // ← 修正这里
  messagingSenderId: "826450393114",
  appId: "1:826450393114:web:1ff0458a839c1a253239a3"
};

// 1) 初始化 App
initializeApp(firebaseConfig);

// 2) 拿到 auth，并在本地时连接 Emulator（可选）
const auth = getAuth();
if (location.hostname === 'localhost') {
  try { connectAuthEmulator(auth, 'http://localhost:9099'); } catch {}
}

const app = createApp(App);
app.use(PrimeVue, { theme: { preset: Aura } });
app.use(router);
app.mount('#app');

import { createApp } from 'vue';
import App from './App.vue';
import store, { key } from './store';
import router from './router';
import { toastContainers } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

createApp(App)
  .use(router)
  .use(store, key)
  .component('toastContainers', toastContainers)
  .mount('#app');

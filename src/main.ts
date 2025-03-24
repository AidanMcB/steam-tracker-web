import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';

// Import Tailwind and main CSS
import './style.css';

// Import plugins
import PrimeVuePlugin from './plugins/primevue';

const pinia = createPinia();
const app = createApp(App);

// Use plugins
app.use(PrimeVuePlugin);
app.use(pinia);
app.use(router);

app.mount('#app');

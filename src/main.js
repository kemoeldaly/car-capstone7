import { createApp } from 'vue'
import App from './App.vue'
import CarSpecs from './components/CarSpecs.vue';
import Recalls from './components/Recalls.vue';
import router from './router'
import store from './store'
import './index.css';

const app = createApp(App)
  .component('CarSpecs', CarSpecs)
  .component('Recalls', Recalls)
  .use(store)
  .use(router);

app.mount('#app');

store.dispatch('fetchUser');

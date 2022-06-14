import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/index.scss';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import VueTree from '@/components/vue-tree';
import Icon from '@/assets/icons';
import 'normalize.css/normalize.css';

const app = createApp(App);

// 全局引入 icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.component('vue-tree', VueTree);
app.use(ElementPlus);
app.use(Icon);
app.use(store).use(router).mount('#app');

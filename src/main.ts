import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/index.scss';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import  { VueTree } from '@/components';
import Icon from '@/assets/icons';
import Echarts from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import 'normalize.css/normalize.css';

use([CanvasRenderer, BarChart, LineChart, LegendComponent, PieChart, GridComponent, TooltipComponent, LegendComponent]);

const app = createApp(App);

// 全局引入 icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.component('v-chart', Echarts);
app.use(VueTree)
app.use(ElementPlus);
app.use(Icon);
app.use(store).use(router).mount('#app');

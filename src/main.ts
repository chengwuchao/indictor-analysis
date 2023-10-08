import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/index.scss';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { VueTree } from '@/components';
import Icon from '@/assets/icons';
import Echarts from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import 'normalize.css/normalize.css';
import SvgIcon from '@/components/SvgIcon/index.vue'; // svg component
import store from '@/store';
import autoExpose from 'unplugin-vue-setup-extend-plus/dist/client/index';

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  LegendComponent,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const app = createApp(App);

// 全局引入 icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.component('v-chart', Echarts);
app.component('svg-icon', SvgIcon);

app.use(autoExpose);
app.use(VueTree);
app.use(ElementPlus);
app.use(Icon);
app.use(store);
app.use(store).use(router).mount('#app');

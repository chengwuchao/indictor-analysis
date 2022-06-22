import { addIcon, Icon } from '@iconify/vue/dist/offline';
import arrowDown from '@iconify-icons/ep/arrow-down';

// ant-design
import antDesignLineChartOutline from '@iconify-icons/ant-design/line-chart-outline';

// element-plus icons
addIcon('ep:arrow-down', arrowDown);

// ant-design icons
addIcon('ant-design:line-chart-outline', antDesignLineChartOutline);

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install: (app: import('vue').App<any>) => {
    app.component('Icon', Icon);
  },
};

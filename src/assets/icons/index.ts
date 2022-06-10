import { addIcon, Icon } from '@iconify/vue/dist/offline';
import arrowDown from '@iconify-icons/ep/arrow-down';

// element-plus icons
addIcon('ep:arrow-down', arrowDown);

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install: (app: import('vue').App<any>) => {
    app.component('Icon', Icon);
  },
};

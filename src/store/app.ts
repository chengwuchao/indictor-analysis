import Cookies from 'js-cookie';
import { defineStore } from 'pinia';

interface State {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  device: string;
  size: string;
}

const initState = (): State => {
  return {
    sidebar: {
      opened: Cookies.get('sidebarStatus')
        ? !!Number(Cookies.get('sidebarStatus'))
        : true,
      withoutAnimation: false,
    },

    device: 'desktop',
    size: Cookies.get('size') || 'medium',
  };
};

export const useAppStore = defineStore({
  id: 'app',
  state: () => initState(),
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', '1');
      } else {
        Cookies.set('sidebarStatus', '0');
      }
    },
    closeSideBar(withoutAnimation: boolean) {
      Cookies.set('sidebarStatus', '0');
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    setSize(size: string) {
      this.size = size;
      Cookies.set('size', size);
    },
  },
});

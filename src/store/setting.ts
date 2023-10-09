import { defineStore } from 'pinia';
import defaultSettings from '@/settings';

const { sideTheme, showSettings, tagsView, fixedHeader, sidebarLogo } =
  defaultSettings;

const initState = (): Record<string, string | boolean> => {
  return {
    sideTheme,
    showSettings,
    tagsView,
    fixedHeader,
    sidebarLogo,
  };
};

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => initState(),
  actions: {
    changeSetting(data: { key: string; value: string | boolean }) {
      const { key, value } = data;
      this.$patch((state) => {
        if (state[key] != null) {
          state[key] = value;
        }
      });
    },
  },
});

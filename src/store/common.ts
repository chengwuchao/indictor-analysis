import { defineStore } from 'pinia';

interface State {
  size: string | number;
  permission_routes: any[];
}

const initState = (): State => {
  return {
    size: '',
    permission_routes: [],
  };
};

export const useCommonStore = defineStore({
  id: 'common',
  state: () => initState(),
  getters: {
    size: (state) => state.size,
    permission_routes: (state) => state.permission_routes,
  },
  actions: {
    setSize(size: string) {
      this.size = size;
    },
  },
});

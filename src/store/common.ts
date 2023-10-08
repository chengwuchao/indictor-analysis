import { defineStore } from 'pinia';

interface CommonState {
  size: string | number;
}

const initState = (): CommonState => {
  return {
    size: '',
  };
};

export const useCommonStore = defineStore({
  id: 'common',
  state: () => initState(),
  getters: {
    size: (state) => state.size,
  },
  actions: {
    setSize(size: string) {
      this.size = size;
    },
  },
});

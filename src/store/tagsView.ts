import { defineStore } from 'pinia';

interface ViewItem {
  path: string;
  name: string;
  meta: any;
}

interface State {
  visitedViews: ViewItem[];
  cachedViews: string[];
}

const initState = (): State => {
  return {
    visitedViews: [],
    cachedViews: [],
  };
};

export const useTagsViewStore = defineStore({
  id: 'tagsView',
  state: () => initState(),
  getters: {
    cachedViews: (state) => state.cachedViews,
  },
  actions: {
    addView(view: ViewItem) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },
    addVisitedView(view: ViewItem) {
      if (this.visitedViews.some((v) => v.path === view.path)) return;
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name',
        }),
      );
    },
    addCachedView(view: ViewItem) {
      if (this.cachedViews.includes(view.name)) return;
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name);
      }
    },

    delView(view: ViewItem) {
      return new Promise((resolve) => {
        this.delVisitedView(view);
        this.delCachedView(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delVisitedView(view: ViewItem) {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1);
            break;
          }
        }
        resolve([...this.visitedViews]);
      });
    },
    delCachedView(view: ViewItem) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name);
        index > -1 && this.cachedViews.splice(index, 1);
        resolve([...this.cachedViews]);
      });
    },

    delOthersViews(view: ViewItem) {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view);
        this.delOthersCachedViews(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delOthersVisitedViews(view: ViewItem) {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view);
        resolve([...this.visitedViews]);
      });
    },
    delOthersCachedViews(view: ViewItem) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name);
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1);
        } else {
          this.cachedViews = [];
        }
        resolve([...this.cachedViews]);
      });
    },

    delAllViews() {
      return new Promise((resolve) => {
        this.delAllVisitedViews();
        this.delAllCachedViews();
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delAllVisitedViews() {
      return new Promise((resolve) => {
        // keep affix tags
        const affixTags = this.visitedViews.filter((tag) => tag.meta.affix);
        this.visitedViews = affixTags;
        resolve([...this.visitedViews]);
      });
    },
    delAllCachedViews() {
      return new Promise((resolve) => {
        this.cachedViews = [];
        resolve([...this.cachedViews]);
      });
    },

    updateVisitedView(view: ViewItem) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  },
});

<template>
  <div :class="{ show: vm.show }" class="header-search">
    <svg-icon
      class-name="search-icon"
      icon-class="search"
      @click.stop="click"
    />
    <el-select
      ref="headerSearchSelect"
      v-model="vm.search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="option in vm.options"
        :key="option.item.path"
        :value="option.item"
        :label="option.item.title.join(' > ')"
      />
    </el-select>
  </div>
</template>

<script lang="ts" name="HeaderSearch" setup>
import { reactive, ref, computed, watch, nextTick } from 'vue';
import path from 'path';
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js/dist/fuse';
import { useCommonStore } from '@/store/common';
import { useRouter } from 'vue-router';

const commandStore = useCommonStore();
const router = useRouter();

interface RouteOptionsItem {
  path: string;
  title: string[];
}

interface VM {
  search: string;
  options: Array<{ item: RouteOptionsItem }>;
  searchPool: Array<any>;
  show: boolean;
  fuse: any;
}

const vm = reactive<VM>({
  search: '',
  options: [],
  searchPool: [],
  show: false,
  fuse: undefined,
});

const headerSearchSelect = ref<HTMLSelectElement | null>(null);

const routes = computed(() => {
  return commandStore.permission_routes;
});

watch(routes, (newVal) => {
  vm.searchPool = generateRoutes(newVal);
});

watch(
  () => vm.searchPool,
  (newVal) => {
    initFuse(newVal);
  },
);

watch(
  () => vm.show,
  (newVal) => {
    if (newVal) {
      document.body.addEventListener('click', close);
    } else {
      document.body.removeEventListener('click', close);
    }
  },
);

function click() {
  vm.show = !vm.show;
  if (vm.show) {
    headerSearchSelect?.value?.focus();
  }
}

function close() {
  headerSearchSelect?.value?.blur();
  vm.options = [];
  vm.show = false;
}

function change(val: any) {
  if (ishttp(val.path)) {
    // http(s):// 路径新窗口打开
    window.open(val.path, '_blank');
  } else {
    router.push(val.path);
  }
  vm.search = '';
  vm.options = [];
  nextTick(() => {
    vm.show = false;
  });
}

function initFuse(list: any) {
  vm.fuse = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7,
      },
      {
        name: 'path',
        weight: 0.3,
      },
    ],
  });
}

// Filter out the routes that can be displayed in the sidebar
// And generate the internationalized title
function generateRoutes(
  routes: any,
  basePath = '/',
  prefixTitle: string[] = [],
) {
  let res: Array<RouteOptionsItem> = [];

  for (const router of routes) {
    // skip hidden router
    if (router.hidden) {
      continue;
    }

    const data: RouteOptionsItem = {
      path: !ishttp(router.path)
        ? path.resolve(basePath, router.path)
        : router.path,
      title: [...prefixTitle],
    };

    if (router.meta && router.meta.title) {
      data.title = [...data.title, router.meta.title];

      if (router.redirect !== 'noRedirect') {
        // only push the routes with title
        // special case: need to exclude parent router without redirect
        res.push(data);
      }
    }

    // recursive child routes
    if (router.children) {
      const tempRoutes = generateRoutes(router.children, data.path, data.title);
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes];
      }
    }
  }
  return res;
}

function querySearch(query: string) {
  if (query !== '') {
    vm.options = vm.fuse.search(query);
  } else {
    vm.options = [];
  }
}

function ishttp(url: string) {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1;
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
